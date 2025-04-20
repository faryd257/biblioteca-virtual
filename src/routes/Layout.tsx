// src/routes/Layout.tsx
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

const Layout = () => {
  return (
    <div className="layout-wrapper d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1  main-background">
        {/* Sacamos el container de acá para que el fondo ocupe todo */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export { Layout };
