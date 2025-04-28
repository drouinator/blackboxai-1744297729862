#!/bin/bash
echo "$(date) : Etat -> $(cat /proc/loadavg)" >> ~/OmegaPi5/TDAH_Manager/DailyMood/mood_$(date +%Y-%m-%d).log
