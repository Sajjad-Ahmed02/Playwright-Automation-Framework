
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
test.beforeEach(async ({ page, loginPage, searchPage }) => {

    const username = credentials.username;
    const password = credentials.password;

    if (!username || !password) {
        throw new Error('Adactin credentials are missing from .env');
    }

    await loginPage.navigate();

    // Verify that the login page has loaded
    await expect(loginPage.usernameInput).toBeVisible({ timeout: 90000 });

    await loginPage.login(username, password);

    // Search for a valid hotel
    await searchPage.fillSearchForm(searchData.validSearch);
    await searchPage.searchHotels();

    await expect(page).toHaveURL(/SelectHotel/i);
});
const bookingData = JSON.parse(
    readFileSync(
        new URL('../../test-data/ui/booking.json', import.meta.url),
        'utf-8'
    )
);


test('TC09 - Select hotel and continue to booking', async ({
    page,
    selectHotelPage,
    bookingPage
}) => {

    await selectHotelPage.selectHotel();
    await selectHotelPage.continueToBooking();

    await expect(bookingPage.firstName).toBeVisible();
    await expect(bookingPage.lastName).toBeVisible();
});


test('TC10 - Book hotel with valid details', async ({
    selectHotelPage,
    bookingPage,
    bookingConfirmationPage
}) => {

    await selectHotelPage.selectHotel();
    await selectHotelPage.continueToBooking();

    await bookingPage.fillBookingForm(bookingData.validBooking);
    await bookingPage.bookHotel();

    await expect(bookingConfirmationPage.orderNumber).toBeVisible({
        timeout: 30000
    });
    await expect(bookingConfirmationPage.orderNumber).toHaveValue(/\S+/);

});


test('TC11 - Booking without first name', async ({
    selectHotelPage,
    bookingPage
}) => {

    await selectHotelPage.selectHotel();
    await selectHotelPage.continueToBooking();

    await bookingPage.fillBookingForm(bookingData.missingFirstName);
    await bookingPage.bookHotel();

    await expect(bookingPage.firstNameError).toBeVisible();

});

test('TC12 - Booking without last name', async ({
    selectHotelPage,
    bookingPage
}) => {

    await selectHotelPage.selectHotel();
    await selectHotelPage.continueToBooking();

    await bookingPage.fillBookingForm(bookingData.missingLastName);
    await bookingPage.bookHotel();

    await expect(bookingPage.lastNameError).toBeVisible();

});


test('TC13 - Booking with invalid credit card number', async ({
    selectHotelPage,
    bookingPage
}) => {

    await selectHotelPage.selectHotel();
    await selectHotelPage.continueToBooking();

    await bookingPage.fillBookingForm(bookingData.invalidCardNumber);
    await bookingPage.bookHotel();

    await expect(bookingPage.cardNumberError).toBeVisible();

});
