const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');

const { route_login } = require("./routes/route_login");
const { route_book } = require("./routes/route_book");
const { tokenverification } = require("./middlewares/tokenverification");
const connectDB  = require("./config/db");



connectDB();
app.use(express.json({ limit: '10mb' }));
dotenv.config();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/',route_login)
app.use(tokenverification)
app.use('/book',route_book)

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on ${process.env.baseUrl} at ${process.env.PORT}`);
});
