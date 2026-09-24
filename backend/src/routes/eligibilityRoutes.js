const express = require("express");

const router = express.Router();

const {
    getEligibleStudents,
    checkMyEligibility
} = require("../controllers/eligibilityController");

const {
    authenticateToken
} = require("../middleware/authMiddleware");


router.get(
    "/drive/:driveId",
    getEligibleStudents
);


router.get(
    "/my/:driveId",
    authenticateToken,
    checkMyEligibility
);


module.exports = router;