#!/bin/bash
#
# omega_backup.sh - Automated backup script for OmegaPi5 project
#
# This script performs an automated backup of the OmegaPi5 directory to the AI Server
# It checks connectivity, ensures SSH keys exist, and logs all operations
# Can be run manually or via cron job (recommended as: 0 2 * * * /home/pi/OmegaPi5/omega_backup.sh)
#

# Configuration variables
SOURCE_DIR="/home/pi/OmegaPi5"
AI_SERVER="192.168.40.26"
AI_SERVER_USER="aiserver"  # Change to match your AI server username
BACKUP_DIR="OmegaAI_Backup"
SSH_KEY_PATH="/home/pi/.ssh/id_rsa"
LOG_FILE="$SOURCE_DIR/backup_logs/backup.log"
LOCK_FILE="/tmp/omega_backup.lock"
NOTIFY_EMAIL=""  # Set this to receive email notifications

# Create log directory if it doesn't exist
mkdir -p "$SOURCE_DIR/backup_logs"

# Log function with timestamps
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Error handling function
handle_error() {
    local error_msg="$1"
    log "ERROR: $error_msg"
    
    # Send notification if email is configured
    if [ -n "$NOTIFY_EMAIL" ] && command -v mail &> /dev/null; then
        echo "OmegaPi5 Backup Error: $error_msg" | mail -s "OmegaPi5 Backup Failed" "$NOTIFY_EMAIL"
    fi
    
    # Display desktop notification if running interactively
    if [ -n "$DISPLAY" ] && command -v notify-send &> /dev/null; then
        notify-send -u critical "OmegaPi5 Backup Error" "$error_msg"
    fi
    
    # Clean up lock file
    rm -f "$LOCK_FILE"
    
    exit 1
}

# Check if backup is already running
if [ -f "$LOCK_FILE" ]; then
    LOCK_PID=$(cat "$LOCK_FILE")
    if ps -p "$LOCK_PID" > /dev/null; then
        handle_error "Another backup process (PID: $LOCK_PID) is already running"
    else
        log "Removing stale lock file"
        rm -f "$LOCK_FILE"
    fi
fi

# Create lock file
echo $$ > "$LOCK_FILE"

# Start backup process
log "Starting OmegaPi5 backup to AI Server ($AI_SERVER)"

# Check if SSH key exists, generate if not
if [ ! -f "$SSH_KEY_PATH" ]; then
    log "SSH key not found. Generating new key pair..."
    mkdir -p "$(dirname "$SSH_KEY_PATH")"
    ssh-keygen -t rsa -b 4096 -f "$SSH_KEY_PATH" -N "" -C "pi5@omega.local" || handle_error "Failed to generate SSH key"
    log "SSH key generated successfully"
    
    log "IMPORTANT: You need to manually copy the SSH public key to the AI server with:"
    log "  ssh-copy-id -i $SSH_KEY_PATH $AI_SERVER_USER@$AI_SERVER"
    log "Or the first backup will prompt for password"
fi

# Check connectivity to AI Server
log "Checking connectivity to AI Server..."
ping -c 1 "$AI_SERVER" > /dev/null 2>&1
if [ $? -ne 0 ]; then
    handle_error "Cannot reach AI Server at $AI_SERVER. Backup aborted."
fi

# Check SSH connectivity
log "Checking SSH connectivity..."
ssh -o BatchMode=yes -o ConnectTimeout=5 "$AI_SERVER_USER@$AI_SERVER" echo "SSH connection successful" > /dev/null 2>&1
SSH_STATUS=$?

if [ $SSH_STATUS -ne 0 ]; then
    log "Warning: SSH connection failed. This may be normal for the first backup."
    log "If this is the first backup, please run: ssh-copy-id -i $SSH_KEY_PATH $AI_SERVER_USER@$AI_SERVER"
fi

# Create backup directory on remote server if it doesn't exist
log "Ensuring backup directory exists on AI Server..."
ssh "$AI_SERVER_USER@$AI_SERVER" "mkdir -p ~/$BACKUP_DIR" || log "Warning: Could not create remote directory. Will attempt backup anyway."

# Perform backup using rsync
log "Starting rsync backup..."
rsync_start_time=$(date +%s)

rsync -avz --delete --stats \
    --exclude ".git/" \
    --exclude "*.tmp" \
    --exclude "backup_logs/" \
    --exclude "venv/" \
    --exclude "nouvel_venv/" \
    --exclude "__pycache__/" \
    --exclude "*.pyc" \
    "$SOURCE_DIR/" "$AI_SERVER_USER@$AI_SERVER:~/$BACKUP_DIR/" 2>&1 | tee -a "$LOG_FILE.rsync"

RSYNC_EXIT_CODE=${PIPESTATUS[0]}
rsync_end_time=$(date +%s)
rsync_duration=$((rsync_end_time - rsync_start_time))

if [ $RSYNC_EXIT_CODE -eq 0 ]; then
    log "Backup completed successfully in $rsync_duration seconds"
    
    # Get size information
    BACKUP_SIZE=$(du -sh "$SOURCE_DIR" | cut -f1)
    log "Backup size: $BACKUP_SIZE"
    
    # Check repository status
    if [ -d "$SOURCE_DIR/.git" ]; then
        cd "$SOURCE_DIR"
        GIT_STATUS=$(git status --porcelain | wc -l)
        if [ "$GIT_STATUS" -gt 0 ]; then
            log "Warning: $GIT_STATUS uncommitted changes in Git repository"
        else
            log "Git repository is clean"
        fi
    fi
else
    handle_error "Rsync backup failed with exit code $RSYNC_EXIT_CODE"
fi

# Clean up lock file
rm -f "$LOCK_FILE"

log "Backup process completed"

# Send success notification if email is configured
if [ -n "$NOTIFY_EMAIL" ] && command -v mail &> /dev/null; then
    echo "OmegaPi5 backup completed successfully. Backup size: $BACKUP_SIZE" | mail -s "OmegaPi5 Backup Successful" "$NOTIFY_EMAIL"
fi

exit 0

