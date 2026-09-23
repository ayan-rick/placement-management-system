const express = require("express");

const router = express.Router();

const {
    getAllApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication,
    getMyApplications,
    updateApplicationStatus
} = require("../controllers/applicationController");

const {
    authenticateToken
} = require("../middleware/authMiddleware");

const {
    authorizeRoles
} = require("../middleware/roleMiddleware");


// Get all applications
router.get(
    "/",
    authenticateToken,
    authorizeRoles("recruiter", "admin"),
    getAllApplications
);

// Get my applications
router.get(
    "/my",
    authenticateToken,
    authorizeRoles("student"),
    getMyApplications
);


// Get application by ID
router.get(
    "/:id",
    authenticateToken,
    authorizeRoles("recruiter", "admin"),
    getApplicationById
);

// Create application
router.post(
    "/",
    authenticateToken,
    authorizeRoles("student"),
    createApplication
);

// Update application status
router.patch(
    "/:id/status",
    authenticateToken,
    authorizeRoles("recruiter", "admin"),
    updateApplicationStatus
);


// Update application
router.put(
    "/:id",
    authenticateToken,
    authorizeRoles("recruiter", "admin"),
    updateApplication
);

// Delete application
router.delete(
    "/:id",
    authenticateToken,
    authorizeRoles("recruiter", "admin"),
    deleteApplication
);

module.exports = router;