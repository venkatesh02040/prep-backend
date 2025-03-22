require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());  // Required for handling HTTP-only cookies

// ✅ Enable CORS for frontend
app.use(
  cors({
    origin: "http://localhost:5173/", // Replace with your frontend URL
    credentials: true, // ✅ Allows cookies to be sent with requests
  })
);

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
