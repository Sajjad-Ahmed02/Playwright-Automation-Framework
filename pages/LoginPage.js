
class LoginPage {

    constructor(page) {
        this.page = page;

        // Locators
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login');
    }

    // Actions
    async navigate() {
        await this.page.goto('/');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click(); 
    }

}

export default LoginPage;
