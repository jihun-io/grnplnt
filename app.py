from flask import (
    Flask,
    render_template,
    render_template_string,
    url_for,
    request,
    redirect,
    session,
    send_file,
    jsonify,
)
import sqlite3
import os
import hashlib
from time import time
from datetime import datetime, timedelta
import secrets
import requests
import json


app = Flask(__name__)

# 비밀 키 로드
secret_path = "secret-key.txt"
with open(secret_path, "r") as file:
    app.secret_key = file.read()

# 턴스타일 비밀 키 로드
turnstile_secret_path = "turnstile-secret-key.txt"
with open(turnstile_secret_path, "r") as file:
    app.turnstile_secret_key = file.read()

app.permanent_session_lifetime = timedelta(minutes=30)


# 개발자 모드 추가
dev_path = "dev.txt"
dev_mode = os.path.isfile(dev_path)


# 플라스크를 재실행할 때마다 CSS를 새로 불러오는 로직
startup_time = int(time())

# 관리자 로그인 세션 유지 기간 설정
app.permanent_session_lifetime = timedelta(minutes=60)


@app.context_processor
def override_url_for():
    return dict(url_for=dated_url_for)


def dated_url_for(endpoint, **values):
    if dev_mode == True:
        if endpoint == "static":
            values["_"] = int(time())
    else:
        if endpoint == "static":
            values["_"] = startup_time
    return url_for(endpoint, **values)


@app.route("/")
def main():
    return render_template("index.html", selected_home="menu-bold", title="혹성의 아이")


@app.route("/coming-soon")
def comingsoon():
    return render_template("coming-soon.html", title="COMING SOON - 혹성의 아이")


@app.route("/synopsis")
def synopsis():
    return render_template(
        "synopsis.html", selected_synopsis="menu-bold", title="시놉시스 - 혹성의 아이"
    )


@app.route("/character")
def character():
    return render_template(
        "character.html", selected_character="menu-bold", title="캐릭터 - 혹성의 아이"
    )


@app.route("/gallery")
def gallery():
    return render_template(
        "coming-soon.html",
        menuName="갤러리",
        selected_gallery="menu-bold",
        title="갤러리 - 혹성의 아이",
    )


@app.route("/videos")
def videos():
    return render_template(
        "coming-soon.html",
        menuName="영상",
        selected_videos="menu-bold",
        title="영상 - 혹성의 아이",
    )


@app.route("/download")
def download():
    return render_template(
        "coming-soon.html",
        menuName="다운로드",
        selected_download="menu-bold",
        title="다운로드 - 혹성의 아이",
    )


@app.route("/social")
def social():
    return render_template(
        "coming-soon.html",
        menuName="",
        selected_social="menu-bold",
        title="소셜 - 혹성의 아이",
    )


@app.route("/social/guestbook")
def guestbook():
    conn = sqlite3.connect("database.db")
    c = conn.cursor()
    c.execute("SELECT username, date, content, sn FROM guestbook ORDER BY date DESC")
    posts = c.fetchall()

    return render_template(
        "guestbook.html",
        selected_social="menu-bold",
        posts=posts,
        title="방명록 - 혹성의 아이",
    )


@app.route("/social/guestbook/submit", methods=["POST"])
def guestbook_submit():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        content = request.form["content"]
        turnstile = request.form["cf-turnstile-response"]

        turnstileCheck = {"secret": app.turnstile_secret_key, "response": turnstile}

        url = "https://challenges.cloudflare.com/turnstile/v0/siteverify"
        response = requests.post(url, data=turnstileCheck, timeout=10)

        if response.status_code == 200:
            result = json.loads(response.text)
            if result["success"] == True:
                conn = sqlite3.connect("database.db")
                c = conn.cursor()

                salt = os.urandom(32)
                hashed_password = hashlib.pbkdf2_hmac(
                    "sha256", password.encode("utf-8"), salt, 100000
                )

                now = datetime.now()

                date = now.strftime("%Y-%m-%d %H:%M:%S")

                c.execute(
                    "INSERT INTO guestbook (username, password, salt, content, date) VALUES (?, ?, ?, ?, ?)",
                    (username, hashed_password, salt, content, date),
                )
                conn.commit()
                conn.close()
            else:
                return redirect(url_for("guestbook"))
        return redirect(url_for("guestbook"))
    else:
        return redirect(url_for("guestbook"))


