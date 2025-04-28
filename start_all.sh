#!/bin/bash
source ~/OmegaPi5/venv/bin/activate
bash ~/OmegaPi5/dashboard.sh &
bash ~/OmegaPi5/launcher.sh &
python ~/OmegaPi5/omega_web.py &
