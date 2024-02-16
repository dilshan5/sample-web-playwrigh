import { Page } from "@playwright/test";

interface BookingData {
    specialFeature?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    subject?: string;
}

export class BookingRoom {
    constructor(private page: Page) {}

    async fillInBookingDetails(bookingData: BookingData){
        await this.page.locator('div.row.hotel-room-info')
        .filter({hasText: bookingData.specialFeature})
        .getByRole('button', { name: 'Book this room' }).click();
        await this.page.getByPlaceholder('Firstname').fill(bookingData.firstname);
        await this.page.getByPlaceholder('Lastname').fill(bookingData.lastname);
        await this.page.locator('input[name="email"]').fill(bookingData.email);
        await this.page.locator('input[name="phone"]').fill(bookingData.phone); 

        await this.page.locator('div.rbc-date-cell').filter({hasText: '11'})
        .dragTo(this.page.locator('div.rbc-date-cell').filter({hasText: '13'}));
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Book', exact: true }).click();
      }

}