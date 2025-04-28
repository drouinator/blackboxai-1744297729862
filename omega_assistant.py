import os
import datetime
import json

# Mood Tracker File
MOOD_TRACKER_PATH = '/home/pi/OmegaPi5/TDAH_Manager/mood_tracker.py'
DAILY_QUESTIONS_PATH = '/home/pi/OmegaPi5/TDAH_Manager/Daily_Questions.md'

# 1. Mood Pattern Analysis
def analyze_mood_patterns():
    try:
        import mood_tracker
        data = mood_tracker.load_mood_data()
        if not data:
            print("[Mood Analysis] No mood data available.")
            return
        mood_trend = sum(entry['mood'] for entry in data) / len(data)
        if mood_trend > 7:
            print("[Mood Analysis] Mood trend is positive! Great job!")
        elif mood_trend < 4:
            print("[Mood Analysis] Mood trend suggests low mood. Consider a self-care plan.")
        else:
            print("[Mood Analysis] Mood trend is stable.")
    except Exception as e:
        print(f"[Mood Analysis Error]: {e}")

# 2. Smart Daily Planning Integration
def generate_daily_plan():
    try:
        if os.path.exists(DAILY_QUESTIONS_PATH):
            with open(DAILY_QUESTIONS_PATH, 'r') as f:
                questions = f.readlines()
            print("[Daily Planning] Here are your planning questions for today:")
            for question in questions:
                print("- " + question.strip())
        else:
            print("[Daily Planning] Daily Questions file not found.")
    except Exception as e:
        print(f"[Daily Planning Error]: {e}")

# 3. Adaptive Focus Timer
def start_focus_timer(minutes=25):
    print(f"[Focus Timer] Focus session started for {minutes} minutes. Stay strong!")
    seconds = minutes * 60
    try:
        while seconds > 0:
            minutes_left = seconds // 60
            seconds_left = seconds % 60
            print(f"Time left: {minutes_left:02}:{seconds_left:02}", end='\r')
            seconds -= 1
            import time
            time.sleep(1)
        print("\n[Focus Timer] Session complete! Well done!")
    except KeyboardInterrupt:
        print("\n[Focus Timer] Session interrupted. No worries, you can try again later.")

# Main Menu
def assistant_menu():
    while True:
        print("\n=== Omega Assistant ===")
        print("1. Analyze Mood Patterns")
        print("2. Generate Smart Daily Plan")
        print("3. Start Adaptive Focus Timer")
        print("4. Exit")

        choice = input("Select an option: ")

        if choice == '1':
            analyze_mood_patterns()
        elif choice == '2':
            generate_daily_plan()
        elif choice == '3':
            try:
                minutes = int(input("Enter focus time in minutes (default 25): ") or 25)
                start_focus_timer(minutes)
            except ValueError:
                print("[Input Error] Please enter a valid number.")
        elif choice == '4':
            print("Goodbye!")
            break
        else:
            print("Invalid choice. Please select again.")

if __name__ == "__main__":
    assistant_menu()
