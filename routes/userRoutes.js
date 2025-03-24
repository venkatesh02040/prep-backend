const express = require("express");
const {
    getUsers,
    getUserById,
    updateScores,
    updateUser,
    deleteUser
} = require("../controllers/userControllers");
const authenticateUser = require("../middleware/authMiddleware"); 

const router = express.Router();

router.get("/", authenticateUser, getUsers);
router.get("/:id", authenticateUser, getUserById);
router.put("/:id/score", authenticateUser, updateScores);
router.patch("/:id", authenticateUser, updateUser);
router.delete("/:id", authenticateUser, deleteUser);
router.patch("/guest/reset-scores", resetGuestScores);

module.exports = router;
