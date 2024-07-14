const { bookModel } = require("../models/schema");

const Mongoose = require("mongoose");
module.exports.addbook = async (req, res) => {
    try {
        const newBook = await bookModel.create({...req.body,createdBy: new Mongoose.Types.ObjectId(req.userId)});
        res.status(201).json({message: "Book added successfully", okk: true});
    } catch (error) {
        res.status(500).json({ message: "Error adding book", okk: false });
    }
}

module.exports.getbook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await bookModel.findById(id);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Error getting book" });
    }
}

module.exports.updatebook = async (req, res) => {
    const { id } = req.params;
    const { book } = req.body;
    try {
        const updatedBook = await bookModel.findByIdAndUpdate(id, book, { new: true });
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: "Error updating book" });
    }
}

module.exports.deletebook = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await bookModel.findByIdAndDelete(id);
        res.status(200).json(deletedBook);
    } catch (error) {
        res.status(500).json({ message: "Error deleting book" });
    }   }

module.exports.getallbooks = async (req, res) => {
    try {
        console.log( new Mongoose.Types.ObjectId(req.userId))
        const books = await bookModel.find({createdBy: new Mongoose.Types.ObjectId(req.userId)},{_v:0,_id:0,createdBy:0});
        
        res.status(200).json({data:books,okk:true});
    } catch (error) {
        res.status(500).json({ message: "Error getting books" });
    }
}