import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user || !user.isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
