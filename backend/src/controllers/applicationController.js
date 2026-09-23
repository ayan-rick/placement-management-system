const applicationModel = require("../models/applicationModel");
const eligibilityModel = require("../models/eligibilityModel");
const placementDriveModel = require("../models/placementDriveModel");


// GET all applications
const getAllApplications = async (req, res) => {
    try {
        const applications =
            await applicationModel.getAllApplications();

        res.status(200).json(applications);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error fetching applications"
        });
    }
};

const getMyApplications = async (req, res) => {
    try {
        const studentId = req.user.student_id;

        if (!studentId) {
            return res.status(400).json({
                message: "Student profile is not linked to this account"
            });
        }

        const applications =
            await applicationModel.getMyApplications(studentId);

        res.status(200).json({
            count: applications.length,
            applications
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error fetching your applications"
        });
    }
};


// GET application by ID
const getApplicationById = async (req, res) => {
    try {
        const application =
            await applicationModel.getApplicationById(
                req.params.id
            );

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.status(200).json(application);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error fetching application"
        });
    }
};


const createApplication = async (req, res) => {
    try {
        const studentId = req.user.student_id;
        const { drive_id } = req.body;

        if (!studentId) {
            return res.status(400).json({
                message: "Student profile is not linked to this account"
            });
        }

        if (!drive_id) {
            return res.status(400).json({
                message: "drive_id is required"
            });
        }

        // Check if placement drive exists
        const drive =
            await placementDriveModel.getPlacementDriveById(drive_id);

        if (!drive) {
            return res.status(404).json({
                message: "Placement drive not found"
            });
        }

        // Check if placement drive is published
        if (drive.status !== "published") {
            return res.status(403).json({
                message: "This placement drive is not currently open for applications"
            });
        }

        // Check application deadline
        if (new Date(drive.deadline) < new Date()) {
            return res.status(403).json({
                message: "The application deadline for this placement drive has passed"
            });
        }

        // Check student eligibility
        const eligible =
            await eligibilityModel.checkStudentEligibility(
                studentId,
                drive_id
            );

        if (!eligible) {
            return res.status(403).json({
                message: "You are not eligible for this placement drive"
            });
        }

        // Create application
        const application =
            await applicationModel.createApplication({
                student_id: studentId,
                drive_id,
                status: "applied"
            });

        res.status(201).json({
            message: "Application created successfully",
            application
        });

    } catch (error) {
        console.error(error);

        // Duplicate application
        if (error.code === "23505") {
            return res.status(409).json({
                message: "You have already applied to this placement drive"
            });
        }

        res.status(500).json({
            message: "Error creating application"
        });
    }
};


// UPDATE application
const updateApplication = async (req, res) => {
    try {
        const application =
            await applicationModel.updateApplication(
                req.params.id,
                req.body
            );

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.status(200).json({
            message: "Application updated successfully",
            application
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error updating application"
        });
    }
};


// DELETE application
const deleteApplication = async (req, res) => {
    try {
        const application =
            await applicationModel.deleteApplication(
                req.params.id
            );

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.status(200).json({
            message: "Application deleted successfully",
            application
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error deleting application"
        });
    }
};


// UPDATE application status
const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "applied",
            "shortlisted",
            "rejected",
            "selected"
        ];

        if (!status) {
            return res.status(400).json({
                message: "status is required"
            });
        }

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid application status"
            });
        }

        // Get current application
        const existingApplication =
            await applicationModel.getApplicationById(
                req.params.id
            );

        if (!existingApplication) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        const currentStatus = existingApplication.status;

        // Define allowed transitions
        const allowedTransitions = {
            applied: ["shortlisted", "rejected"],
            shortlisted: ["selected", "rejected"],
            selected: [],
            rejected: []
        };

        if (
            !allowedTransitions[currentStatus].includes(status)
        ) {
            return res.status(400).json({
                message:
                    `Invalid status transition from ${currentStatus} to ${status}`
            });
        }

        const application =
            await applicationModel.updateApplicationStatus(
                req.params.id,
                status
            );

        res.status(200).json({
            message: "Application status updated successfully",
            application
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error updating application status"
        });
    }
};

module.exports = {
    getAllApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication,
    getMyApplications,
    updateApplicationStatus
};