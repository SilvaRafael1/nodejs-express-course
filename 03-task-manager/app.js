const express = require("express");
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-fund");
const errorHandlerMiddleware = require("./middleware/error-handler");
const app = express();
require("dotenv").config();

// middleware
app.use(express.json());
app.use(express.static("./public")); // Front-End

// Routes
app.use("/api/v1/tasks", tasks);
app.use(notFound); // Different route
app.use(errorHandlerMiddleware) // Custom Error

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, (req, res) => {
      console.log("Server is running on port 3000...");
    });
  } catch (error) {
    console.log(error);
  }
};

// PORT=6000 node app.js
start();
