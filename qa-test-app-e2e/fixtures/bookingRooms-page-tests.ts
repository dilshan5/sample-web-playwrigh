import { BookingRoom } from '../page-objects/bookingRooms-page';
import { test } from '@playwright/test';

export const bookingRoomTest = test.extend<{
    bookingRoomPage: BookingRoom;
}>({
  async bookingRoomPage({ page }, use) {
    const bookingRoomPage = new BookingRoom(page);
    await use(bookingRoomPage);
  },
});