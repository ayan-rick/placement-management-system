import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./MyApplications.css";

const MyApplications = () => {
    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api("/applications/my");

                setApplications(
                    Array.isArray(response.applications)
                        ? response.applications
                        : []
                );
            } catch (error) {
                console.error(
                    "Applications fetch error:",
                    error
                );

                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const formatDate = (date) => {
        if (!date) return "Not specified";

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "applied":
                return "status-applied";

            case "shortlisted":
                return "status-shortlisted";

            case "selected":
                return "status-selected";

            case "rejected":
                return "status-rejected";

            default:
                return "status-default";
        }
    };

    if (loading) {
        return (
            <div className="applications-page">
                <div className="applications-container">
                    <p className="loading-message">
                        Loading your applications...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="applications-page">
            <div className="applications-container">

                <div className="applications-header">
                    <div>
                        <h1>My Applications</h1>
                        <p>
                            View and track your placement applications.
                        </p>
                    </div>

                    <button
                        className="back-button"
                        onClick={() =>
                            navigate("/placement-drives")
                        }
                    >
                        Browse Drives
                    </button>
                </div>

                {error && (
                    <div className="application-error">
                        {error}
                    </div>
                )}

                {!error && applications.length === 0 && (
                    <div className="empty-applications">
                        <h2>No Applications Yet</h2>

                        <p>
                            You have not applied to any placement
                            drives yet.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/placement-drives")
                            }
                        >
                            Browse Placement Drives
                        </button>
                    </div>
                )}

                {!error && applications.length > 0 && (
                    <div className="applications-list">

                        {applications.map((application) => (
                            <div
                                className="application-card"
                                key={application.id}
                            >

                                <div className="application-card-header">
                                    <div>
                                        <h2>
                                            {application.drive_title}
                                        </h2>

                                        <p className="application-id">
                                            Application ID: #
                                            {application.id}
                                        </p>
                                    </div>

                                    <span
                                        className={`application-status ${getStatusClass(
                                            application.status
                                        )}`}
                                    >
                                        {application.status}
                                    </span>
                                </div>

                                <div className="application-details">

                                    <div className="detail-item">
                                        <span className="detail-label">
                                            Applied On
                                        </span>

                                        <span className="detail-value">
                                            {formatDate(
                                                application.applied_at
                                            )}
                                        </span>
                                    </div>

                                    <div className="detail-item">
                                        <span className="detail-label">
                                            Drive ID
                                        </span>

                                        <span className="detail-value">
                                            #{application.drive_id}
                                        </span>
                                    </div>

                                    <div className="detail-item">
                                        <span className="detail-label">
                                            Student ID
                                        </span>

                                        <span className="detail-value">
                                            #{application.student_id}
                                        </span>
                                    </div>

                                </div>

                                <div className="application-card-footer">
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/placement-drives/${application.drive_id}`
                                            )
                                        }
                                    >
                                        View Drive
                                    </button>
                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>
        </div>
    );
};

export default MyApplications;