const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Middleware: Check authentication without exposing the token
const checkAuth = (req) => {
    const token = req.header("Authorization");
    if (!token) return false;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return true;
    } catch (error) {
        return false;
    }
};

// ✅ Get All Users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({ isAuthenticated: checkAuth(req), users });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Get Single User by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ isAuthenticated: checkAuth(req), user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Update User Scores
exports.updateScores = async (req, res) => {
    try {
        const { communication_score, aptitude_score, technical_score } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                communication_score,
                aptitude_score,
                technical_score,
                overall_score: (communication_score + aptitude_score + technical_score) / 3,
            },
            { new: true }
        );

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ isAuthenticated: checkAuth(req), user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Update User Details (Name, Email)
exports.updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true });

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ isAuthenticated: checkAuth(req), user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Delete User
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ isAuthenticated: checkAuth(req), message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
