import pyttsx3
import speech_recognition as sr
import openai
import os

openai.api_key = "TA_CLE_API_OPENAI"  # <-- Mets ta clé ici

engine = pyttsx3.init()
recognizer = sr.Recognizer()

def parler(text):
    engine.say(text)
    engine.runAndWait()

def ecouter():
    with sr.Microphone() as source:
        print("🎤 Écoute...")
        audio = recognizer.listen(source)
        try:
            return recognizer.recognize_google(audio, language='fr-FR')
        except sr.UnknownValueError:
            return "Je n'ai pas compris."

def demander_openai(prompt):
    reponse = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    return reponse['choices'][0]['message']['content']

def main():
    parler("Salut ! Je suis ton coach Omega. Pose-moi une question !")
    while True:
        question = ecouter()
        print(f"🧠 Question captée : {question}")
        if question.lower() in ["quitte", "exit", "stop"]:
            parler("À bientôt !")
            break
        reponse = demander_openai(question)
        print(f"🧠 Réponse Omega : {reponse}")
        parler(reponse)

if __name__ == "__main__":
    main()
