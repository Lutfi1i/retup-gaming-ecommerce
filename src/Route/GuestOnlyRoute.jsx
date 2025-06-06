import { Navigate } from 'react-router-dom';

const GuestOnlyRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  return user ? <Navigate to="/home" replace /> : children;
};

export default GuestOnlyRoute;
