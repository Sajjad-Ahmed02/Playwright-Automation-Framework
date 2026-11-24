
import { test as base, expect } from '@playwright/test';

import LoginPage from '../pages/LoginPage.js';
import SearchPage from '../pages/SearchPage.js';
import NavigationBar from '../pages/NavigationBar.js';
import SelectHotelPage from '../pages/SelectHotelPage.js';
import BookingPage from '../pages/BookingPage.js';
import BookingConfirmationPage from '../pages/BookingConfirmationPage.js';
const test = base.extend({

    loginPage: async ({ page }, use) => {

        const loginPage = new LoginPage(page);

        await use(loginPage);

    },

    navigationBar: async ({ page }, use) => {

        const navigationBar = new NavigationBar(page);

        await use(navigationBar);

    },
    searchPage: async ({ page }, use) => {
        const searchPage = new SearchPage(page);
        await use(searchPage);
    }
    ,
    selectHotelPage: async ({ page }, use) => {
        const selectHotelPage = new SelectHotelPage(page);
        await use(selectHotelPage);
    },

    bookingPage: async ({ page }, use) => {
        const bookingPage = new BookingPage(page);
        await use(bookingPage);
    },

    bookingConfirmationPage: async ({ page }, use) => {
        const bookingConfirmationPage = new BookingConfirmationPage(page);
        await use(bookingConfirmationPage);
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
