from datetime import datetime

from sqlalchemy import *
from sqlalchemy.orm import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.mysql import *
import os

from app import config

DATABASE = 'mysql://%s:%s@%s:%s/%s?charset=utf8mb4' % (
    "root",  # user_name
    os.environ['MYSQL_ROOT_PASSWORD'],  # password
    'mysql',  # host_ip
    '3306',  # port
    'sa_db'  # db_name
)
ENGINE = create_engine(
    DATABASE,
    encoding="utf-8",
    echo=False,  # Trueだと実行のたびにSQLが出力される
    max_overflow=10
)

class BaseBase(object):
    def toDict(self):
        model = {}
        for column in self.__table__.columns:
            model[column.name] = getattr(self, column.name)
        return model

# modelで使用する
Base = declarative_base(cls=BaseBase)


class GutenbergInformation(Base):
    __tablename__ = "gutenberg_information"
    __table_args__ = ({"mysql_charset": "utf8mb4", "mysql_engine": "InnoDB"})
    book_id = Column("book_id", Integer, primary_key=True)
    title = Column("title", String(255))
    author = Column("author", String(255))
    editor = Column("editor", String(255))
    date = Column("date", String(255))
    language = Column("language", String(255))
    character_set = Column("character_set", String(255))


class GutenbergSentence(Base):
    __tablename__ = "gutenberg_sentence"
    __table_args__ = ({"mysql_charset": "utf8mb4", "mysql_engine": "InnoDB"})
    id = Column("id", Integer, primary_key=True)
    book_id = Column("book_id", Integer)
    sentence = Column("sentence", LONGTEXT)

# TODO: テーブルクラスを自動生成して自動追加に対応する
#  ヘッダーや型の自動検出，テーブルの情報を集めたスーパーテーブルなど


class TsukubaCorpus(Base):
    """
    id, document_id, document_local_id, label1, label2, sentence
    """
    __tablename__ = "tsukuba_corpus"
    __table_args__ = ({"mysql_charset": "utf8mb4", "mysql_engine": "InnoDB"})
    id = Column("id", Integer, primary_key=True)
    document_id = Column("document_id", Integer)
    document_local_id = Column("document_local_id", Integer)
    label1 = Column("label1", String(20))
    label2 = Column("label2", String(20))
    sentence = Column("sentence", LONGTEXT)
    data_group = Column("data_group", String(20))
    data_group_local_id = Column("data_group_local_id", Integer)

class User(Base):
    """
    user_id, data_group, data_group_local_id
    data_group_local_idの初期値は0で，どの文も参照していない状態．
    """
    __tablename__ = "user"
    __table_args__ = ({"mysql_charset": "utf8mb4", "mysql_engine": "InnoDB"})
    user_id = Column("user_id", Integer, primary_key=True)
    data_group = Column("data_group", String(20), nullable=False)
    data_group_local_id = Column("data_group_local_id", Integer, nullable=False)
    created = Column("created", DATETIME, default=datetime.now, nullable=False)


class Feedback(Base):
    """
    user_id, data_group, data_group_local_id, label
    """
    __tablename__ = "feedback"
    __table_args__ = ({"mysql_charset": "utf8mb4", "mysql_engine": "InnoDB"})
    feedback_id = Column("feedback_id", Integer, autoincrement=True, primary_key=True)
    user_id = Column("user_id", Integer, nullable=False)
    data_group = Column("data_group", String(20), nullable=False)
    data_group_local_id = Column("data_group_local_id", Integer, nullable=False)
    label = Column("label", String(20), nullable=False)
    created = Column("created", DATETIME, default=datetime.now, nullable=False)
# ============================================================================================================
# INIT_DBがTrueならDBを初期化する
if config.MyConfig.INIT_DB:
    Base.metadata.drop_all(ENGINE)
Base.metadata.create_all(ENGINE)  # create tables

Session = scoped_session(
    sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=ENGINE
    )
)