const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Simulate async behavior using Promises
const getBooks = () => {
  return new Promise((resolve, reject) => {
    resolve(books);
  });
};

const getBookByISBN = (isbn) => {
  return new Promise((resolve, reject) => {
    const book = books[isbn];
    if (book) {
      resolve(book);
    } else {
      reject("Book not found");
    }
  });
};

const getBooksByAuthor = (author) => {
  return new Promise((resolve, reject) => {
    const filteredBooks = Object.values(books).filter(book =>
      book.author.toLowerCase().includes(author.toLowerCase())
    );
    resolve(filteredBooks);
  });
};

const getBooksByTitle = (title) => {
  return new Promise((resolve, reject) => {
    const filteredBooks = Object.values(books).filter(book =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );
    resolve(filteredBooks);
  });
};

// Task 10: Get all books (Async/Await)
public_users.get('/', async (req, res) => {
  try {
    const allBooks = await getBooks();
    return res.status(200).json(allBooks);
  } catch (error) {
    return res.status(500).json({ message: "Failed to retrieve books" });
  }
});

// Task 11: Get book by ISBN (Async/Await)
public_users.get('/isbn/:isbn', async (req, res) => {
  try {
    const book = await getBookByISBN(req.params.isbn);
    return res.status(200).json(book);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

// Task 12: Get books by author (Async/Await)
public_users.get('/author/:author', async (req, res) => {
  try {
    const booksByAuthor = await getBooksByAuthor(req.params.author);
    return res.status(200).json(booksByAuthor);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books by author" });
  }
});

// Task 13: Get books by title (Async/Await)
public_users.get('/title/:title', async (req, res) => {
  try {
    const booksByTitle = await getBooksByTitle(req.params.title);
    return res.status(200).json(booksByTitle);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books by title" });
  }
});

// Reviews route remains synchronous (optional to refactor)
public_users.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.status(200).json(book.reviews);
});

module.exports.general = public_users;
