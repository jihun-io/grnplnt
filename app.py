from flask import Flask, render_template, render_template_string, url_for, request, redirect, session
import sqlite3
import os
import hashlib
from time import time
from datetime import datetime, timedelta
import secrets



app = Flask(__name__)

# 비밀 키 로드
secret_path = 'secret-key.txt'
with open(secret_path, "r") as file:
    app.secret_key = file.read()
app.permanent_session_lifetime = timedelta(minutes=30)


# 개발자 모드 추가
dev_path = 'dev.txt'
dev_mode = os.path.isfile(dev_path)


# 플라스크를 재실행할 때마다 CSS를 새로 불러오는 로직
startup_time = int(time())
@app.context_processor
def override_url_for():
    return dict(url_for=dated_url_for)

def dated_url_for(endpoint, **values):
    if dev_mode == True:
        if endpoint == 'static':
            values['_'] = int(time())
    else:
        if endpoint == 'static':
            values['_'] = startup_time
    return url_for(endpoint,**values)


# 리셋
# selected_home = 'normal'
# selected_synopsis = 'normal'
# selected_character = 'normal'
# selected_gallery = 'normal'
# selected_videos = 'normal'
# selected_downloads = 'normal'
# selected_social = 'normal'



@app.route('/')
def main():
    return render_template('index.html', selected_home = 'menu_bold')


@app.route('/comingsoon')
def comingsoon():
    return render_template('comingsoon.html')

@app.route('/synopsis')
def synopsis():
    return render_template('synopsis.html', selected_synopsis = 'menu_bold')

@app.route('/character')
def character():
    return render_template('character.html', selected_character = 'menu_bold')

@app.route('/gallery')
def gallery():
    return render_template('comingsoon.html', selected_gallery = 'menu_bold')

@app.route('/videos')
def videos():
    return render_template('comingsoon.html', selected_videos = 'menu_bold')

@app.route('/download')
def download():
    return render_template('comingsoon.html', selected_download = 'menu_bold')

@app.route('/social')
def social():
    return render_template('comingsoon.html', selected_social = 'menu_bold')

@app.route('/social/guestbook')
def guestbook():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("SELECT username, date, content, sn FROM guestbook ORDER BY date DESC")
    posts = c.fetchall()
    
    return render_template('guestbook.html', selected_social = 'menu_bold', posts = posts)

@app.route('/social/guestbook/submit', methods=['POST'])
def guestbook_submit():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        content = request.form['content']
        
        conn = sqlite3.connect('database.db')
        c = conn.cursor()
        
        salt = os.urandom(32)
        hashed_password = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)
        
        now = datetime.now()
        
        date = now.strftime('%Y-%m-%d %H:%M:%S')
        
        c.execute("INSERT INTO guestbook (username, password, salt, content, date) VALUES (?, ?, ?, ?, ?)", (username, hashed_password, salt, content, date))
        conn.commit()
        conn.close()
        return redirect(url_for('guestbook'))
    else:
        return redirect(url_for('guestbook'))
    
@app.route('/social/guestbook/del', methods=['GET', 'POST'])
def guestbook_del():
    if request.method == 'POST':
        sn = request.args.get('id')
        pw = request.form['pw_edit']
        
        conn = sqlite3.connect('database.db')
        c = conn.cursor()
        
        c.execute("SELECT password, salt FROM guestbook WHERE SN = ?", (sn,))
        result = c.fetchone()
                
        if result is None:
            return redirect(url_for('guestbook'))
        else:
            db_password, salt = result
            hashed_password = hashlib.pbkdf2_hmac('sha256', pw.encode('utf-8'), salt, 100000)
            
            if db_password == hashed_password:
                c.execute("DELETE FROM guestbook WHERE SN = ?", (sn,))
                conn.commit()
                conn.close()

                return redirect(url_for('guestbook'))
            else:
                return render_template_string("""<html><head><title>혹성의 아이</title><script type="text/javascript">window.onload = function() {alert("비밀번호가 올바르지 않습니다.");window.location.href = "/social/guestbook";};</script></head><body></body></html>""")
    else:
        return redirect(url_for('guestbook'))
    
@app.route('/social/guestbook/edit', methods=['GET', 'POST'])
def guestbook_edit():
    if request.method == 'POST':
        sn = request.args.get('id')
        pw = request.form['pw_edit']
        
        conn = sqlite3.connect('database.db')
        c = conn.cursor()
        
        c.execute("SELECT password, salt FROM guestbook WHERE SN = ?", (sn,))
        result = c.fetchone()
            
        if result is None:
            return redirect(url_for('guestbook'))
        else:
            db_password, salt = result
            hashed_password = hashlib.pbkdf2_hmac('sha256', pw.encode('utf-8'), salt, 100000)
            
            if db_password == hashed_password:
                token = secrets.token_urlsafe(16)
                # c.execute("INSERT INTO guestbook (modifyToken) VALUES (?)", (token))
                c.execute("UPDATE guestbook SET modifyToken = ? WHERE SN = ?", (token, sn))
                conn.commit()
                conn.close()
                session['token'] = token
                session['sn'] = sn
                
                return redirect(url_for('guestbook_modify'))
            else:
                return render_template_string("""<html><head><title>혹성의 아이</title><script type="text/javascript">window.onload = function() {alert("비밀번호가 올바르지 않습니다.");window.location.href = "/social/guestbook";};</script></head><body></body></html>""")
    else:
        return redirect(url_for('guestbook'))
    
@app.route('/social/guestbook/modify')
def guestbook_modify():
    if 'token' in session:
        token = session['token']
        sn = session['sn']
        conn = sqlite3.connect('database.db')
        c = conn.cursor()
        c.execute("SELECT username, content FROM guestbook WHERE modifyToken = ?", (token,))
        result = c.fetchone()
        
        if result == None:
            return redirect(url_for('guestbook'))
        else:
            return render_template('guestbook_modify.html', result = result, sn = sn)
    else:
        return redirect(url_for('guestbook'))

@app.route('/social/guestbook/modify/submit', methods=['GET', 'POST'])
def guestbook_modify_submit():
    if 'token' in session:
        if request.method == 'POST':
            username = request.form['username']
            password = request.form['password']
            content = request.form['content']
            sn = request.args.get('id')
            
            conn = sqlite3.connect('database.db')
            c = conn.cursor()
            
            salt = os.urandom(32)
            hashed_password = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)
            
            c.execute("UPDATE guestbook SET username = ?, password = ?, salt = ?, content = ? WHERE sn = ?", (username, hashed_password, salt, content, sn,))
            conn.commit()
            conn.close()
            session.pop('token', None)
            session.pop('sn', None)
            return redirect(url_for('guestbook'))
        else:
            return redirect(url_for('guestbook'))
    else:
        return redirect(url_for('guestbook'))

@app.route('/social/qna')
def qna():
    return render_template('qna.html', selected_social = 'menu_bold')

host_addr = "0.0.0.0"
port_num = "4062"

if __name__ == "__main__":
    app.run(host=host_addr, port=port_num, debug=True)