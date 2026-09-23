const pool = require("../config/db");

// Get all applications
const getAllApplications = async () => {
    const result = await pool.query(
        `SELECT * FROM applications
         ORDER BY id ASC`
    );

    return result.rows;
};

// Get applications of the logged-in student
const getMyApplications = async (studentId) => {
    const result = await pool.query(
        `SELECT
            a.id,
            a.student_id,
            a.drive_id,
            a.status,
            a.applied_at,
            pd.title AS drive_title,
            pd.package_lpa,
            pd.location,
            c.name AS company_name
         FROM applications a
         JOIN placement_drives pd
             ON a.drive_id = pd.id
         JOIN companies c
             ON pd.company_id = c.id
         WHERE a.student_id = $1
         ORDER BY a.id DESC`,
        [studentId]
    );

    return result.rows;
};

// Get application by ID
const getApplicationById = async (id) => {
    const result = await pool.query(
        `SELECT * FROM applications
         WHERE id = $1`,
        [id]
    );

    return result.rows[0];
};

// Create application
const createApplication = async (application) => {
    const {
        student_id,
        drive_id,
        status
    } = application;

    const result = await pool.query(
        `INSERT INTO applications
        (student_id, drive_id, status)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [
            student_id,
            drive_id,
            status || "applied"
        ]
    );

    return result.rows[0];
};

// Update application
const updateApplication = async (id, application) => {
    const {
        student_id,
        drive_id,
        status
    } = application;

    const result = await pool.query(
        `UPDATE applications
         SET student_id = $1,
             drive_id = $2,
             status = $3
         WHERE id = $4
         RETURNING *`,
        [
            student_id,
            drive_id,
            status,
            id
        ]
    );

    return result.rows[0];
};

// Delete application
const deleteApplication = async (id) => {
    const result = await pool.query(
        `DELETE FROM applications
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};

// Update application status
const updateApplicationStatus = async (id, status) => {
    const result = await pool.query(
        `UPDATE applications
         SET status = $1
         WHERE id = $2
         RETURNING *`,
        [status, id]
    );

    return result.rows[0];
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