const express = require("express");
const {
    getUsers,
    getUserById,
    updateScores,
    updateUser,
    deleteUser
} = require("../controllers/userControllers");
const authenticateUser = require("../middleware/authMiddleware"); // Import authentication middleware

const router = express.Router();

// 🔹 Require authentication for user-related routes
router.get("/", authenticateUser, getUsers);
router.get("/:id", authenticateUser, getUserById);
router.put("/:id/score", authenticateUser, updateScores);
router.patch("/:id", authenticateUser, updateUser);
router.delete("/:id", authenticateUser, deleteUser);

module.exports = router;
