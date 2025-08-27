const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id).select("-password");

            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }

            req.user = user;
            next(); // Move on to the actual route
        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
    } else {
        return res.status(403).json({ message: "Access denied. No token provided." });
    }
};

const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: "Admin access denied" });
    }
};

module.exports = { protect, adminMiddleware };
