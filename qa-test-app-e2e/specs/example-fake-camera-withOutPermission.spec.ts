import { expect } from '@playwright/test';
import { test } from '../fixtures/test';

test.use({
    launchOptions: {
        args: [
            '--deny-permission-prompts',
        ],
    }
});

test.describe('Example for fake camera - without camera permission ', () => {

    test('web camera video', async ({ page }) => {
        await page.goto('https://webcamtests.com/');
        await page.getByLabel('Consent', { exact: true }).click();
        await page.getByRole('button', { name: 'Test my cam' }).click();
    });
});
