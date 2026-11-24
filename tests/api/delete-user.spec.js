
import { test, expect } from '@playwright/test';

import postsData from '../../test-data/api/posts.json' with { type: 'json' };

import ApiUtils from '../../utils/ApiUtils.js';




// TC20: Delete a post
test('TC20 - Should delete a post successfully', async ({ request }) => {

    const startTime = Date.now();

    const response = await request.delete(
        `/posts/${postsData.validPostId}`
    );

    const responseTime = Date.now() - startTime;

    // Status validation
    ApiUtils.validateStatus(response, 200);

    // Header validation
    await ApiUtils.validateJsonHeader(response);

    // Response time validation
    ApiUtils.validateResponseTime(responseTime);

    // Response body validation
    const deletedPost = await response.json();

    expect(deletedPost).toEqual({});

});


