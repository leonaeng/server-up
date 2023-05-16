#!/bin/bash

apt update -y && apt upgrade -y
apt install -y apache2
ufw disable

apt install -y software-properties-common
apt install -y unzip
add-apt-repository ppa:ondrej/php
apt-get update -y
apt -y install php7.4

cd /home
wget https://github.com/leonaeng/server-up/archive/refs/heads/main.zip
unzip main.zip -d /home/offers
mv /home/offers/server-main/link.sh /var/link.sh

apt install -y php7.4-cli php7.4-json php7.4-common php7.4-mysql php7.4-zip php7.4-gd php7.4-mbstring php7.4-curl php7.4-xml php7.4-bcmath
snap install core; sudo snap refresh core
snap install --classic certbot
ln -s /snap/bin/certbot /usr/bin/certbot
certbot --apache

echo -e "\e[1;33mAll software installed. Thanks for using.\e[0m"