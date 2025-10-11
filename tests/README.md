# Tests for the Basic Telegram Bot Remastered

This directory contains test files for the Basic Telegram Bot Remastered project. The tests are written using the Jest framework and utilize the `@ilanlal/gasmocks` library to mock Google Apps Script services.

## Strategy

The tests are organized into separate files based on the service or component being tested. Each test file includes necessary imports and setups, such as mocking the `Resources` configuration.

Each test file follows a similar structure, starting with necessary imports, setting up global configurations, and defining test cases using `describe` and `test` blocks.

## Running Tests

To run the tests, ensure you have Jest installed in your development environment. You can run the tests using the following command:

```bash
npm test
```

Make sure to configure Jest to recognize the Google Apps Script environment and the `@ilanlal/gasmocks` library.