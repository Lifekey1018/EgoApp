import numpy as np
import csv
import spacy
import whisper
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
start_time = 0

#* 初期画面,　実験動画の選択
@app.route('/', methods=["POST", "GET"])
def index():
    return protocols
# def index():
#    return render_template('index.html', protocols=protocols)

#* 各実験動画検索画面の表示
@app.route('/search', methods=["POST", "GET"])
def search():
    data = request.json
    s = data.get('search')
    print(s)
    search = nlp(s)
    similarity=0
    global start_time
    tmp=1
    for i in range(1,(len(protocols[1:]))):
        doc = nlp(protocols[i][0])
        if similarity < doc.similarity(search):
            similarity = doc.similarity(search)
            tmp=i
    start_time = protocols[tmp][2]
    print(start_time)    
    return jsonify({'time' : start_time})

@app.route('/audio', methods=['POST'])
def audio():
    fs = request.files['file']
    fs.save('audio/sample.mp3') # 中間ファイルを作らないようにする
    
    result = model.transcribe("audio/sample.mp3",fp16=False)
    print(result['text'])
    return jsonify({'resp': 'fetched'})

if __name__ == "__main__":
    app.run(port=3000,debug=True)
    

