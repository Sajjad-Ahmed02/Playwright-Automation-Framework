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
