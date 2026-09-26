const pool = require("../config/db");

const getDashboardStats = async () => {
    const studentsResult = await pool.query(
        "SELECT COUNT(*) FROM students"
    );

    const companiesResult = await pool.query(
        "SELECT COUNT(*) FROM companies"
    );

    const drivesResult = await pool.query(
        "SELECT COUNT(*) FROM placement_drives"
    );

    const applicationsResult = await pool.query(
        "SELECT COUNT(*) FROM applications"
    );

    return {
        students: Number(studentsResult.rows[0].count),
        companies: Number(companiesResult.rows[0].count),
        drives: Number(drivesResult.rows[0].count),
        applications: Number(applicationsResult.rows[0].count)
    };
};

module.exports = {
    getDashboardStats
};