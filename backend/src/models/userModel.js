const pool = require("../config/db");

// Find user by email
const findUserByEmail = async (email) => {
    const result = await pool.query(
        `SELECT *
         FROM users
         WHERE email = $1`,
        [email]
    );

    return result.rows[0];
};

// Find user by ID
const findUserById = async (id) => {
    const result = await pool.query(
        `SELECT
            id,
            email,
            role,
            status,
            student_id,
            created_at
         FROM users
         WHERE id = $1`,
        [id]
    );

    return result.rows[0];
};

// Create user
const createUser = async (email, password, role = "student") => {
    const result = await pool.query(
        `INSERT INTO users
        (email, password, role, status)
        VALUES ($1, $2, $3, $4)
        RETURNING
            id,
            email,
            role,
            status,
            created_at`,
        [
            email,
            password,
            role,
            "active"
        ]
    );

    return result.rows[0];
};

module.exports = {
    findUserByEmail,
    findUserById,
    createUser
};