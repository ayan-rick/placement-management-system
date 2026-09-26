const adminModel = require("../models/adminModel");

const getDashboardStats = async (req, res) => {
    try {
        const stats = await adminModel.getDashboardStats();

        res.status(200).json({
            success: true,
            data: stats
        });

    } catch (error) {
        console.error(
            "Error fetching admin dashboard statistics:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard statistics"
        });
    }
};

module.exports = {
    getDashboardStats
};