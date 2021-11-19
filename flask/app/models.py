from flask import request, jsonify

from app import app_
from app.utils import reverse_sentence, generate_sentence
from app.db import db_random_generate


@app_.route('/reverse', methods=['POST'])
# postされた文章を逆さ文にして返す
def reverse():
    json_data = request.json
    print(json_data)
    return jsonify({"result": reverse_sentence(json_data)})


@app_.route('/reverse_random', methods=['POST'])
# ランダムに逆さの文章を返す
def reverse_random():
    result = db_random_generate("gutenberg_sentence")
    result = reverse_sentence(result["content"]["sentence"])
    return jsonify({"result": result})


@app_.route('/random', methods=['POST'])
# ランダムに文章を返す
def random():
    return jsonify({"result": generate_sentence()})


@app_.route('/db_sample_random_generate', methods=['POST'])
# ランダムにsample_db.gutenberg_sentenceから文章を返す
def db_sample_random_generate():
    result_dict = db_random_generate("gutenberg_sentence")
    return jsonify(result_dict)

@app_.route("/get_sentence", methods=["POST"])


@app_.route('/SendFeedback', methods=['POST'])
# feedback処理する
def send_feedback():
    json_data = request.json
    print(json_data)
    return 'success'



