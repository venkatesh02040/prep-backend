const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    const token = authHeader.split(" ")[1].trim(); // Extract token after "Bearer "

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to the request object
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Session Expired. Please log in again." });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid Token. Authentication failed." });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

module.exports = authenticateUser;
