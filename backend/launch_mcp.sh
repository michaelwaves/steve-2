#!/bin/bash

SESSION="mcp_session"
DIR="/home/michaelwaves/repos/a2a/backend/llamaindex"  # <-- change this to your actual directory

# Start a new tmux session in the background
tmux new-session -d -s "$SESSION" -c "$DIR"

# Set colors (optional - improves contrast)
tmux set-option -t "$SESSION" status-style "bg=blue,fg=white"
tmux set-option -t "$SESSION" pane-border-style "fg=white"
tmux set-option -t "$SESSION" pane-active-border-style "fg=brightgreen"

sleep 0.2
# Pane 0: email_mcp.py
tmux send-keys -t "$SESSION":0 'python3 email_mcp.py' C-m

# Split pane horizontally for sanctions_mcp.py
tmux split-window -h -t "$SESSION":0 -c "$DIR"
sleep 0.2
tmux send-keys -t "$SESSION":0.1 'python3 sanctions_mcp.py' C-m

# Split the first pane again for calculator_mcp.py
tmux split-window -h -t "$SESSION":0 -c "$DIR"
sleep 0.2
tmux send-keys -t "$SESSION":0.2 'python3 calculator_mcp.py' C-m

# Resize panes to be evenly spaced
tmux select-layout -t "$SESSION" even-horizontal

# Attach to the session
tmux attach -t "$SESSION"
