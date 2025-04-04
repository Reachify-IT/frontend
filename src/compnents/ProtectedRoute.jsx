import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element }) => {
  const accessToken = localStorage.getItem("accessToken"); // Check token in local storage
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Redux state

  return accessToken && isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
