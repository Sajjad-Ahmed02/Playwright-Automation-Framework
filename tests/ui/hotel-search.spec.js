
import 'dotenv/config';

import { readFileSync } from 'node:fs';

import { test, expect } from '../../fixtures/testFixtures.js';

// Load test data
const searchData = JSON.parse(
    readFileSync(
        new URL('../../test-data/ui/hotel-search.json', import.meta.url),
        'utf-8'
    )
);

test.beforeEach(async ({ loginPage }) => {

    const username = process.env.ADACTIN_USERNAME;
    const password = process.env.ADACTIN_PASSWORD;

    if (!username || !password) {
        throw new Error('Adactin credentials are missing from .env');
    }

    await loginPage.navigate();
    await loginPage.login(username, password);

});

test('TC05 - Search hotel with valid details', async ({ page, searchPage }) => {

    await searchPage.fillSearchForm(searchData.validSearch);

    await searchPage.searchHotels();

    await expect(page).toHaveURL(/SelectHotel/i);

});

test('TC06 - Search hotel without location', async ({ searchPage }) => {

    await searchPage.fillSearchForm(searchData.missingLocation);

    await searchPage.searchHotels();

    await expect(searchPage.locationError).toBeVisible();

});

test('TC07 - Search hotel with invalid dates', async ({ page, searchPage }) => {

    await searchPage.fillSearchForm(searchData.invalidDates);

    await searchPage.searchHotels();

    console.log('Current URL:', page.url());

    console.log(
        'Page content:',
        await page.locator('body').innerText()
    );

    await page.screenshot({
        path: 'screenshots/TC07-invalid-dates.png',
        fullPage: true
    });

});
test('TC08 - Search hotel without check-in date', async ({ searchPage }) => {

    await searchPage.fillSearchForm(searchData.missingCheckIn);

    await searchPage.searchHotels();

    await expect(searchPage.checkInError).toBeVisible();

});
