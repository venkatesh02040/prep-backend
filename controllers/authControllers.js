const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.login = async (req, res) => {
  try {
      const { email, password } = req.body;

      let user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({ 
          isAuthenticated: true,
          token,
          user: {
              id: user._id,
              name: user.name,
              email: user.email
          }
      });
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
