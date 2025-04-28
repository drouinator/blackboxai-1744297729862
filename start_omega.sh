#!/bin/bash
#
# start_omega.sh - Main wrapper script for OmegaPi5 ecosystem
#
# This script provides a simple interface to manage the OmegaPi5 system
# including backup functionality, monitoring, and quick access to common tasks.
#

# Configuration
OMEGA_DIR="/home/pi/OmegaPi5"
BACKUP_SCRIPT="$OMEGA_DIR/omega_backup.sh"
MONITOR_SCRIPT="$OMEGA_DIR/omega_monitor.sh"

# ANSI color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# Check if we can run as a menu or if arguments are provided
if [ $# -eq 0 ]; then
    # No arguments provided, show menu
    show_menu=true
else
    # Process command line arguments
    case "$1" in
        --backup)
            echo -e "${CYAN}Starting backup process...${NC}"
            $BACKUP_SCRIPT
            exit $?
            ;;
        --monitor)
            $MONITOR_SCRIPT
            exit $?
            ;;
        --help)
            echo -e "${YELLOW}OmegaPi5 Management Script${NC}"
            echo ""
            echo "Usage: ./start_omega.sh [OPTION]"
            echo ""
            echo "Options:"
            echo "  --backup   Run backup immediately"
            echo "  --monitor  Show monitoring dashboard"
            echo "  --help     Show this help"
            echo ""
            echo "If no options are provided, interactive menu will be shown."
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            echo "Use --help for available options"
            exit 1
            ;;
    esac
fi

# Function to display menu
show_menu() {
    clear
    echo -e "${BLUE}┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓${NC}"
    echo -e "${BLUE}┃ ${WHITE}OmegaPi5 Management System${BLUE}                                        ┃${NC}"
    echo -e "${BLUE}┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛${NC}"
    echo ""
    echo -e "${CYAN}1)${NC} Run OmegaPi5 Core System"
    echo -e "${CYAN}2)${NC} Run Backup Now"
    echo -e "${CYAN}3)${NC} Show Monitoring Dashboard"
    echo -e "${CYAN}4)${NC} Git Operations"
    echo -e "${CYAN}5)${NC} AI Server Connection Settings"
    echo -e "${CYAN}6)${NC} System Maintenance"
    echo -e "${CYAN}0)${NC} Exit"
    echo ""
    echo -e "${YELLOW}Enter your choice:${NC} "
}

# Function to handle Git operations
git_operations() {
    clear
    echo -e "${BLUE}┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓${NC}"
    echo -e "${BLUE}┃ ${WHITE}Git Repository Management${BLUE}                                         ┃${NC}"
    echo -e "${BLUE}┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛${NC}"
    echo ""
    echo -e "${CYAN}1)${NC} Show Git Status"
    echo -e "${CYAN}2)${NC} Commit All Changes"
    echo -e "${CYAN}3)${NC} Configure GitHub Remote"
    echo -e "${CYAN}4)${NC} Push to GitHub"
    echo -e "${CYAN}5)${NC} Pull from GitHub"
    echo -e "${CYAN}0)${NC} Back to Main Menu"
    echo ""
    echo -e "${YELLOW}Enter your choice:${NC} "
    
    read -r git_choice
    case $git_choice in
        1)
            cd "$OMEGA_DIR" && git status
            echo -e "\n${YELLOW}Press Enter to continue...${NC}"
            read -r
            git_operations
            ;;
        2)
            cd "$OMEGA_DIR"
            echo -e "${YELLOW}Enter commit message (or press Enter for default):${NC} "
            read -r commit_msg
            if [ -z "$commit_msg" ]; then
                commit_msg="Update OmegaPi5 files"
            fi
            git add .
            git commit -m "$commit_msg"
            echo -e "\n${YELLOW}Press Enter to continue...${NC}"
            read -r
            git_operations
            ;;
        3)
            cd "$OMEGA_DIR"
            echo -e "${YELLOW}Enter GitHub repository URL:${NC} "
            read -r repo_url
            if [ -n "$repo_url" ]; then
                git remote remove origin 2>/dev/null
                git remote add origin "$repo_url"
                echo -e "${GREEN}Remote 'origin' configured to: $repo_url${NC}"
            else
                echo -e "${RED}No URL provided. Operation cancelled.${NC}"
            fi
            echo -e "\n${YELLOW}Press Enter to continue...${NC}"
            read -r
            git_operations
            ;;
        4)
            cd "$OMEGA_DIR"
            echo -e "${CYAN}Pushing to GitHub...${NC}"
            git push -u origin main
            echo -e "\n${YELLOW}Press Enter to continue...${NC}"
            read -r
            git_operations
            ;;
        5)
            cd "$OMEGA_DIR"
            echo -e "${CYAN}Pulling from GitHub...${NC}"
            git pull origin main
            echo -e "\n${YELLOW}Press Enter to continue...${NC}"
            read -r
            git_operations
            ;;
        0)
            return
            ;;
        *)
            echo -e "${RED}Invalid choice!${NC}"
            sleep 1
            git_operations
            ;;
    esac
}

