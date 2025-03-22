const User = require("../models/User");

// ✅ Get All Users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Get Single User by ID
exports.getUserById = async (req, res) => {
    try {
        // Ensure the logged-in user can only fetch their own data
        if (req.user.id !== req.params.id) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Update User Scores
exports.updateScores = async (req, res) => {
    try {
        // Ensure users can only update their own scores
        if (req.user.id !== req.params.id) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

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

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Update User Details (Name, Email)
exports.updateUser = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const { name, email } = req.body;

        const user = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true });

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Delete User
exports.deleteUser = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
