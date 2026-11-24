
import 'dotenv/config';

import { readFileSync } from 'node:fs';

import { test, expect } from '../../fixtures/testFixtures.js';
import { credentials } from '../../config/environment.js';
const searchData = JSON.parse(
    readFileSync(
        new URL('../../test-data/ui/hotel-search.json', import.meta.url),
        'utf-8'
    )
);

const bookingData = JSON.parse(
    readFileSync(
        new URL('../../test-data/ui/booking.json', import.meta.url),
        'utf-8'
    )
);


test('TC14 - Complete end-to-end hotel booking journey', async ({
    page,
    loginPage,
    searchPage,
    selectHotelPage,
    bookingPage,
    bookingConfirmationPage,
    navigationBar
}) => {

    const username = credentials.username;
    const password = credentials.password;

    if (!username || !password) {
        throw new Error('Adactin credentials are missing from .env');
    }

    await loginPage.navigate();
    await loginPage.login(username, password);

    await expect(searchPage.locationDropdown).toBeVisible();


    await searchPage.fillSearchForm(searchData.validSearch);
    await searchPage.searchHotels();

    await expect(page).toHaveURL(/SelectHotel/i);


    await selectHotelPage.selectHotel();
    await selectHotelPage.continueToBooking();

    await expect(bookingPage.firstName).toBeVisible();


    await bookingPage.fillBookingForm(bookingData.validBooking);


    await bookingPage.bookHotel();

    await expect(bookingConfirmationPage.orderNumber).toBeVisible({
        timeout: 30000
    });
    await expect(bookingConfirmationPage.orderNumber).toHaveValue(/\S+/);

    await navigationBar.logout();

    await expect(page).toHaveURL(/Logout\.php/i);

});
