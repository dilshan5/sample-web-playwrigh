import { expect } from '@playwright/test';
import { test } from '../fixtures/test';

test.use({
    headless: true,
    launchOptions: {
        args: [
            '--no-sandbox',
            '--allow-file-access-from-files',
            '--use-fake-ui-for-media-stream',
            '--use-fake-device-for-media-stream',
            '--use-file-for-fake-video-capture=./qa-test-app-e2e/test-data/fakeIds/valid-front-dl.y4m',
        ],
    }
});

test.describe('Example for fake camera ', () => {

    test('Load a fake web camera video', async ({ page }) => {
        await page.goto('https://webcamtests.com/');
        await page.getByLabel('Consent', { exact: true }).click();
        await page.getByRole('button', { name: 'Test my cam' }).click();
    });
});
