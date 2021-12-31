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


# modelで使用する
Base = declarative_base()


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