import {expect } from "@playwright/test";
import findValidElement from "../utils/SelfHealingUtill";
import logger from "../utils/LoggerUtil"
/* This is an ES6 module import syntax used to import specific named exports (Page and expect) from the @playwright/test module. */
/* The module @playwright/test is Playwright's official test runner package, which provides tools to write and run tests with Playwright. This module includes various utilities, classes, and functions used in browser automation and testing. */
/* 
Page:
This is a class exported by Playwright that represents a browser tab or page. It provides methods and properties for interacting with the content of a webpage (such as navigation, clicking elements, filling forms, etc.).
In the context of Playwright tests, the Page class allows you to simulate user actions like opening a page, clicking buttons, filling input fields, etc.
expect:
This is a utility function used for making assertions in your tests. It is used to assert that a certain condition or outcome is true, which is fundamental in verifying whether a test passes or fails.
Playwright's expect function is similar to other assertion libraries but optimized for Playwright’s async operations (e.g., waiting for elements to be visible).
 */

export default class loginPage {
    constructor(page) {
        this.page = page;  // Store the page object for future use
        this.usernameInputSelector = this.page.locator('#username');
        this.usernameInputSelectors = ["#username", 'input[name="username"]', ".username", "//*[@id='username]"]; //multiple locator to ensure self-heal
        this.passwordInputSelector = this.page.locator("#password");
        this.loginButtonSelector = this.page.locator("#Login");
    /* export keyword allows the loginPage class to be exported and made available for use in other files or modules. When a class or function is exported, it can be imported in another file using import { loginPage } from './filePath';.
    The constructor takes one parameter, page. page is a reference to a Playwright Page object (representing a browser tab or webpage), which allows interaction with the login page.
*/}
    async userLogin(username, password) {
        await this.navigateToLoginPage(baseURL);
        await this.fillUsername(username);
        await this.fillPassword(password);
        return await this.clickLoginButton();
    }
    async navigateToLoginPage(baseURL) {
        await this.page.goto(baseURL);
        logger.info("Navigated to "+ baseURL);
    }
    async fillUsername(username) {
        await this.usernameInputSelector.fill(username);
        logger.info("Filled username "+username);
    }
    async fillUsername_selfheal(username) {
        let usernameInputLocator = await findValidElement(this.page,this.usernameInputSelectors );
        await usernameInputLocator?.fill(username); //Safely checks (using optional chaining ?.) if usernameInputLocator is not null or undefined then fill username, thus preventing runtime error.
        const enteredValue = await usernameInputLocator?.inputValue();
        expect(enteredValue).toBe(username);
      }
      async fillPassword(password) {
        await this.passwordInputSelector.fill(password);
        logger.info("Filled password");
      }
      async clickLoginButton() {
        await this.loginButtonSelector.click() 
                                // Attempt to click the login button
          .catch((error) => {
            logger.error(`Error clicking login button: ${error}`);
            throw error; // Rethrow the error if needed
          })
          .then(() => logger.info("Clicked login button"));  // Log success if click succeeds
      
        //const homePage = new HomePage(this.page);  // Create a new HomePage object
        //return homePage;  // Return the HomePage object after clicking the login button
      }
      
}