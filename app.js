const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// IMPORT ROUTES
const postsRoute = require("./routes/posts");

app.use("/posts", postsRoute);

// CONNECT TO DB
const db = mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
db.then(() => console.log("Connected to DB!")).catch((err) => console.log(err));

app.listen(4000);
