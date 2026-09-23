const pool = require("../config/db");

const getAllStudents = async () => {
    const result = await pool.query(`
        SELECT
            s.id,
            s.name,
            s.roll_number,
            s.cgpa,
            s.backlogs,
            d.name AS department,
            b.year AS batch
        FROM students s
        LEFT JOIN departments d
            ON s.department_id = d.id
        LEFT JOIN batches b
            ON s.batch_id = b.id
        ORDER BY s.id;
    `);

    return result.rows;
};

const getStudentById = async (id) => {
    const result = await pool.query(`
        SELECT
            s.id,
            s.name,
            s.roll_number,
            s.cgpa,
            s.backlogs,
            d.name AS department,
            b.year AS batch
        FROM students s
        LEFT JOIN departments d
            ON s.department_id = d.id
        LEFT JOIN batches b
            ON s.batch_id = b.id
        WHERE s.id = $1;
    `, [id]);

    return result.rows[0];
};

const createStudent = async ({
    user_id,
    department_id,
    batch_id,
    roll_number,
    name,
    cgpa,
    backlogs
}) => {
    const result = await pool.query(`
        INSERT INTO students
        (user_id, department_id, batch_id, roll_number, name, cgpa, backlogs)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING
            id,
            user_id,
            department_id,
            batch_id,
            roll_number,
            name,
            cgpa,
            backlogs;
    `, [
        user_id,
        department_id,
        batch_id,
        roll_number,
        name,
        cgpa,
        backlogs
    ]);

    return result.rows[0];
};

const updateStudent = async (
    id,
    {
        department_id,
        batch_id,
        roll_number,
        name,
        cgpa,
        backlogs
    }
) => {
    const result = await pool.query(`
        UPDATE students
        SET
            department_id = $1,
            batch_id = $2,
            roll_number = $3,
            name = $4,
            cgpa = $5,
            backlogs = $6
        WHERE id = $7
        RETURNING
            id,
            user_id,
            department_id,
            batch_id,
            roll_number,
            name,
            cgpa,
            backlogs;
    `, [
        department_id,
        batch_id,
        roll_number,
        name,
        cgpa,
        backlogs,
        id
    ]);

    return result.rows[0];
};


const deleteStudent = async (id) => {
    const result = await pool.query(`
        DELETE FROM students
        WHERE id = $1
        RETURNING id, name, roll_number;
    `, [id]);

    return result.rows[0];
};


module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};
