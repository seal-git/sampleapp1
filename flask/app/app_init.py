from app import db_init
import subprocess


def run():
    print("app_init.run")

    # パッケージのインストール
    cmd = 'pipenv install --system'
    # マイグレーションの自動実行
    # 詳しくはmigrations/READMEを参照
    cmd += ' && alembic upgrade head'

    res = subprocess.Popen(cmd, shell=True)
    res.wait()

    # DBへのデータ投入
    db_init.run()

    # テストの自動実行
    cmd = "pytest -s"
    res = subprocess.Popen(cmd, shell=True)
    res.wait()


