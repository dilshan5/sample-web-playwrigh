import { mergeTests } from '@playwright/test';
import { bookingRoomTest } from './bookingRooms-page-tests';
import { networkInterceptor } from './networkInterceptor-test';

export const test = mergeTests(bookingRoomTest, networkInterceptor);