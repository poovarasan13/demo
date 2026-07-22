const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*", // Allow all if not specified
  methods: ["GET", "POST", "PUT", "DELETE","QUERY", "OPTIONS"],
  name: "Access-Control-Allow-Origin",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", productRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

app.get("/api", (req, res) => {
  res.send("API running");
});
app.get("/*", (req, res) => {
  res.send("super");
});

module.exports = app;
