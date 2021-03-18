const axios = require('axios')
const jsonfile = require('jsonfile')
var Sequence = require('sequence-js')
let propLinks = []
let allProps = []
let floorPLinks = []
let propData2 = {}
let title = ''
let desc = ''
let estOccupancy = ''
let vipLaunch = ''
let floorPlans = ''
let depositNotes = ''
let ammenities = ''
let storyNum  = ''
let totalUnits = ''
let suitesStartingFloor = ''
let upperNumberofLevels = ''
let suiteSize = ''
let pricesqftfrom = ''
let parkingPrice = ''
let lockerPrice = ''
let architects = ''
let interiorDesigners = ''
let totalMinimumDeposit = ''
let developmentLevies = ''
let imgs = []
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
        

       for await(mainLink of arrMainLinks){
        let url =await (await mainLink.getProperty('href')).jsonValue();
        console.log("Clicking on " + url);
        try {
          const page = await browser.newPage();
          await page.setRequestInterception(true);
          page.on('request', (request) => {
              if (['image'].indexOf(request.resourceType()) !== -1) {
                  request.abort();
              } else {
                  request.continue();
              }
          });
          console.log(`loading page: ${url}`);
          await page.goto(url, {
            waitUntil: 'networkidle0',
            timeout: 120000,
          });
          await page.waitForSelector('p#ctl00_ContentPlaceHolder1_lblMetaDescription')
          try {
            floorPlans =  await page.$eval('div#ctl00_ContentPlaceHolder1_dvSpecs div.SpecsTable table.table tbody tr td label#ctl00_ContentPlaceHolder1_lblFloorPlansshow', el => el.innerText);
            try {
              depositNotes = await page.$eval('#ctl00_ContentPlaceHolder1_lblDepositNotes', el => el.innerText.trim());
              try {
                ammenities = await page.$eval('#ctl00_ContentPlaceHolder1_lblAmenities', el => el.innerText);
                try {
                  storyNum = await page.$eval('#ctl00_ContentPlaceHolder1_lblStoriesNumber', el => el.innerText);
                  try {
                    totalUnits = await page.$eval('#ctl00_ContentPlaceHolder1_lblTotalUnits', el => el.innerText);
                    try {
                      suitesStartingFloor = await page.$eval('#ctl00_ContentPlaceHolder1_lblSuitesStartingFloor', el => el.innerText);
                      try {
                        upperNumberofLevels = await page.$eval('#ctl00_ContentPlaceHolder1_lblUpperNumberofLevels', el => el.innerText);
                        try {
                          suiteSize = await page.$eval('#ctl00_ContentPlaceHolder1_lblSuiteSize', el => el.innerText);
                          try {
                            pricesqftfrom = await page.$eval('#ctl00_ContentPlaceHolder1_lblPricesqftfrom', el => el.innerText);
                            try {
                              parkingPrice = await page.$eval('#ctl00_ContentPlaceHolder1_lblParkingPrice', el => el.innerText);
                              try {
                                lockerPrice = await page.$eval('#ctl00_ContentPlaceHolder1_lblLockerPrice', el => el.innerText);
                                try {
                                  architects = await page.$eval('#ctl00_ContentPlaceHolder1_lblArchitects', el => el.innerText);
                                  try {
                                    interiorDesigners = await page.$eval('#ctl00_ContentPlaceHolder1_lblInteriorDesigners', el => el.innerText);
                                    try {
                                      totalMinimumDeposit = await page.$eval('#ctl00_ContentPlaceHolder1_lblTotalMinimumDeposit', el => el.innerText);
                                      try {
                                        developmentLevies = await page.$eval('#ctl00_ContentPlaceHolder1_lblDevelopmentLevies', el => el.innerText);
                                        
                
                                      } catch (error) {
                                        console.log('not found')
                                      }
                
                                    } catch (error) {
                                      console.log('not found')
                                    }
                
                                  } catch (error) {
                                    console.log('not found')
                                  }
                
                                } catch (error) {
                                  console.log('not found')
                                }
                
                              } catch (error) {
                                console.log('not found')
                              }
                
                            } catch (error) {
                              console.log('not found')
                            }
                
                          } catch (error) {
                            console.log('not found')
                          }
                
                        } catch (error) {
                          console.log('not found')
                        }
                      } catch (error) {
                        console.log('not found')
                      }
                    } catch (error) {
                      console.log('not found')
                    }
                  } catch (error) {
                    console.log('not found')
                  }
                } catch (error) {
                  console.log('not found')
                }
              } catch (error) {
                console.log('not found')
              }
            } catch (error) {
              console.log('not found')
            }
          } catch (error) {
            console.log('not found')
          }finally{
            title =  await page.$eval('p#ctl00_ContentPlaceHolder1_lblMetaDescription span.h1', el => el.innerText);
            desc =  await page.$eval('#ctl00_ContentPlaceHolder1_lblDescription', el => el.innerText);
            
            estOccupancy = await page.$eval('#ctl00_ContentPlaceHolder1_lblEstimatedOccupancy', el => el.innerText);
            vipLaunch = await page.$eval('#ctl00_ContentPlaceHolder1_lblVIPSalesStartDate', el => el.innerText);
            await page.close();
            try {
              let fPurl1 = url + '/Floor-Plan-Price'
              console.log(fPurl1)
              try {
                const page = await browser.newPage(); 
                await page.goto(fPurl1, {
                  waitUntil: 'networkidle0',
                  timeout: 120000,
                });
                await page.setRequestInterception(true);
                page.on('request', (request) => {
                    if (['image'].indexOf(request.resourceType()) !== -1) {
                        request.abort();
                    } else {
                        request.continue();
                    }
                });
                //await page.waitForSelector('.itemlist')
                try {
                  let floorLinks = await page.$$('.itemlist .itemRow .row-list-data .div-row .title a');   //get the main links
                  
                  console.log(floorLinks.length); // 16
                  if(floorLinks.length == 0){
                    let propData = {
                      title: title,
                      desc: desc,
                      floorPlans: floorPlans,
                      ammenities: ammenities,
                      estOccupancy: estOccupancy,
                      vipLaunch: vipLaunch,
                      depositNotes: depositNotes,
                      storyNum: storyNum,
                      totalUnits: totalUnits,
                      suitesStartingFloor: suitesStartingFloor,
                      upperNumberofLevels: upperNumberofLevels,
                      suiteSize: suiteSize,
                      pricesqftfrom: pricesqftfrom,
                      parkingPrice: parkingPrice,
                      lockerPrice: lockerPrice,
                      architects: architects,
                      interiorDesigners: interiorDesigners,
                      totalMinimumDeposit: totalMinimumDeposit,
                      developmentLevies: developmentLevies,
                      imgs: []
                    }
                    //console.log(propData)
                    allProps.push(propData)
                    //console.log(allProps)
                    console.log(`closing page: ${fPurl1}`);
                    await page.close();
                    //return
                  }else{
                    for await(link of floorLinks){
                      let fPurl =await (await link.getProperty('href')).jsonValue();
                      console.log("Clicking on " + fPurl);
                      await page.close();
                      try {
                        const page = await browser.newPage(); 
                        await page.goto(fPurl, {
                          waitUntil: 'networkidle0',
                          timeout: 120000,
                        });
                        await page.setRequestInterception(true);
                        page.on('request', (request) => {
                            if (['image'].indexOf(request.resourceType()) !== -1) {
                                request.abort();
                            } else {
                                request.continue();
                            }
                        });
                        //await page.waitForSelector('.itemlist')
                        try {
                          
                          //const imgText1 =  await page.$eval('#modelname', el => el.innerText);
                          //const imgText2 =  await page.$eval('#ModelDeatilsqft', el => el.innerText);
                          const issueSrcs = await page.evaluate(() => {
                          const srcs = Array.from(
                              document.querySelectorAll("#ctl00_ContentPlaceHolder1_wucModelDetail_dvFloorplan a img")
                          ).map((image) => image.getAttribute("src"));
                          return srcs;
                          });
                          
                          let imgLink = `https://condonow.com${issueSrcs[0]}`
                          /* let data = {
                          imgTitle: imgText1,
                          imgDesc: imgText2,
                          imgUrl:imgLink
                          } */
                          //imgs.push(imgLink)
                          var c = imgs.push(imgLink) - 1;
                          var d = 'imgTitle' + imgs.length;
                          propData2[d] = imgLink
                          //propData2[]
                          //console.log(propData2)
                           //imgs.push(data)
                          console.log(`closing page: ${fPurl}`);
                          await page.close();
                        } catch (error) {
                          console.log('there was an error inner 1')
                          await page.close();
                          console.log(error)
                          await page.close();
                        }
                      } catch (error) {
                        console.log('there was an error outer')
                        console.log(error)
                        await page.close();
                      }
                    }
                    propData2.title = title
                    propData2.desc = desc
                    propData2.floorPlans = floorPlans
                    propData2.ammenities = ammenities
                    propData2.estOccupancy = estOccupancy
                    propData2.vipLaunch = vipLaunch
                    propData2.depositNotes = depositNotes
                    propData2.storyNum = storyNum
                    propData2.totalUnits = totalUnits
                    propData2.suitesStartingFloor = suitesStartingFloor
                    propData2.upperNumberofLevels = upperNumberofLevels
                    propData2.suiteSize = suiteSize
                    propData2.pricesqftfrom = pricesqftfrom
                    propData2.parkingPrice = parkingPrice
                    propData2.lockerPrice = lockerPrice
                    propData2.architects = architects
                    propData2.interiorDesigners = interiorDesigners
                    propData2.totalMinimumDeposit = totalMinimumDeposit
                    propData2.developmentLevies = developmentLevies
                    
                    imgs = []
                    
                    //console.log(propData)
                    allProps.push(propData2)
                    console.log(propData2)
                    
                  }
                  propData2 = {}
                  
                } catch (error) {
                  console.log('there was an error outer')
                  console.log(error)
                  await page.close();
                }
              } catch (error) {
                console.log('there was an error outer')
                console.log(error)
                await page.close();
              } 
            } catch (error) {
              console.log(error)
              await page.close();
            }finally{
              await page.close();
              
            }
            
           
          }
        } catch (error) {
          console.log(error)
        }
       }
       postData()
       const file = `./data.json`
        jsonfile.writeFile(file, allProps)
        .then(res => {
            console.log('Write complete')
        })
        .catch(error => console.error(error))
        

        
    }
        
  }


async function postData(){
  axios.post('https://sheetdb.io/api/v1/5p8cuy7zgw9a9',{
        "data": allProps
    }).then( response => {
        console.log(response.data);
    });
}
module.exports = scraperObject;