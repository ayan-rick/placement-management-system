import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import api from "../services/api";

const AdminStudents = () => {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editingStudent, setEditingStudent] = useState(null);
    const [editLoading, setEditLoading] = useState(false);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await api("/students");

                setStudents(response.data);

            } catch (error) {
                console.error("Error fetching students:", error);

                setError("Failed to load students");

            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleEdit = async (studentId) => {
        try {
            setEditLoading(true);
            setError("");

            const response = await api(
                `/students/${studentId}/profile`
            );

            setEditingStudent(response.data);

        } catch (error) {
            console.error("Error fetching student details:", error);

            setError(
                error.message || "Failed to load student details"
            );

        } finally {
            setEditLoading(false);
        }
    };

    const handleDelete = async (studentId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await api(`/students/${studentId}`, {
                method: "DELETE"
            });

            setStudents((currentStudents) =>
                currentStudents.filter(
                    (student) => student.id !== studentId
                )
            );

        } catch (error) {
            console.error("Error deleting student:", error);

            setError(
                error.message || "Failed to delete student"
            );
        }
    };

    const handleUpdate = async () => {
        try {
            setError("");

            await api(`/students/${editingStudent.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    department_id: editingStudent.department_id,
                    batch_id: editingStudent.batch_id,
                    roll_number: editingStudent.roll_number,
                    name: editingStudent.name,
                    cgpa: Number(editingStudent.cgpa),
                    backlogs: Number(editingStudent.backlogs)
                })
            });

            setEditingStudent(null);

            const response = await api("/students");

            setStudents(response.data);

        } catch (error) {
            console.error("Error updating student:", error);

            setError(
                error.message || "Failed to update student"
            );
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">

            <AdminSidebar />

            <main className="flex-1 p-8">

                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Students
                    </h2>

                    <p className="text-gray-600 mt-2">
                        Manage registered students in the placement system.
                    </p>
                </div>

                {loading && (
                    <p className="text-gray-600">
                        Loading students...
                    </p>
                )}

                {error && (
                    <p className="text-red-600 mb-4">
                        {error}
                    </p>
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
                                            Roll Number
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                            Department
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                            Batch
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                            CGPA
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                            Backlogs
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                            Actions
                                        </th>

                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">

                                    {students.map((student) => (
                                        <tr
                                            key={student.id}
                                            className="hover:bg-gray-50"
                                        >

                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {student.id}
                                            </td>

                                            <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                                {student.name}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {student.roll_number}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {student.department}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {student.batch}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {student.cgpa}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {student.backlogs}
                                            </td>

                                            <td className="px-6 py-4 text-sm space-x-2">
                                                <button
                                                    onClick={() => handleEdit(student.id)}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(student.id)}
                                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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

                {editingStudent && (
                    <div className="bg-white rounded-lg shadow p-6 mb-8">

                        <div className="flex justify-between items-center mb-6">

                            <h3 className="text-xl font-semibold text-gray-800">
                                Edit Student
                            </h3>

                            <button
                                onClick={() => setEditingStudent(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                Cancel
                            </button>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    required
                                    value={editingStudent.name}
                                    onChange={(e) =>
                                        setEditingStudent({
                                            ...editingStudent,
                                            name: e.target.value
                                        })
                                    }
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Roll Number
                                </label>

                                <input
                                    type="text"
                                    required
                                    value={editingStudent.roll_number}
                                    onChange={(e) =>
                                        setEditingStudent({
                                            ...editingStudent,
                                            roll_number: e.target.value
                                        })
                                    }
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    CGPA
                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="10"
                                    value={editingStudent.cgpa}
                                    onChange={(e) =>
                                        setEditingStudent({
                                            ...editingStudent,
                                            cgpa: e.target.value
                                        })
                                    }
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Backlogs
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={editingStudent.backlogs}
                                    onChange={(e) =>
                                        setEditingStudent({
                                            ...editingStudent,
                                            backlogs: e.target.value
                                        })
                                    }
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>

                        </div>

                        <div className="mt-6">

                            <button
                                onClick={handleUpdate}
                                className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                            >
                                Save Changes
                            </button>

                        </div>

                    </div>
                )}

            </main>

        </div>
    );
};

export default AdminStudents;