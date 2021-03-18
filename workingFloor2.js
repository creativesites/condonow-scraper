const axios = require('axios')
var Sequence = require('sequence-js')
let propLinks = []
let allProps = []
let floorplansLinks = []
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
    url: 'https://condonow.com/The-Twelve-Hundred-Condos/Floor-Plan-Price',
    
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
        //const cc = '#searchresultTab1  table.socialTable tbody tr td.Info div.mapProjTitle div.listviewTitleInfo table tbody tr td div.projName div.projectTitle a.projects'
        //await page.waitFor(20000);
        let arrMainLinks = await page.$$('.itemlist .itemRow .row-list-data .div-row .title a');   //get the main links
        //let aaa = await page.$$eval('.itemlist .itemRow .row-list-data .div-row .title');
        //console.log(arrMainLinks)
        console.log(arrMainLinks.length); // 16
        arrMainLinks.map(async (mainLink)=>{
          //const jsHandle = await mainLink.getProperty('innerHTML')
          //const plainValue = await jsHandle.jsonValue();
          let hrefValue =await (await mainLink.getProperty('href')).jsonValue();
            console.log("Clicking on " + hrefValue);
            const cc = await getFloorPlans1(browser, hrefValue)
            //console.log(`img url from main function:   ${cc}`)
            imgs.push(cc)
            console.log(imgs)
            //propLinks.push(hrefValue)
            
        })
        
        /* setTimeout( () => {
          var loginSequence = new Sequence()
            .add(getDetails)
            .add(postData)

          loginSequence.exec(browser)
          
        }, 20000); */

        /* setTimeout(() => {
          postData()
        }, 500000); */
        
    }
        
  }

  async function getFloorPlans1(browser, fPurl){
    console.log(fPurl)
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
        const imgText1 =  await page.$eval('#modelname', el => el.innerText);
        const imgText2 =  await page.$eval('#ModelDeatilsqft', el => el.innerText);
        const issueSrcs = await page.evaluate(() => {
          const srcs = Array.from(
            document.querySelectorAll("#ctl00_ContentPlaceHolder1_wucModelDetail_dvFloorplan a img")
          ).map((image) => image.getAttribute("src"));
          return srcs;
        });
        
        let imgLink = `https://condonow.com${issueSrcs[0]}`
        let data = {
          imgTitle: imgText1,
          imgDesc: imgText2,
          imgUrl:imgLink
        }
        //console.log(data)
        
        console.log(`closing page: ${fPurl}`);
        await page.close();
        return data
        
      } catch (error) {
        console.log('there was an error inner 1')
        console.log(error)
        await page.close();
      }
    } catch (error) {
      console.log('there was an error outer')
      console.log(error)
      await page.close();
    }
  }

  async function getFloorPlans(browser){
    let urls = floorplansLinks
    try {
        //const browser = await puppeteer.launch();
        const throttledProcess = async (items, interval) => { 
          const page = await browser.newPage(); 
          
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
          } finally{
            const title =  await page.$eval('p#ctl00_ContentPlaceHolder1_lblMetaDescription span.h1', el => el.innerText);
            const desc =  await page.$eval('#ctl00_ContentPlaceHolder1_lblDescription', el => el.innerText);
            
            const estOccupancy = await page.$eval('#ctl00_ContentPlaceHolder1_lblEstimatedOccupancy', el => el.innerText);
            const vipLaunch = await page.$eval('#ctl00_ContentPlaceHolder1_lblVIPSalesStartDate', el => el.innerText);
            
            
            
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
              developmentLevies: developmentLevies
            }
            console.log(propData)
            allProps.push(propData)
            console.log(`closing page: ${items[0]}`);
            await page.close();
            console.log('PROCESSING', items[0], Date())
          }
        
        
           // this is where your http call/update/etc takes place
          setTimeout(() => throttledProcess(items.slice(1), interval), // wrap in an arrow function to defer evaluation
            interval)
        }
        
        throttledProcess(urls, 10000)
        
      } catch (error) {
        console.log(error);
      }
  }

async function getDetails(browser){
    
    let urls = propLinks
    try {
        //const browser = await puppeteer.launch();
        const throttledProcess = async (items, interval) => { 
          const page = await browser.newPage(); 
          
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
          } finally{
            const title =  await page.$eval('p#ctl00_ContentPlaceHolder1_lblMetaDescription span.h1', el => el.innerText);
            const desc =  await page.$eval('#ctl00_ContentPlaceHolder1_lblDescription', el => el.innerText);
            
            const estOccupancy = await page.$eval('#ctl00_ContentPlaceHolder1_lblEstimatedOccupancy', el => el.innerText);
            const vipLaunch = await page.$eval('#ctl00_ContentPlaceHolder1_lblVIPSalesStartDate', el => el.innerText);
            
            
            
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
              developmentLevies: developmentLevies
            }
            console.log(propData)
            allProps.push(propData)
            console.log(`closing page: ${items[0]}`);
            await page.close();
            console.log('PROCESSING', items[0], Date())
          }
        
        
           // this is where your http call/update/etc takes place
          setTimeout(() => throttledProcess(items.slice(1), interval), // wrap in an arrow function to defer evaluation
            interval)
        }
        
        throttledProcess(urls, 10000)
        
      } catch (error) {
        console.log(error);
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