// const logger = require("./LoggerUtil");

async function findValidElement(page, locators) {
  let validElement = null;
  const TIMEOUT_MS = 5000;

  for (const locator of locators) {
    try {
      const element = page.locator(locator);
      await element.waitFor({ state: "attached", timeout: TIMEOUT_MS });
      validElement = element;
      // logger.info(`Found valid element with locator: ${locator}`);
      break; // Exit loop if a valid element is found
    } catch (error) {
      // logger.error(`Invalid locator: ${locator}`);
    }
  }

  if (!validElement) {
    // logger.error("All locators are invalid");
  }

  return validElement;
}

// Example usage:
// async function exampleUsage(page) {
//   const locators = ["#selector1", "#selector2", "#selector3"];
//   const validElement = await findValidElement(page, locators);
//   if (validElement) {
//     // Perform actions on validElement
//   }
// }

module.exports = findValidElement;
