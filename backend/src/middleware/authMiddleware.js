const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check Authorization header
        if (!authHeader) {
            return res.status(401).json({
                message: "Access token required"
            });
        }

        // Check Bearer format
        const parts = authHeader.split(" ");

        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({
                message: "Invalid authorization format"
            });
        }

        const token = parts[1];

        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Get current user from database
        const user = await userModel.findUserById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "User no longer exists"
            });
        }

        // Check account status
        if (user.status !== "active") {
            return res.status(403).json({
                message: "User account is inactive"
            });
        }

        // Store current user information
        req.user = user;

        next();

    } catch (error) {
        console.error(error);

        return res.status(403).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = {
    authenticateToken
};