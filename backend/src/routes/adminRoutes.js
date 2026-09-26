const express = require("express");

const router = express.Router();

const {
    getDashboardStats
} = require("../controllers/adminController");

const {
    authenticateToken
} = require("../middleware/authMiddleware");

const {
    authorizeRoles
} = require("../middleware/roleMiddleware");

router.get(
    "/stats",
    authenticateToken,
    authorizeRoles("admin"),
    getDashboardStats
);

module.exports = router;