from flask import request, jsonify
import random

from app import app_
from app.utils import reverse_sentence, generate_sentence
from app.db import *


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
# tsukuba_corpusを返す
def get_sentence():
    response = request.get_json()
    print(f"get_sentence: {response}")

    if response.get("user_id") is not None:
        user_id = response["user_id"]
    else:
        while 1:
            user_id = randint(100000, 999999)
            if not check_user_exist(user_id):
                break


    sentence = get_sentence_from_tsukuba_corpus(user_id=user_id)
    data = {
        "id": sentence["id"],
        "sentence": sentence["sentence"],
        "user_id": user_id,
    }

    return jsonify(data)


@app_.route('/SendFeedback', methods=['POST'])
# feedback処理する
def send_feedback():
    response = request.get_json()
    user_id = response["user_id"]
    label = response["label"]
    # アノテーション結果を保存
    save_feedback(user_id, label)
    print(f"send_feedback: {response}")
    # 次のデータを送信
    update_user_sentence(user_id)
    sentence = get_sentence_from_tsukuba_corpus(
        user_id=user_id
    )
    label = get_label(user_id)

    data = {
        "id": sentence["id"],
        "sentence": sentence["sentence"],
        "label": label,
    }
    return jsonify(data)

@app_.route('/back', methods=['POST'])
# feedback処理する
def back():
    response = request.get_json()
    # アノテーション結果を保存
    print(f"back: {response}")
    # 前のデータを送信
    user_id = response["user_id"]
    update_user_sentence(user_id, count=-1)
    sentence = get_sentence_from_tsukuba_corpus(
        user_id=user_id
    )
    label = get_label(user_id)
    data = {
        "id": sentence["id"],
        "sentence": sentence["sentence"],
        "label": label
    }
    return jsonify(data)
