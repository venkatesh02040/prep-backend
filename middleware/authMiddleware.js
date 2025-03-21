const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract token from header

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Store user data in request
        next(); // Proceed to the next middleware/controller
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authenticateUser;
