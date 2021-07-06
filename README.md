# MemeMorph

Meme Morph tracks the evolution of memes

## Installation

```bash
git clone git@github.com:HyperCrowd/meme-morph.git
cd meme-morph
yarn install
cp .env.sample .env
open https://newsapi.org/register
echo "Please place a NewsAPI key in the entry for NEWSAPI_KEY in the .env file
```

# Developer Environment Setup

* [Download and install VSCode](https://code.visualstudio.com/download)
* For Windows users, [prepare your machine to deal with WSLs](https://www.windowscentral.com/install-windows-subsystem-linux-windows-10).
* For OSX users, [install Brew](https://brew.sh/): `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
* Open VSCode, open a terminal, and do the following:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get autoremove
sudo apt-get autoclean
sudo apt install python3 python3-pip
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
source ~/.bashrc
sudo chown -R $(whoami) "$NVM_DIR"
nvm install stable
sudo chown -R $(whoami) ~/.npm
nvm install-latest-npm
npm install --global yarn
yarn global add typescript
yarn global add eslint
sudo apt-get install silversearcher-ag
mkdir ~/.ssh
touch ~/.ssh/config
sudo chmod 0600 ~/.ssh/config
mkdir ~/projects
```
* Install the following extensions for VSCode:

```text
aaron-bond.better-comments
coenraads.bracket-pair-colorizer-2
msjsdiag.debugger-for-chrome
mikestead.dotenv
file-icons.file-icons
jmsv.javascriptsnippetsstandard
capaj.vscode-standardjs-snippets
pkief.material-icon-theme
wayou.vscode-todo-highlight
dbaeumer.vscode-eslint
graphql.vscode-graphql
ritwickdey.liveserver
prisma.prisma
```

## Usage

### News Search

* Fetch news about COVID and output it as text to the console:
 * `./cli news covid`
* Fetch news about cell phones and send the output to a CSV file:
 * `./cli news "cell phones" -o csv > cellPhones.csv`
* Fetch news about Jeff Bezos and send the output to a JSON file:
 * `./cli news "jeff bezos" -o json > bezos.json`

### GeoIP

* Fetch geolocation information about an IP and output it as text to the console:
 * `./cli geoip 111.36.178.185`
* Fetch geolocation information about an IP and send the output to a CSV file:
 * `./cli geoip 111.36.178.185 -o csv > geoip.csv`
* Fetch geolocation information about an IP and send the output to a JSON file:
 * `./cli geoip 111.36.178.185 -o json > geoip.json`