let propLinks = []
const scraperObject = {
    url: 'https://condonow.com/Bayview-at-the-Village-Condos',
    
    async scraper(browser){
        let page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            if (['image'].indexOf(request.resourceType()) !== -1) {
                request.abort();
            } else {
                request.continue();
            }
        });
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url,  {waitUntil: 'load', timeout: 0});
        
        let arrMainLinks = await page.$('p#ctl00_ContentPlaceHolder1_lblMetaDescription span.h1');   //get the main links
    
        await page.waitForSelector('p#ctl00_ContentPlaceHolder1_lblMetaDescription')
        const title =  await page.$eval('p#ctl00_ContentPlaceHolder1_lblMetaDescription span.h1', el => el.innerText);
        const desc =  await page.$eval('#ctl00_ContentPlaceHolder1_lblDescription', el => el.innerText);
        const floorPlans =  await page.$eval('div#ctl00_ContentPlaceHolder1_dvSpecs div.SpecsTable table.table tbody tr td label#ctl00_ContentPlaceHolder1_lblFloorPlansshow', el => el.innerText);
        //const suiteSizeRange = await page.$eval('div#ctl00_ContentPlaceHolder1_dvSpecs div.SpecsTable table.table tbody tr td label#ctl00_ContentPlaceHolder1_lblSuiteSize', el => el.innerText);
        /* try {
          const pricePerSqFtFrom = await page.$eval('div#ctl00_ContentPlaceHolder1_dvSpecs div.SpecsTable table.table tbody tr td label#ctl00_ContentPlaceHolder1_lblPricesqftfrom', el => el.innerText);
          console.log(pricePerSqFtFrom)
        } catch (e) {
          console.log(e)
        }  */
        
        const estOccupancy = await page.$eval('#ctl00_ContentPlaceHolder1_lblEstimatedOccupancy', el => el.innerText);
        const vipLaunch = await page.$eval('#ctl00_ContentPlaceHolder1_lblVIPSalesStartDate', el => el.innerText);
        //const depositNotes = await page.$eval('#ctl00_ContentPlaceHolder1_lblDepositNotes', el => el.innerText.trim());
        const ammenities = await page.$eval('#ctl00_ContentPlaceHolder1_lblAmenities', el => el.innerText);
        console.log(title);
        console.log(desc)
        console.log(floorPlans)
        //console.log(suiteSizeRange)
        
        console.log(estOccupancy)
        console.log(vipLaunch)
        console.log(ammenities)
        
    }
 

    }


module.exports = scraperObject;