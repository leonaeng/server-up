#!/bin/bash

Help()
{
   # Display Help
   available_offers=$(ls -m /home/offers/server-main)
   echo -e "Run script with -o offer_name flag and enter an offer name."
   echo -e "Available offer names: \e[1;33m$available_offers\e[0m"
   echo -e "Usage example: link.sh -o ps"
   echo
   echo -e "Script create domain and subdomain automaticaly"
   echo 
   echo -e "When nano open index.php file - insert PHP code from cloacking service, then save file."
   echo -e "On the last steps enter profile and offer name to get link with utm"
   echo
   echo -e "You can get PHP code from cloacking service"
   echo
}
LinkCreator()
{
	echo -e "\e[1;33mSelected offer: '$offer'\e[0m"
	subdomain=$(tr -dc a-z </dev/urandom | head -c 10; echo)
	echo $subdomain
	domain='fregn.com'
	echo $domain
	certbot certonly --apache -n -d $subdomain.$domain
	echo "<IfModule mod_ssl.c>
	<VirtualHost *:443>
		ServerAdmin webmaster@localhost
		DocumentRoot /var/www/$subdomain

		ErrorLog ${APACHE_LOG_DIR}/error.log
		CustomLog ${APACHE_LOG_DIR}/access.log combined

		ServerName $subdomain.$domain

		Include /etc/letsencrypt/options-ssl-apache.conf
		SSLCertificateFile /etc/letsencrypt/live/$subdomain.$domain/fullchain.pem
		SSLCertificateKeyFile /etc/letsencrypt/live/$subdomain.$domain/privkey.pem
	</VirtualHost>
</IfModule>" | tee -a /etc/apache2/sites-available/000-default-le-ssl.conf
	echo "<VirtualHost *:80>
	ServerAdmin webmaster@localhost
	DocumentRoot /var/www/$subdomain

	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined

	ServerName $subdomain.$domain
	RewriteEngine on
	RewriteCond %{SERVER_NAME} =universitysimulator.com
	RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
</VirtualHost>" | tee -a /etc/apache2/sites-available/000-default.conf
	cp -r /home/offers/server-main/$offer /var/www/$subdomain
	certbot certonly --force-renew --apache -n -d $subdomain.$domain
	echo "# Link for cloaking: $subdomain.$domain" | tee -a /var/www/$subdomain/index.php
	nano /var/www/$subdomain/index.php
	echo -ne '100%\r'
	echo -n "Enter profile name: "
	read profilename
	printf '%s\n' "Your link: https://$subdomain.$domain/?utm_source=$profilename&utm_medium=$offer&utm_term={keyword}"
}

if [ "$*" == "" ]; then
    >&2 echo "No arguments founded. Run script with -h flag for help"
    exit 1
fi


while getopts ":ho:" option; do
   case $option in
      h) # display Help
        Help
        exit;;
	  o) # Offer select
        offer=${OPTARG}
		LinkCreator
		exit;;
     \?) # Invalid option
         echo "Error: Invalid option"
         exit;;
   esac
done

