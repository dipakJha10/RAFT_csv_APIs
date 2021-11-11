const request = require("supertest");
const app = require("../app");

describe("GET Authors", () => {
    test("It responds with an array of Authors", async () => {
        const response = await request(app).get("/api/authors");
        expect(response.statusCode).toBe(200);
    });
});

describe("GET Books", () => {
    test("It responds with an array of books", async () => {
        const response = await request(app).get("/api/books");
        expect(response.statusCode).toBe(200);
    });
});

describe("GET Magazines", () => {
    test("It responds with an array of magazines", async () => {
        const response = await request(app).get("/api/books");
        expect(response.statusCode).toBe(200);
    });
});

describe("GET Magazines by ISBN ", () => {
    test("It responds with an array of magazines", async () => {
        const response = await request(app).get("/api/magazines").query({
            isbn: "5554-5545-4518"
        });
        expect(response.body.data.length).toBe(1);
        expect(response.statusCode).toBe(200);
    });
});

describe("GET books by ISBN ", () => {
    test("It responds with an array of books", async () => {
        const response = await request(app).get("/api/books").query({
            isbn: "5554-5545-4518"
        });
        expect(response.body.data.length).toBe(1);
        expect(response.statusCode).toBe(200);
    });
});


describe("GET books by author ", () => {
    test("It responds with an array of books", async () => {
        const response = await request(app).get("/api/books").query({
            authors:"null-walter@echocat.org"
        });
        
        expect(response.statusCode).toBe(200);
    });
});

describe("GET magazines by author ", () => {
    test("It responds with an array of magazines", async () => {
        const response = await request(app).get("/api/magazines").query({
            authors:"null-walter@echocat.org"
        });
        
        expect(response.statusCode).toBe(200);
    });
});
