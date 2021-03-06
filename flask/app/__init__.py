from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import app.config


app_ = Flask(__name__)
app_.config.from_object(config.Config)

# アプリでDB操作を行えるように初期設定する
db_ = SQLAlchemy(app_)
db_.init_app(app_)

# import app.make_articles_html
# import app.make_about_us_content_html
# import app.make_views


import app.views
import app.models


