const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// 1. Register a new user
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (isValid(username)) {
    return res.status(409).json({ message: "Username already exists" });
  }

  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully" });
});

// 2. Get the book list available in the shop
public_users.get('/', (req, res) => {
  return res.status(200).json(books);
});

// 3. Get book details based on ISBN
public_users.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.status(200).json(book);
});

// 4. Get book details based on author
public_users.get('/author/:author', (req, res) => {
  const author = req.params.author.toLowerCase();
  const filteredBooks = Object.values(books).filter(book =>
    book.author.toLowerCase().includes(author)
  );

  if (filteredBooks.length === 0) {
    return res.status(404).json({ message: "No books found by this author" });
  }

  return res.status(200).json(filteredBooks);
});

// 5. Get book details based on title
public_users.get('/title/:title', (req, res) => {
  const title = req.params.title.toLowerCase();
  const filteredBooks = Object.values(books).filter(book =>
    book.title.toLowerCase().includes(title)
  );

  if (filteredBooks.length === 0) {
    return res.status(404).json({ message: "No books found with this title" });
  }

  return res.status(200).json(filteredBooks);
});

// 6. Get book review
public_users.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.status(200).json(book.reviews);
});

module.exports.general = public_users;
