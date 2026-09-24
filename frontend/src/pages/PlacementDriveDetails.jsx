import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";

import "./PlacementDriveDetails.css";

const PlacementDriveDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [drive, setDrive] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [applying, setApplying] = useState(false);

    const [applicationMessage, setApplicationMessage] =
        useState("");

    const [applicationError, setApplicationError] =
        useState("");


    useEffect(() => {

        const fetchDrive = async () => {

            try {

                setLoading(true);

                setError("");

                const response = await api(
                    `/placement-drives/${id}`
                );

                setDrive(response);

            } catch (error) {

                console.error(
                    "Placement drive fetch error:",
                    error
                );

                setError(error.message);

            } finally {

                setLoading(false);

            }

        };

        fetchDrive();

    }, [id]);


    const formatDeadline = (deadline) => {

        if (!deadline) {
            return "Not specified";
        }

        return new Date(deadline).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };


    const handleApply = async () => {

        try {

            setApplying(true);

            setApplicationMessage("");

            setApplicationError("");


            const response = await api(
                "/applications",
                {
                    method: "POST",
                    body: JSON.stringify({
                        drive_id: drive.id
                    })
                }
            );


            setApplicationMessage(
                response.message ||
                "Application submitted successfully"
            );


        } catch (error) {

            console.error(
                "Application error:",
                error
            );

            setApplicationError(
                error.message
            );

        } finally {

            setApplying(false);

        }

    };


    if (loading) {

        return (
            <div className="drive-details-loading">

                Loading placement drive...

            </div>
        );

    }


    if (error) {

        return (
            <div className="drive-details-page">

                <div className="drive-details-error">

                    Failed to load placement drive:
                    {" "}
                    {error}

                </div>

                <button
                    className="back-button"
                    onClick={() =>
                        navigate("/placement-drives")
                    }
                >
                    Back to Placement Drives
                </button>

            </div>
        );

    }


    if (!drive) {

        return (
            <div className="drive-details-page">

                <div className="drive-details-error">

                    Placement drive not found.

                </div>

                <button
                    className="back-button"
                    onClick={() =>
                        navigate("/placement-drives")
                    }
                >
                    Back to Placement Drives
                </button>

            </div>
        );

    }


    return (

        <div className="drive-details-page">

            <button
                className="back-button"
                onClick={() =>
                    navigate("/placement-drives")
                }
            >
                ← Back to Placement Drives
            </button>


            <div className="drive-details-card">

                <div className="drive-details-header">

                    <div>

                        <span className="drive-details-status">

                            {drive.status}

                        </span>

                        <h1>
                            {drive.title}
                        </h1>

                        <p className="drive-company">

                            Company ID: {drive.company_id}

                        </p>

                    </div>

                </div>


                <div className="drive-description-section">

                    <h2>
                        About the Role
                    </h2>

                    <p>
                        {drive.description}
                    </p>

                </div>


                <div className="drive-info-grid">


                    <div className="drive-info-item">

                        <span>
                            Package
                        </span>

                        <strong>
                            ₹{drive.package_lpa} LPA
                        </strong>

                    </div>


                    <div className="drive-info-item">

                        <span>
                            Location
                        </span>

                        <strong>
                            {drive.location}
                        </strong>

                    </div>


                    <div className="drive-info-item">

                        <span>
                            Minimum CGPA
                        </span>

                        <strong>
                            {drive.minimum_cgpa}
                        </strong>

                    </div>


                    <div className="drive-info-item">

                        <span>
                            Maximum Backlogs
                        </span>

                        <strong>
                            {drive.maximum_backlogs}
                        </strong>

                    </div>


                    <div className="drive-info-item">

                        <span>
                            Application Deadline
                        </span>

                        <strong>
                            {formatDeadline(
                                drive.deadline
                            )}
                        </strong>

                    </div>


                    <div className="drive-info-item">

                        <span>
                            Drive ID
                        </span>

                        <strong>
                            #{drive.id}
                        </strong>

                    </div>

                </div>


                <div className="eligibility-section">

                    <h2>
                        Eligibility Requirements
                    </h2>

                    <ul>

                        <li>
                            Minimum CGPA:{" "}
                            <strong>
                                {drive.minimum_cgpa}
                            </strong>
                        </li>

                        <li>
                            Maximum Backlogs:{" "}
                            <strong>
                                {drive.maximum_backlogs}
                            </strong>
                        </li>

                    </ul>

                </div>


                {applicationMessage && (

                    <div className="application-success">

                        {applicationMessage}

                    </div>

                )}


                {applicationError && (

                    <div className="application-error">

                        {applicationError}

                    </div>

                )}


                <div className="apply-section">

                    <button
                        className="apply-button"
                        onClick={handleApply}
                        disabled={applying}
                    >

                        {applying
                            ? "Submitting..."
                            : "Apply Now"}

                    </button>

                </div>


            </div>

        </div>

    );

};


export default PlacementDriveDetails;