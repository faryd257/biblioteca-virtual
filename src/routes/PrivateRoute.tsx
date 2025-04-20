// src/routes/PrivateRoute.tsx
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";
import { useEffect, useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const user = useSelector((state: RootState) => state.user.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // Espera 500ms para dar tiempo a Firebase
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <p className="text-center mt-5">Cargando sesión...</p>;

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
};

export { PrivateRoute };
