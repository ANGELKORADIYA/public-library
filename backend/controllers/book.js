const { bookModel, checkoutModel } = require("../models/schema");

const Mongoose = require("mongoose");
module.exports.addbook = async (req, res) => {
  try {
    const newBook = await bookModel.create({
      ...req.body,
      createdBy: new Mongoose.Types.ObjectId(req.userId),
    });
    res.status(201).json({ message: "Book added successfully", okk: true });
  } catch (error) {
    res.status(500).json({ message: "Error adding book", okk: false });
  }
};

module.exports.getbook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await bookModel.findById(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error getting book" });
  }
};

module.exports.updatebook = async (req, res) => {
  const { id } = req.params;
  const { book } = req.body;
  try {
    const updatedBook = await bookModel.findByIdAndUpdate(id, book, {
      new: true,
    });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Error updating book" });
  }
};

module.exports.deletebook = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await bookModel.findByIdAndDelete(id);
    res.status(200).json(deletedBook);
  } catch (error) {
    res.status(500).json({ message: "Error deleting book" });
  }
};

module.exports.getbooks = async (req, res) => {
  try {
    const books = await bookModel.find(
      { createdBy: new Mongoose.Types.ObjectId(req.userId) },
      { _v: 0, _id: 0, createdBy: 0 }
    );

    res.status(200).json({ data: books, okk: true });
  } catch (error) {
    res.status(500).json({ message: "Error getting books" });
  }
};

module.exports.getallbooks = async (req, res) => {
  try {
    const books = await bookModel.find({}, { _v: 0, _id: 0, createdBy: 0 });

    res.status(200).json({ data: books, okk: true });
  } catch (error) {
    res.status(500).json({ message: "Error getting books" });
  }
  // Assuming checkoutModel is defined in a separate file
};
module.exports.checkout = async (req, res) => {
  try {
    const books = req.body.books;

    // Validate input
    if (!books || !Array.isArray(books) || books.length === 0) {
      return res.status(400).json({ message: "Invalid books data" });
    }

    // Assuming req.userId is validated and contains the user's ObjectId

    // Iterate through each book in the request
    for (let i = 0; i < books.length; i++) {
      const book = books[i];
    
     const returnDate = new Date();
     returnDate.setDate(returnDate.getDate() + book.returnDate);
     book.returnDate = returnDate.toISOString().split('T')[0];



      let bookDetails = await checkoutModel.findOne({ user: req.userId });

      if (!bookDetails) {
        // If no checkout details exist, create a new checkout entry
        bookDetails = await checkoutModel.create({
          user: req.userId,
          items: [book],
        });
      } else {
        // If checkout details exist, update the items array
        bookDetails.items.push(book);
        await bookDetails.save();
      }
    }

    res.status(200).json({ okk: true });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ message: "Error during checkout" });
  }
};
