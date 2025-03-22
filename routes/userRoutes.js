const express = require("express");
const {
    getUsers,
    getUserById,
    updateUserScores,  // Renamed for clarity
    updateUser,
    deleteUser
} = require("../controllers/userControllers");
const authenticateUser = require("../middleware/authMiddleware"); // Import auth middleware

const router = express.Router();

// 🔹 Apply authentication middleware before accessing user-related routes
router.get("/", authenticateUser, getUsers);
router.get("/:id", authenticateUser, getUserById);
router.patch("/:id/score", authenticateUser, updateUserScores); // Changed from PUT to PATCH
router.patch("/:id", authenticateUser, updateUser);
router.delete("/:id", authenticateUser, deleteUser);

module.exports = router;