# Function to handle AI Server settings
ai_server_settings() {
    clear
    echo -e "${BLUE}┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓${NC}"
    echo -e "${BLUE}┃ ${WHITE}AI Server Connection Settings${BLUE}                                     ┃${NC}"
    echo -e "${BLUE}┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛${NC}"
    echo ""
    echo -e "${CYAN}1)${NC} Test Connection to AI Server"
    echo -e "${CYAN}2)${NC} Configure AI Server Settings"
    echo -e "${CYAN}3)${NC} Setup SSH Key Authentication"
    echo -e "${CYAN}4)${NC} View Connection Logs"
    echo -e "${CYAN}0)${NC} Back to Main Menu"
    echo ""
    echo -e "${YELLOW}Enter your choice:${NC} "
    
    read -r ai_choice
    case $ai_choice in
        1)
            echo -e "${CYAN}Testing connection to AI Server...${NC}"
            ping -c 3 $(grep AI_SERVER "$BACKUP_SCRIPT" | head -1 | cut -d'"' -f2)
            echo -e "\n${YELLOW}Press Enter to continue...${NC}"
            read -r
            ai_server_settings
            ;;
        2)
            echo -e "${YELLOW}Enter AI Server IP address:${NC} "
            read -r ai_ip
            if [ -n "$ai_ip" ]; then
                sed -i "s/AI_SERVER=\"[^\"]*\"/AI_SERVER=\"$ai_ip\"/" "$BACKUP_SCRIPT"
                sed -i "s/AI_SERVER=\"[^\"]*\"/AI_SERVER=\"$ai_ip\"/" "$MONITOR_SCRIPT"
                echo -e "${GREEN}AI Server IP updated to: $ai_ip${NC}"
            else
                echo -e "${RED}No IP provided. Operation cancelled.${NC}"
            fi
            
            echo -e "${YELLOW}Enter AI Server username:${NC} "
            read -r ai_user
            if [ -n "$ai_user" ]; then
                sed -i "s/AI_SERVER_USER=\"[^\"]*\"/AI_SERVER_USER=\"$ai_user\"/" "$BACKUP_SCRIPT"
                sed -i "s/AI_SERVER_USER=\"[^\"]*\"/AI_SERVER_USER=\"$ai_user\"/" "$MONITOR_SCRIPT"
                echo -e "${GREEN}AI Server username updated to: $ai_user${NC}"
            else
                echo -e "${RED}No username provided. Operation cancelled.${NC}"
            fi
            
            echo -e "\n${YELLOW}Press Enter to continue...${NC}"
            read -r
            ai_server_settings
            ;;
        3)
            echo -e "${CYAN}Setting up SSH key authentication...${NC}"
            ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -N "" -C "pi5@omega.local"
            echo -e "${YELLOW}Enter AI Server IP address:${NC} "
            read -r ssh_ip
            if [ -n "$ssh_ip" ]; then
                echo -e "${YELLOW}Enter AI Server username:${NC} "
                read -r ssh_user
                if [ -n "$ssh_user" ]; then
                    ssh-copy-id "$ssh_user@$ssh_ip"
                    echo -e "${GREEN}SSH key copied to $ssh_user@$ssh_ip${NC}"
                else
                    echo -e "${RED}No username provided. Operation cancelled.${NC}"
                fi
            else
                echo -e "${RED}No IP provided. Operation cancelled.${NC}"
            fi
            echo -e "\n${YELLOW}Press Enter to continue...${NC}"
            read -r
            ai_server_settings
            ;;
        4)
            if [ -f "$OMEGA_DIR/backup_logs/backup.log" ]; then
                less "$OMEGA_DIR/backup_logs/backup.log"
            else
                echo -e "${RED}No log files found.${NC}"
                sleep 2
            fi
            ai_server_settings
            ;;
        0)
            return
            ;;
        *)
            echo -e "${RED}Invalid choice!${NC}"
            sleep 1
            ai_server_settings
            ;;
    esac
}

# Function to handle system maintenance
system_maintenance() {
    clear
    echo -e "${BLUE}┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓${NC}"
    echo -e "${BLUE}┃ ${WHITE}System Maintenance${BLUE}                                                ┃${NC}"
    echo -e "${BLUE}┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛${NC}"
    echo ""
    echo -e "${CYAN}1)${NC} Check Disk Space"
    echo -e "${CYAN}2)${NC} Cleanup Virtual Environments"
    echo -e "${CYAN}3)${NC} View System Logs"
    echo -e "${CYAN}4)${NC} Manage Cron Jobs"
    echo -e "${CYAN}0)${NC} Back to Main Menu"
    echo ""
    echo -e "${YELLOW}Enter your choice:${NC} "
    
    read -r sys_choice
    case $sys_choice in
        1)
            echo -e "${CYAN}Disk Space Usage:${NC}"
            df -h /
            echo -e "\n${CYAN}Project Size:${NC}"
            du -sh "$OMEGA_DIR"/*
            echo -e "\n${YELLOW}Press Enter to continue...${NC}"
            read -r
            system_maintenance
            ;;
        2)
            echo -e "${YELLOW}WARNING: This will clean up Python cache files and temporary files.${NC}"
            echo -e "${YELLOW}Continue? (y/n):${NC} "
            read -r confirm
            if [[ $confirm == [Yy]* ]]; then
                find "$OMEGA_DIR" -name "__pycache__" -type d -exec rm -rf {} +
                find "$OMEGA_DIR" -name "*.pyc" -delete

