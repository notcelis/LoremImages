from flask import Flask
from flask import render_template
from flask import url_for
from flask import request
from flask import redirect

from random import randint
import requests, json

app = Flask(__name__)

@app.route('/welcome',methods=['POST','GET'])
def welcome():

    if request.method == 'GET':
        imgs = []
        sizes = []
        return render_template(
            'template.html',
            title = 'examen',
            img = imgs,
            sizes = sizes,
            len = len(imgs)
            )

@app.route('/imgs',methods=['POST','GET'])
def imgs():
    if request.method == 'POST':
        imgs = getimages()
        return json.dumps(imgs)
        
def getimages():
    url = 'https://picsum.photos/'
    imgs = []
    width = str(randint(350,1200))
    height = str(randint(350,450))

    random_img = 'https://picsum.photos/' + width + '/' + height
    r = requests.get(
        random_img,
        stream = True
    )
    imgs.append(r.url)
    return imgs


    return json.dumps(sizes)
if __name__ == '__main__':
    app.run(debug=True,port=1998)