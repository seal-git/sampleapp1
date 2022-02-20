from flask import request, jsonify, abort
import random

from app import app_
from app.utils import reverse_sentence, generate_sentence
from app.db import *
from app.utils import *


@app_.route('/reverse', methods=["POST",])
# postされた文章を逆さ文にして返す
def reverse():
    json_data = request.json
    print(json_data)
    return jsonify({"result": reverse_sentence(json_data)})


@app_.route('/reverse_random', methods=["POST",])
# ランダムに逆さの文章を返す
def reverse_random():
    result = db_random_generate("gutenberg_sentence")
    result = reverse_sentence(result["content"]["sentence"])
    return jsonify({"result": result})


@app_.route('/random', methods=["POST",])
# ランダムに文章を返す
def random():
    return jsonify({"result": generate_sentence()})


@app_.route('/db_sample_random_generate', methods=["POST",])
# ランダムにsample_db.gutenberg_sentenceから文章を返す
def db_sample_random_generate():
    result_dict = db_random_generate("gutenberg_sentence")
    return jsonify(result_dict)


@app_.route("/get_sentence", methods=["POST",])
# tsukuba_corpusを返す
# 初期化で呼ばれる
def get_sentence():
    if request.method == "POST":
        response = request.get_json()
    else:
        return abort(400)
    print(f"get_sentence: {response}")

    # user_idが指定されていなかったら生成する
    if response.get("user_id") is not None:
        user_id = response["user_id"]
    else:
        while 1:
            user_id = randint(100000, 999999)
            if not check_user_exist(user_id):
                break
    register_new_user(user_id)

    # data_groupが指定されていたらuserを更新する(local_idは1に戻る)
    if response.get("data_group") is not None:
        update_user(user_id, data_group=response["data_group"])

    # 最初の文データを送信
    data = make_sentence_data(user_id)
    return jsonify(data)


@app_.route('/SendFeedback', methods=["POST",])
# feedback処理する
def send_feedback():
    response = request.get_json()
    user_id = response["user_id"]
    label = response["label"]
    # アノテーション結果を保存
    save_feedback(user_id, label)
    print(f"send_feedback: {response}")

    # 返す文を次のに更新
    update_user_sentence(user_id)

    # 次のデータを送信
    data = make_sentence_data(user_id)
    return jsonify(data)

@app_.route('/back', methods=["POST",])
# feedback処理する
def back():
    response = request.get_json()
    print(f"back: {response}")
    user_id = response["user_id"]

    # 返すデータを前のに更新
    update_user_sentence(user_id, count=-1)

    # 前のデータを送信
    data = make_sentence_data(user_id)
    return jsonify(data)

@app_.route("/user", methods=["POST",])
def user():
    response = request.get_json()
    # ユーザーデータを保存
    print(f"user: {response}")
    if response.get("mail"):
        update_user(response["user_id"], mail=response["mail"])
        return "success "
    else:
        return "mail is not found"

@app_.route("/comment", methods=["POST",])
def comment():
    response = request.get_json()
    print(f"comment: {response}")
    # コメントデータを保存
    save_comment(response["user_id"], response["comment"])
    return "success"
