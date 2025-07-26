#!/bin/bash

SESSION="mcp_session"

if tmux has-session -t "$SESSION" 2>/dev/null; then
  echo "Killing tmux session: $SESSION"
  tmux kill-session -t "$SESSION"
else
  echo "No tmux session named '$SESSION' found."
fi
