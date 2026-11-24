import { test, expect } from '../../fixtures/testFixtures.js';

import { credentials } from '../../config/environment.js';

import loginData from '../../test-data/ui/login.json' with { type: 'json' };

const { invalidCredentials, emptyCredentials } = loginData;

test.describe('Authentication Tests', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate();
    });


    // TC01 - Valid Login

    test('TC01 - Login with valid credentials', async ({ page, loginPage }) => {

        await loginPage.login(
            credentials.username,
            credentials.password
        );

        await expect(page).toHaveURL(/SearchHotel/);

    });


    // TC02 - Invalid Login

    test('TC02 - Login with invalid credentials', async ({ page, loginPage }) => {

        await loginPage.login(
            invalidCredentials.username,
            invalidCredentials.password
        );

        // await expect(page).toHaveURL('https://adactinhotelapp.com/HotelAppBuild2/');

        await expect(loginPage.loginError).toBeVisible();

    });


    // TC03 - Empty Credentials

    test('TC03 - Login with empty credentials', async ({ page, loginPage }) => {

        await loginPage.login(
            emptyCredentials.username,
            emptyCredentials.password
        );

        // await expect(page).toHaveURL('https://adactinhotelapp.com/HotelAppBuild2/');

    });


    // TC04 - Logout

    test('TC04 - Logout after successful login', async ({
        page,
        loginPage,
        navigationBar
    }) => {

        await loginPage.login(
            credentials.username,
            credentials.password
        );

        await expect(page).toHaveURL(/SearchHotel/);

        await navigationBar.logout();

        await expect(page).toHaveURL(/Logout\.php/);

    });

});
