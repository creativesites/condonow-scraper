let propLinks = []
let allProps = []
const scraperObject = {
    url: 'https://condonow.com/Toronto-New-Condos-VIP-Coming-Soon',
    
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url,  {waitUntil: 'load', timeout: 0});
        const cc = '#searchresultTab1  table.socialTable tbody tr td.Info div.mapProjTitle div.listviewTitleInfo table tbody tr td div.projName div.projectTitle a.projects'
        //await page.waitFor(20000);
        let arrMainLinks = await page.$$('#searchresultTab1  table.socialTable tbody tr td.Info div.mapProjTitle div.listviewTitleInfo table tbody tr td div.projName div.projectTitle a.projects');   //get the main links
        
        console.log(arrMainLinks.length); // 16
        arrMainLinks.map(async (mainLink)=>{
            let hrefValue =await (await mainLink.getProperty('href')).jsonValue();
            console.log("Clicking on " + hrefValue);
            propLinks.push(hrefValue)
            /* await new Promise([
                page.waitForNavigation({waitUntil: 'load', timeout: 0}),
                mainLink.click({delay: 100})
            ]).then(async ()=>{
                 let closeAd = await page.$$eval('.btnClose i.fas fa-times')
                await Promise.all([
                    page.waitForNavigation({waitUntil: 'load', timeout: 0}),
                    closeAd.click({delay: 100})
                ]);  
                await page.close()
            }) */
            
        })
        setTimeout(() => {
          getDetails(browser)
        }, 20000);
        
    }
   
    //await browser.close();
        
        /* await page.waitForSelector('#searchresultTab1');
        // Get the link to all the required books
        let urls = await page.$$eval('#searchresultTab1  table.socialTable tbody tr td.Info div.mapProjTitle div.listviewTitleInfo table tbody tr td div.projName div.projectTitle', links => {
            // Make sure the book to be scraped is in stock
            //links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== "In stock")
            // Extract the links from the data
            links = links.map(el => el.querySelector('a.projects').href)
            let link = links[0]
            Promise.all([
                page.waitForNavigation(),
                page.click(link),
              ]);
            return ;
        }); */
        //console.log(urls[0]);
                                 // make the tab active
        

        //await browser.close(); 

    }

async function getDetails(browser){
    //page.waitForNavigation({waitUntil: 'load', timeout: 0}),
    //mainLink.click({delay: 100})
    let urls = propLinks
    try {
        //const browser = await puppeteer.launch();
        const throttledProcess = async (items, interval) => { 
          const page = await browser.newPage(); 
          /* console.log(`loading page: ${url}`);
          await page.goto(url, {
            waitUntil: 'networkidle0',
            timeout: 120000,
          }); */
          if (items.length == 0) { // stop when there's no more items to process
            console.log('ALL DONE')
            return
          }  
          console.log(`loading page: ${items[0]}`);
          await page.goto(items[0], {
            waitUntil: 'networkidle0',
            timeout: 120000,
          });
          await page.waitForSelector('p#ctl00_ContentPlaceHolder1_lblMetaDescription')
        const title =  await page.$eval('p#ctl00_ContentPlaceHolder1_lblMetaDescription span.h1', el => el.innerText);
        const desc =  await page.$eval('#ctl00_ContentPlaceHolder1_lblDescription', el => el.innerText);
        //const floorPlans =  await page.$eval('div#ctl00_ContentPlaceHolder1_dvSpecs div.SpecsTable table.table tbody tr td label#ctl00_ContentPlaceHolder1_lblFloorPlansshow', el => el.innerText);
        const estOccupancy = await page.$eval('#ctl00_ContentPlaceHolder1_lblEstimatedOccupancy', el => el.innerText);
        const vipLaunch = await page.$eval('#ctl00_ContentPlaceHolder1_lblVIPSalesStartDate', el => el.innerText);
        //const depositNotes = await page.$eval('#ctl00_ContentPlaceHolder1_lblDepositNotes', el => el.innerText.trim());
        //const ammenities = await page.$eval('#ctl00_ContentPlaceHolder1_lblAmenities', el => el.innerText);
        /* console.log(title);
        console.log(desc)
        console.log(floorPlans)
        //console.log(suiteSizeRange)
        
        console.log(estOccupancy)
        console.log(vipLaunch)
        console.log(ammenities) */
        let propData = {
          title: title,
          desc: desc,
          //floorPlans: floorPlans,
          //ammenities: ammenities,
          estOccupancy: estOccupancy,
          vipLaunch: vipLaunch
        }
        console.log(propData)
          console.log(`closing page: ${items[0]}`);
          await page.close();
          console.log('PROCESSING', items[0], Date()) // this is where your http call/update/etc takes place
          setTimeout(() => throttledProcess(items.slice(1), interval), // wrap in an arrow function to defer evaluation
            interval)
        }
        
        throttledProcess(urls, 10000)
        /* const pdfs = urls.map(async (url, i) => {
          const page = await browser.newPage();
    
          console.log(`loading page: ${url}`);
          await page.goto(url, {
            waitUntil: 'networkidle0',
            timeout: 120000,
          });
    
          console.log(`getting data from: ${url}`);
          await page.waitForSelector('p#ctl00_ContentPlaceHolder1_lblMetaDescription')
        const title =  await page.$eval('p#ctl00_ContentPlaceHolder1_lblMetaDescription span.h1', el => el.innerText);
        const desc =  await page.$eval('#ctl00_ContentPlaceHolder1_lblDescription', el => el.innerText);
        const floorPlans =  await page.$eval('div#ctl00_ContentPlaceHolder1_dvSpecs div.SpecsTable table.table tbody tr td label#ctl00_ContentPlaceHolder1_lblFloorPlansshow', el => el.innerText);
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
        let propData = {
          title: title,
          desc: desc,
          floorPlans: floorPlans,
          ammenities: ammenities,
          estOccupancy: estOccupancy,
          vipLaunch: vipLaunch
        }
    
          console.log(`closing page: ${url}`);
          await page.close();
        });
    
        Promise.all(pdfs).then(() => {
          browser.close();
        }); */
      } catch (error) {
        console.log(error);
      }
}
module.exports = scraperObject;