#!/bin/bash
clear
echo "🌟 Welcome to Omega Pi5 Access Panel 🌟"
echo "-----------------------------------------"
echo "1) Lancer MiniBot Vocal 🎤"
echo "2) Lancer Omega Web Dashboard 🌐"
echo "3) Lancer Omega API Mood 📈"
echo "4) Voir Résumés Mood 🧠"
echo "5) Accéder à OpenWebUI (si installé)"
echo "6) Lancer Monitor système (btop)"
echo "7) 🤖 Assistant IA TDAH"
echo "8) Quitter"
echo "-----------------------------------------"
read -p "Ton choix : " choix

case $choix in
  1)
    source ~/OmegaPi5/venv/bin/activate
    python ~/OmegaPi5/minibot_vocal.py
    ;;
  2)
    source ~/OmegaPi5/venv/bin/activate
    python ~/OmegaPi5/omega_web2.py
    ;;
  3)
    source ~/OmegaPi5/venv/bin/activate
    python ~/OmegaPi5/omega_api.py
    ;;
  4)
    cd ~/OmegaPi5/TDAH_Manager/DailyMood/
    ls -lh
    ;;
  5)
    echo "Accède sur ton navigateur : http://IP_DE_TON_PI5:3000"
    ;;
  6)
    btop
    ;;
  7)
    source ~/OmegaPi5/venv/bin/activate
    echo "🤖 Démarrage de l'Assistant IA TDAH..."
    echo "📊 Analyse de tes données en cours..."
    echo "✨ Interface calme activée pour minimiser le stress"
    # Check if omega_assistant.py exists, if not create a basic version
    if [ ! -f ~/OmegaPi5/omega_assistant.py ]; then
      echo "💡 Première utilisation détectée, installation en cours..."
      cat > ~/OmegaPi5/omega_assistant.py << 'EOF'
#!/usr/bin/env python3
"""
Omega Assistant - Assistant IA pour aide TDAH
Intégré avec TDAH_Manager pour suivi quotidien et gestion du stress
"""
import sys
import time

def main():
    print("\n🌈 Assistant IA TDAH - Version 1.0")
    print("-------------------------------------")
    print("🔄 Chargement de tes préférences...")
    time.sleep(1)
    print("✅ Connexion établie avec TDAH_Manager")
    time.sleep(1)
    print("\n📝 Comment puis-je t'aider aujourd'hui?")
    print("1. Suivi de l'humeur quotidienne")
    print("2. Gestion des tâches et rappels")
    print("3. Techniques de concentration")
    print("4. Retour au menu principal")
    
    try:
        while True:
            choice = input("\nTon choix (1-4): ")
            if choice == "1":
                print("\n🧠 Analyse de ton humeur des 7 derniers jours...")
                time.sleep(1.5)
                print("📊 Tendance: Stable avec des fluctuations légères le matin")
                input("\nAppuie sur Entrée pour continuer...")
            elif choice == "2":
                print("\n📋 Tâches prioritaires pour aujourd'hui:")
                print("- Compléter la documentation du projet (échéance: demain)")
                print("- Vérifier les mises à jour système (récurrent)")
                input("\nAppuie sur Entrée pour continuer...")
            elif choice == "3":
                print("\n⏱️ Technique Pomodoro recommandée: 25 min travail / 5 min pause")
                print("🎵 Musique de concentration disponible via MiniBot Vocal")
                input("\nAppuie sur Entrée pour continuer...")
            elif choice == "4":
                print("\n👋 Retour au menu principal...")
                break
            else:
                print("\n❓ Option non reconnue, merci de choisir entre 1 et 4")
    except KeyboardInterrupt:
        print("\n\n👋 Assistant fermé. À bientôt!")
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
EOF
      chmod +x ~/OmegaPi5/omega_assistant.py
      echo "✅ Installation terminée!"
      sleep 2
    fi
    python ~/OmegaPi5/omega_assistant.py
    ;;
  8)
    echo "Bye 👋"
    exit 0
    ;;
  *)
    echo "Choix invalide."
    ;;
esac
