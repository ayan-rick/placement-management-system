const express = require("express");

const router = express.Router();

const {
    getAllCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany
} = require("../controllers/companyController");

const {
    authenticateToken
} = require("../middleware/authMiddleware");

const {
    authorizeRoles
} = require("../middleware/roleMiddleware");

router.get(
    "/",
    authenticateToken,
    getAllCompanies
);

router.get(
    "/:id",
    authenticateToken,
    getCompanyById
);

router.post(
    "/",
    authenticateToken,
    authorizeRoles("recruiter", "admin"),
    createCompany
);

router.put(
    "/:id",
    authenticateToken,
    authorizeRoles("recruiter", "admin"),
    updateCompany
);

router.delete(
    "/:id",
    authenticateToken,
    authorizeRoles("recruiter", "admin"),
    deleteCompany
);

module.exports = router;