from flask import Flask, jsonify
from datetime import datetime
import os

app = Flask(__name__)

@app.route('/api/mood')
def mood_api():
    today = datetime.now().strftime("%Y-%m-%d")
    file_path = f"/home/pi/OmegaPi5/TDAH_Manager/DailyMood/{today}.log"

    if os.path.exists(file_path):
        with open(file_path, "r") as f:
            data = f.readlines()
        return jsonify({"status": "ok", "data": data})
    else:
        return jsonify({"status": "no_data", "data": []})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050)
