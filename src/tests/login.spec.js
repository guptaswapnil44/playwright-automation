import { expect, test } from "@playwright/test";
import LoginPage from "../pages/loginPage";
require('dotenv').config(); 

test("simple login test with self heal", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage(process.env.prodURL);
    await loginPage.fillUsername_selfheal(process.env.username);
    await loginPage.fillPassword(process.env.password);
  });