const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to the request object
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

module.exports = authenticateUser;
