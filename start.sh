#!/bin/bash
git pull;
node mrrobot.js & google-chrome --fullscreen http://localhost:3000;
xdotool key F11 # hit full screen