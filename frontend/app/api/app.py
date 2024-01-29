import numpy as np
import csv
import spacy
import whisper
import functools
import time
from queue import Queue
from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__,static_folder='.',static_url_path='')
CORS(app)
# protocolの読み込み
protocols=[]
with open('fixed_protocols/ion/S1720001.csv') as f:
    reader = csv.reader(f)
    for row in reader:
        protocols.append(row)

# spacyの宣言
nlp = spacy.load('ja_ginza')
model = whisper.load_model("base")

singleQueue = Queue(maxsize=1)
def multiple_control(q):
    def _multiple_control(func):
        @functools.wraps(func)
        def wrapper(*args,**kwargs):
            q.put(time.time())
            print("/// [start] critial zone")
            result = func(*args,**kwargs)
            print("/// [end] critial zone")
            q.get()
            q.task_done()
            return result

        return wrapper
    return _multiple_control

#* テキストとプロトコルの類似度計算
def callculate_similarity(s):
    search = nlp(s)
    search = nlp(s)
    similarity=0
    tmp=1
    for i in range(1,(len(protocols[1:]))):
        doc = nlp(protocols[i][0])
        if similarity < doc.similarity(search):
            similarity = doc.similarity(search)
            tmp=i
    return protocols[tmp][2]

#* 初期画面, 実験動画の選択
@app.route('/', methods=["POST", "GET"])
def index():
    return protocols

#* 各実験動画検索画面の表示
@app.route('/search/text', methods=["POST", "GET"])
def search():
    data = request.json
    s = data.get('search')
    start_time = callculate_similarity(s) 
    return jsonify({'time' : start_time})

@app.route('/audio', methods=['POST'])
def audio():
    fs = request.files['file']
    print('test:',fs)
    fs.save('audio/sample.mp3') # 中間ファイルを作らないようにする
    result = model.transcribe("audio/sample.mp3",fp16=False)
    print(result['text'])
    start_time = callculate_similarity(result['text'])
    return jsonify({'time': start_time})

if __name__ == "__main__":
    app.run(port=3000,debug=True)
    

