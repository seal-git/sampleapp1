from app import app_ , app_init

import subprocess
from datetime import datetime, timezone, timedelta

# マイグレーションコードの自動生成
now = datetime.now(tz=timezone(timedelta(hours=9)))
message = now.strftime("%Y%m%d%H%M%S")
cmd = f'alembic revision --autogenerate -m "{message}"'

res = subprocess.Popen(cmd, shell=True)
res.wait()

if __name__ == '__main__':
    app_init.run()
    app_.run(host="0.0.0.0", port=5000, debug=True)  # debug=Trueで自動更新されるようになる