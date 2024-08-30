import numpy as np
import csv
import spacy
import whisper
import soundfile as sf
from io import BytesIO
import os
from faster_whisper import WhisperModel
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__,static_folder='.',static_url_path='')
CORS(app)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy(app)

# spacyの宣言
nlp = spacy.load('ja_ginza')
model = WhisperModel("base")

#* プロトコルの読み込み
def read_protocol(category:str):
    protocols = []
    with open('./fixed_protocols/'+ category +'.csv') as f:
        reader = csv.reader(f)
        for row in reader:
            protocols.append(row)
    return protocols
#* テキストとプロトコルの類似度計算
def callculate_similarity(s,category):
    search = nlp(s)
    search = nlp(s)
    similarity=0
    tmp=1
    protocols = read_protocol(category)
    for i in range(1,(len(protocols[1:]))):
        doc = nlp(protocols[i][0])
        if similarity < doc.similarity(search):
            similarity = doc.similarity(search)
            tmp=i
    return protocols[tmp][2]
#* 初期画面, 実験動画の選択
@app.route('/index', methods=["POST", "GET"])
def index():
    data = request.json
    category = data.get('category')
    protocols = read_protocol(category)
    return protocols[1:]

#* 各実験動画検索画面の表示
@app.route('/text', methods=["POST", "GET"])
def search():
    data = request.json
    s = data.get('search')
    category = data.get('category')
    start_time = callculate_similarity(s,category) 
    return jsonify({'time' : start_time})

@app.route('/audio', methods=['POST'])
def audio():
    wavdata = request.files['file'].stream
    #print('test:',fs)
    #audio_array = np.frombuffer(fs.read(),np.float32)
    #fs.save('./audio/sample.mp3') # 中間ファイルを作らないようにする
    audio_data, samplelate = sf.read(BytesIO(wavdata.read()))
    #result = model.transcribe('./audio/sample.mp3',fp16=False)
    result = model.transcribe(audio_data)
    print(result['text'])
    start_time = callculate_similarity(result['text'])
    return jsonify({'time': start_time})

if __name__ == "__main__":
    app.run(port=8080,debug=True)
