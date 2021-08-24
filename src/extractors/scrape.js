const playwright = require('playwright')
const { webkit } = require('playwright')

const scrapeBrowers = process.env.SCRAPE_BROWSERS || 'webkit'
const browserTypes = scrapeBrowers.split(',')
const headless = process.env.SCRAPE_HEADLESS === undefined
  ? true
  : process.env.SCRAPE_HEADLESS === '1'

export async function scrape (url, onLoad) {
  for (const browserType of browserTypes) {
    try {
      const browser = await playwright[browserType].launch({ headless })
      const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        viewport: {
          width: 1920,
          height: 1200
        }
      })
      const page = await context.newPage()
      page.setExtraHTTPHeaders({
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "max-age=0",
        "if-modified-since": "Thu, 15 Apr 2021 13:21:33 GMT",
        "if-none-match": "\"56836141fa31d71:0\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "sec-gpc": "1",
        "upgrade-insecure-requests": "1"
      })
      await page.goto(url)
      const results = await onLoad(page, browser)
      await browser.close()
      return results
    } catch (e) {
      console.error(e)
    }
  }
}
