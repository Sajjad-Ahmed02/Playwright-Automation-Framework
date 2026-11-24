
class SelectHotelPage {
    constructor(page) {
        this.page = page;

        this.hotelRadio = page.locator('input[type="radio"]').first();
        this.continueButton = page.locator('#continue');
        this.cancelButton = page.locator('#cancel');
    }

    async selectHotel() {
        await this.hotelRadio.check();
    }

    async continueToBooking() {
        await this.continueButton.click();
    }
}

export default SelectHotelPage;
