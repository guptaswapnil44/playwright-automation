const { expect } = require("@playwright/test");
const findValidElement = require("../utils/SelfHealingUtill");
const logger = require("../utils/LoggerUtil");
const HomePage = require("./homePage");

class LoginPage {
  constructor(page) {
    this.page = page;  // Store the page object for future use
    this.usernameInputSelector = this.page.locator('#username');
    this.usernameInputSelectors = ["#username", 'input[name="username"]', ".username", "//*[@id='username]"]; // multiple locators for self-healing
    this.passwordInputSelector = this.page.locator("#password");
    this.loginButtonSelector = this.page.locator("#Login");
  }

  async userLogin(username, password, baseURL) {
    await this.navigateToLoginPage(baseURL);
    await this.fillUsername(username);
    await this.fillPassword(password);
    return await this.clickLoginButton();
  }

  async navigateToLoginPage(baseURL) {
    await this.page.goto(baseURL);
    logger.info("Navigated to " + baseURL);
  }

  async fillUsername(username) {
    await this.usernameInputSelector.fill(username);
    logger.info("Filled username " + username);
  }

  async fillUsername_selfheal(username) {
    let usernameInputLocator = await findValidElement(this.page, this.usernameInputSelectors);
    await usernameInputLocator?.fill(username); // Safely checks if the locator is valid, prevents errors
    const enteredValue = await usernameInputLocator?.inputValue();
    expect(enteredValue).toBe(username);
  }

  async fillPassword(password) {
    await this.passwordInputSelector.fill(password);
    logger.info("Filled password");
  }

  async clickLoginButton() {
    await this.loginButtonSelector.click()
      .catch((error) => {
        logger.error(`Error clicking login button: ${error}`);
        throw error; // Rethrow the error if needed
      })
      .then(() => logger.info("Clicked login button"));

    const homePage = new HomePage(this.page);  // Create a new HomePage object
    return homePage;  // Return the HomePage object after clicking the login button
  }
}

module.exports = LoginPage;
