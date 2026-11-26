# Playwright Automation Framework

This repository provides a modular test automation framework for UI and API testing. It uses Playwright Test, JavaScript, the Page Object Model, reusable utilities, JSON test data, Playwright HTML reports, Allure reports, Docker, and Jenkins CI/CD.

The UI suite validates workflows in the Adactin Hotel Booking application. The API suite validates users and posts against JSONPlaceholder or a configurable API endpoint.

## Technology Stack

| Area | Technology |
| --- | --- |
| Test runner | Playwright Test |
| Language | JavaScript ES modules |
| UI design pattern | Page Object Model |
| Test data | JSON |
| Environment configuration | dotenv |
| HTML reporting | Playwright HTML Reporter |
| Detailed reporting | Allure Playwright and Allure Commandline |
| Containerization | Docker |
| CI/CD | Jenkins |

## Requirements

Install the following before running the framework:

- Node.js 20 or later
- npm
- Git
- Java, required to generate and open Allure reports
- Docker, optional for container-based execution
- Valid Adactin account credentials for UI tests

## Setup

1. Clone the repository:

```powershell
git clone https://github.com/Sajjad-Ahmed02/Playwright-Automation-Framework.git
cd Playwright-Automation-Framework
```

2. Install dependencies:

```powershell
npm install
```

3. Install Playwright browsers:

```powershell
npx playwright install
```

On Linux systems, install operating system dependencies if prompted:

```bash
npx playwright install --with-deps
```

4. Create the environment file:

```powershell
Copy-Item .env.example .env
```

5. Add the required values to `.env`:

```dotenv
ADACTIN_USERNAME=your_username
ADACTIN_PASSWORD=your_password
API_BASE_URL=https://jsonplaceholder.typicode.com
```

Do not commit `.env`. It is excluded through `.gitignore`.

## Running Tests

Run the complete suite:

```powershell
npm test
```

Run the UI suite in Chromium, Firefox, or WebKit:

```powershell
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

Run UI tests in headed mode:

```powershell
npm run test:headed
```

Run the API suite:

```powershell
npm run test:api
```

Run a specific test or test file:

```powershell
npx playwright test tests/ui/auth.spec.js
npx playwright test tests/api/get-users.spec.js
```

Filter tests by title:

```powershell
npx playwright test --grep "TC15"
```

When `CI` is set, the configuration disables `forbidOnly`, enables one retry, and uses three workers. For local runs, the worker count is one.

## Test Coverage

The UI suite covers authentication, hotel search, hotel selection, booking, validation errors, and logout behavior.

The API suite covers:

- Retrieving all users
- Retrieving a single user
- Creating a user
- Updating a user
- Performing a partial update
- Deleting a user
- Retrieving posts

## Project Structure

```text
config/             Environment and credential configuration
docs/               Architecture and framework documentation
fixtures/           Shared Playwright fixtures and lifecycle hooks
pages/              Page Object classes
test-data/          JSON input and expected test data
tests/api/          API test specifications
tests/ui/           UI test specifications
utils/              Shared API, navigation, logging, waiting, and screenshot helpers
reports/            Generated HTML and Allure reports
screenshots/        Framework screenshots
test-results/       Playwright traces, videos, and failure artifacts
Dockerfile          Container configuration
JenkinsFile         Jenkins pipeline file
playwright.config.js Playwright projects and global configuration
```

The UI and API suites are registered as separate Playwright projects in `playwright.config.js`. The UI projects run tests under `tests/ui` in Chromium, Firefox, and WebKit. The API project runs tests under `tests/api` against `API_BASE_URL`.

For design details, see [architecture documentation](./docs/architecture.md).

## Reports

Each test run writes an HTML report to `reports/html` and Allure result files to `reports/allure-results`.

Open the Playwright HTML report:

```powershell
npm run report
```

Run the suite and clear previous Allure results:

```powershell
npm run test:allure
```

Generate a static Allure report:

```powershell
npm run allure:generate
```

Open the generated Allure report:

```powershell
npm run allure:open
```

Serve the latest Allure results directly:

```powershell
npm run allure:serve
```

On failure, Playwright captures screenshots, traces, and videos according to the configured retention settings.

## Docker

Build the image:

```powershell
docker build -t playwright-tests .
```

Run API tests. No Adactin credentials are required:

```powershell
docker run --rm playwright-tests --project=api
```

Run a browser project with credentials from `.env`:

```powershell
docker run --rm --env-file .env playwright-tests --project=chromium
docker run --rm --env-file .env playwright-tests --project=firefox
docker run --rm --env-file .env playwright-tests --project=webkit
```

Run the complete suite with credentials:

```powershell
docker run --rm --env-file .env playwright-tests
```

Persist reports and artifacts on the host by mounting the output directories:

```powershell
$repo = (Get-Location).Path

