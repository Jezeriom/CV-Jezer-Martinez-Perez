const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// connect DB
connectDB();

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API CV Jezer funcionando",
    endpoints: {
      experiences: "/api/experiences"
    }
  });
});

// routes
app.use("/api/experiences", require("./routes/experiences"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
