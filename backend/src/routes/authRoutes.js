const express = require("express");

const router = express.Router();

const {
    register,
    login
} = require("../controllers/authController");

const {
    authenticateToken
} = require("../middleware/authMiddleware");

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Get current logged-in user
router.get(
    "/me",
    authenticateToken,
    (req, res) => {
        res.json({
            message: "Authentication successful",
            user: req.user
        });
    }
);

module.exports = router;