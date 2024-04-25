from flask import Flask, render_template, url_for
import os
from time import time
from datetime import datetime, timedelta



app = Flask(__name__)


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
    return render_template('guestbook.html', selected_social = 'menu_bold')

@app.route('/social/qna')
def qna():
    return render_template('qna.html', selected_social = 'menu_bold')

host_addr = "0.0.0.0"
port_num = "4062"

if __name__ == "__main__":
    app.run(host=host_addr, port=port_num, debug=True)