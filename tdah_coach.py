import time

objectifs = [
    "Respirer 3 fois profondément",
    "Faire ton focus principal 10 minutes",
    "Sourire et ressentir ta réussite future",
    "Faire 10 pushups rapides",
    "Boire de l'eau"
]

while True:
    for objectif in objectifs:
        print(f"\n➡️ Rappel TDAH : {objectif}")
        time.sleep(600)  # 10 minutes
