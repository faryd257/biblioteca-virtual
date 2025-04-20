import "./Footer.css";

const Footer = () => {
  return (
    <footer className="custom-footer text-light py-4 ">
      <div className="container text-center">
        <p className="mb-1">
          <strong>Mi Biblioteca Virtual</strong> — Todos los derechos reservados
          &copy; {new Date().getFullYear()}
        </p>
        <p className="mb-1">
          🚀 Portafolio creado por <strong>Faryd I.T. Ortiz Abalos</strong>
        </p>
        <p className="mb-1">
          Construido con <strong>React + TypeScript</strong> y Firebase
        </p>
        <p className="mb-0">
          🌐{" "}
          <a
            href="https://github.com/faryd257/biblioteca-virtual"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            GitHub
          </a>{" "}
          |{" "}
          <a
            href="https://www.linkedin.com/in/faryd-ignacio-ortiz"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </footer>
  );
};

export { Footer };
