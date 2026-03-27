const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// --------------------- MIDDLEWARE ---------------------
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json({ limit: "10mb" }));

// --------------------- ROUTES IMPORT ---------------------
const routes = require("./routes/route.js");

// --------------------- USE ROUTES -----------------------
// SUPPORT BOTH: / and /api
app.use("/", routes);     // ✔ allows /Adminlogin
app.use("/api", routes);  // ✔ original API prefix

// --------------------- MONGODB CONNECTION ----------------
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Error:", err));

// --------------------- SERVER ----------------------------
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
