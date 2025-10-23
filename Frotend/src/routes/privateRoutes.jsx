import { Navigate, Outlet } from "react-router";
import { useState } from "react";

const PrivateRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        return !!user;
    });

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default PrivateRoutes;