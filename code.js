//get links from main page
Array.from(document.querySelectorAll('div.moreSearchV2Container table.table tbody tr td div.projName div.projectTitle > a.projects')).map((a) => a.href)

