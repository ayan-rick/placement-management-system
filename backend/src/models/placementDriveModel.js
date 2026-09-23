const pool = require("../config/db");

// Get all placement drives
const getAllPlacementDrives = async () => {
    const result = await pool.query(
        `SELECT * FROM placement_drives
         ORDER BY id ASC`
    );

    return result.rows;
};


// Get placement drive by ID
const getPlacementDriveById = async (id) => {
    const result = await pool.query(
        `SELECT * FROM placement_drives
         WHERE id = $1`,
        [id]
    );

    return result.rows[0];
};


// Create placement drive
const createPlacementDrive = async (drive) => {
    const {
        company_id,
        title,
        description,
        package_lpa,
        location,
        deadline,
        status,
        minimum_cgpa,
        maximum_backlogs
    } = drive;

    const result = await pool.query(
        `INSERT INTO placement_drives
        (
            company_id,
            title,
            description,
            package_lpa,
            location,
            deadline,
            status,
            minimum_cgpa,
            maximum_backlogs
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7,$8, $9)
        RETURNING *`,
        [
            company_id,
            title,
            description,
            package_lpa,
            location,
            deadline,
            status || "draft",
            minimum_cgpa || 0,
            maximum_backlogs ?? 0
        ]
    );

    return result.rows[0];
};


// Update placement drive
const updatePlacementDrive = async (id, drive) => {
    const {
        company_id,
        title,
        description,
        package_lpa,
        location,
        deadline,
        status,
        minimum_cgpa,
        maximum_backlogs
    } = drive;

    const result = await pool.query(
        `UPDATE placement_drives
         SET company_id = $1,
             title = $2,
             description = $3,
             package_lpa = $4,
             location = $5,
             deadline = $6,
             status = $7,
             minimum_cgpa = $8,
             maximum_backlogs = $9
         WHERE id = $10
         RETURNING *`,
        [
            company_id,
            title,
            description,
            package_lpa,
            location,
            deadline,
            status,
            minimum_cgpa,
        maximum_backlogs,
            id
        ]
    );

    return result.rows[0];
};


// Delete placement drive
const deletePlacementDrive = async (id) => {
    const result = await pool.query(
        `DELETE FROM placement_drives
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};


module.exports = {
    getAllPlacementDrives,
    getPlacementDriveById,
    createPlacementDrive,
    updatePlacementDrive,
    deletePlacementDrive
};