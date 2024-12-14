export default defineEventHandler(async (event) => {
  const query = getQuery(event); // Get the query parameters
  const { payload, type } = query;
  console.log(`payload to scrape: ${payload}`)
  console.log(`type to scrape: ${type}`)

  let data;

  try {
    switch (type) {
      case 'ip':
        data = await vtScraperIP(payload)
        break;
      case 'domain':
        data = await vtScraperDomain(payload)
        break;
      default:
        data = await vtScraperHash(payload)
    }


    // Return the scraped data
    return { success: true, data };
  } catch (error) {
    // Handle errors gracefully
    return { success: false, error: error.message };
  }
});

import puppeteer from "puppeteer"

const vtScraperHash = async function (payload) {
  const url = `https://www.virustotal.com/gui/file/${payload.trim()}`
  console.log(`url scraping: ${url}\n`)
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

    // /html/body/vt-ui-shell/div[2]/file-view//vt-ui-main-generic-report//div/div[1]/div[1]/vt-ioc-score-widget//div/vt-ioc-score-widget-detections-chart//div/div/div[1]
    let genReportShadow = genericReport.shadowRoot
    let iocScoreWidget = genReportShadow.querySelector("vt-ioc-score-widget").shadowRoot
    let iocScoreChart = iocScoreWidget.querySelector("vt-ioc-score-widget-detections-chart").shadowRoot
    let csp = iocScoreChart.querySelectorAll(".w-100.h-100.rounded-circle.bg-body-secondary.text-body-tertiary.text-center.vstack.justify-content-center > div")

    let css = []

    for (let e of csp)
      css.push(e.textContent.trim())

    let cs = css.join("").replace(/\s+/g, "")


    // Label
    ///html/body/vt-ui-shell/div[2]/file-view//vt-ui-main-generic-report/span/div/div[1]/a/text()
    let lbl = genericReport.querySelector(".link-danger.hstack.gap-1").textContent.trim()


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
    link: url,
    type: "h"
  };
}

const vtScraperIP = async function (payload) {
  const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

  const regex = /\b(?:(?:25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\b/g;

  const IPmatch = payload.match(regex)
  let IP

  if (!IPmatch)
    throw new Error(`Payload is not a valid IP Address: ${payload}`)
  else
    IP = IPmatch[0]

  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const url = `https://www.virustotal.com/gui/ip-address/${IP}`
  console.log(`url scrapping: ${url}`)
  await page.goto(url, { waitUntil: ['networkidle0', 'load'] });

  await sleep(3000)

  let { cs, as, img } = await page.evaluate(() => {
    // Community Score
    // /html/body / vt - ui - shell / div[2] / file - view//vt-ui-main-generic-report/vt-ui-file-card//div/div[1]/div[1]/text()
    // /html/body/vt-ui-shell/div[2]/ip-address-view//vt-ui-main-generic-report/vt-ui-ip-card//div/div[1]/div[1]/text()
    let vtShell = document.querySelector("vt-ui-shell");
    let ipView = vtShell.querySelector("ip-address-view").shadowRoot;
    let genericReport = ipView.querySelector("vt-ui-main-generic-report");
    let ipCard = genericReport.querySelector("vt-ui-ip-card").shadowRoot;

    // /html/body/vt-ui-shell/div[2]/ip-address-view//vt-ui-main-generic-report//div/div[1]/div[1]/vt-ioc-score-widget//div/vt-ioc-score-widget-detections-chart//div/div/div[1]

    let genReportShadow = genericReport.shadowRoot
    let iocScoreWidget = genReportShadow.querySelector("vt-ioc-score-widget").shadowRoot
    let iocScoreChart = iocScoreWidget.querySelector("vt-ioc-score-widget-detections-chart").shadowRoot
    let csp = iocScoreChart.querySelectorAll(".w-100.h-100.rounded-circle.bg-body-secondary.text-body-tertiary.text-center.vstack.justify-content-center > div")

    let css = []

    for (let e of csp)
      css.push(e.textContent.trim())

    let cs = css.join("").replace(/\s+/g, "")

    // AS
    // /html/body/vt-ui-shell/div[2]/ip-address-view//vt-ui-main-generic-report/vt-ui-ip-card//div/div[2]/div/div[1]/div[1]/div[2]
    let asp = ipCard.querySelectorAll(".vstack.gap-2.align-self-center.text-truncate.me-auto > .hstack.gap-2")

    let ASResult = []
    for (let e of asp)
      ASResult.push(e.textContent)

    let as = ASResult[1].trim()

    // Country img URL
    // /html/body/vt-ui-shell/div[2]/ip-address-view//vt-ui-main-generic-report/vt-ui-ip-card//div/div[2]/div/div[1]/a/img
    let img = ipCard.querySelector("#flag").src

    return {
      cs,
      as,
      img
    }
  });

  await browser.close();

  return {
    cs,
    as,
    img,
    link: url,
    type: "i"
  }
}

const vtScraperDomain = async function (payload) {
  const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

  const regex = /\b(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}\b/g;
  const domainMatch = payload.match(regex)
  let domain

  if (!domainMatch)
    throw new Error(`Domain is not a valid domain name: ${payload}`)
  else
    domain = domainMatch[0]

  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const URL = `https://www.virustotal.com/gui/domain/ruspyc.top`
  console.log(`URL scraping: ${URL}`)
  await page.goto(URL, { waitUntil: ['networkidle0', 'load'] });

  await sleep(3000)

  let { cs, reg } = await page.evaluate(() => {
    // Community Score
    // /html/body/vt-ui-shell/div[2]/domain-view//vt-ui-main-generic-report//div/div[1]/div[1]/vt-ioc-score-widget//div/vt-ioc-score-widget-detections-chart//div/div
    let vtShell = document.querySelector("vt-ui-shell");
    let domainView = vtShell.querySelector("domain-view").shadowRoot;
    let genericReport = domainView.querySelector("vt-ui-main-generic-report");
    // let ipCard = genericReport.querySelector("vt-ui-ip-card").shadowRoot;

    // /html/body/vt-ui-shell/div[2]/ip-address-view//vt-ui-main-generic-report//div/div[1]/div[1]/vt-ioc-score-widget//div/vt-ioc-score-widget-detections-chart//div/div/div[1]

    let genReportShadow = genericReport.shadowRoot
    let iocScoreWidget = genReportShadow.querySelector("vt-ioc-score-widget").shadowRoot
    let iocScoreChart = iocScoreWidget.querySelector("vt-ioc-score-widget-detections-chart").shadowRoot
    let csp = iocScoreChart.querySelectorAll(".w-100.h-100.rounded-circle.bg-body-secondary.text-body-tertiary.text-center.vstack.justify-content-center > div")

    let css = []

    for (let e of csp)
      css.push(e.textContent.trim())

    let cs = css.join("").replace(/\s+/g, "")

    // registrar
    // /html/body/vt-ui-shell/div[2]/domain-view//vt-ui-main-generic-report/vt-ui-domain-card//div/div[2]/div/div/div[1]
    let domainCard = genericReport.querySelector("vt-ui-domain-card").shadowRoot
    let reg = domainCard.querySelector(".vstack.gap-2.my-auto > .hstack.gap-4 > div:nth-child(3) > a").textContent.trim()

    return {
      cs,
      reg
    }
  });

  await browser.close();
  return {
    cs,
    reg,
    link: URL,
    type: "d"
  }
}
