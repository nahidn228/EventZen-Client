import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const currentUser = localStorage.getItem("currentUser");
  const user = currentUser ? JSON.parse(currentUser) : null;

  const email = user?.token;

  const location = useLocation();

  if (email) return children;
  return <Navigate to="/login" state={location.pathname} />;
};

export default PrivateRoute;
