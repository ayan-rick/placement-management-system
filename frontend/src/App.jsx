import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PlacementDrives from "./pages/PlacementDrives";
import PlacementDriveDetails from "./pages/PlacementDriveDetails";
import MyApplications from "./pages/MyApplications";
import MyProfile from "./pages/MyProfile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>

            <AuthProvider>

                <Routes>

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/placement-drives"
                        element={
                            <ProtectedRoute>
                                <PlacementDrives />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/placement-drives/:id"
                        element={
                            <ProtectedRoute>
                                <PlacementDriveDetails />
                            </ProtectedRoute>
                        }
                    />                                       

                    <Route
                        path="/applications"
                        element={
                            <ProtectedRoute>
                                <MyApplications />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <MyProfile />
                            </ProtectedRoute>
                        }
                    />

                    <Route element={<AdminRoute />}>
                        <Route
                            path="/admin/dashboard"
                            element={<AdminDashboard />}
                        />
                    </Route>
                    
                    <Route
                        path="/"
                        element={
                            <Navigate
                                to="/login"
                                replace
                            />
                        }
                    />

                </Routes>

            </AuthProvider>

        </BrowserRouter>
    );
}

export default App;