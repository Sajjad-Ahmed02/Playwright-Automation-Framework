
import { defineConfig, devices } from '@playwright/test';

import { API_BASE_URL } from './config/environment.js';

export default defineConfig({

    testDir: './tests',

    fullyParallel: true,

    forbidOnly: !!process.env.CI,

    retries: process.env.CI ? 1 : 0,

    workers: process.env.CI ? 1 : 3,

    timeout: 45000,

    globalTimeout: 30 * 60 * 1000,

    expect: {
        timeout: 10000
    },

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

        headless: true,

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
            testMatch: '**/ui/**/*.spec.js',
            use: {
                ...devices['Desktop Chrome']
            }
        },

        // UI Testing - Firefox
        {
            name: 'firefox',
            testMatch: '**/ui/**/*.spec.js',
            use: {
                ...devices['Desktop Firefox']
            }
        },

        // UI Testing - WebKit
        {
            name: 'webkit',
            testMatch: '**/ui/**/*.spec.js',
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
