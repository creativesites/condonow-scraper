for (let mainLink of arrMainLinks) //foreach main link let's click it
{
    let hrefValue =await (await mainLink.getProperty('href')).jsonValue();
    console.log("Clicking on " + hrefValue);
    await Promise.all([
        page.waitForNavigation({waitUntil: 'load', timeout: 0}),
        mainLink.click({delay: 100})
    ]);

    // let's get the sub links
    /* let closeAd = await page.$$eval('.btnClose i.fas fa-times')
    await Promise.all([
        page.waitForNavigation({waitUntil: 'load', timeout: 0}),
        closeAd.click({delay: 100})
    ]); */
    
    
    //await page.waitFor(2000)
    //await nav
    //const nav = new Promise(res => browser.on('targetcreated', res))
    //await page.click('.btnClose i.fa-times');
    
    
    //let's click on each sub click
    /* for (let sublink of arrSubLinks)
    {
        console.log('██AAA');
       
        await Promise.all([
            page.waitForNavigation({waitUntil: 'load', timeout: 0}),
            sublink.click({delay: 100})
        ]);
        console.log('██BBB');
       
        // await page.goBack() 
        break;
    } */
    
    //await page.goBack() 
    break;
    
    
