#!/bin/bash
clear
figlet -c -f slant "Omega Pi5" | lolcat
echo "--------------------------------------------" | lolcat
neofetch --ascii_colors 5 6 1 2 3 4
echo "--------------------------------------------" | lolcat
echo "Système prêt, focus en cours..." | boxes -d stone | lolcat
sleep 2
htop
