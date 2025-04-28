# VS Code Setup Guide for Clairapp 🚀

## Quick Setup Steps

### 1. Install Required Extensions
- Open VS Code
- Go to Extensions (Ctrl+Shift+X)
- Search and install:
  - BlackBox AI
  - Node.js Extension Pack
  - Live Server (optional, for testing)

### 2. Configure BlackBox AI
```json
{
    "blackbox.ai.mode": "clairapp",
    "blackbox.ai.suggestions": true,
    "blackbox.ai.autoComplete": true,
    "blackbox.ai.contextLength": "medium"
}
```

### 3. Keyboard Shortcuts
| Action | Windows/Linux | Mac |
|--------|--------------|-----|
| Trigger AI Assistant | Ctrl + Space | Cmd + Space |
| Quick Command | Ctrl + Shift + P | Cmd + Shift + P |
| Open Terminal | Ctrl + ` | Cmd + ` |

### 4. Common Commands
```bash
# Start Clairapp
npm start

# Run tests
npm test

# Check logs
tail -f clairapp_omega_dipps.log
```

## Tips & Tricks 💡

### Better Integration
1. Use the integrated terminal
2. Keep the Problems panel open (Ctrl+Shift+M)
3. Enable auto-save

### Troubleshooting
- If BlackBox AI isn't responding:
  1. Reload VS Code (Ctrl+R)
  2. Check internet connection
  3. Verify API key settings

### Best Practices
- Keep your VS Code updated
- Use workspace settings
- Enable error lens
- Use the integrated Git features

## Visual Guide

```
VS Code Window
┌─────────────────────────────┐
│ Explorer   Problems  Output │
├─────────────────────────────┤
│                             │
│    Your Code Here           │
│                             │
├─────────────────────────────┤
│ BlackBox AI Assistant       │
│ > Ask me anything...        │
└─────────────────────────────┘
```

## Common Issues & Solutions

### Issue 1: BlackBox AI Not Responding
- Solution: Reload VS Code
- Alternative: Check API key

### Issue 2: Slow Performance
- Solution: Clear VS Code cache
- Alternative: Reduce extensions

### Issue 3: Integration Issues
- Solution: Update all components
- Alternative: Check logs

## Next Steps
1. Try some basic commands
2. Explore AI features
3. Customize your settings
4. Join our community

---
*For more detailed information, check our [main documentation](./README.md)*
