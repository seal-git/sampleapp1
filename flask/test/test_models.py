from app.db import db_random_generate
from app import app_
from flask import jsonify
from app.models import *
import requests

def _test_get_sentence():
   result = get_sentence_from_tsukuba_corpus(user_id=1)
   assert (result!="")

def test_send_feedback():
    client = app_.test_client()
    params = {
        "user_id":1,
        "sentence": "sample_sentence",
        "label": "p"
    }
    res = client.post("/SendFeedback", json=params)
    # print(res)
    # pprint.PrettyPrinter(indent=2).pprint(res.json())
    assert res