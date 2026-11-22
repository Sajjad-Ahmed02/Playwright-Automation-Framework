
class NavigationBar {

    constructor(page) {
        this.page = page;

        this.logoutLink = page.getByRole('link', {
            name: /^logout$/i
        });
    }

    async logout() {
        await this.logoutLink.click();
    }

}

export default NavigationBar;
    