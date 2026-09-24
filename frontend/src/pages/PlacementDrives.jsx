import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import "./PlacementDrives.css";

const PlacementDrives = () => {

    const navigate = useNavigate();
    
    const [drives, setDrives] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        const fetchDrives = async () => {

            try {

                setLoading(true);

                setError("");

                const response = await api(
                    "/placement-drives"
                );

                setDrives(Array.isArray(response) ? response : response.data || []);

            } catch (error) {

                console.error(
                    "Placement drives fetch error:",
                    error
                );

                setError(error.message);

            } finally {

                setLoading(false);

            }

        };

        fetchDrives();

    }, []);


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


    if (loading) {

        return (
            <div className="placement-loading">

                Loading placement drives...

            </div>
        );

    }


    if (error) {

        return (
            <div className="placement-page">

                <div className="placement-error">

                    Failed to load placement drives:
                    {" "}
                    {error}

                </div>

            </div>
        );

    }


    return (

        <div className="placement-page">

            <div className="placement-header">

                <div>

                    <h1>
                        Placement Drives
                    </h1>

                    <p>
                        Explore available placement
                        opportunities.
                    </p>

                </div>

            </div>


            {drives.length === 0 ? (

                <div className="no-drives">

                    <h2>
                        No Placement Drives
                    </h2>

                    <p>
                        There are currently no
                        placement drives available.
                    </p>

                </div>

            ) : (

                <div className="drives-grid">

                    {drives.map((drive) => (

                        <div
                            className="drive-card"
                            key={drive.id}
                        >

                            <div className="drive-card-header">

                                <div>

                                    <h2>
                                        {drive.title}
                                    </h2>

                                </div>

                                <span className="drive-status">

                                    {drive.status}

                                </span>

                            </div>


                            <p className="drive-description">

                                {drive.description}

                            </p>


                            <div className="drive-details">


                                <div className="drive-detail">

                                    <span>
                                        Package
                                    </span>

                                    <strong>
                                        ₹{drive.package_lpa} LPA
                                    </strong>

                                </div>


                                <div className="drive-detail">

                                    <span>
                                        Location
                                    </span>

                                    <strong>
                                        {drive.location}
                                    </strong>

                                </div>


                                <div className="drive-detail">

                                    <span>
                                        Minimum CGPA
                                    </span>

                                    <strong>
                                        {drive.minimum_cgpa}
                                    </strong>

                                </div>


                                <div className="drive-detail">

                                    <span>
                                        Maximum Backlogs
                                    </span>

                                    <strong>
                                        {drive.maximum_backlogs}
                                    </strong>

                                </div>


                                <div className="drive-detail">

                                    <span>
                                        Application Deadline
                                    </span>

                                    <strong>
                                        {formatDeadline(
                                            drive.deadline
                                        )}
                                    </strong>

                                </div>


                                <div className="drive-detail">

                                    <span>
                                        Drive ID
                                    </span>

                                    <strong>
                                        #{drive.id}
                                    </strong>

                                </div>

                            </div>


                            <button
                                className="view-drive-button"
                                onClick={() =>
                                    navigate(`/placement-drives/${drive.id}`)
                                }
                            >
                                View Details
                            </button>                            

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

};


export default PlacementDrives;