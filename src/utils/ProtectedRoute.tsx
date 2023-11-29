import { Navigate, Route } from "react-router-dom";

interface ProtectedRouteProps {
  element: React.ReactElement;
  path: string;
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const isAdmin = localStorage.getItem("isLoggedAdmin") === "true";

  return isAdmin ? <Route {...props} /> : <Navigate to="*" />;
};

export default ProtectedRoute;
