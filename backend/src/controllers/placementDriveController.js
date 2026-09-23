const placementDriveModel = require("../models/placementDriveModel");


// GET all placement drives
const getAllPlacementDrives = async (req, res) => {
    try {
        const drives =
            await placementDriveModel.getAllPlacementDrives();

        res.status(200).json(drives);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error fetching placement drives"
        });
    }
};


// GET placement drive by ID
const getPlacementDriveById = async (req, res) => {
    try {
        const drive =
            await placementDriveModel.getPlacementDriveById(
                req.params.id
            );

        if (!drive) {
            return res.status(404).json({
                message: "Placement drive not found"
            });
        }

        res.status(200).json(drive);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error fetching placement drive"
        });
    }
};


// CREATE placement drive
const createPlacementDrive = async (req, res) => {
    try {
        const drive =
            await placementDriveModel.createPlacementDrive(
                req.body
            );

        res.status(201).json({
            message: "Placement drive created successfully",
            drive
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error creating placement drive"
        });
    }
};


// UPDATE placement drive
const updatePlacementDrive = async (req, res) => {
    try {
        const drive =
            await placementDriveModel.updatePlacementDrive(
                req.params.id,
                req.body
            );

        if (!drive) {
            return res.status(404).json({
                message: "Placement drive not found"
            });
        }

        res.status(200).json({
            message: "Placement drive updated successfully",
            drive
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error updating placement drive"
        });
    }
};


// DELETE placement drive
const deletePlacementDrive = async (req, res) => {
    try {
        const drive =
            await placementDriveModel.deletePlacementDrive(
                req.params.id
            );

        if (!drive) {
            return res.status(404).json({
                message: "Placement drive not found"
            });
        }

        res.status(200).json({
            message: "Placement drive deleted successfully",
            drive
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error deleting placement drive"
        });
    }
};


module.exports = {
    getAllPlacementDrives,
    getPlacementDriveById,
    createPlacementDrive,
    updatePlacementDrive,
    deletePlacementDrive
};