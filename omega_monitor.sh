#!/bin/bash
#
# omega_monitor.sh - Monitoring dashboard for OmegaPi5 project
#
# This script displays the status of OmegaPi5 backups, system health,
# and connection to the AI Server in a clean dashboard format.
#

# Configuration variables
SOURCE_DIR="/home/pi/OmegaPi5"
AI_SERVER="192.168.40.26"
AI_SERVER_USER="aiserver"
BACKUP_LOG="$SOURCE_DIR/backup_logs/backup.log"
BACKUP_DIR="OmegaAI_Backup"

# ANSI color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Function for section headers
print_header() {
    echo -e "\n${BOLD}${BLUE}┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓${NC}"
    echo -e "${BOLD}${BLUE}┃ ${WHITE}$1${BLUE} ${NC}"
    echo -e "${BOLD}${BLUE}┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛${NC}"
}

# Function for section items
print_item() {
    local label="$1"
    local value="$2"
    local color="$NC"
    
    if [ -n "$3" ]; then
        color="$3"
    fi
    
    printf "${BOLD}${CYAN}┃ %-20s${NC} : ${color}%s${NC}\n" "$label" "$value"
}

# Function for status indicators
print_status() {
    local status="$1"
    local success_msg="$2"
    local failure_msg="$3"
    
    if [ "$status" -eq 0 ]; then
        echo -e "${GREEN}${success_msg:-OK}${NC}"
    else
        echo -e "${RED}${failure_msg:-FAILED}${NC}"
    fi
}

# Clear screen and show title
clear
echo -e "${BOLD}${WHITE}"
echo "    ____                            ____ ___ _____      __  __             _ __            "
echo "   / __ \____ ___  ___  ____ _____ / __ \<  // ___/___ /  |/  /___  ____  (_) /_____  _____"
echo "  / / / / __ \`__ \/ _ \/ __ \`/ __ / /_/ // // __ \__ \/ /|_/ / __ \/ __ \/ / __/ __ \/ ___/"
echo " / /_/ / / / / / /  __/ /_/ / /_/ / ____// / /_/ / _ / /  / / /_/ / / / / / /_/ /_/ / /    "
echo " \____/_/ /_/ /_/\___/\__, /\____/_/    /_/\____/___/_/  /_/\____/_/ /_/_/\__/\____/_/     "
echo "                     /____/                                                                "
echo -e "${NC}"
echo -e "${CYAN}$(date '+%Y-%m-%d %H:%M:%S')${NC} - Dashboard Refresh"
echo -e "${YELLOW}System: $(uname -a | cut -d ' ' -f 1-3,11-13)${NC}"

# System health section
print_header "SYSTEM HEALTH"

# CPU usage
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print 100 - $1"%"}')
print_item "CPU Usage" "$CPU_USAGE" "$(if (( $(echo "$CPU_USAGE" | cut -d'.' -f1 | cut -d'%' -f1) > 80 )); then echo $RED; else echo $GREEN; fi)"

# Memory usage
MEM_INFO=$(free -m | grep Mem)
MEM_TOTAL=$(echo "$MEM_INFO" | awk '{print $2}')
MEM_USED=$(echo "$MEM_INFO" | awk '{print $3}')
MEM_PERCENT=$((MEM_USED * 100 / MEM_TOTAL))
print_item "Memory Usage" "${MEM_USED}MB / ${MEM_TOTAL}MB (${MEM_PERCENT}%)" "$(if (( $MEM_PERCENT > 80 )); then echo $RED; else echo $GREEN; fi)"

# Disk usage
DISK_USAGE=$(df -h / | grep / | awk '{print $5 " (" $3 " / " $2 ")"}')
DISK_PERCENT=$(echo "$DISK_USAGE" | cut -d'%' -f1)
print_item "Disk Usage" "$DISK_USAGE" "$(if (( $DISK_PERCENT > 80 )); then echo $RED; else echo $GREEN; fi)"

# Project disk usage
PROJECT_SIZE=$(du -sh "$SOURCE_DIR" | cut -f1)
print_item "Project Size" "$PROJECT_SIZE"

# Uptime
UPTIME=$(uptime -p)
print_item "System Uptime" "$UPTIME"

# Connectivity section
print_header "CONNECTIVITY STATUS"

# Ping AI Server
ping -c 1 -W 2 "$AI_SERVER" > /dev/null 2>&1
AI_SERVER_PING=$?
AI_SERVER_PING_MS=$(ping -c 1 -W 2 "$AI_SERVER" 2>/dev/null | grep "time=" | cut -d "=" -f 4)
PING_STATUS="$(print_status $AI_SERVER_PING "ONLINE (${AI_SERVER_PING_MS:-N/A})" "OFFLINE")"
print_item "AI Server Ping" "$PING_STATUS"

