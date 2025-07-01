import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const currentUser = localStorage.getItem("currentUser");
  const user = currentUser ? JSON.parse(currentUser) : null;

  const email = user?.token;

  const location = useLocation();

  if (email) return children;
  return <Navigate to="/login" state={location.pathname} />;
};

export default PrivateRoute;
