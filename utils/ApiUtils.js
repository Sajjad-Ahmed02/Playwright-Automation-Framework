
import { expect } from '@playwright/test';

class ApiUtils {

    // Validate HTTP status code
    static validateStatus(response, expectedStatus) {
        expect(response.status()).toBe(expectedStatus);
    }

    // Validate response content type
    static async validateJsonHeader(response) {
        const contentType = response.headers()['content-type'];

        expect(contentType).toContain('application/json');
    }

    // Validate response time
    static validateResponseTime(responseTime, maxTime = 5000) {
        expect(responseTime).toBeLessThan(maxTime);
    }

    // Validate that response body is an object
    static validateObject(data) {
        expect(data).toBeDefined();
        expect(data).not.toBeNull();
        expect(typeof data).toBe('object');
        expect(Array.isArray(data)).toBe(false);
    }

    // Validate that response body is an array
    static validateArray(data) {
        expect(Array.isArray(data)).toBe(true);
    }

    // Validate common user fields
    static validateUserSchema(user) {
        expect(user).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                username: expect.any(String),
                email: expect.any(String)
            })
        );
    }

    // Validate common post fields
    static validatePostSchema(post) {
        expect(post).toEqual(
            expect.objectContaining({
                userId: expect.any(Number),
                id: expect.any(Number),
                title: expect.any(String),
                body: expect.any(String)
            })
        );
    }
}

export default ApiUtils;
