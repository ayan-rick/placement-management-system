const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");
const { authenticateToken } = require("../middleware/authMiddleware");

router.get("/", studentController.getStudents);

router.get(
    "/profile",
    authenticateToken,
    studentController.getMyProfile
);

router.get("/:id", studentController.getStudentById);
router.get("/:id/profile", studentController.getStudentProfile);
router.post("/", studentController.createStudent);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

module.exports = router;