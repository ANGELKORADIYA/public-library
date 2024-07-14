const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const { EMAIL, PASSWORD } = require('../.env');

/** send mail from real gmail account */

const getDueDate = (req, res) => {

    const { userEmail } = req.body;

    let config = {
        service : 'gmail',
        auth : {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
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

    let bookData = [
        {
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            ISBN: "9780743273565"
        },
        {
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            ISBN: "9780061120084"
        }
    ];

    var response = {
        body: {
            title: 'Due Date Reminder for Book Return',
            name: 'User',
            intro: 'We are LibraEase! The due date for returning your books is today. Please return the books by 12:00 PM to avoid any late fees.',
            table: {
                data: bookData,
                columns: {
                    // Optionally, customize the column headers
                    customWidth: {
                        title: '20%',
                        author: '30%',
                        ISBN: '50%'
                    },
                    customAlignment: {
                        title: 'left',
                        author: 'left',
                        ISBN: 'left'
                    }
                }
            },
            action: {
                instructions: 'To pay your dues and log in to your LibraEase account, please click the button below. A charge of 10 Rs per day will be applied if the books are not returned on time.',
                button: {
                    color: '#22BC66',
                    text: 'Go to your account',
                    link: 'https://google.com'
                }
            },
            outro: 'Need help or have questions? Just reply to this email, we\'d love to help.'
        }
    };

    let mail = MailGenerator.generate(response)

    let message = {
        from : EMAIL,
        to : userEmail,
        subject: "Return Books",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })

    // res.status(201).json("getBill Successfully...!");
}


const getBorrowDetails = (req, res) => {

    const { userEmail } = req.body;

    let config = {
        service : 'gmail',
        auth : {
            user: EMAIL,
            pass: PASSWORD
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
                data: [
                    {
                        title: "Book Title 1",
                        author: "Book Author 1",
                        ISBN: "9780743273565",
                        dueDate: "2024-07-31" // Include due date if available
                    },
                    {
                        title: "Book Title 2",
                        author: "Book Author 2",
                        ISBN: "9780061120084",
                        dueDate: "2024-08-15" // Include due date if available
                    }
                ],
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

    // res.status(201).json("getBill Successfully...!");
}

module.exports = {
    getDueDate,
    getBorrowDetails
}