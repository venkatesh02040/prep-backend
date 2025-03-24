const User = require("../models/User");

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        if (req.user.id !== userId) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateScores = async (req, res) => {
    try {
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

exports.resetGuestScores = async (req, res) => {
    try {
      const guestUser = await User.findOne({ email: "guest@gmail.com" });
  
      if (!guestUser) {
        return res.status(404).json({ message: "Guest user not found" });
      }
  
      guestUser.communication_score = 0;
      guestUser.aptitude_score = 0;
      guestUser.technical_score = 0;
      guestUser.overall_score = 0;
  
      await guestUser.save();
  
      res.status(200).json({ message: "Guest scores reset successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

