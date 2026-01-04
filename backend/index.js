const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/book");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/libraryDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Library DB Server Running");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});


app.get("/add-books", async (req, res) => {
  try {
    await Book.insertMany([
      { title: "Atomic Habits", author: "James Clear", category: "Self Help", publishedYear: 2018, availableCopies: 5 },
      { title: "Clean Code", author: "Robert Martin", category: "Programming", publishedYear: 2008, availableCopies: 3 },
      { title: "Ikigai", author: "Hector Garcia", category: "Self Help", publishedYear: 2016, availableCopies: 4 },
      { title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", publishedYear: 2014, availableCopies: 2 },
      { title: "Deep Work", author: "Cal Newport", category: "Productivity", publishedYear: 2016, availableCopies: 6 },
      { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", category: "Finance", publishedYear: 2017, availableCopies: 1 },
      { title: "Eloquent JavaScript", author: "Marijn Haverbeke", category: "Programming", publishedYear: 2018, availableCopies: 5 }
    ]);

    res.send("7 Books Inserted");
  } catch (err) {
    res.send(err.message);
  }
});


app.get("/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.get("/books/category/:category", async (req, res) => {
  const books = await Book.find({ category: req.params.category });
  res.json(books);
});

app.get("/books/after2015", async (req, res) => {
  const books = await Book.find({ publishedYear: { $gt: 2015 } });
  res.json(books);
});




app.put("/update-copies/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.send("Book not found");

  if (book.availableCopies + req.body.change < 0)
    return res.send("Negative stock not allowed");

  book.availableCopies += req.body.change;
  await book.save();
  res.json(book);
});

app.delete("/delete-book/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.send("Book not found");

  if (book.availableCopies !== 0)
    return res.send("Copies not zero");

  await book.deleteOne();
  res.send("Book Deleted");
});