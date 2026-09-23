const express = require("express");

const router = express.Router();

const {
    getAllPlacementDrives,
    getPlacementDriveById,
    createPlacementDrive,
    updatePlacementDrive,
    deletePlacementDrive
} = require("../controllers/placementDriveController");

const {
    authenticateToken
} = require("../middleware/authMiddleware");

const {
    authorizeRoles
} = require("../middleware/roleMiddleware");

// Get all placement drives
router.get(
    "/",
    authenticateToken,
    getAllPlacementDrives
);

// Get placement drive by ID
router.get(
    "/:id",
    authenticateToken,
    getPlacementDriveById
);

// Create placement drive
router.post(
    "/",
    authenticateToken,
    authorizeRoles("recruiter", "admin"),
    createPlacementDrive
);

// Update placement drive
router.put(
    "/:id",
    authenticateToken,
    authorizeRoles("recruiter", "admin"),
    updatePlacementDrive
);

// Delete placement drive
router.delete(
    "/:id",
    authenticateToken,
    authorizeRoles("recruiter", "admin"),
    deletePlacementDrive
);


module.exports = router;