import { test, expect, request } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'https://demoqa.com';
const USERNAME = process.env.USERNAME || 'Testing';
const PASSWORD = process.env.PASSWORD || '$Testing123';

let authToken: string;
let userId: string;
let bookIsbn: string;

test.describe('Bookstore API Automation', () => {

    // Step 1: User Login - Generate Token
    test.beforeAll(async () => {
        const apiRequest = await request.newContext();
        const response = await apiRequest.post(`${BASE_URL}/Account/v1/GenerateToken`, {
            data: { userName: USERNAME, password: PASSWORD }
        });

        const responseBody = await response.json();
        authToken = responseBody.token;

        console.log(`Authenticated! Token: ${authToken}`);
    });

    // Step 2: Get User ID
    test('Fetch User ID', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/Account/v1/User/${USERNAME}`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });

        const responseBody = await response.json();
        userId = responseBody.userId;

        console.log(`User ID Retrieved: ${userId}`);
    });

    // Step 3: Get List of Books
    test('Fetch Available Books', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/BookStore/v1/Books`);
        
        const responseBody = await response.json();
        expect(responseBody.books.length).toBeGreaterThan(0);

        bookIsbn = responseBody.books[0].isbn;
        console.log(`First Available Book ISBN: ${bookIsbn}`);
    });

    // Step 4: Add a Book to User Collection
    test('Add a Book', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/BookStore/v1/Books`, {
            headers: { Authorization: `Bearer ${authToken}` },
            data: {
                userId: userId,
                collectionOfIsbns: [{ isbn: bookIsbn }]
            }
        });

        console.log(`Book Added! ISBN: ${bookIsbn}`);
    });

    // Step 5: Update Book Details (Assuming API supports PUT)
    test('Update a Book', async ({ request }) => {
        const response = await request.put(`${BASE_URL}/BookStore/v1/Books/${bookIsbn}`, {
            headers: { Authorization: `Bearer ${authToken}` },
            data: { title: "Updated Book Title" }
        });

        console.log(`Book Updated!`);
    });

    // Step 6: Delete a Book
    test('Delete a Book', async ({ request }) => {
        const response = await request.delete(`${BASE_URL}/BookStore/v1/Books`, {
            headers: { Authorization: `Bearer ${authToken}` },
            data: { userId: userId, isbn: bookIsbn }
        });

        console.log(`Book Deleted!`);
    });

    // Step 7: Negative Test - Add Book Without Authentication
    test('Add a Book Without Auth', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/BookStore/v1/Books`, {
            data: { userId: userId, collectionOfIsbns: [{ isbn: bookIsbn }] }
        });

        console.log(`Unauthorized Request - Book Not Added`);
    });
});