from app.db_define import *
import csv
from tqdm import tqdm

with Session() as session:
    result = session.query(GutenbergSentence).count()
    print(result)
    with open("data/gutenberg_sentence.csv") as f:
        reader = csv.reader(f)
        for i, row in tqdm(enumerate(reader)):
            # print(row)
            sentence = GutenbergSentence(
                id = i+1,
                book_id = row[1],
                sentence = row[2]
            )
            # session.add(sentence)
            # session.commit()
    result = session.query(GutenbergSentence).count()
    print(result)