# SSH connectivity
if [ $AI_SERVER_PING -eq 0 ]; then
    ssh -o BatchMode=yes -o ConnectTimeout=2 "$AI_SERVER_USER@$AI_SERVER" echo "OK" > /dev/null 2>&1
    SSH_AVAILABLE=$?
    SSH_STATUS="$(print_status $SSH_AVAILABLE "CONNECTED" "AUTHENTICATION FAILED")"
else
    SSH_AVAILABLE=1
    SSH_STATUS="${RED}NOT AVAILABLE${NC}"
fi
print_item "SSH Connection" "$SSH_STATUS"

# Internet connectivity
ping -c 1 -W 2 google.com > /dev/null 2>&1
INTERNET=$?
INTERNET_STATUS="$(print_status $INTERNET "CONNECTED" "DISCONNECTED")"
print_item "Internet" "$INTERNET_STATUS"

# Backup status section
print_header "BACKUP STATUS"

# Last backup info
if [ -f "$BACKUP_LOG" ]; then
    LAST_BACKUP=$(grep "Backup completed successfully" "$BACKUP_LOG" | tail -1)
    if [ -n "$LAST_BACKUP" ]; then
        LAST_BACKUP_TIME=$(echo "$LAST_BACKUP" | grep -o "\[[^]]*\]" | tr -d '[]')
        LAST_BACKUP_SIZE=$(grep "Backup size:" "$BACKUP_LOG" | tail -1 | awk '{print $NF}')
        print_item "Last Successful" "$LAST_BACKUP_TIME" "$GREEN"
        print_item "Last Backup Size" "$LAST_BACKUP_SIZE"
        
        # Calculate time since last backup
        LAST_TIMESTAMP=$(date -d "$LAST_BACKUP_TIME" +%s 2>/dev/null)
        CURRENT_TIMESTAMP=$(date +%s)
        
        if [ -n "$LAST_TIMESTAMP" ]; then
            SECONDS_DIFF=$((CURRENT_TIMESTAMP - LAST_TIMESTAMP))
            DAYS=$((SECONDS_DIFF / 86400))
            HOURS=$(( (SECONDS_DIFF % 86400) / 3600 ))
            MINUTES=$(( (SECONDS_DIFF % 3600) / 60 ))
            
            TIME_SINCE="${DAYS}d ${HOURS}h ${MINUTES}m"
            
            if [ $DAYS -gt 1 ]; then
                print_item "Time Since Backup" "$TIME_SINCE" "$YELLOW"
            else
                print_item "Time Since Backup" "$TIME_SINCE" "$GREEN"
            fi
        fi
    else
        print_item "Last Successful" "Never" "$RED"
    fi
    
    # Last backup error, if any
    LAST_ERROR=$(grep "ERROR:" "$BACKUP_LOG" | tail -1)
    if [ -n "$LAST_ERROR" ]; then
        ERROR_TIME=$(echo "$LAST_ERROR" | grep -o "\[[^]]*\]" | tr -d '[]')
        ERROR_MSG=$(echo "$LAST_ERROR" | sed 's/.*ERROR: //')
        print_item "Last Error" "$ERROR_TIME: $ERROR_MSG" "$RED"
    fi
else
    print_item "Backup Status" "No backups performed yet" "$YELLOW"
fi

# Next scheduled backup
NEXT_BACKUP=$(crontab -l 2>/dev/null | grep "omega_backup.sh" | awk '{print $1, $2, $3, $4, $5}')
if [ -n "$NEXT_BACKUP" ]; then
    # Parse cron schedule
    MIN=$(echo "$NEXT_BACKUP" | awk '{print $1}')
    HOUR=$(echo "$NEXT_BACKUP" | awk '{print $2}')
    DOM=$(echo "$NEXT_BACKUP" | awk '{print $3}')
    MONTH=$(echo "$NEXT_BACKUP" | awk '{print $4}')
    DOW=$(echo "$NEXT_BACKUP" | awk '{print $5}')
    
    SCHEDULE="$HOUR:$MIN"
    if [ "$DOM" != "*" ] || [ "$MONTH" != "*" ] || [ "$DOW" != "*" ]; then
        SCHEDULE="$SCHEDULE (custom schedule)"
    fi
    
    print_item "Next Scheduled" "$SCHEDULE"
fi

