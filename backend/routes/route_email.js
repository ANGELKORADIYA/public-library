const route_email = require('express').Router();

const { getDueDate, getBorrowDetails } = require('../controllers/sendEmail.js')


/** HTTP Reqeust */
route_email.post('/getDueDate', getDueDate);
route_email.post('/getBorrowDetails', getBorrowDetails)


module.exports = route_email;