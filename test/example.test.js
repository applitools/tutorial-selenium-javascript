'use strict';

require('chromedriver');
const { Builder, Capabilities, By} = require('selenium-webdriver');
const { Eyes, Target, GeneralUtils} = require('eyes.selenium');

describe('DemoApp - Original', function () {
    let eyes, driver;

    beforeEach(async () => {
        // Initialize the eyes SDK and set your private API key
        eyes = new Eyes();

        // Add your API key (the API key can be set via APPLITOOLS_API_KEY env variable)
        // You can get your api key from the Applitools dashboard
        eyes.setApiKey('APPLITOOLS_API_KEY');

        // set new batch
        eyes.setBatch({
            id: GeneralUtils.guid(),
            name: 'Demo batch',
            startedAt: new Date().toUTCString(),
        });

        // Use Chrome browsert
        driver = await new Builder()
            .withCapabilities(Capabilities.chrome())
            .build();
    });

    it('Smoke Test', async () => {
        // Start the test and set the App name, the Test name and the browser's viewport size to 800x600.
        await eyes.open(driver, 'Demo App', 'Smoke Test', { width: 800, height: 600});

        // Navigate the browser to the "ACME" demo app.
        await driver.get("https://demo.applitools.com");

        // To see visual bugs after the first run, use the commented line below instead.
        // await driver.get("https://demo.applitools.com/index_v2.html");

        // Visual checkpoint #1 - Check the login page.
        await eyes.check("Login Window", Target.window().fully());

        // This will create a test with two test steps.
        await driver.findElement(By.id("log-in")).click();

        // Visual checkpoint #2 - Check the app page.
        await eyes.check("App Window", Target.window().fully());

        // End the test.
        const results = await eyes.close();
        console.log(results);
    });

    afterEach(async () => {
        // Close the browser.
        await driver.quit();

        // If the test was aborted before eyes.close was called, ends the test as aborted.
        await eyes.abortIfNotClosed();
    });
});