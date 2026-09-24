import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import "./MyProfile.css";

const MyProfile = () => {

    const { user } = useAuth();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                setLoading(true);
                setError("");

                const response = await api("/students/profile");

                setProfile(response.data);

            } catch (error) {

                console.error("Profile fetch error:", error);

                setError(
                    error.message || "Failed to load profile"
                );

            } finally {

                setLoading(false);

            }
        };

        fetchProfile();

    }, []);


    if (loading) {

        return (
            <div className="profile-page">

                <div className="profile-loading">
                    Loading profile...
                </div>

            </div>
        );

    }


    if (error) {

        return (
            <div className="profile-page">

                <div className="profile-error">

                    <h2>
                        Failed to load profile
                    </h2>

                    <p>
                        {error}
                    </p>

                </div>

            </div>
        );

    }


    return (

        <div className="profile-page">

            <div className="profile-container">

                {/* PAGE HEADER */}

                <div className="profile-header">

                    <h1>
                        My Profile
                    </h1>

                    <p>
                        View your personal and academic information.
                    </p>

                </div>


                {/* PROFILE HEADER CARD */}

                <div className="profile-card">

                    <div className="profile-card-header">

                        <div className="profile-avatar">

                            {profile?.name
                                ? profile.name.charAt(0).toUpperCase()
                                : "S"
                            }

                        </div>


                        <div>

                            <h2>
                                {profile?.name}
                            </h2>

                            <p>
                                {profile?.roll_number}
                            </p>

                        </div>

                    </div>


                    {/* PERSONAL INFORMATION */}

                    <div className="profile-section">

                        <h3>
                            Personal Information
                        </h3>


                        <div className="profile-grid">

                            <div className="profile-item">

                                <span className="profile-label">
                                    Full Name
                                </span>

                                <span className="profile-value">
                                    {profile?.name}
                                </span>

                            </div>


                            <div className="profile-item">

                                <span className="profile-label">
                                    Roll Number
                                </span>

                                <span className="profile-value">
                                    {profile?.roll_number}
                                </span>

                            </div>


                            <div className="profile-item">

                                <span className="profile-label">
                                    Department
                                </span>

                                <span className="profile-value">
                                    {profile?.department}
                                </span>

                            </div>


                            <div className="profile-item">

                                <span className="profile-label">
                                    Batch
                                </span>

                                <span className="profile-value">
                                    {profile?.batch}
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* ACADEMIC INFORMATION */}

                    <div className="profile-section">

                        <h3>
                            Academic Information
                        </h3>


                        <div className="profile-grid">

                            <div className="profile-item">

                                <span className="profile-label">
                                    CGPA
                                </span>

                                <span className="profile-value highlight">
                                    {profile?.cgpa}
                                </span>

                            </div>


                            <div className="profile-item">

                                <span className="profile-label">
                                    Backlogs
                                </span>

                                <span className="profile-value">
                                    {profile?.backlogs}
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* ACCOUNT INFORMATION */}

                    <div className="profile-section">

                        <h3>
                            Account Information
                        </h3>


                        <div className="profile-grid">

                            <div className="profile-item">

                                <span className="profile-label">
                                    User ID
                                </span>

                                <span className="profile-value">
                                    {profile?.user_id || profile?.id}
                                </span>

                            </div>


                            <div className="profile-item">

                                <span className="profile-label">
                                    Email
                                </span>

                                <span className="profile-value">
                                   {user?.email || "N/A"}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default MyProfile;