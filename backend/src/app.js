const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");
const companyRoutes = require("./routes/companyRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const placementDriveRoutes = require("./routes/placementDriveRoutes");
const eligibilityRoutes = require("./routes/eligibilityRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Placement Management System API"
    });
});

app.put("/test-put", (req, res) => {
    res.json({
        message: "PUT route is working"
    });
});

app.use("/api/students", studentRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/placement-drives", placementDriveRoutes);
app.use("/api/eligibility", eligibilityRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;