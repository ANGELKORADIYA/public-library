const { bookModel, checkoutModel } = require("../models/schema");
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const { EMAIL, PASSWORD } = require('../.env');
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
  const  id  = req.body.id; 
  const book = req.body.book;
  console.log(book)
  try {
    const updatedBook = await bookModel.findOneAndUpdate(
      { isbn: id },
      { $set: book },
      { new: true }
    );
    
  
    
    res.status(200).json({message:updatedBook,okk:true}); 
  } catch (error) {
    res.status(500).json({ message: "Error updating book" });
  }
};

module.exports.deletebook = async (req, res) => {
  const id  = req.body.id;
  try {
const deletedBook = await bookModel.findOneAndDelete({ isbn: id });
    res.status(200).json({data:deletedBook,okk:true});
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

    console.log(req.body.alldetails)
    const userEmail ="koradiyaangel11@gmail.com";

    let config = {
        service : 'gmail',
        auth : {
            user:"bhargavpanchal9099@gmail.com",
            pass: "fmtq wokr byje flpv"
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "LibraEase",
            link : 'https://google.com'
        }
    })

    var response = {
        body: {
            title: 'Books Borrowed Information',
            name: 'User',
            intro: 'Dear User,',
            table: {
                data:req.body.alldetails.map((book)=>({
                    title: book.title,
                    author: book.author,
                    ISBN: book.isbn,
                    quantity: book.checkoutDetails.quantity,
                    days: book.checkoutDetails.days,
                })),
                columns: {
                    customWidth: {
                        title: '20%',
                        author: '30%',
                        ISBN: '20%',
                        dueDate: '30%'
                    },
                    customAlignment: {
                        title: 'left',
                        author: 'left',
                        ISBN: 'left',
                        dueDate: 'left'
                    }
                }
            },
            action: {
                instructions: 'You have borrowed the following books from our library. Please ensure to return them by the due dates specified below:',
                button: {
                    color: '#22BC66',
                    text: 'Go to your account',
                    link: 'https://www.google.com'
                }
            },
            outro: 'Thank you for using our library services. For any questions or assistance, please reply to this email.'
        }
    };

    let mail = MailGenerator.generate(response)

    let message = {
        from : EMAIL,
        to : userEmail,
        subject: "Book Borrowed",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })
    res.status(200).json({ okk: true });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ message: "Error during checkout" });
  }
};
module.exports.checkouttt = async (req, res) => {
  try {
    const checkouts = await checkoutModel.find(); // Adjust as per your schema
    res.status(200).json({data:checkouts});

  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ message: "Error during checkout" });
  }
};