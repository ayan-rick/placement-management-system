import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import "./MyProfile.css";

const MyProfile = () => {

    const { user } = useAuth();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        roll_number: "",
        cgpa: "",
        backlogs: ""
    });

    const handleEdit = () => {
        setFormData({
            name: profile.name || "",
            roll_number: profile.roll_number || "",
            cgpa: profile.cgpa || "",
            backlogs: profile.backlogs ?? ""
        });

        setError("");
        setSuccess("");
        setEditing(true);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const response = await api("/students/profile", {
                method: "PUT",
                body: JSON.stringify({
                    name: formData.name,
                    roll_number: formData.roll_number,
                    cgpa: Number(formData.cgpa),
                    backlogs: Number(formData.backlogs)
                })
            });

            setProfile(response.data);

            setEditing(false);

            setSuccess("Profile updated successfully.");

        } catch (error) {
            console.error("Profile update error:", error);

            setError(
                error.message || "Failed to update profile"
            );

        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setEditing(false);
        setError("");
        setSuccess("");
    };

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


    if (error && !profile) {

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

            {success && (
                <div className="profile-success">
                    {success}
                </div>
            )}

            {error && profile && (
                <div className="profile-error">
                    {error}
                </div>
            )}

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


                    {!editing && (
                        <div className="profile-actions">
                            <button
                                type="button"
                                className="profile-edit-button"
                                onClick={handleEdit}
                            >
                                Edit Profile
                            </button>
                        </div>
                    )}


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

                                    {editing ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="profile-input"
                                        />
                                    ) : (
                                        <span className="profile-value">
                                            {profile?.name}
                                        </span>
                                    )}
                                </div>

                                <div className="profile-item">
                                    <span className="profile-label">
                                        Roll Number
                                    </span>

                                    {editing ? (
                                        <input
                                            type="text"
                                            name="roll_number"
                                            value={formData.roll_number}
                                            onChange={handleChange}
                                            className="profile-input"
                                        />
                                    ) : (
                                        <span className="profile-value">
                                            {profile?.roll_number}
                                        </span>
                                    )}
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

                                    {editing ? (
                                        <input
                                            type="number"
                                            name="cgpa"
                                            value={formData.cgpa}
                                            onChange={handleChange}
                                            min="0"
                                            max="10"
                                            step="0.01"
                                            className="profile-input"
                                        />
                                    ) : (
                                        <span className="profile-value highlight">
                                            {profile?.cgpa}
                                        </span>
                                    )}
                                </div>

                                <div className="profile-item">
                                    <span className="profile-label">
                                        Backlogs
                                    </span>

                                    {editing ? (
                                        <input
                                            type="number"
                                            name="backlogs"
                                            value={formData.backlogs}
                                            onChange={handleChange}
                                            min="0"
                                            step="1"
                                            className="profile-input"
                                        />
                                    ) : (
                                        <span className="profile-value">
                                            {profile?.backlogs}
                                        </span>
                                    )}
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

                    {editing && (
                        <div className="profile-actions">
                            <button
                                type="button"
                                className="profile-save-button"
                                onClick={handleSave}
                                disabled={saving}
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>

                            <button
                                type="button"
                                className="profile-cancel-button"
                                onClick={handleCancel}
                                disabled={saving}
                            >
                                Cancel
                            </button>
                        </div>
                    )}

                </div>

            </div>

        </div>

    );
};

export default MyProfile;