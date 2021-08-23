const { scrape } = require('../extractors/scrape')
const moment = require('moment')

const searchPortal = 'https://ava.fidlar.com/txgalveston/avaweb/#!/search'
const searchResultsPortal = 'https://ava.fidlar.com/txgalveston/avaweb/#!/searchResults'
const startDateSelector = '#StartDate'
const endDateSelector = '#basicCriteria > div > div > div:nth-child(2) > div:nth-child(2) > div > input'
const nameSelector = '#last-name'
const searchButtonSelector = '#topFormButtons > button.btn.btn-custom.pull-right.btnMargin'
const searchResultsLoadedSelector = '//*[@id="viewWrapper"]/div/section/div[1]/button[2]'
const noResultsFoundSelector = '/html/body/div[3]/div/div/div/div/label'

export function search (startDate = new Date(), endDate = undefined, name = '') {
  const startDateFormatted = moment(startDate).format('YYYY-MM-DD')
  const endDateFormatted = endDate === undefined
    ? moment(startDate).add(1, 'days').format('YYYY-MM-DD')
    : moment(endDate).format('YYYY-MM-DD')

  scrape(searchPortal, async (page, browser) => {
    await page.on('crash', async msg => console.error(msg))
    await page.on('console', async msg => {
      console.log(msg.text())
      if (msg.text() === '[search]  Subdivisions loaded null') {
        console.log('evaluate')
        await page.evaluate(async ({ startDateSelector, endDateSelector, nameSelector, searchButtonSelector, startDateFormatted, endDateFormatted, name }) => {
          $(startDateSelector).val(startDateFormatted)
          $(endDateSelector).val(endDateFormatted)
          $(nameSelector).val(name)
          $(searchButtonSelector).click()
        }, { startDateSelector, endDateSelector, nameSelector, searchButtonSelector, startDateFormatted, endDateFormatted, name })
        
        await page.waitForNavigation()

        await page.evaluate(async () => {

        })
        console.log('screenshot')

        await page.screenshot({ path: `example-${Date.now()}.png` })
      }     
    })

    await page.waitForElementState(searchButtonSelector, {
      state: 'visible'
    })
  })
}

search('2021-08-21')