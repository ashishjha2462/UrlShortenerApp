require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const urlRoutes = require("./routes/urlRoutes");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(express.json());
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10, // limit each IP to 10 requests per minute
});
app.use(limiter);

app.use("/", urlRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  ))
  .catch((err) => console.error("DB connection error:", err));
