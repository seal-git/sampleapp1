from essential_generators import DocumentGenerator
from app.db import *

def reverse_sentence(s):
    result = ""
    for i in range(len(s)):
        result += s[len(s) - i - 1]
    return result


def generate_sentence():
    gen = DocumentGenerator()
    return gen.sentence()

def make_sentence_data(user_id):
    """
    ユーザーに送信する文のデータを形成する
    """
    sentence = get_sentence_from_tsukuba_corpus(
        user_id=user_id
    )
    label = get_label(user_id)
    position = f'{sentence["data_group_local_id"]}/{sentence["data_group_all"]}'

    first, last = False, False
    if sentence["data_group_local_id"] == 1:
        first = True
    elif sentence["data_group_local_id"] == sentence["data_group_all"]:
        last = True

    data = {
        "user_id": user_id,
        "id": sentence["id"],
        "sentence": sentence["sentence"],
        "label": label,
        "position": position,
        "first": first,
        "last": last,
    }
    if last:
        next_data_group = get_next_data_group(user_id)
        data["next"] = {
            "user_id" : user_id,
            "data_group" : next_data_group
        }
    return data
