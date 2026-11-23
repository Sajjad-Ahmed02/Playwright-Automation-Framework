
import { test, expect } from '@playwright/test';

test('Verify Adactin application is accessible', async ({ page }) => {

  await page.goto('./');

  await expect(page).toHaveURL(/adactinhotelapp/);

  await expect(page.locator('body')).toBeVisible();

});
