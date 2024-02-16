import { NetworkInterceptor } from '../utils/networkInterceptor';
import { test } from '@playwright/test';

export const networkInterceptor = test.extend<{
    networkInterceptor: NetworkInterceptor;
}>({
  async networkInterceptor({ page }, use) {
    const networkInterceptor = new NetworkInterceptor(page);
    await use(networkInterceptor);
  },
});