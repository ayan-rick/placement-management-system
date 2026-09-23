const pool = require("../config/db");

// Get all companies
const getAllCompanies = async () => {
    const result = await pool.query(
        "SELECT * FROM companies ORDER BY id ASC"
    );

    return result.rows;
};

// Get company by ID
const getCompanyById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM companies WHERE id = $1",
        [id]
    );

    return result.rows[0];
};

// Create company
const createCompany = async (company) => {
    const { name, industry, website, description } = company;

    const result = await pool.query(
        `INSERT INTO companies
        (name, industry, website, description)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [name, industry, website, description]
    );

    return result.rows[0];
};

// Update company
const updateCompany = async (id, company) => {
    const { name, industry, website, description } = company;

    const result = await pool.query(
        `UPDATE companies
         SET name = $1,
             industry = $2,
             website = $3,
             description = $4
         WHERE id = $5
         RETURNING *`,
        [name, industry, website, description, id]
    );

    return result.rows[0];
};

// Delete company
const deleteCompany = async (id) => {
    const result = await pool.query(
        `DELETE FROM companies
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};

module.exports = {
    getAllCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany
};