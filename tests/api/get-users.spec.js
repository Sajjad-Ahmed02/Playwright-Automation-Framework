
import { test, expect } from '@playwright/test';

import usersData from '../../test-data/api/users.json' with { type: 'json' };

import ApiUtils from '../../utils/ApiUtils.js';




// TC15: Retrieve all users
test('TC15 - Should retrieve all users successfully', async ({ request }) => {

    const startTime = Date.now();

    const response = await request.get('/users');

    const responseTime = Date.now() - startTime;

    // Status validation
    ApiUtils.validateStatus(response, 200);

    // Header validation
    await ApiUtils.validateJsonHeader(response);

    // Response time validation
    ApiUtils.validateResponseTime(responseTime);

    // Response body validation
    const users = await response.json();

    ApiUtils.validateArray(users);

    expect(users.length).toBeGreaterThan(0);

    // Schema validation
    users.forEach(user => {
        ApiUtils.validateUserSchema(user);
    });

    // Verify first user
    expect(users[0].id).toBe(usersData.validUserId);

    expect(users[0].name).toBe(
        usersData.expectedFirstUser.name
    );

});


// TC16: Retrieve a single user
test('TC16 - Should retrieve a single user successfully', async ({ request }) => {

    const startTime = Date.now();

    const response = await request.get(
        `/users/${usersData.validUserId}`
    );

    const responseTime = Date.now() - startTime;

    // Status validation
    ApiUtils.validateStatus(response, 200);

    // Header validation
    await ApiUtils.validateJsonHeader(response);

    // Response time validation
    ApiUtils.validateResponseTime(responseTime);

    // Response body validation
    const user = await response.json();

    ApiUtils.validateObject(user);

    ApiUtils.validateUserSchema(user);

    expect(user.id).toBe(usersData.validUserId);

    expect(user.name).toBe(
        usersData.expectedFirstUser.name
    );

    expect(user.email).toBe(
        usersData.expectedFirstUser.email
    );

});

