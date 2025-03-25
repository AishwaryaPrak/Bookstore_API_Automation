# Bookstore API

## Overview

This project is a Bookstore API built with Playwright with typescript. It allows users to manage books and perform user authentication, including login functionalities. The API uses Auth tokens for securing endpoints related to book management.

## Features

- **Book Management**: Users can create, update, delete, and retrieve books.
- **User Authentication**: Includes user login functionalities.
- **Secure Endpoints**: Uses Auth token to secure book management endpoints.

## Technologies

## Features

- **Playwright**: Utilizes the power of Playwright to automate browser interactions.
- **TypeScript**: The framework is implemented using TypeScript for a more structured and maintainable codebase.
- **HTML Report**: Generates a beautiful HTML report to visualize test results.
- **Allure Report**: Generates a beautiful allure custom reporting to visualize test results.

## Prerequisites

Ensure you have the following installed:

- Node.js (https://nodejs.org/)
- npm (comes with Node.js) `npm install`
- TypeScript: `npm install -g typescript`
- Playwright: `npm install -g playwright`
- Allure: `npm install -D allure-playwright`

### Installation

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/merklescience/tracker-ui-automation.git

2. Install dependencies:
   ```bash
   npm install

3. Install all the browsers(Chromium, Firefox and Webkit):
   ```bash
   npx playwright install

4. Execute all the test cases at once:
   ```bash
   npx playwright test

5. Execute allure cmd to view allure report
   ```bash
   allure generate allure-results --clean && allure open

### API Endpoints

- Book Management

    - POST /books/: Create a new book.
    - PUT /books/{book_id}: Update a book by ID.
    - DELETE /books/{book_id}: Delete a book by ID.
    - GET /books/{book_id}: Get a book by ID.
    - GET /books/: Get all books.

- User Authentication:

    - POST /login: Log in and receive an access token.

### License
    This project is licensed under the Apache License - see the LICENSE file for details
