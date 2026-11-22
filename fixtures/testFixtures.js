
import { test as base, expect } from '@playwright/test';

import LoginPage from '../pages/LoginPage.js';
import NavigationBar from '../pages/NavigationBar.js';

const test = base.extend({

    loginPage: async ({ page }, use) => {

        const loginPage = new LoginPage(page);

        await use(loginPage);

    },

    navigationBar: async ({ page }, use) => {

        const navigationBar = new NavigationBar(page);

        await use(navigationBar);

    }

});

test.beforeEach(async ({ page }, testInfo) => {

    console.log(`Starting test: ${testInfo.title}`);

});

// Global test cleanup
test.afterEach(async ({ page }, testInfo) => {

    if (testInfo.status !== 'passed') {

        await page.screenshot({
            path: testInfo.outputPath('failure.png'),
            fullPage: true
        });

    }

});

export { test, expect };
