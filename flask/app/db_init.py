from app.db_define import *
import app.config
import csv
from pathlib import Path
import subprocess

"""
db_init
csvの情報をテーブルに読み込む。
テーブルの情報が変わったときやテーブルが追加された時だけ実行される。
"""


def import_csv(filename, Table):
    result = session.query(Table).count()
    print(result)
    if result == 0:
        with open(filename) as f:
            header = f.readline().strip().split(",")
            linesize = len([row for row in f])
            print(header)
        with open(filename) as f:
            reader = csv.DictReader(f)
            print(f"reading {filename} ({linesize} lines)")
            for i, row in enumerate(reader):
                pass
                # session.add(Table(**row))
                # session.commit()


def read_gutenberg_sentence():
    with Session() as session:
        # gutenberg_sentence.csvを読み込み
        result = session.query(GutenbergSentence).count()
        print(result)
        if result == 0:
            filepath = Path("data/gutenberg_sentence_dev.csv")
            if filepath.exists():
                with open(filepath) as f:
                    linesize = len([row for row in f])
                with open(filepath) as f:
                    reader = csv.reader(f)
                    print(f"reading {filepath} ({linesize} lines)")
                    for i, row in enumerate(reader):
                        sentence = GutenbergSentence(
                            id=i + 1,
                            book_id=row[1],
                            sentence=row[2]
                        )
                        session.add(sentence)
                        session.commit()

        # gutenberg_information.csvを読み込み
        # TODO :import_csvの実装
        # import_csv("data/gutenberg_information_dev.csv", GutenbergInformation)


def read_tsukuba_corpus():
    with Session() as session:
        # annotation01_tsukuba_corpus_20140930.tsvを読み込み
        result = session.query(TsukubaCorpus.id).count()
        print(result)
        if result == 0:
            filepath = Path("data/annotation01_tsukuba_corpus_20140930.tsv")
            if filepath.exists():
                with open(filepath) as f:
                    linesize = len([row for row in f])
                with open(filepath) as f:
                    reader = csv.reader(f, delimiter="\t")
                    print(f"reading {filepath} ({linesize} lines)")
                    for i, row in enumerate(reader):
                        if row[0] != "":
                            sentence = TsukubaCorpus(
                                id=row[0],
                                document_id=row[1],
                                document_local_id=row[2],
                                label1=row[3],
                                label2=row[4],
                                sentence=row[5],
                            )
                            session.add(sentence)
                            session.commit()

def add_data_group():
    """
    各データをgroup分けする
    """
    with Session() as session:
        sentence_list = session.query(TsukubaCorpus).all()
        for i, sentence in enumerate(sentence_list):
            if i>=4300:
                # data_group 22(4201~4300), data_group 23(4301~4309)はテスト用
                data_group = int(i / 200) + 2
                data_group_local_id = i % 100 + 1
            else:
                data_group = int(i / 200) + 1
                data_group_local_id = i % 200 + 1

            sentence.data_group = f"tc{data_group}"
            sentence.data_group_local_id = data_group_local_id
        session.commit()

    with Session() as session:
        sentence_list = session.query(TsukubaCorpus).all()
        for i, sentence in enumerate(sentence_list):
            count = session.query(TsukubaCorpus).filter_by(data_group=sentence.data_group).count()
            sentence.data_group_all = count
        session.commit()


def fill_null():
    """
    dbの構造変更で後からnullや不適切になってしまった値を埋める
    """
    with Session() as session:
        # user = session.query(User).filter_by(user_id=1).all()
        # sentence = session.query(TsukubaCorpus).first()
        pass



def run():
    print("executing db_init")
    read_gutenberg_sentence()
    read_tsukuba_corpus()
    add_data_group()
    fill_null()
