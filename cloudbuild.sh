#!/bin/sh

# terraform
curl -fsSL https://apt.releases.hashicorp.com/gpg | gpg --dearmor > /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" > /etc/apt/sources.list.d/hashicorp.list
apt-get -y update
apt-get -y install terraform

# node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash
apt-get -y install nodejs

npm install --global cdktf-cli@latest
npm install
cdktf deploy --auto-approve