# Git repository section
print_header "GIT REPOSITORY STATUS"

if [ -d "$SOURCE_DIR/.git" ]; then
    cd "$SOURCE_DIR"
    
    # Current branch
    CURRENT_BRANCH=$(git branch --show-current 2>/dev/null)
    print_item "Current Branch" "$CURRENT_BRANCH"
    
    # Uncommitted changes
    UNCOMMITTED=$(git status --porcelain | wc -l)
    UNCOMMITTED_STATUS="$UNCOMMITTED files"
    if [ "$UNCOMMITTED" -eq 0 ]; then
        UNCOMMITTED_STATUS="${GREEN}None (clean)${NC}"
    else
        UNCOMMITTED_STATUS="${YELLOW}$UNCOMMITTED files${NC}"
    fi
    print_item "Uncommitted Changes" "$UNCOMMITTED_STATUS"
    
    # Last commit
    LAST_COMMIT=$(git log -1 --format="%cd (%h): %s" --date=format:'%Y-%m-%d %H:%M:%S' 2>/dev/null)
    if [ -n "$LAST_COMMIT" ]; then
        print_item "Last Commit" "$LAST_COMMIT"
    else
        print_item "Last Commit" "No commits yet" "$YELLOW"
    fi
    
    # Remote status
    REMOTE_URL=$(git remote get-url origin 2>/dev/null)
    if [ -n "$REMOTE_URL" ]; then
        print_item "Remote Repository" "$REMOTE_URL"
        
        # Check if we need to push
        NEEDS_PUSH=$(git log origin/main..HEAD 2>/dev/null | wc -l)
        if [ "$NEEDS_PUSH" -gt 0 ]; then
            print_item "Push Status" "${YELLOW}$NEEDS_PUSH commits need to be pushed${NC}"
        else
            print_item "Push Status" "${GREEN}Up to date${NC}"
        fi
    else
        print_item "Remote Repository" "Not configured" "$YELLOW"
    fi
else
    print_item "Git Status" "Not a Git repository" "$RED"
fi

# Data management section
print_header "DATA MANAGEMENT"

# Count files by type
print_item "Python Files" "$(find "$SOURCE_DIR" -name "*.py" | wc -l) files"
print_item "Shell Scripts" "$(find "$SOURCE_DIR" -name "*.sh" | wc -l) files"
print_item "Markdown Files" "$(find "$SOURCE_DIR" -name "*.md" | wc -l) files"

# Virtual environments
if [ -d "$SOURCE_DIR/venv" ]; then
    VENV_SIZE=$(du -sh "$SOURCE_DIR/venv" | cut -f1)
    print_item "venv Size" "$VENV_SIZE"
fi

if [ -d "$SOURCE_DIR/nouvel_venv" ]; then
    NOUVEL_VENV_SIZE=$(du -sh "$SOURCE_DIR/nouvel_venv" | cut -f1)
    print_item "nouvel_venv Size" "$NOUVEL_VENV_SIZE"
fi

# Backup recommendations
echo -e "\n${BOLD}${CYAN}┃ RECOMMENDATIONS${NC}"

if [ ! -f "$BACKUP_LOG" ] || [ "$(grep "Backup completed successfully" "$BACKUP_LOG" | wc -l)" -eq 0 ]; then
    echo -e "${BOLD}${CYAN}┃${NC} ${YELLOW}• Run initial backup: ${WHITE}./omega_backup.sh${NC}"
fi

if [ -d "$SOURCE_DIR/.git" ] && [ -z "$(git remote get-url origin 2>/dev/null)" ]; then
    echo -e "${BOLD}${CYAN}┃${NC} ${YELLOW}• Configure Git remote: ${WHITE}git remote add origin <your-repo-url>${NC}"
fi

if [ $AI_SERVER_PING -ne 0 ]; then
    echo -e "${BOLD}${CYAN}┃${NC} ${YELLOW}• AI Server offline: ${WHITE}Check network connectivity${NC}"
elif [ $SSH_AVAILABLE -ne 0 ]; then
    echo -e "${BOLD}${CYAN}┃${NC} ${YELLOW}• SSH not authenticated: ${WHITE}Run ssh-copy-id $AI_SERVER_USER@$AI_SERVER${NC}"
fi

if [ -d "$SOURCE_DIR/.git" ] && [ "$UNCOMMITTED" -gt 0 ]; then
    echo -e "${BOLD}${CYAN}┃${NC} ${YELLOW}• Uncommitted changes: ${WHITE}git add . && git commit -m \"Update\"${NC}"
fi

echo -e "${BOLD}

