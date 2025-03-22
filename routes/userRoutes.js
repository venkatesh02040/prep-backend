const express = require("express");
const {
    getUsers,
    getUserById,
    updateScores,
    updateUser,
    deleteUser
} = require("../controllers/userControllers");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id/score", updateScores);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
