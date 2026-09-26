import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import api from "../services/api";

const AdminDashboard = () => {

    const [stats, setStats] = useState({
        students: 0,
        companies: 0,
        drives: 0,
        applications: 0,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api("/admin/stats");

                setStats(response.data);

            } catch (error) {
                console.error(
                    "Error fetching dashboard statistics:",
                    error
                );

                setError("Failed to load dashboard statistics");

            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        {
            title: "Total Students",
            value: stats.students,
        },
        {
            title: "Total Companies",
            value: stats.companies,
        },
        {
            title: "Placement Drives",
            value: stats.drives,
        },
        {
            title: "Applications",
            value: stats.applications,
        },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">

            <AdminSidebar />

            <main className="flex-1 p-8">

                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Admin Dashboard
                    </h2>

                    <p className="text-gray-600 mt-2">
                        Manage students, companies, placement drives and applications.
                    </p>
                </div>

                {loading && (
                    <p className="text-gray-600 mb-4">
                        Loading dashboard statistics...
                    </p>
                )}

                {error && (
                    <p className="text-red-600 mb-4">
                        {error}
                    </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {statCards.map((stat) => (
                        <div
                            key={stat.title}
                            className="bg-white rounded-lg shadow p-6"
                        >
                            <h3 className="text-gray-500 text-sm">
                                {stat.title}
                            </h3>

                            <p className="text-3xl font-bold text-gray-800 mt-2">
                                {stat.value}
                            </p>
                        </div>
                    ))}

                </div>

                <div className="mt-8 bg-white rounded-lg shadow p-6">

                    <h3 className="text-xl font-semibold mb-4">
                        Admin Actions
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <button className="bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700">
                            Manage Students
                        </button>

                        <button className="bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700">
                            Manage Companies
                        </button>

                        <button className="bg-purple-600 text-white px-4 py-3 rounded hover:bg-purple-700">
                            Manage Drives
                        </button>

                    </div>

                </div>

            </main>

        </div>
    );
};

export default AdminDashboard;