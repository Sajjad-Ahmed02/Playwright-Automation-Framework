
import { test, expect } from '@playwright/test';

import postsData from '../../test-data/api/posts.json' with { type: 'json' };

import ApiUtils from '../../utils/ApiUtils.js';


// TC18: Update complete post using PUT
test('TC18 - Should update an entire post using PUT', async ({ request }) => {

    const startTime = Date.now();

    const response = await request.put(
        `/posts/${postsData.validPostId}`,
        {
            data: postsData.updatedPost
        }
    );

    const responseTime = Date.now() - startTime;

    // Status validation
    ApiUtils.validateStatus(response, 200);

    // Header validation
    await ApiUtils.validateJsonHeader(response);

    // Response time validation
    ApiUtils.validateResponseTime(responseTime);

    // Response body validation
    const updatedPost = await response.json();

    ApiUtils.validateObject(updatedPost);

    // Schema validation
    ApiUtils.validatePostSchema(updatedPost);

    // Verify updated fields
    expect(updatedPost.id).toBe(
        postsData.validPostId
    );

    expect(updatedPost.title).toBe(
        postsData.updatedPost.title
    );

    expect(updatedPost.body).toBe(
        postsData.updatedPost.body
    );

    expect(updatedPost.userId).toBe(
        postsData.updatedPost.userId
    );

});


// TC19: Partially update post using PATCH
test('TC19 - Should partially update a post using PATCH', async ({ request }) => {

    const startTime = Date.now();

    const response = await request.patch(
        `/posts/${postsData.validPostId}`,
        {
            data: postsData.partialUpdate
        }
    );

    const responseTime = Date.now() - startTime;

    // Status validation
    ApiUtils.validateStatus(response, 200);

    // Header validation
    await ApiUtils.validateJsonHeader(response);

    // Response time validation
    ApiUtils.validateResponseTime(responseTime);

    // Response body validation
    const patchedPost = await response.json();

    ApiUtils.validateObject(patchedPost);

    // Schema validation
    ApiUtils.validatePostSchema(patchedPost);

    // Verify modified field
    expect(patchedPost.title).toBe(
        postsData.partialUpdate.title
    );

    // Verify existing fields remain present
    expect(patchedPost.id).toBe(
        postsData.validPostId
    );

    expect(patchedPost.body).toBeDefined();

    expect(patchedPost.userId).toBeDefined();

});

