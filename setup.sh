#!/bin/sh

apt-get update

# speech recognition dependencies
apt-get install bison libasound2-dev swig python-dev mplayer

# build sphinxbase
# cd ~/
# wget http://sourceforge.net/projects/cmusphinx/files/sphinxbase/5prealpha/sphinxbase-5prealpha.tar.gz
# tar -zxvf ./sphinxbase-5prealpha.tar.gz
# cd ./sphinxbase-5prealpha
# ./configure --enable-fixed
# make clean all
# make check
# sudo make install

# # build pocketsphinx
# cd ~/
# wget http://sourceforge.net/projects/cmusphinx/files/pocketsphinx/5prealpha/pocketsphinx-5prealpha.tar.gz
# tar -zxvf ./pocketsphinx-5prealpha.tar.gz
# cd ./pocketsphinx-5prealpha
# ./configure
# make clean all
# make check
# sudo make install

# miscellaneous dependencies
apt-get install xautomation espeak iceweasel

# install node
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
apt-get install -y nodejs
curl -sLS https://apt.adafruit.com/add | sudo bash
apt-get install node

# install mrrobot
cd ~/mrrobot
npm install
