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
        result = get_sentence_from_tsukuba_corpus(user_id=1)
        print(result["sentence"], result["id"])
        assert (result["id"] >= 1)

def test_get_sentence_from_tsukuba_corpus2():
    with app_.app_context():
        result = get_sentence_from_tsukuba_corpus(user_id=2)
        print(result["sentence"], result["id"])
        assert (result["id"] >= 1)

def test_get_next_data_group():
    with app_.app_context():
        result = get_next_data_group(user_id=2)
        print(result)
        assert result=="tc1"

