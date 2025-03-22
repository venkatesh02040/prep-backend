const User = require("../models/User");

// ✅ Get All Users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || "Server error" });
    }
};

// ✅ Get Single User by ID
exports.getUserById = async (req, res) => {
    try {
        if (req.user.id.toString() !== req.params.id) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || "Server error" });
    }
};

// ✅ Update User Scores
exports.updateScores = async (req, res) => {
    try {
        if (req.user.id.toString() !== req.params.id) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Keep existing values if not provided in the request body
        user.communication_score = req.body.communication_score ?? user.communication_score;
        user.aptitude_score = req.body.aptitude_score ?? user.aptitude_score;
        user.technical_score = req.body.technical_score ?? user.technical_score;

        // Recalculate overall score
        user.overall_score =
            (user.communication_score + user.aptitude_score + user.technical_score) / 3;

        await user.save();
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || "Server error" });
    }
};

// ✅ Update User Details (Name, Email)
exports.updateUser = async (req, res) => {
    try {
        if (req.user.id.toString() !== req.params.id) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const { name, email } = req.body;

        const user = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true });

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || "Server error" });
    }
};

// ✅ Delete User
exports.deleteUser = async (req, res) => {
    try {
        if (req.user.id.toString() !== req.params.id) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await user.deleteOne();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || "Server error" });
    }
};
