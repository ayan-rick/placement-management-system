import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import api from "../services/api";

const AdminCompanies = () => {

    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingCompany, setEditingCompany] = useState(null);

    const [showCreateForm, setShowCreateForm] = useState(false);

    const [newCompany, setNewCompany] = useState({
        name: "",
        industry: "",
        website: "",
        description: ""
    });

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await api("/companies");

                setCompanies(response);

            } catch (error) {
                console.error("Error fetching companies:", error);

                setError("Failed to load companies");

            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    const handleDelete = async (companyId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this company?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await api(`/companies/${companyId}`, {
                method: "DELETE"
            });

            setCompanies((currentCompanies) =>
                currentCompanies.filter(
                    (company) => company.id !== companyId
                )
            );

        } catch (error) {
            console.error("Error deleting company:", error);

            alert(error.message || "Failed to delete company");
        }
    };

    const handleEdit = async (companyId) => {
        try {
            const company = await api(`/companies/${companyId}`);

            console.log("Company fetched for editing:", company);

            setEditingCompany(company);

        } catch (error) {
            console.error("Error fetching company:", error);

            alert("Failed to load company");
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await api(
                `/companies/${editingCompany.id}`,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        name: editingCompany.name,
                        industry: editingCompany.industry,
                        website: editingCompany.website,
                        description: editingCompany.description
                    })
                }
            );

            setCompanies((currentCompanies) =>
                currentCompanies.map((company) =>
                    company.id === editingCompany.id
                        ? response.company
                        : company
                )
            );

            setEditingCompany(null);

            alert("Company updated successfully");

        } catch (error) {
            console.error("Error updating company:", error);

            alert(error.message || "Failed to update company");
        }
    };

    const handleCreate = async () => {
        try {
            const response = await api("/companies", {
                method: "POST",
                body: JSON.stringify(newCompany)
            });

            setCompanies((currentCompanies) => [
                ...currentCompanies,
                response.company
            ]);

            setNewCompany({
                name: "",
                industry: "",
                website: "",
                description: ""
            });

            setShowCreateForm(false);

            alert("Company created successfully");

        } catch (error) {
            console.error("Error creating company:", error);

            alert(error.message || "Failed to create company");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">

            <AdminSidebar />

            <main className="flex-1 p-8">

                <div className="mb-8 flex items-center justify-between">

                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            Companies
                        </h2>

                        <p className="text-gray-600 mt-2">
                            Manage companies participating in campus placements.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowCreateForm(true)}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                    >
                        + Add Company
                    </button>

                </div>

                {loading && (
                    <p className="text-gray-600">
                        Loading companies...
                    </p>
                )}

                {error && (
                    <p className="text-red-600 mb-4">
                        {error}
                    </p>
                )}

                {showCreateForm && (
                    <div className="bg-white rounded-lg shadow p-6 mb-8">

                        <h3 className="text-xl font-semibold text-gray-800 mb-6">
                            Create Company
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Company Name
                                </label>

                                <input
                                    type="text"
                                    value={newCompany.name}
                                    onChange={(e) =>
                                        setNewCompany({
                                            ...newCompany,
                                            name: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    placeholder="Enter company name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Industry
                                </label>

                                <input
                                    type="text"
                                    value={newCompany.industry}
                                    onChange={(e) =>
                                        setNewCompany({
                                            ...newCompany,
                                            industry: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    placeholder="Enter industry"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Website
                                </label>

                                <input
                                    type="text"
                                    value={newCompany.website}
                                    onChange={(e) =>
                                        setNewCompany({
                                            ...newCompany,
                                            website: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    placeholder="https://example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>

                                <textarea
                                    value={newCompany.description}
                                    onChange={(e) =>
                                        setNewCompany({
                                            ...newCompany,
                                            description: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    rows="4"
                                    placeholder="Enter company description"
                                />
                            </div>

                        </div>

                        <div className="mt-6 flex gap-4">

                            <button
                                onClick={handleCreate}
                                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
                            >
                                Create Company
                            </button>

                            <button
                                onClick={() => {
                                    setShowCreateForm(false);

                                    setNewCompany({
                                        name: "",
                                        industry: "",
                                        website: "",
                                        description: ""
                                    });
                                }}
                                className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>

                        </div>

                    </div>
                )}

                {editingCompany && (
                    <div className="bg-white rounded-lg shadow p-6 mb-8">

                        <h3 className="text-xl font-semibold text-gray-800 mb-6">
                            Edit Company
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Company Name
                                </label>

                                <input
                                    type="text"
                                    value={editingCompany.name || ""}
                                    onChange={(e) =>
                                        setEditingCompany({
                                            ...editingCompany,
                                            name: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Industry
                                </label>

                                <input
                                    type="text"
                                    value={editingCompany.industry || ""}
                                    onChange={(e) =>
                                        setEditingCompany({
                                            ...editingCompany,
                                            industry: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Website
                                </label>

                                <input
                                    type="text"
                                    value={editingCompany.website || ""}
                                    onChange={(e) =>
                                        setEditingCompany({
                                            ...editingCompany,
                                            website: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>

                                <textarea
                                    value={editingCompany.description || ""}
                                    onChange={(e) =>
                                        setEditingCompany({
                                            ...editingCompany,
                                            description: e.target.value
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    rows="4"
                                />
                            </div>

                        </div>

                        <div className="mt-6 flex gap-4">

                            <button
                                onClick={handleUpdate}
                                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Update Company
                            </button>

                            <button
                                onClick={() => setEditingCompany(null)}
                                className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>

                        </div>

                    </div>
                )}

                {!loading && !error && (
                    <div className="bg-white rounded-lg shadow overflow-hidden">

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-gray-50">
                                    <tr>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                            ID
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                            Name
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                            Industry
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                            Website
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                            Description
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                            Actions
                                        </th>

                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">

                                    {companies.map((company) => (
                                        <tr
                                            key={company.id}
                                            className="hover:bg-gray-50"
                                        >

                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {company.id}
                                            </td>

                                            <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                                {company.name}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {company.industry}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-blue-600">
                                                {company.website || "-"}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {company.description || "-"}
                                            </td>

                                            <td className="px-6 py-4 space-x-4">

                                                <button
                                                    onClick={() => handleEdit(company.id)}
                                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(company.id)}
                                                    className="text-red-600 hover:text-red-800 font-medium"
                                                >
                                                    Delete
                                                </button>

                                            </td>                                         

                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>
                )}

            </main>

        </div>
    );
};

export default AdminCompanies;