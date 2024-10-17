import { expect, test } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import {encryptEnvFile} from "../utils/EncryptEnvFile";
import {decrypt} from "../utils/CryptojsUtil";
require('dotenv').config(); 


test("simple login test with self heal", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage(decrypt(process.env.prodURL));
    await loginPage.fillUsername_selfheal(decrypt(process.env.username));
    await loginPage.fillPassword(decrypt(process.env.password));
    const homePage = await loginPage.clickLoginButton();
    await homePage.expectServiceTitleToBeVisible();
  });

test.skip("encrypt env file", async() => {
    encryptEnvFile()
})