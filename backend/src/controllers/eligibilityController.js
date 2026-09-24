const eligibilityModel = require("../models/eligibilityModel");

const getEligibleStudents = async (req, res) => {
    try {
        const students =
            await eligibilityModel.getEligibleStudents(
                req.params.driveId
            );

        res.status(200).json({
            count: students.length,
            students
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error checking eligibility"
        });
    }
};


const checkMyEligibility = async (req, res) => {
    try {

        const studentId = req.user.student_id;

        const driveId = req.params.driveId;


        if (!studentId) {
            return res.status(404).json({
                eligible: false,
                message: "Student profile not linked to user"
            });
        }


        const student =
            await eligibilityModel.checkStudentEligibility(
                studentId,
                driveId
            );


        if (!student) {
            return res.status(200).json({
                eligible: false,
                message: "You are not eligible for this placement drive"
            });
        }


        res.status(200).json({
            eligible: true,
            message: "You are eligible for this placement drive",
            student
        });

    } catch (error) {

        console.error(
            "Error checking student eligibility:",
            error
        );

        res.status(500).json({
            eligible: false,
            message: "Error checking eligibility"
        });
    }
};


module.exports = {
    getEligibleStudents,
    checkMyEligibility
};