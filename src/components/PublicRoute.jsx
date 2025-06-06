// src/components/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../lib/AuthUtils";

const PublicRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/home" replace /> : children;
};

export default PublicRoute;
