// import StealthPlugin from 'puppeteer-extra-plugin-stealth';

export default defineEventHandler(async () => {
  try {
    let news = await scrapeTheHackerNews()
    return { success: true, news };
  } catch (error) {
    // Handle errors gracefully
    return { success: false, error: error.message };
  }
})
import puppeteer from 'puppeteer';

// const { default: puppeteer } = await import('puppeteer-extra');
// const { default: StealthPlugin } = await import('puppeteer-extra-plugin-stealth');
const scrapeTheHackerNews = async function () {
  // puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  console.log("browsing the web")
  await page.goto("https://thehackernews.com/");
  console.log("web has been retrieved")
  let news
  try {
    await page.waitForSelector('#popular-list', { timeout: 5000 });
    news = await page.evaluate(() => {
      const newsP = document.querySelectorAll('#popular-list > div')

      let news = []
      for (let e of newsP) {
        const link = e.querySelector("a").href
        const imgLink = e.querySelector("img").src
        const title = e.querySelector(".pop-title").textContent

        news.push({ title, link, imgLink })
      }

      return news
    })

    console.log(news.length)
  } catch (e) {
    console.log("the hacker news scrapping has been failed")
  } finally {
    await browser.close();
  }

  return news
}