import { Page } from "@playwright/test";
import { expect } from '@playwright/test';

interface BookingData {
    specialFeature?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    subject?: string;
}

export class BookingRoom {
    constructor(private page: Page) { }

    /**
     * 
     * @param bookingData Booking information
     */
    async fillInBookingDetails(bookingData: BookingData) {
        await this.page.locator('div.row.hotel-room-info')
            .filter({ hasText: bookingData.specialFeature })
            .getByRole('button', { name: 'Book this room' }).click();
        await this.page.getByPlaceholder('Firstname').fill(bookingData.firstname);
        await this.page.getByPlaceholder('Lastname').fill(bookingData.lastname);
        await this.page.locator('input[name="email"]').fill(bookingData.email);
        await this.page.locator('input[name="phone"]').fill(bookingData.phone);

        await this.page.locator('div.rbc-date-cell').filter({ hasText: '11' })
            .dragTo(this.page.locator('div.rbc-date-cell').filter({ hasText: '13' }));
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Book', exact: true }).click();
    }

    async verfyErrorMessage(errorMessage: string) {
        return await expect(this.page.locator('div.alert.alert-danger')).toContainText(errorMessage);
    }

    async verifySuccessMessage() {
        return await expect(this.page.locator('div.ReactModal__Content.ReactModal__Content--after-open.confirmation-modal')).toContainText('Booking Successful!');
    }

}