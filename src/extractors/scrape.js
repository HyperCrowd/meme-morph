const playwright = require('playwright')

const scrapeBrowers = process.env.SCRAPE_BROWSERS || 'webkit'
const browserTypes = scrapeBrowers.split(',')

export async function scrape (url, onLoad) {
  for (const browserType of browserTypes) {
    try {
      const browser = await playwright[browserType].launch()
      const context = await browser.newContext()
      const page = await context.newPage()
      await page.goto(url)
      await onLoad(page, browser)
      await browser.close()
    } catch (e) {
      console.error(e)
    }
  }
}
