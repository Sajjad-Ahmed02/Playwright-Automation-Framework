class BookingConfirmationPage {
    constructor(page) {
        this.page = page;

        this.orderNumber = page.locator('#order_no');
        this.myItineraryButton = page.locator('#my_itinerary');
    }

    async getOrderNumber() {
        return await this.orderNumber.inputValue();
    }
}

export default BookingConfirmationPage;
