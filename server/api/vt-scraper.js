import { Builder, By } from "selenium-webdriver";


export default defineEventHandler(async (event) => {
  const query = getQuery(event); // Get the query parameters
  const url = query.url;
  console.log(`url to scrape: ${url}`)

  let driver;

  try {
    // Initialize WebDriver
    driver = await new Builder().forBrowser("chrome").build();

    await driver.manage().window().maximize();


    // Navigate to the target URL
    await driver.get(url);

    await driver.sleep(10000)

    // Wait for the page to load and extract data (adjust selectors as needed)
    const element = await driver.findElement(By.id("positives"));
    const text = await element.getText();


    // Return the scraped data
    return { success: true, data: text };
  } catch (error) {
    // Handle errors gracefully
    return { success: false, error: error.message };
  } finally {
    // Quit the driver
    if (driver) await driver.quit();
  }
});
