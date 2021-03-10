let propLinks = []
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
        }, 30000);
        
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
        
        const pdfs = urls.map(async (url, i) => {
          const page = await browser.newPage();
    
          console.log(`loading page: ${url}`);
          await page.goto(url, {
            waitUntil: 'networkidle0',
            timeout: 120000,
          });
    
          console.log(`getting data from: ${url}`);
          let title = await page.$eval('p#ctl00_ContentPlaceHolder1_lblMetaDescription span.h1')
          console.log(title)
          let title2 = document.querySelector('p#ctl00_ContentPlaceHolder1_lblMetaDescription span.h1').innerText.trim()
          console.log(title2)
          /* await page.pdf({
            path: `${i}.pdf`,
            format: 'Letter',
            printBackground: true,
          }); */
    
          console.log(`closing page: ${url}`);
          await page.close();
        });
    
        Promise.all(pdfs).then(() => {
          browser.close();
        });
      } catch (error) {
        console.log(error);
      }
}
module.exports = scraperObject;