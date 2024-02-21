import { expect } from '@playwright/test';
import { test } from '../fixtures/test';

test.describe('Sample test suite for Network Intercept ', () => {

  test('Book a room with Safety is highlighted', async ({ page, bookingRoomPage, networkInterceptor }) => {
    await page.goto('');
    await page.getByRole('button', { name: 'Let me hack!' }).click();

    await bookingRoomPage.fillInBookingDetails({
      specialFeature: 'Safe',
      firstname: 'Nicholas',
      lastname: 'Perera',
      email: 'saman@gmail.com',
      phone: '1234567898086',
    });

    await bookingRoomPage.submit();
  });

  test('Book a room with Free cot avilable', async ({ page, bookingRoomPage, networkInterceptor }) => {

    /**
     * Intercept the response of rooms data
     */
    var filePath = '../test-data/json/rooms.json'
    var urlToIntercept = 'https://automationintesting.online/room/';
    networkInterceptor.InterceptResponseBody(urlToIntercept, filePath);

    await page.goto('');
    await page.getByRole('button', { name: 'Let me hack!' }).click();

    await bookingRoomPage.fillInBookingDetails({
      specialFeature: 'Free cot',
      firstname: 'Nicholas',
      lastname: 'Perera',
      email: 'saman@gmail.com',
      phone: '1234567898086',
    });

    /**
     * Intercept the booking request
     */
    var filePath = '../test-data/json/bookingSuccess.json'
    var urlToIntercept = 'https://automationintesting.online/booking/';
    networkInterceptor.InterceptRequest(urlToIntercept, filePath);

    await test.step('Click on Submit button"', async () => {
      await Promise.all([
        page.waitForResponse(urlToIntercept),
        bookingRoomPage.submit(),
      ]);
    });

    expect(bookingRoomPage.verifySuccessMessage).toBeTruthy;
  });


  test('Check the error message when the room is already booked ', async ({ page, bookingRoomPage, networkInterceptor }) => {
    await page.goto('');
    await page.getByRole('button', { name: 'Let me hack!' }).click();

    await bookingRoomPage.fillInBookingDetails({
      specialFeature: 'Safe',
      firstname: 'Nicholas',
      lastname: 'Perera',
      email: 'saman@gmail.com',
      phone: '1234567898086',
    });

    /**
     * Intercept the booking response for validate conflicts error message
     */
    var filePath = '../test-data/json/bookingConflicts.json'
    var urlToIntercept = 'https://automationintesting.online/booking/';
    networkInterceptor.InterceptResponseWithError(urlToIntercept, 409, filePath)

    await test.step('Click on Submit button"', async () => {
      await Promise.all([
        page.waitForResponse(urlToIntercept),
        bookingRoomPage.submit(),
      ]);
    });

    expect(bookingRoomPage.verfyErrorMessage('The room dates are either invalid or are already booked for one or more of the dates that you have selected.')).toBeTruthy;
  });

});