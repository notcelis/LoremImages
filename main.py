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
        imgs = getimages(3)
        sizes = get_size(imgs)
        
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
        number_of_imgs = int(request.values.get('numero'))
        if(number_of_imgs >10):
            number_of_imgs = 10
        imgs = getimages(number_of_imgs)
        sizes = get_size(imgs)
        return json.dumps(imgs)
        
def getimages(number):
    url = 'https://picsum.photos/'
    imgs = []
    for i in range(number):
        width = str(randint(200,1200))
        height = str(randint(200,1200))

        random_img = 'https://picsum.photos/' + width + '/' + height
        r = requests.get(
            random_img,
            stream = True
        )
        imgs.append(r.url)
    return imgs

def get_size(imgs):
    sizes = []
    for i in imgs:
        size = i.split('.')[2]
        sizes.append('Ancho:'+size.split('/')[3]+' Alto:'+size.split('/')[4])
    return sizes
if __name__ == '__main__':
    app.run(debug=True,port=1998)