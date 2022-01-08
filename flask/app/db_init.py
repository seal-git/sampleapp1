from app.db_define import *
import app.config
import csv
from pathlib import Path
import subprocess


def import_csv(filename, Table):
    result = session.query(Table).count()
    print(result)
    if result == 0 or config.MyConfig.INIT_DB:
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


with Session() as session:
    # gutenberg_sentence.csvを読み込み
    result = session.query(GutenbergSentence).count()
    print(result)
    if result == 0 or config.MyConfig.INIT_DB:
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

    # annotation01_tsukuba_corpus_20140930.tsvを読み込み
    result = session.query(TsukubaCorpus).count()
    print(result)
    if result == 0 or config.MyConfig.INIT_DB:
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
                            data_group="tc1",
                            data_group_local_id=row[0]
                        )
                        session.add(sentence)
                        session.commit()