@app.route("/social/guestbook/del", methods=["GET", "POST"])
def guestbook_del():
    if request.method == "POST":
        sn = request.args.get("id")
        pw = request.form["pw_edit"]

        conn = sqlite3.connect("database.db")
        c = conn.cursor()

        c.execute("SELECT password, salt FROM guestbook WHERE SN = ?", (sn,))
        result = c.fetchone()

        if result is None:
            return redirect(url_for("guestbook"))
        else:
            db_password, salt = result
            hashed_password = hashlib.pbkdf2_hmac(
                "sha256", pw.encode("utf-8"), salt, 100000
            )

            if db_password == hashed_password:
                c.execute("DELETE FROM guestbook WHERE SN = ?", (sn,))
                conn.commit()
                conn.close()

                return redirect(url_for("guestbook"))
            else:
                return render_template_string(
                    """<html><head><title>혹성의 아이</title><script type="text/javascript">window.onload = function() {alert("비밀번호가 올바르지 않습니다.");window.location.href = "/social/guestbook";};</script></head><body></body></html>"""
                )
    else:
        return redirect(url_for("guestbook"))


@app.route("/social/guestbook/edit", methods=["GET", "POST"])
def guestbook_edit():
    if request.method == "POST":
        sn = request.args.get("id")
        pw = request.form["pw_edit"]

        conn = sqlite3.connect("database.db")
        c = conn.cursor()

        c.execute("SELECT password, salt FROM guestbook WHERE SN = ?", (sn,))
        result = c.fetchone()

        if result is None:
            return redirect(url_for("guestbook"))
        else:
            db_password, salt = result
            hashed_password = hashlib.pbkdf2_hmac(
                "sha256", pw.encode("utf-8"), salt, 100000
            )

            if db_password == hashed_password:
                token = secrets.token_urlsafe(16)
                # c.execute("INSERT INTO guestbook (modifyToken) VALUES (?)", (token))
                c.execute(
                    "UPDATE guestbook SET modifyToken = ? WHERE SN = ?", (token, sn)
                )
                conn.commit()
                conn.close()
                session["token"] = token
                session["sn"] = sn

                return redirect(url_for("guestbook-modify"))
            else:
                return render_template_string(
                    """<html><head><title>혹성의 아이</title><script type="text/javascript">window.onload = function() {alert("비밀번호가 올바르지 않습니다.");window.location.href = "/social/guestbook";};</script></head><body></body></html>"""
                )
    else:
        return redirect(url_for("guestbook"))


@app.route("/social/guestbook/modify")
def guestbook_modify():
    if "token" in session:
        token = session["token"]
        sn = session["sn"]
        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        c.execute(
            "SELECT username, content FROM guestbook WHERE modifyToken = ?", (token,)
        )
        result = c.fetchone()

        if result == None:
            return redirect(url_for("guestbook"))
        else:
            return render_template(
                "guestbook-modify.html",
                result=result,
                sn=sn,
                title="방명록 수정 - 혹성의 아이",
            )
    else:
        return redirect(url_for("guestbook"))


@app.route("/social/guestbook/modify/submit", methods=["GET", "POST"])
def guestbook_modify_submit():
    if "token" in session:
        if request.method == "POST":
            username = request.form["username"]
            password = request.form["password"]
            content = request.form["content"]
            sn = request.args.get("id")

            conn = sqlite3.connect("database.db")
            c = conn.cursor()

            salt = os.urandom(32)
            hashed_password = hashlib.pbkdf2_hmac(
                "sha256", password.encode("utf-8"), salt, 100000
            )

            c.execute(
                "UPDATE guestbook SET username = ?, password = ?, salt = ?, content = ? WHERE sn = ?",
                (
                    username,
                    hashed_password,
                    salt,
                    content,
                    sn,
                ),
            )
            conn.commit()
            conn.close()
            session.pop("token", None)
            session.pop("sn", None)
            return redirect(url_for("guestbook"))
        else:
            return redirect(url_for("guestbook"))
    else:
        return redirect(url_for("guestbook"))


@app.route("/admin")
def admin():
    if "admin_username" in session:
        return redirect(url_for("admin_dashboard"))
    else:
        return render_template("admin.html", title="관리자 로그인 - 혹성의 아이")


@app.route("/admin/dashboard")
def admin_dashboard():
    if "admin_username" in session:
        return render_template("dashboard.html", title="관리자 설정 - 혹성의 아이")
    else:
        return redirect(url_for("admin"))


@app.route("/admin/guestbook")
def admin_guestbook():
    if "admin_username" in session:
        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        c.execute(
            "SELECT username, date, content, sn FROM guestbook ORDER BY date DESC"
        )
        posts = c.fetchall()
        return render_template(
            "admin-guestbook.html", posts=posts, title="방명록 관리 - 혹성의 아이"
        )
    else:
        return redirect(url_for("admin"))


@app.route("/admin/guestbook/del", methods=["GET", "POST"])
def admin_guestbook_del():
    if request.method == "GET":
        sn = request.args.get("id")

        conn = sqlite3.connect("database.db")
        c = conn.cursor()

        c.execute("SELECT password, salt FROM guestbook WHERE SN = ?", (sn,))
        result = c.fetchone()

        if result is None:
            return redirect(url_for("admin_guestbook"))
        else:
            c.execute("DELETE FROM guestbook WHERE SN = ?", (sn,))
            conn.commit()
            conn.close()

            return redirect(url_for("admin_guestbook"))
    else:
        return redirect(url_for("admin_guestbook"))


