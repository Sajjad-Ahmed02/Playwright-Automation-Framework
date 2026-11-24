
import { test, expect } from '@playwright/test';

import usersData from '../../test-data/api/users.json' with { type: 'json' };

import ApiUtils from '../../utils/ApiUtils.js';




// TC17: Create a new user
test('TC17 - Should create a new user successfully', async ({ request }) => {

    const startTime = Date.now();

    const response = await request.post('/users', {
        data: usersData.newUser
    });

    const responseTime = Date.now() - startTime;

    // Status validation
    ApiUtils.validateStatus(response, 201);

    // Header validation
    await ApiUtils.validateJsonHeader(response);

    // Response time validation
    ApiUtils.validateResponseTime(responseTime);

    // Response body validation
    const createdUser = await response.json();

    ApiUtils.validateObject(createdUser);

    // Schema validation
    ApiUtils.validateUserSchema(createdUser);

    // Verify submitted data
    expect(createdUser.name).toBe(
        usersData.newUser.name
    );

    expect(createdUser.username).toBe(
        usersData.newUser.username
    );

    expect(createdUser.email).toBe(
        usersData.newUser.email
    );

    // Verify generated ID
    expect(createdUser.id).toBeDefined();

    expect(typeof createdUser.id).toBe('number');

});


