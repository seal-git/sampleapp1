import re

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import *
from flask import jsonify
from app import app_, db_
from app.db_define import *
from random import randint
# from flask_marshmallow import Marshmallow

def get_sentence_from_tsukuba_corpus(user_id):
    """
    TsukubaCorpusから1行取得
    user_idがユーザーの識別子になる
    :return: sentence(dictとして返す)
    """

    with Session() as session:
        user = session.query(User).filter_by(user_id=user_id).first()
        sentence = session.query(TsukubaCorpus).filter_by(
            data_group=user.data_group,
            data_group_local_id=user.data_group_local_id
            ).first().toDict()
        print(f"user {user_id}: get from tsukuba corpus {sentence}")
    return sentence

def register_new_user(user_id):
    """
    user_idが未登録ならそれを登録する
    :param user_id:
    :return:
    """

    with Session() as session:
        if session.query(User).filter_by(user_id=user_id).first() is None:
            user = User(
                user_id = user_id,
                data_group = "tc1",
                data_group_local_id = 1
            )
            session.add(user)
            session.commit()
            print(f"user {user_id} is registered")
    return

def update_user(user_id, mail=None, data_group=None):
    """
    メールアドレスを更新
    """
    if mail is None and data_group is None:
        raise ValueError("引数がありません")
        return

    with Session() as session:
        user = session.query(User).filter_by(user_id=user_id).first()
        if mail is not None:
            user.mail = mail
            print(f"user{user_id}'s mail address updated: {user.mail}")
        if data_group is not None:
            user.data_group = data_group
            user.data_group_local_id = 1
            print(f"user{user_id}'s data group updated: {user.data_group}")
        session.commit()
    return

def update_user_sentence(user_id, count=1):
    """
    ユーザーのdata_group_local_idを次の番号に当たるものに更新する
    data_group_local_idが範囲外を指さないようにする
    :param user_id:
    :param count: いくつ進めるか指定
    :return:
    """
    with Session() as session:
        user = session.query(User).filter_by(user_id=user_id).first()
        data_num = session.query(TsukubaCorpus).filter_by(data_group=user.data_group).count()
        first_flag = False
        last_flag = False
        if count>=0:
            user.data_group_local_id = min(data_num, user.data_group_local_id+count)
        else:
            user.data_group_local_id = max(1, user.data_group_local_id+count)

        if user.data_group_local_id == 1:
            first_flag = True
        if user.data_group_local_id == data_num:
            last_flag = True

        print(f"user{user_id}'s sentence updated: {user.data_group_local_id}")
        session.commit()
    return first_flag, last_flag

def check_user_exist(user_id):
    """
    ランダムに作ったuser_idが存在するかチェック
    :return:
    """
    with Session() as session:
        user = session.query(User).filter_by(user_id=user_id).first()
        if user is None:
            return False
        else:
            return True

def save_feedback(user_id, label):
    """
    アノテーション結果を保存する
    :param user_id:
    :param val:
    :return:
    """
    with Session() as session:
        user = session.query(User).filter_by(user_id=user_id).first()
        feedback = session.query(Feedback).filter_by(
            user_id = user.user_id,
            data_group=user.data_group,
            data_group_local_id=user.data_group_local_id,
        ).first()
        if feedback is not None:
            feedback.label = label
            print(f"label updated:{user_id}-{user.data_group}-{user.data_group_local_id}:{label}")
        else:
            new_feedback = Feedback(
                user_id = user.user_id,
                data_group = user.data_group,
                data_group_local_id = user.data_group_local_id,
                label = label
            )
            session.add(new_feedback)
            print(f"label registered:{user_id}-{user.data_group}-{user.data_group_local_id}:{label}")

        session.commit()
    return

def save_comment(user_id, comment):
    """
    フィードバックコメントを保存する
    """
    with Session() as session:
        user = session.query(User).filter_by(user_id=user_id).first()
        new_comment = Comment(
            user_id = user.user_id,
            data_group = user.data_group,
            comment = comment,
        )
        session.add(new_comment)
        print(f"user{user.user_id}'s comment registered")
        session.commit()
    return


def get_label(user_id):
    """
    userに現在表示している文のラベルが既にあればそれを返す
    :param user_id:
    :return:
    """
    with Session() as session:
        user = session.query(User).filter_by(user_id=user_id).first()
        feedback = session.query(Feedback).filter_by(
            user_id = user.user_id,
            data_group=user.data_group,
            data_group_local_id=user.data_group_local_id,
        ).first()
        if feedback is None:
            return None
        else:
            return feedback.label

def get_next_data_group(user_id):
    """
    現在表示しているデータグループの次のデータグループの名前を返す
    tc1なら次はtc2になる。もし次がなかったらtc1を返す
    """
    with Session() as session:
        user = session.query(User).filter_by(user_id=user_id).first()
        next_data_group_num = int(re.sub(r"[a-zA-Z]","",user.data_group))+1
        next_data_group = re.sub(r"[0-9]+", str(next_data_group_num), user.data_group)
        sentence = session.query(TsukubaCorpus).filter_by(data_group=next_data_group).first()
        if sentence is None:
            next_data_group = re.sub(r"[0-9]+", "1", user.data_group)

    return next_data_group




# ma = Marshmallow()
#
# conn = mysql.connector.connect(
#     host = 'mysql', #docker-compose.ymlで指定したコンテナ名
#     port = 3306,
#     user = 'root',
#     password = 'pass',
#     database = 'sample_db'
# )
#
# conn.ping(reconnect=True)
# if conn.is_connected():
#     print("connected!")
#

def db_random_generate(table):
    pass
#     '''
#     :param table:(str)table name
#     :return: (dict) one row of the table
#     '''
#     conn.ping(reconnect=True)
#
#     if table is None:
#         raise(Exception("must have table name"))
#     # conn.ping(reconnect=True)
#     cur = conn.cursor(dictionary=True)
#     # get primary key name
#     sql = f"""\
#         SELECT COLUMN_NAME AS 'key' FROM information_schema.columns \
#         WHERE TABLE_NAME='{table}' AND COLUMN_KEY='PRI'\
#         """
#     # print(sql)
#     cur.execute(sql)
#     key = cur.fetchone()["key"]
#
#     # get random one
#     sql = f"""\
#         SELECT COUNT({key}) AS 'count' FROM {table}\
#         """
#     # print(sql)
#     cur.execute(sql)
#     rows_num = cur.fetchone()["count"]
#     rand_idx = randint(0, rows_num-1)
#     sql = f"""\
#         SELECT * FROM {table} WHERE {key}={rand_idx}
#     """
#     cur.execute(sql)
#     content = cur.fetchone()
#     result = {
#         "keys": list(content.keys()),
#         "content": content
#     }
#     cur.close()
#     return result
#
#


