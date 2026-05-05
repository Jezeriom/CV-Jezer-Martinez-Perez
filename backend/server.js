const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// connect DB
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/experiences", require("./routes/experiences"));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});