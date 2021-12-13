#API
## GetData
dbやライブラリから文やデータを取得する
### args
* db 参照するデータベース名
* isRandom Trueならランダムに取得: [True, False]
* id 取得するデータのid
### return
* data 取得データ

## GetResult
入力に対して何らかの処理をしたデータを返す
### args
* method 処理のメソッド名: [reverse, ]
* isRandom Trueならランダムな結果を返す: [True, False]
* data 入力データ
### return
* data 処理済みのデータ

## SendFeedback
yes/noやannotation結果，文章のFBなどを受け取ってDBに保存する
### args
* service 送り元のサービス: [is-it-sentence, ]
* data FB対象のデータ
* feedback データについてのFB
### return
* result: [success, fail]