const fs = require('fs');
const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const vgmUrl= 'https://condonow.com/GTA-Freehold-Towns';

got(vgmUrl).then(response => {
  const dom = new JSDOM(response.body);
  const a = Array.from(dom.window.document.querySelectorAll('div.moreSearchV2Container table.table tbody tr td div.projName div.projectTitle > a.projects')).map((a) => a.textContent)
  //console.log(dom.window.document.querySelector('title').textContent);
  console.log(a)
}).catch(err => {
  console.log(err);
});