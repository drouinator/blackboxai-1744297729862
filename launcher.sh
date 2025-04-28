#!/bin/bash
clear
figlet "Omega Launcher" | lolcat
echo "Que veux-tu faire ?"
echo "1) Lancer Warp AI"
echo "2) Lancer TDAH Coach"
echo "3) Lancer Foil Coach"
echo "4) Lancer Dashboard Système"
echo "5) Quitter"
read -p "Ton choix: " choix

case $choix in
  1)
    cd ~/WarpAgent
    npm run start
    ;;
  2)
    cd ~/OmegaPi5/assistants
    source ../venv/bin/activate
    python tdah_coach.py
    ;;
  3)
    cd ~/OmegaPi5/assistants
    source ../venv/bin/activate
    python foil_coach.py
    ;;
  4)
    bash ~/OmegaPi5/dashboard.sh
    ;;
  5)
    exit 0
    ;;
  *)
    echo "Choix invalide."
    ;;
esac
