from flask import Flask, render_template_string
from datetime import datetime
import os

app = Flask(__name__)

@app.route('/')
def home():
    today = datetime.now().strftime("%Y-%m-%d")
    try:
        with open(f"/home/pi/OmegaPi5/TDAH_Manager/DailyMood/{today}.log", "r") as file:
            mood_logs = file.readlines()
    except FileNotFoundError:
        mood_logs = ["Pas encore d'entrée aujourd'hui."]

    template = '''
    <html>
    <head>
        <title>Omega Pi6 Dashboard</title>
    </head>
    <body style="background-color:black;color:lime;font-family:sans-serif;">
        <h1 style="text-align:center;">🌟 Omega Pi6 Dashboard 🌟</h1>
        <h2>📅 Journée : {{ today }}</h2>
        <h3>🧠 Mood Tracker :</h3>
        <ul>
        {% for line in mood_logs %}
            <li>{{ line }}</li>
        {% endfor %}
        </ul>
    </body>
    </html>
    '''
    return render_template_string(template, today=today, mood_logs=mood_logs)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
