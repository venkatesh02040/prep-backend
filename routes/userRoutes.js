const express = require("express");
const {
    getUsers,
    getUserById,
    updateScores,
    updateUser,
    deleteUser
} = require("../controllers/userControllers");
const authenticateUser = require("../middleware/authMiddleware"); // Import auth middleware

const router = express.Router();

// 🔹 Apply authentication middleware before accessing user-related routes
router.get("/", authenticateUser, getUsers);
router.get("/:id", authenticateUser, getUserById);
router.put("/:id/score", authenticateUser, updateScores);
router.patch("/:id", authenticateUser, updateUser);
router.delete("/:id", authenticateUser, deleteUser);

module.exports = router;
