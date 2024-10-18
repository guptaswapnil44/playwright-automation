var { test, page } = require("@playwright/test");
const { decrypt } = require("../utils/CryptojsUtil");
const logger = require("../utils/LoggerUtil");
const contactsPayload = require("../testdata/contacts.json");
const convertCsvFileToJsonFile = require("../utils/CsvtoJsonUtils");
const { exportToCsv, exportToJson, generateTestData } = require("../utils/FakerDataUtils");
const LoginPage = require("../pages/loginPage");


test.describe("Contacts test cases", async () => {

    test.beforeAll(async function ({ browser }) {
        const context = await browser.newContext();
        page = await context.newPage();
        const loginPage = new LoginPage(page);
        global.homePage = await loginPage.userLogin(decrypt(process.env.username), decrypt(process.env.password), decrypt(process.env.prodURL));
        // = await loginPage.clickLoginButton();
        await global.homePage.expectServiceTitleToBeVisible();
    })

    test.skip("simple DD test", async () => {
        logger.info("Test for Contact Creation is started...");
        const fname = "Shiva";
        const lname = "Rudra";
        const contactsPage = await global.homePage.navigateToContactTab();
        await contactsPage.createNewContact(fname, lname);
        await contactsPage.expectContactLabelContainsFirstNameAndLastName(fname, lname);
        logger.info("Test for Contact Creation is completed");
    });


    test(`Create multiple contacts from a json file`, async () => {
        logger.info("Test for Contact Creation is started...");
        for (const contact of contactsPayload) {
            const contactsPage = await global.homePage.navigateToContactTab();
            await contactsPage.createNewContact(contact.firstName, contact.lastName);
            await contactsPage.expectContactLabelContainsFirstNameAndLastName(
                contact.firstName,
                contact.lastName
            );
        }
        logger.info("Test for Contact Creation is completed");
    });

    test.skip("csv to json", async () => {
        convertCsvFileToJsonFile("data.csv", "datademo.json");
    });

    test.skip("Generate test data using FakerUtil", async () => {

        // Generate test data
        const testData = generateTestData(20);

        // Export data to JSON file
        exportToJson(testData, 'testData_en.json');

        // Export data to CSV file
        exportToCsv(testData, 'testData_en.csv');

    });
});
