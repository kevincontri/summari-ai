import { Navigate } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import { isTokenExpired } from "../lib/auth";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");

  if (isTokenExpired(token)) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
  }