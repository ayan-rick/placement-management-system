const studentModel = require("../models/studentModel");

const getStudents = async (req, res) => {
    try {
        const students = await studentModel.getAllStudents();

        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });
    } catch (error) {
        console.error("Error fetching students:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch students"
        });
    }
};

const getStudentById = async (req, res) => {
    try {
        const student = await studentModel.getStudentById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            data: student
        });
    } catch (error) {
        console.error("Error fetching student:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch student"
        });
    }
};

const getStudentProfile = async (req, res) => {
    try {
        const student = await studentModel.getStudentProfile(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student profile not found"
            });
        }

        res.status(200).json({
            success: true,
            data: student
        });
    } catch (error) {
        console.error("Error fetching student profile:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch student profile"
        });
    }
};

const getMyProfile = async (req, res) => {
    try {
        const student = await studentModel.getMyProfile(req.user.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student profile not found"
            });
        }

        res.status(200).json({
            success: true,
            data: student
        });

    } catch (error) {
        console.error("Error fetching my profile:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch profile"
        });
    }
};

const updateMyProfile = async (req, res) => {
    try {
        const {
            roll_number,
            name,
            cgpa,
            backlogs
        } = req.body;

        // Basic validation
        if (!name || !roll_number) {
            return res.status(400).json({
                success: false,
                message: "Name and roll number are required"
            });
        }

        if (cgpa === undefined || cgpa === null) {
            return res.status(400).json({
                success: false,
                message: "CGPA is required"
            });
        }

        if (backlogs === undefined || backlogs === null) {
            return res.status(400).json({
                success: false,
                message: "Backlogs are required"
            });
        }

        // Convert CGPA to number
        const cgpaNumber = Number(cgpa);

        // Validate CGPA
        if (
            !Number.isFinite(cgpaNumber) ||
            cgpaNumber < 0 ||
            cgpaNumber > 10
        ) {
            return res.status(400).json({
                success: false,
                message: "CGPA must be a number between 0 and 10"
            });
        }

        // Validate backlogs
        if (Number(backlogs) < 0 || !Number.isInteger(Number(backlogs))) {
            return res.status(400).json({
                success: false,
                message: "Backlogs must be a non-negative integer"
            });
        }

        const student = await studentModel.updateMyProfile(
            req.user.id,
            {
                roll_number,
                name,
                cgpa: cgpaNumber,
                backlogs
            }
        );

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student profile not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: student
        });

        } catch (error) {
        console.error("Error updating my profile:", error.message);

        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "Roll number already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to update profile"
        });
    }
};

const createStudent = async (req, res) => {
    try {
        const {
            user_id,
            department_id,
            batch_id,
            roll_number,
            name,
            cgpa,
            backlogs
        } = req.body;

        const student = await studentModel.createStudent({
            user_id,
            department_id,
            batch_id,
            roll_number,
            name,
            cgpa,
            backlogs
        });

        res.status(201).json({
            success: true,
            message: "Student created successfully",
            data: student
        });
    } catch (error) {
        console.error("Error creating student:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to create student",
            error: error.message
        });
    }
};

const updateStudent = async (req, res) => {
    try {
        const {
            department_id,
            batch_id,
            roll_number,
            name,
            cgpa,
            backlogs
        } = req.body;

        const student = await studentModel.updateStudent(
            req.params.id,
            {
                department_id,
                batch_id,
                roll_number,
                name,
                cgpa,
                backlogs
            }
        );

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: student
        });
    } catch (error) {
        console.error("Error updating student:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to update student",
            error: error.message
        });
    }
};


const deleteStudent = async (req, res) => {
    try {
        const student = await studentModel.deleteStudent(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Student deleted successfully",
            data: student
        });
    } catch (error) {
        console.error("Error deleting student:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to delete student",
            error: error.message
        });
    }
};

module.exports = {
    getStudents,
    getStudentById,
    getStudentProfile,
    getMyProfile,
    updateMyProfile,
    createStudent,
    updateStudent,
    deleteStudent
};