import { Link, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <aside className="w-64 min-h-screen bg-gray-900 text-white p-5">
            <h1 className="text-2xl font-bold mb-8">
                Placement PMS
            </h1>

            <p className="text-gray-400 text-sm mb-4">
                ADMIN PANEL
            </p>

            <nav className="space-y-2">

                <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 rounded hover:bg-gray-800"
                >
                    Dashboard
                </Link>

                <Link
                    to="/admin/students"
                    className="block px-4 py-2 rounded hover:bg-gray-800"
                >
                    Students
                </Link>

                <Link
                    to="/admin/companies"
                    className="block px-4 py-2 rounded hover:bg-gray-800"
                >
                    Companies
                </Link>

                <Link
                    to="/admin/drives"
                    className="block px-4 py-2 rounded hover:bg-gray-800"
                >
                    Placement Drives
                </Link>

                <Link
                    to="/admin/applications"
                    className="block px-4 py-2 rounded hover:bg-gray-800"
                >
                    Applications
                </Link>

                <Link
                    to="/admin/eligibility"
                    className="block px-4 py-2 rounded hover:bg-gray-800"
                >
                    Eligibility
                </Link>

                <Link
                    to="/admin/users"
                    className="block px-4 py-2 rounded hover:bg-gray-800"
                >
                    Users
                </Link>

            </nav>

            <button
                onClick={handleLogout}
                className="mt-10 w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
                Logout
            </button>
        </aside>
    );
};

export default AdminSidebar;