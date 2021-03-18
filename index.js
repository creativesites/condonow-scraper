const browserObject = require('./browser');
const scraperController = require('./pageController');
const schedule = require('node-schedule');

let browserInstance = browserObject.startBrowser();
const rule = new schedule.RecurrenceRule();
rule.hour = 01;
rule.minute = 0;
//rule.minute = 22;

const job = schedule.scheduleJob(rule, function(){
  console.log('The answer to life, the universe, and everything!');
  scraperController(browserInstance)
});

//scraperController(browserInstance)