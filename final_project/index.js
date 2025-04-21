const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.json());

app.use(session({
  secret: "fingerprint_customer",
  resave: true,
  saveUninitialized: true
}));

let books = require("./router/booksdb.js");
const gen_routes = require("./router/general.js").general;
const auth_routes = require("./router/auth_users.js").authenticated;

app.use("/customer", auth_routes);
app.use("/", gen_routes);

const PORT = 5001;

app.listen(PORT, () => console.log("Server is running on port", PORT));
