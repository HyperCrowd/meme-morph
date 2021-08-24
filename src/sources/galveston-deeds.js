const { scrape } = require('../extractors/scrape')
const moment = require('moment')

const searchPortal = 'https://ava.fidlar.com/txgalveston/avaweb/#!/search'
const startDateSelector = '#StartDate'
const endDateSelector = '#basicCriteria > div > div > div:nth-child(2) > div:nth-child(2) > div > input'
const nameSelector = '#last-name'
const searchButtonSelector = '#topFormButtons > button.btn.btn-custom.pull-right.btnMargin'
const searchResultsLoadedSelector = '#viewWrapper > div > section > div.input-block-level.btnContainer > button.btn.btn-custom.pull-right.btnMargin.ng-scope'
const noResultsFoundSelector = 'body > div.modal.fade.ng-isolate-scope.in > div > div > div > span'
const textSelector = 'li.ng-scope .searchResultHeader label'

export async function search (startDate = new Date(), endDate = undefined, name = '') {
  // Prepare dates
  const startDateFormatted = moment(startDate).format('L')
  const endDateFormatted = endDate === undefined
    ? moment(startDate).add(1, 'days').format('L')
    : moment(endDate).format('L')

  return new Promise(async resolve => {
    // Prepare scrape
    scrape(searchPortal, async (page, browser) => {
    
      // Wait for the address view to appear
      await page.waitForResponse('https://ava.fidlar.com/txgalveston/avaweb/app/search/subviews/address.html')

      // Wait for the start date field to be visible
      await page.waitForSelector(startDateSelector)

      // Populate the fields
      await page.type(startDateSelector, startDateFormatted)
      await page.type(endDateSelector, endDateFormatted)
      await page.type(nameSelector, name)

      // Establish search results listener
      // TODO: Manually clear this waitFor
      page.waitForNavigation().then(async () => {
        // Move on to the next page
        await page.waitForSelector(searchResultsLoadedSelector)
        console.log('Gathering records...')

        const records = await page.$$eval(textSelector,
          rows => {
            // Build an array of populated objects from the array of selected text
            const records = []
            let record
            let i = 0

            for (const row of rows) {
              const index = i % 6

              if (index === 0) {
                // New element
                const newIndex = records.push({
                  id: '',
                  type: '',
                  date: '',
                  party1: '',
                  party2: '',
                  legals: ''
                })
                record = records[newIndex - 1]
              }
              const text = row.textContent.trim()
              
              switch (index) {
                case 0: record.id = text
                  break
                case 1: record.type = text
                  break
                case 2: record.date = text
                  break
                case 3: record.party1 = text
                  break
                case 4: record.party2 = text
                  break
                case 5: record.legals = text
                  break
              }

              i += 1
            }

            return records
          }
        )

        // await page.evaluate(() => window.__completedTask = true)
        resolve(records)
      })

      // Establish no results listener
      // TODO: Manually clear this waitFor
      page.waitForSelector(noResultsFoundSelector).then(async () => {
        // Nothing was found
        // await page.evaluate(() => window.__completedTask = true)
        resolve([])
      })

      // Begin the search
      await page.click(searchButtonSelector)

      // Wait for the page to be done
      await page.waitForFunction(() => window.__completedTask === true)
    })
  })
}

/*
async function test () {
 const results = await search('2021-08-21') // Finds nothing
 // const results = await search('2021-08-01') // Has results
 console.log(results)
}

test()
*/