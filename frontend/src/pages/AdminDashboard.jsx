import AdminSidebar from "../components/AdminSidebar";

const AdminDashboard = () => {

    const stats = [
        {
            title: "Total Students",
            value: 6,
        },
        {
            title: "Total Companies",
            value: 1,
        },
        {
            title: "Placement Drives",
            value: 2,
        },
        {
            title: "Applications",
            value: 1,
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {stats.map((stat) => (
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