const { scrape } = require('../extractors/scrape')
const moment = require('moment')

const searchPortal = 'https://ava.fidlar.com/txgalveston/avaweb/#!/search'
const startDateSelector = '#StartDate'
const endDateSelector = '#basicCriteria > div > div > div:nth-child(2) > div:nth-child(2) > div > input'
const nameSelector = '#last-name'
const searchButtonSelector = '#topFormButtons > button.btn.btn-custom.pull-right.btnMargin'
const searchResultsLoadedSelector = '#viewWrapper > div > section > div.input-block-level.btnContainer > button.btn.btn-custom.pull-right.btnMargin.ng-scope'
const noResultsFoundSelector = 'body > div.modal.fade.ng-isolate-scope.in > div > div > div > span'

export function search (startDate = new Date(), endDate = undefined, name = '') {
  const startDateFormatted = moment(startDate).format('YYYY-MM-DD')
  const endDateFormatted = endDate === undefined
    ? moment(startDate).add(1, 'days').format('YYYY-MM-DD')
    : moment(endDate).format('YYYY-MM-DD')

  scrape(searchPortal, async (page, browser) => {
    await page.on('console', async msg => {
      console.log('--Console:', msg.text())
      if (msg.text() === '[search]  Subdivisions loaded null') {

        page.waitForNavigation().then(async () => {
          // Move on to the next page
          await page.screenshot({ path: `pass-${Date.now()}.png` })
          page.waitForSelector(searchResultsLoadedSelector).then(() => {
            console.log('found stuff')
          })
        })

        page.waitForSelector(noResultsFoundSelector).then(async () => {
          await page.screenshot({ path: `fail-${Date.now()}.png` })
          console.log('nothing found')
        })

        console.log('waiting for things to be loaded')
        await page.waitForSelector(startDateSelector)

        console.log('evaluate')
        await page.evaluate(async ({ startDateSelector, endDateSelector, nameSelector, searchButtonSelector, startDateFormatted, endDateFormatted, name }) => {
          $(startDateSelector).val(startDateFormatted)
          $(endDateSelector).val(endDateFormatted)
          $(nameSelector).val(name)
          $(searchButtonSelector).click()
        }, { startDateSelector, endDateSelector, nameSelector, searchButtonSelector, startDateFormatted, endDateFormatted, name })
      }
    })

    console.log('waiting...')
    await page.waitForFunction(selector => true === false, startDateSelector)
    // await page.waitForLoadState('networkidle')
  })
}

search('2021-08-21')