const scraperObject = {
    url: 'https://condonow.com/Toronto-New-Condos-VIP-Coming-Soon',
    
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url,  {waitUntil: 'load', timeout: 0});
        const cc = '#searchresultTab1  table.socialTable tbody tr td.Info div.mapProjTitle div.listviewTitleInfo table tbody tr td div.projName div.projectTitle a.projects'
        //await page.waitFor(20000);
        
        await page.waitForSelector('#searchresultTab1');
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
        });
        //console.log(urls[0]);
                                 // make the tab active
        

        //await browser.close(); 

    }
}

module.exports = scraperObject;