docker run --rm --env-file .env `
  --mount type=bind,source="$repo\reports",target=/app/reports `
  --mount type=bind,source="$repo\test-results",target=/app/test-results `
  --mount type=bind,source="$repo\screenshots",target=/app/screenshots `
  playwright-tests
```

The Docker image includes Playwright and its browsers. API tests default to JSONPlaceholder unless `API_BASE_URL` is provided.

## Jenkins CI/CD

The `JenkinsFile` defines a Windows-compatible declarative pipeline that builds the Docker image and runs the complete Playwright suite.

The pipeline provides:

- GitHub push triggers through `githubPush()`
- Docker image builds
- Secret environment-file injection
- Container-based test execution
- Playwright HTML report publication
- Container cleanup after each build

### Jenkins Requirements

Configure the Jenkins node with:

- Git
- Docker Desktop or Docker Engine accessible from the Jenkins agent
- Windows batch command support
- The HTML Publisher plugin
- A Jenkins secret file credential containing `.env`

Create the credential as a secret file and assign it the credential ID `playwright-env`. The file must contain the required environment variables:

```dotenv
ADACTIN_USERNAME=your_username
ADACTIN_PASSWORD=your_password
API_BASE_URL=https://jsonplaceholder.typicode.com
```

The Jenkins pipeline uses the following Docker names:

```text
Image:      playwright-tests:jenkins-test
Container:  playwright-tests-jenkins-<BUILD_NUMBER>
```

### Pipeline Execution

Create a Jenkins Pipeline job and select `JenkinsFile` as the Jenkinsfile. Trigger a build through GitHub push or start it manually.

The pipeline executes these stages:

1. Builds the Docker image from the repository root.
2. Mounts the `playwright-env` secret file into the test container with `--env-file`.
3. Runs the Playwright entrypoint from the Docker image.
4. Copies `/app/reports/html` from the container to `playwright-report` on the Jenkins workspace.
5. Removes the test container.
6. Publishes `playwright-report/index.html` as the `Playwright HTML Report`.

The report remains available from the Jenkins build page. It is also configured to remain available for earlier builds through the HTML Publisher settings.

For a Jenkins host that does not run Windows batch commands, the pipeline must be adapted to use a Linux agent and Unix shell commands.

## Configuration

Global configuration is maintained in `playwright.config.js`.

Key settings include:

- Test directory: `tests`
- UI base URL: `https://adactinhotelapp.com/HotelAppBuild2/`
- Test timeout: 45 seconds
- Expect timeout: 10 seconds
- Action timeout: 10 seconds
- Navigation timeout: 30 seconds
- Screenshot and trace retention on failure
- Parallel execution
- HTML and Allure reporters

## Troubleshooting

If browser executables are missing, run:

```powershell
npx playwright install
```

If UI tests fail because credentials are missing, verify that `.env` exists and contains both `ADACTIN_USERNAME` and `ADACTIN_PASSWORD`.

If an API request fails, verify `API_BASE_URL` and network access to the target service.

If Allure cannot start, verify that Java is installed and available in `PATH`.

## License

No license has been specified for this repository.
