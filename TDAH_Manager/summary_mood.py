from datetime import datetime
import os

today = datetime.now().strftime("%Y-%m-%d")
summary_file = f"/home/pi/OmegaPi5/TDAH_Manager/DailyMood/{today}.log"

if os.path.exists(summary_file):
    with open(summary_file, "r") as f:
        entries = f.readlines()
    
    if entries:
        avg_fatigue = avg_concentration = avg_irritability = 0
        total = len(entries)
        for entry in entries:
            parts = entry.split("|")
            fatigue = int(parts[1].split(":")[1].strip())
            concentration = int(parts[2].split(":")[1].strip())
            irritability = int(parts[3].split(":")[1].strip())
            avg_fatigue += fatigue
            avg_concentration += concentration
            avg_irritability += irritability

        avg_fatigue //= total
        avg_concentration //= total
        avg_irritability //= total

        print(f"Résumé de ta journée {today}:")
        print(f"Fatigue Moyenne: {avg_fatigue}/10")
        print(f"Concentration Moyenne: {avg_concentration}/10")
        print(f"Irritabilité Moyenne: {avg_irritability}/10")
    else:
        print("Pas d'entrée aujourd'hui.")
else:
    print("Aucune donnée pour aujourd'hui.")
