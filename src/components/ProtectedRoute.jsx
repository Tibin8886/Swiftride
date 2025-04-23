
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check authentication status from localStorage
  let isLoggedIn = false;
  try {
    isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  } catch (error) {
    console.error("Error accessing localStorage:", error);
  }

  // Get current location to redirect back after login
  const location = useLocation();

  // If not logged in, redirect to login with the current path in state
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If logged in, render the protected component
  return children;
};

export default ProtectedRoute;
