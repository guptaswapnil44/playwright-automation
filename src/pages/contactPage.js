const { expect } = require("@playwright/test");
const logger = require("../utils/LoggerUtil");

class ContactPage {
  constructor(page) {
    this.page = page;
    this.contactsLink = this.page.getByRole('link', { name: "Contacts" });
    this.newButtonLocator = this.page.getByRole('button', { name: "New" });
    this.firstNameTextFieldLocator = this.page.getByPlaceholder("First Name");
    this.lastNameTextFieldLocator = this.page.getByPlaceholder("Last Name");
    this.saveButtonLocator = this.page.getByRole('button', { name: "Save", exact: true });
    this.searchBoxLocator = this.page.getByPlaceholder("Search this list...");
    this.contactFullNameLabelLocator = this.page.locator(`//span[@class='toastMessage slds-text-heading--small forceActionsText']`);
    this.contactDisplayNameLocator = "#brandBand_2";
  }

  async createNewContact(fname, lname) {
    await this.contactsLink.click();
    await this.newButtonLocator.click();
    logger.info("New button is clicked");
    await this.firstNameTextFieldLocator.click();
    await this.firstNameTextFieldLocator.fill(fname);
    logger.info(`First name is filled as ${fname}`);
    await this.firstNameTextFieldLocator.press('Tab');
    await this.lastNameTextFieldLocator.fill(lname);
    logger.info(`Last name is filled as ${lname}`);
    await this.saveButtonLocator.click()
      .catch((error) => {
        logger.error(`Error clicking Save button: ${error}`);
        throw error; // rethrow the error if needed
      })
      .then(() => logger.info("Save Button is clicked"));
  }

  async expectContactLabelContainsFirstNameAndLastName(fname, lname) {
    await expect(this.contactFullNameLabelLocator).toContainText(`${fname} ${lname}`);
    logger.info(`New contact created and ${fname} ${lname} is visible`);
    await this.contactsLink.click();
  }

  async findExistingContactByLastName(lname) {
    await this.contactsLink.click();
    await this.searchBoxLocator.click();
    await this.searchBoxLocator.fill(lname);
    await this.searchBoxLocator.press("Enter");
    await this.page.getByRole("link", { name: lname }).click(); 
  }
}

module.exports = ContactPage;
