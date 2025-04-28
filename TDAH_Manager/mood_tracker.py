from datetime import datetime

def demander_roulette(nom, min_val=1, max_val=10):
    while True:
        try:
            val = int(input(f"{nom} ({min_val}-{max_val}) : "))
            if min_val <= val <= max_val:
                return val
            else:
                print(f"⚠️ Doit être entre {min_val} et {max_val}")
        except ValueError:
            print("⚠️ Entrée invalide, entre un chiffre.")

def main():
    print("\n🎯 Enregistre ton état actuel :")

    fatigue = demander_roulette("Fatigue")
    concentration = demander_roulette("Concentration")
    irritabilite = demander_roulette("Irritabilité")
    commentaire = input("📝 Commentaire libre : ")

    now = datetime.now()
    date_str = now.strftime("%Y-%m-%d")
    time_str = now.strftime("%H:%M:%S")

    fichier = f"/home/pi/OmegaPi5/TDAH_Manager/DailyMood/{date_str}.log"
    with open(fichier, "a") as f:
        f.write(f"{time_str} | Fatigue: {fatigue} | Concentration: {concentration} | Irritabilité: {irritabilite} | Commentaire: {commentaire}\n")
    
    print("\n✅ État enregistré avec succès !")

if __name__ == "__main__":
    main()
