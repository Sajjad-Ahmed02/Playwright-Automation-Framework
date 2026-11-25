
import { defineConfig, devices } from '@playwright/test';

import { API_BASE_URL } from './config/environment.js';

export default defineConfig({

    testDir: './tests',

    fullyParallel: true,

    forbidOnly: !!process.env.CI,

    retries: process.env.CI ? 2 : 0,

    workers: process.env.CI ? 1 : 3,

    reporter: [
        ['list'],
        ['html', {
            outputFolder: 'reports/html',
            open: 'never'
        }],
        ['allure-playwright', {
            resultsDir: 'reports/allure-results'
        }]
    ],

    use: {
        baseURL: 'https://adactinhotelapp.com/HotelAppBuild2/',

        headless: false,

        screenshot: 'only-on-failure',

        trace: 'retain-on-failure',

        video: 'retain-on-failure',

        actionTimeout: 10000,

        navigationTimeout: 30000
    },

    projects: [

        // UI Testing - Chromium
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome']
            }
        },

        // UI Testing - Firefox
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox']
            }
        },

        // UI Testing - WebKit
        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari']
            }
        },

        // API Testing - JSONPlaceholder
        {
            name: 'api',

            testMatch: '**/api/**/*.spec.js',

            use: {
                baseURL: API_BASE_URL,

                screenshot: 'off',

                trace: 'off',

                video: 'off'
            }
        }

    ]

});
