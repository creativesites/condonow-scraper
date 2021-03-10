const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://precondo.ca/');
  
  const links = await page.evaluate( () =>
  Array.from(document.querySelectorAll('#jvbpd_scdaa0f4c5bc5ff2171f406dca5a7e8447a > div.shortcode-output > div.row > div.col-md-4 > div > div > div > div > section > div > div > div > div > div > section.elementor-section.elementor-inner-section.elementor-element.elementor-element-259eef6d.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default > div > div > div > div > div > div.elementor-element.elementor-element-1fce27eb.elementor-view-default.elementor-widget.elementor-widget-jvbpd-module-meta > div > div > div > a')).map((a) => a.href)

  )
  console.log(links)
  await browser.close()
  
})();