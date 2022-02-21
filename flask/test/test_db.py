from app.db import *
from app import app_
from flask import jsonify

def _test_db_gutenberg_information_random_generate():
    with app_.app_context():
        result = db_random_generate("gutenberg_information")
        assert(len(result["content"]) == 7)

def _test_db_gutenberg_sentence():
    with app_.app_context():
        result = db_random_generate("gutenberg_sentence")
        assert(len(result["content"]) == 3)

def test_register_new_user():
    with app_.app_context():
        register_new_user(user_id=1)
        register_new_user(user_id=2)
        assert 1

def test_update_user():
    with app_.app_context():
        update_user(user_id=1, data_group="tc1")
        update_user(user_id=2, data_group="tc23")
        assert 1

def test_get_sentence_from_tsukuba_corpus():
    with app_.app_context():
        result1 = get_sentence_from_tsukuba_corpus(user_id=1)
        print(result1["sentence"], result1["id"])
        assert (result1["id"] >= 1)

        result2 = get_sentence_from_tsukuba_corpus(user_id=2)
        print(result2["sentence"], result2["id"])
        assert (result2["id"] >= 1)

        result3 = get_sentence_from_tsukuba_corpus(user_id=404)
        assert (type(result3) == AttributeError)

def test_get_next_data_group():
    with app_.app_context():
        result = get_next_data_group(user_id=2)
        print(result)
        assert result=="tc1"

