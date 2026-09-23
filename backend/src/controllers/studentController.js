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
    createStudent,
    updateStudent,
    deleteStudent
};