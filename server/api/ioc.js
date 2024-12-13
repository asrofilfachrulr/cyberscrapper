export default defineEventHandler(async (event) => {
  const query = getQuery(event); // Get the query parameters
  const { payload } = query;
  console.log(`payload to scrape: ${payload}`)

  let driver;

  try {
    const data = await vtScraper(payload)

    // Return the scraped data
    return { success: true, data };
  } catch (error) {
    // Handle errors gracefully
    return { success: false, error: error.message };
  } finally {
    // Quit the driver
    if (driver) await driver.quit();
  }
});

import puppeteer from "puppeteer"

const vtScraper = async function (payload) {
  const url = `https://www.virustotal.com/gui/file/${payload.trim()}`
  console.log(`target url: ${url}\n`)
  const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto(url, { waitUntil: ['networkidle0', 'load'] });

  let { cs, lbl, tc, fl } = await page.evaluate(() => {
    // Community Score
    // /html/body / vt - ui - shell / div[2] / file - view//vt-ui-main-generic-report/vt-ui-file-card//div/div[1]/div[1]/text()
    let vtShell = document.querySelector("vt-ui-shell");
    let fileView = vtShell.querySelector("file-view").shadowRoot;
    let genericReport = fileView.querySelector("vt-ui-main-generic-report");
    let fileCard = genericReport.querySelector("vt-ui-file-card").shadowRoot;


    cs = fileCard
      .querySelector(".hstack.gap-2.fw-bold.text-danger")
      .textContent
      .trim()
      .match(/\b\d{1,3}\/\d{1,3}\b/)[0];


    // Label
    ///html/body/vt-ui-shell/div[2]/file-view//vt-ui-main-generic-report/span/div/div[1]/a/text()
    lbl = genericReport.querySelector(".link-danger.hstack.gap-1").textContent.trim()


    // Threat Categories
    // /html/body/vt-ui-shell/div[2]/file-view//vt-ui-main-generic-report/span/div/div[2]/div/a
    let tcparent = genericReport.querySelectorAll(".tags.hstack.gap-2")[0]
    let tce = tcparent.querySelectorAll(".badge.rounded-pill.bg-body-tertiary.text-body")
    tc = []
    for (let e of tce)
      tc.push(e.textContent.trim())

    // Family Labels
    // /html/body/vt-ui-shell/div[2]/file-view//vt-ui-main-generic-report/span/div/div[3]/div/a[1]
    let flparent = genericReport.querySelectorAll(".tags.hstack.gap-2")[1]
    let fle = flparent.querySelectorAll(".badge.rounded-pill.bg-body-tertiary.text-body")
    let fl = []
    for (let e of fle)
      fl.push(e.textContent.trim())

    return {
      cs, lbl, tc, fl
    }
  });

  await browser.close();

  return {
    cs,
    lbl,
    tc,
    fl,
    link: url
  };
}
