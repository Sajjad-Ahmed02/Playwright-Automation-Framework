
class BookingPage {
    constructor(page) {
        this.page = page;

        // Personal details
        this.firstName = page.locator('#first_name');
        this.lastName = page.locator('#last_name');
        this.address = page.locator('#address');

        // Payment details
        this.cardNumber = page.locator('#cc_num');
        this.cardType = page.locator('#cc_type');
        this.expiryMonth = page.locator('#cc_exp_month');
        this.expiryYear = page.locator('#cc_exp_year');
        this.cvv = page.locator('#cc_cvv');

        // Actions
        this.bookNowButton = page.locator('#book_now');

        // Validation messages
        this.firstNameError = page.locator('#first_name_span');
        this.lastNameError = page.locator('#last_name_span');
        this.cardNumberError = page.locator('#cc_num_span');
    }

    async fillBookingForm(data) {
        await this.firstName.fill(data.firstName);
        await this.lastName.fill(data.lastName);
        await this.address.fill(data.address);

        await this.cardNumber.fill(data.creditCardNumber);
        await this.cardType.selectOption({ label: data.creditCardType });
        await this.expiryMonth.selectOption(data.expiryMonth);
        await this.expiryYear.selectOption(data.expiryYear);
        await this.cvv.fill(data.cvv);
    }

    async bookHotel() {
        await this.bookNowButton.click();
    }
}

export default BookingPage;
