from app.db import db_random_generate
from app import app_
from flask import jsonify

def test_db_gutenberg_information_random_generate():
    with app_.app_context():
        result = db_random_generate("gutenberg_information")
        assert(len(result["content"]) == 7)

def test_db_gutenberg_sentence():
    with app_.app_context():
        result = db_random_generate("gutenberg_sentence")
        assert(len(result["content"]) == 3)
