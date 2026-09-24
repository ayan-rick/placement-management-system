import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import "./Dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();

    const { user, logout } = useAuth();

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

                setError(error.message);

            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = () => {
        logout();

        navigate("/login");
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                Loading dashboard...
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-page">
                <aside className="dashboard-sidebar">
                    <div className="sidebar-logo">
                        PMS
                    </div>

                    <div className="sidebar-menu">
                        <button className="active">
                            Dashboard
                        </button>

                        <button
                            onClick={() => navigate("/profile")}
                        >
                            My Profile
                        </button>

                        <button>
                            Placement Drives
                        </button>

                        <button>
                            Applications
                        </button>
                    </div>
                </aside>

                <main className="dashboard-main">
                    <div className="dashboard-error">
                        Failed to load profile: {error}
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="dashboard-page">

            {/* SIDEBAR */}

            <aside className="dashboard-sidebar">

                <div className="sidebar-logo">
                    Placement PMS
                </div>

               <nav className="sidebar-menu">

                <button
                    className="active"
                    onClick={() => navigate("/dashboard")}
                >
                    Dashboard
                </button>

                <button
                    onClick={() => navigate("/profile")}
                >
                    My Profile
                </button>

                <button
                    onClick={() => navigate("/placement-drives")}
                >
                    Placement Drives
                </button>


                <button
                    onClick={() => navigate("/applications")}
                >
                    Applications
                </button>

            </nav>

            </aside>


            {/* MAIN CONTENT */}

            <main className="dashboard-main">

                {/* HEADER */}

                <header className="dashboard-header">

                    <div>
                        <h1>Student Dashboard</h1>

                        <p>
                            Welcome back, {profile?.name}
                        </p>
                    </div>

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </header>


                {/* PROFILE SUMMARY */}

                <section className="profile-grid">

                    <div className="profile-card">

                        <div className="profile-card-label">
                            CGPA
                        </div>

                        <div className="profile-card-value">
                            {profile?.cgpa}
                        </div>

                    </div>


                    <div className="profile-card">

                        <div className="profile-card-label">
                            Backlogs
                        </div>

                        <div className="profile-card-value">
                            {profile?.backlogs}
                        </div>

                    </div>


                    <div className="profile-card">

                        <div className="profile-card-label">
                            Department
                        </div>

                        <div className="profile-card-value">
                            {profile?.department}
                        </div>

                    </div>


                    <div className="profile-card">

                        <div className="profile-card-label">
                            Batch
                        </div>

                        <div className="profile-card-value">
                            {profile?.batch}
                        </div>

                    </div>

                </section>


                {/* PROFILE DETAILS */}

                <section className="profile-section">

                    <h2>
                        My Profile
                    </h2>

                    <div className="profile-details">

                        <div className="profile-detail">

                            <div className="profile-detail-label">
                                Full Name
                            </div>

                            <div className="profile-detail-value">
                                {profile?.name}
                            </div>

                        </div>


                        <div className="profile-detail">

                            <div className="profile-detail-label">
                                Roll Number
                            </div>

                            <div className="profile-detail-value">
                                {profile?.roll_number}
                            </div>

                        </div>


                        <div className="profile-detail">

                            <div className="profile-detail-label">
                                Email
                            </div>

                            <div className="profile-detail-value">
                                {user?.email}
                            </div>

                        </div>


                        <div className="profile-detail">

                            <div className="profile-detail-label">
                                Department
                            </div>

                            <div className="profile-detail-value">
                                {profile?.department}
                            </div>

                        </div>


                        <div className="profile-detail">

                            <div className="profile-detail-label">
                                Batch
                            </div>

                            <div className="profile-detail-value">
                                {profile?.batch}
                            </div>

                        </div>


                        <div className="profile-detail">

                            <div className="profile-detail-label">
                                CGPA
                            </div>

                            <div className="profile-detail-value">
                                {profile?.cgpa}
                            </div>

                        </div>


                        <div className="profile-detail">

                            <div className="profile-detail-label">
                                Backlogs
                            </div>

                            <div className="profile-detail-value">
                                {profile?.backlogs}
                            </div>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
};

export default Dashboard;