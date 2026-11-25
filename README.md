# Test reports

Playwright produces both its HTML report and Allure results for each test run.

- `npm test` runs the tests and writes the Playwright report to `reports/html`.
- `npm run report` opens the latest Playwright HTML report.
- `npm run test:allure` clears previous Allure results, then runs the full test suite.
- `npm run allure:generate` builds a static Allure report in `reports/allure-report`.
- `npm run allure:open` opens the generated Allure report.
- `npm run allure:serve` serves a report directly from `reports/allure-results`.

To run a subset of tests, append Playwright options, for example:
`npm run test:allure -- --project=api`.

## Docker

Build the image from the repository root:

```powershell
docker build -t playwright-tests .
```

The image runs Playwright headless and does not contain `.env`. Pass the
credentials at runtime for UI tests. The API project defaults to
JSONPlaceholder, or can use `API_BASE_URL` from `.env`.

In PowerShell, mount output folders so reports remain available after the
container exits:

```powershell
$repo = (Get-Location).Path
$outputs = @(
  "--mount", "type=bind,source=$repo\reports,target=/app/reports",
  "--mount", "type=bind,source=$repo\test-results,target=/app/test-results",
  "--mount", "type=bind,source=$repo\screenshots,target=/app/screenshots"
)
```

Run API tests without passing UI credentials:

```powershell
docker run --rm @outputs playwright-tests --project=api
```

Run the complete suite (or a browser project) with credentials:

```powershell
docker run --rm --env-file .env @outputs playwright-tests
docker run --rm --env-file .env @outputs playwright-tests --project=chromium
docker run --rm --env-file .env @outputs playwright-tests --project=firefox
docker run --rm --env-file .env @outputs playwright-tests --project=webkit
```

The HTML report is written to `reports\html`; Allure results are written to
`reports\allure-results`. Open the HTML report locally with:

```powershell
npm run report
```
