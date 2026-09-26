const companyModel = require("../models/companyModel");

// GET all companies
const getAllCompanies = async (req, res) => {
    try {
        const companies = await companyModel.getAllCompanies();

        res.status(200).json(companies);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching companies"
        });
    }
};

// GET company by ID
const getCompanyById = async (req, res) => {
    try {
        const company = await companyModel.getCompanyById(req.params.id);

        if (!company) {
            return res.status(404).json({
                message: "Company not found"
            });
        }

        res.status(200).json(company);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching company"
        });
    }
};

// CREATE company
const createCompany = async (req, res) => {
    try {
        const company = await companyModel.createCompany(req.body);

        res.status(201).json({
            message: "Company created successfully",
            company
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error creating company"
        });
    }
};

// UPDATE company
const updateCompany = async (req, res) => {
    try {
        const company = await companyModel.updateCompany(
            req.params.id,
            req.body
        );

        if (!company) {
            return res.status(404).json({
                message: "Company not found"
            });
        }

        res.status(200).json({
            message: "Company updated successfully",
            company
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error updating company"
        });
    }
};

// DELETE company
const deleteCompany = async (req, res) => {
    try {
        const company = await companyModel.deleteCompany(req.params.id);

        if (!company) {
            return res.status(404).json({
                message: "Company not found"
            });
        }

        res.status(200).json({
            message: "Company deleted successfully",
            company
        });

    } catch (error) {
        console.error(error);

        if (error.code === "23503") {
            return res.status(409).json({
                message: "Cannot delete company because it is associated with existing records."
            });
        }

        res.status(500).json({
            message: "Error deleting company"
        });
    }
};

module.exports = {
    getAllCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany
};