@app.route("/admin/guestbook/edit", methods=["GET", "POST"])
def admin_guestbook_edit():
    if request.method == "POST":
        sn = request.args.get("id")
        username = request.form["username"]
        content = request.form["content"]

        conn = sqlite3.connect("database.db")
        c = conn.cursor()

        c.execute("SELECT password, salt FROM guestbook WHERE SN = ?", (sn,))
        result = c.fetchone()

        if result is None:
            return redirect(url_for("admin_guestbook"))
        else:
            c.execute(
                "UPDATE guestbook SET username = ?, content = ? WHERE sn = ?",
                (
                    username,
                    content,
                    sn,
                ),
            )
            conn.commit()
            conn.close()

            return redirect(url_for("admin_guestbook"))
    else:
        return redirect(url_for("admin_guestbook"))


@app.route("/admin/login", methods=["GET", "POST"])
def admin_login():
    if request.method == "POST":
        email = request.form["email"]
        pw = request.form["pw"]

        conn = sqlite3.connect("database.db")
        c = conn.cursor()

        c.execute("SELECT password, salt FROM admin WHERE username = ?", (email,))
        result = c.fetchone()

        if result is None:
            return render_template_string(
                """<html><head><title>혹성의 아이</title><script type="text/javascript">window.onload = function() {alert("계정이 올바르지 않습니다.");window.location.href = "/admin";};</script></head><body></body></html>"""
            )
        else:
            db_password, salt = result
            hashed_password = hashlib.pbkdf2_hmac(
                "sha256", pw.encode("utf-8"), salt, 100000
            )
            if db_password == hashed_password:
                session.permanent = True
                session["admin_username"] = email
                return redirect(url_for("admin_dashboard"))
            else:
                return render_template_string(
                    """<html><head><title>혹성의 아이</title><script type="text/javascript">window.onload = function() {alert("계정이 올바르지 않습니다.");window.location.href = "/admin";};</script></head><body></body></html>"""
                )
    else:
        return render_template("admin.html")


@app.route("/admin/logout")
def admin_logout():
    session.pop("admin_username", None)
    return redirect(url_for("main"))


@app.route("/admin/join")
def admin_join():
    conn = sqlite3.connect("database.db")
    c = conn.cursor()
    c.execute(
        """
              CREATE TABLE IF NOT EXISTS admin (sn INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password INTEGER, salt INTEGER, invitetoken TEXT)
    """
    )
    conn.commit()

    c.execute("SELECT COUNT(*) FROM admin;")
    count = c.fetchone()[0]
    conn.close()

    if count == 0:
        return render_template("join.html", title="관리자 등록 - 혹성의 아이")
    else:
        return redirect(url_for("admin"))


@app.route("/admin/join/submit", methods=["GET", "POST"])
def admin_join_submit():
    if request.method == "POST":
        email = request.form["email"]
        pw = request.form["pw"]
        token = request.form["token"]

        conn = sqlite3.connect("database.db")
        c = conn.cursor()

        c.execute("SELECT COUNT(*) FROM admin;")
        count = c.fetchone()[0]

        salt = os.urandom(32)
        hashed_password = hashlib.pbkdf2_hmac(
            "sha256", pw.encode("utf-8"), salt, 100000
        )

        if count == 0:
            c.execute(
                "INSERT INTO admin (username, password, salt) VALUES (?, ?, ?)",
                (email, hashed_password, salt),
            )
            conn.commit()
            conn.close()
            return redirect(url_for("admin"))
        else:
            c.execute(
                "SELECT token FROM admin WHERE token = ?",
                (token),
            )
            result = c.fetchone()

            if result == None:
                return redirect(url_for("main"))
            else:
                c.execute(
                    "INSERT INTO admin (username, password, salt) VALUES (?, ?, ?)",
                    (email, hashed_password, salt),
                )
                conn.commit()
                conn.close()
                return redirect(url_for("admin"))
    else:
        return redirect(url_for("main"))


@app.route("/social/qna")
def qna():
    return render_template(
        "qna.html", selected_social="menu-bold", title="질문 및 문의 - 혹성의 아이"
    )


@app.route("/download/pdf")
def download_pdf():
    return send_file(
        "static/files/혹성의 아이 캡스톤 발표본.pdf",
        as_attachment=True,
        mimetype="application/pdf",
        download_name="혹성의 아이 캡스톤 발표본.pdf",
    )


@app.route("/deploy-test")
def deploy_test():
    return jsonify(result="success")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4062, debug=True)
