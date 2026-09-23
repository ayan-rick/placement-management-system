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

module.exports = {
    getEligibleStudents
};