const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");

const {
    authenticateToken
} = require("../middleware/authMiddleware");

const {
    authorizeRoles
} = require("../middleware/roleMiddleware");


// Student's own profile
router.get(
    "/profile",
    authenticateToken,
    studentController.getMyProfile
);

router.put(
    "/profile",
    authenticateToken,
    studentController.updateMyProfile
);


// Admin student management
router.get(
    "/",
    authenticateToken,
    authorizeRoles("admin"),
    studentController.getStudents
);

router.get(
    "/:id",
    authenticateToken,
    authorizeRoles("admin"),
    studentController.getStudentById
);

router.get(
    "/:id/profile",
    authenticateToken,
    authorizeRoles("admin"),
    studentController.getStudentProfile
);

router.post(
    "/",
    authenticateToken,
    authorizeRoles("admin"),
    studentController.createStudent
);

router.put(
    "/:id",
    authenticateToken,
    authorizeRoles("admin"),
    studentController.updateStudent
);

router.delete(
    "/:id",
    authenticateToken,
    authorizeRoles("admin"),
    studentController.deleteStudent
);

module.exports = router;