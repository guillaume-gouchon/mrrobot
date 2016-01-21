#!/bin/sh

apt-get update

# speech recognition dependencies
apt-get install bison libasound2-dev swig python-dev mplayer

# build sphinxbase
cd ~/
wget http://sourceforge.net/projects/cmusphinx/files/sphinxbase/5prealpha/sphinxbase-5prealpha.tar.gz
tar -zxvf ./sphinxbase-5prealpha.tar.gz
cd ./sphinxbase-5prealpha
./configure --enable-fixed
make clean all
make check
sudo make install

# build pocketsphinx
cd ~/
wget http://sourceforge.net/projects/cmusphinx/files/pocketsphinx/5prealpha/pocketsphinx-5prealpha.tar.gz
tar -zxvf ./pocketsphinx-5prealpha.tar.gz
cd ./pocketsphinx-5prealpha
./configure
make clean all
make check
sudo make install

# get French language for pocketsphinx
cd ~/
wget -O lium_french_f0.tar.gz http://sourceforge.net/projects/cmusphinx/files/Acoustic%20and%20Language%20Models/Archive/French%20F0%20Broadcast%20News%20Acoustic%20Model/lium_french_f0.tar.gz/download
tar -xvzf lium_french_f0.tar.gz
cd lium_french_f0/
sudo mkdir -p `pkg-config --variable=modeldir pocketsphinx`/fr_FR/fr_FR
sudo mv * `pkg-config --variable=modeldir pocketsphinx`/fr_FR/fr_FR

# miscellaneous dependencies
apt-get install xautomation espeak

# install node
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
apt-get install -y nodejs

# install mrrobot
cd ~/mrrobot
npm install

# boot robot at startup
cp start_mr_robot /etc/init.d/
chmod +x /etc/init.d/start_mr_robot
ln -s /etc/init.d/start_mr_robot /etc/rc.d/
reboot
