import { Navigate } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists in local storage

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return children;
  }