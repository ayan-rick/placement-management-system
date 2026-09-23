const express = require("express");

const router = express.Router();

const {
    getEligibleStudents
} = require("../controllers/eligibilityController");

router.get(
    "/drive/:driveId",
    getEligibleStudents
);

module.exports = router;