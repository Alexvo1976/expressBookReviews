const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(books);
});

// Get book details based on ISBN

public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    // Since book keys are numbers, convert isbn to string to safely check
    const book = books[isbn];

    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// Get book details based on author

public_users.get('/author/:author', function (req, res) {
    const requestedAuthor = req.params.author.toLowerCase(); // 1. Get the author from request
    const matchingBooks = [];

    // 2. Iterate through the books object
    for (let key in books) {
        const book = books[key];
        if (book.author.toLowerCase() === requestedAuthor) {
            matchingBooks.push(book);
        }
    }

    // 3. Send the response
    if (matchingBooks.length > 0) {
        res.status(200).json({ books: matchingBooks });
    } else {
        res.status(404).json({ message: "No books found by this author" });
    }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const requestedTitle = req.params.title.toLowerCase(); // Get title from request
    const matchingBooks = [];

    // Loop through all books
    for (let key in books) {
        const book = books[key];
        if (book.title.toLowerCase() === requestedTitle) {
            matchingBooks.push(book);
        }
    }

    // Send result
    if (matchingBooks.length > 0) {
        res.status(200).json({ books: matchingBooks });
    } else {
        res.status(404).json({ message: "No books found with this title" });
    }
});


//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn; // Get ISBN from route

    const book = books[isbn];

    if (book) {
        res.status(200).json({ reviews: book.reviews });
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});


module.exports.general = public_users;
