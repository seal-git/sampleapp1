from app.db_define import *
import app.config
import csv
import subprocess


def import_csv(filename, Table):
    result = session.query(Table).count()
    print(result)
    if result==0 or config.MyConfig.INIT_DB:
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
    if result==0 or config.MyConfig.INIT_DB:
        filename = "data/gutenberg_sentence_dev.csv"
        with open(filename) as f:
            linesize = len([row for row in f])
        with open(filename) as f:
            reader = csv.reader(f)
            print(f"reading {filename} ({linesize} lines)")
            for i, row in enumerate(reader):
                sentence = GutenbergSentence(
                    id = i+1,
                    book_id = row[1],
                    sentence = row[2]
                )
                session.add(sentence)
                session.commit()

    # gutenberg_information.csvを読み込み
    import_csv("data/gutenberg_information_dev.csv", GutenbergInformation)
