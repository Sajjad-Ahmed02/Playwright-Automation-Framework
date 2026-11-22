
# Playwright Automation Framework

## 1. Project Overview

A modular test automation framework developed using
Playwright and JavaScript.

The framework supports:
- UI automation
- API automation
- Page Object Model
- Data-driven testing
- Reusable utilities
- Automated reporting
- Docker containerization
- Jenkins CI/CD

## 2. Architecture

The framework follows a layered architecture:

1. Test Execution Layer
2. UI Automation Layer
3. API Automation Layer
4. Page Object Layer
5. Shared Utilities and Fixtures Layer
6. Test Data and Configuration Layer
7. Reporting Layer
8. Infrastructure Layer

## 3. Technology Stack

| Component | Technology |
|---|---|
| Language | JavaScript |
| Runtime | Node.js |
| Automation | Playwright |
| Design Pattern | POM |
| Test Data | JSON |
| Reporting | Allure |
| Version Control | Git and GitHub |
| Containerization | Docker |
| CI/CD | Jenkins |

## 4. Applications Under Test

### UI Application
Adactin Hotel Booking

https://adactinhotelapp.com/

### API Application
JSONPlaceholder

https://jsonplaceholder.typicode.com/

## 5. Test Execution

The framework supports:
- Chromium
- Firefox
- WebKit
- API testing

All tests are executed through the Playwright Test Runner.

## 6. Reporting

Allure will be used to generate consolidated
UI and API execution reports.

## 7. CI/CD

Jenkins will build and execute the framework
inside Docker containers.
