require("dotenv").config();
require('express-async-errors')

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const router = require("./routes/products");

// Middleware
app.use(express.json());

// Routes

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>');
});

app.use('/api/v1/products', router)

// Products Route
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
