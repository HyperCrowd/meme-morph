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

## Usage

### News Search

* Fetch news about COVID and output it as text to the console:
 * `./cli news covid`
* Fetch news about cell phones and send the output to a CSV file:
 * `./cli news "cell phones" -o csv > cellPhones.csv`
* Fetch news about Jeff Bezos and send the output to a JSON file:
 * `./cli news "jeff bezos" -o json > bezos.json`
