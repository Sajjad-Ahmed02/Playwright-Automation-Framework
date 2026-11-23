
class SearchPage {
    constructor(page) {
        this.page = page;

        this.locationDropdown = page.locator('#location');
        this.hotelDropdown = page.locator('#hotels');
        this.roomTypeDropdown = page.locator('#room_type');
        this.numberOfRoomsDropdown = page.locator('#room_nos');
        this.adultsDropdown = page.locator('#adult_room');
        this.childrenDropdown = page.locator('#child_room');
        
        this.checkInDate = page.locator('#datepick_in');
        this.checkOutDate = page.locator('#datepick_out');

        this.checkOutError = page.locator('#datepick_out_span');
        this.searchButton = page.locator('#Submit');
        this.checkInError = this.page.getByText(
            'Please Select Check-In Date',
            { exact: true }
        );
        this.locationError = page.locator('#location_span');
    }

    async fillSearchForm(data) {
        if (data.location) {
            await this.locationDropdown.selectOption({
                label: data.location
            });
        }

        if (data.hotel) {
            await this.hotelDropdown.selectOption({
                label: data.hotel
            });
        }

        if (data.roomType) {
            await this.roomTypeDropdown.selectOption({
                label: data.roomType
            });
        }

        if (data.numberOfRooms) {
            await this.numberOfRoomsDropdown.selectOption(
                data.numberOfRooms
            );
        }

        await this.checkInDate.fill(data.checkIn);
        await this.checkOutDate.fill(data.checkOut);

        if (data.adults) {
            await this.adultsDropdown.selectOption(data.adults);
        }

        if (data.children) {
            await this.childrenDropdown.selectOption(data.children);
        }
    }

    async searchHotels() {
        await this.searchButton.click();
    }
}

export default SearchPage;
