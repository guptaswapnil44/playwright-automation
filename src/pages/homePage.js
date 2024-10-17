const { expect } = require("@playwright/test");
const logger = require("../utils/LoggerUtil");
const ContactPage = require("./contactPage");

class HomePage {
  constructor(page) {
    this.page = page;
    this.serviceTitleLocator = this.page.getByTitle("Service");
    this.contactsLinkLocator = this.page.getByRole('link', { name: "Contacts" });
  }

  async expectServiceTitleToBeVisible() {
    await expect(this.serviceTitleLocator).toBeVisible({
      timeout: 25000,
    }).catch((error) => {
      logger.error(`Error while checking service title visibility: ${error}`);
      throw error; // rethrow the error if needed
    }).then(() => logger.info("Service Title is visible"));
  }
 
  async navigateToContactTab() {
    await expect(this.contactsLinkLocator).toBeVisible();
    logger.info("Contacts Tab is visible");
    await this.contactsLinkLocator.click();
    logger.info("Contacts Tab is clicked");
    return new ContactPage(this.page);
  }

  /* async navigateToCaseTab() {
    await expect(this.page.getByRole('link', { name: this.contactsLinkLocator })).toBeVisible();
    logger.info("Contacts Tab is visible");
    await this.page.getByRole('link', { name: this.contactsLinkLocator }).click();
    logger.info("Contacts Tab is clicked");
    return new ContactPage(this.page);
  }  */

}

module.exports = HomePage;
