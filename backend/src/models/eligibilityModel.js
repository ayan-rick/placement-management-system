const pool = require("../config/db");

const getEligibleStudents = async (driveId) => {
    const result = await pool.query(
        `
        SELECT
            s.id,
            s.name,
            s.roll_number,
            s.cgpa,
            s.backlogs,
            s.department_id,
            s.batch_id
        FROM students s
        JOIN placement_drives pd
            ON pd.id = $1

        WHERE s.cgpa >= pd.minimum_cgpa
          AND s.backlogs <= pd.maximum_backlogs

          AND EXISTS (
              SELECT 1
              FROM placement_drive_departments pdd
              WHERE pdd.drive_id = pd.id
                AND pdd.department_id = s.department_id
          )

          AND EXISTS (
              SELECT 1
              FROM placement_drive_batches pdb
              WHERE pdb.drive_id = pd.id
                AND pdb.batch_id = s.batch_id
          )

        ORDER BY s.cgpa DESC
        `,
        [driveId]
    );

    return result.rows;
};

const checkStudentEligibility = async (studentId, driveId) => {
    const result = await pool.query(
        `
        SELECT
            s.id,
            s.name,
            s.cgpa,
            s.backlogs,
            s.department_id,
            s.batch_id
        FROM students s
        JOIN placement_drives pd
            ON pd.id = $2

        WHERE s.id = $1

          AND s.cgpa >= pd.minimum_cgpa

          AND s.backlogs <= pd.maximum_backlogs

          AND EXISTS (
              SELECT 1
              FROM placement_drive_departments pdd
              WHERE pdd.drive_id = pd.id
                AND pdd.department_id = s.department_id
          )

          AND EXISTS (
              SELECT 1
              FROM placement_drive_batches pdb
              WHERE pdb.drive_id = pd.id
                AND pdb.batch_id = s.batch_id
          )
        `,
        [studentId, driveId]
    );

    return result.rows[0];
};

module.exports = {
    getEligibleStudents,
    checkStudentEligibility
};