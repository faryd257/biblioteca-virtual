import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { AddBook } from "../pages/AddBook/AddBook";
import { EditBook } from "../pages/EditBook/EditBook";
import { Layout } from "./Layout";
import { PrivateRoute } from "./PrivateRoute";
import { TestCORS } from "../components/TestCORS"; // ✅ agregado

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Rutas privadas */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/agregar"
          element={
            <PrivateRoute>
              <AddBook />
            </PrivateRoute>
          }
        />
        <Route
          path="/editar/:id"
          element={
            <PrivateRoute>
              <EditBook />
            </PrivateRoute>
          }
        />

        {/* ✅ Ruta de testeo de CORS */}
        <Route path="/test-cors" element={<TestCORS />} />

        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Redirección para rutas no encontradas */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export { AppRouter };
