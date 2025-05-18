import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import "./Home.css";

interface Libro {
  id: string;
  titulo: string;
  autor: string;
  genero?: string;
  estado: string;
  nota?: string;
  calificacion?: number;
  creadoEn?: any;
  archivoURL?: string;
}

const LIBROS_POR_PAGINA = 6;

const Home = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [libros, setLibros] = useState<Libro[]>([]);
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [orden, setOrden] = useState("reciente");
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerLibros = async () => {
      if (!user) return;
      const q = query(collection(db, "libros"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const librosUsuario = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Libro[];
      setLibros(librosUsuario);
    };

    obtenerLibros();
  }, [user]);

  const handleEliminar = async (id: string) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar este libro?"
    );
    if (!confirmacion) return;

    try {
      await deleteDoc(doc(db, "libros", id));
      setLibros(libros.filter((libro) => libro.id !== id));
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
    }
  };

  const handleEditar = (id: string) => {
    navigate(`/editar/${id}`);
  };

  const totalLibros = libros.length;
  const leidos = libros.filter((l) => l.estado === "leido").length;
  const pendientes = libros.filter((l) => l.estado === "pendiente").length;
  const leyendo = libros.filter((l) => l.estado === "leyendo").length;

  const promedio =
    libros.filter((l) => l.calificacion !== undefined).length > 0
      ? (
          libros
            .filter((l) => l.calificacion !== undefined)
            .reduce((acc, l) => acc + (l.calificacion || 0), 0) /
          libros.filter((l) => l.calificacion !== undefined).length
        ).toFixed(1)
      : "N/A";

  const librosFiltrados = libros
    .filter((libro) =>
      filtroEstado === "todos" ? true : libro.estado === filtroEstado
    )
    .filter((libro) =>
      libro.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );

  const librosOrdenados = [...librosFiltrados].sort((a, b) => {
    switch (orden) {
      case "titulo-asc":
        return a.titulo.localeCompare(b.titulo);
      case "titulo-desc":
        return b.titulo.localeCompare(a.titulo);
      case "calificacion-desc":
        return (b.calificacion || 0) - (a.calificacion || 0);
      case "calificacion-asc":
        return (a.calificacion || 0) - (b.calificacion || 0);
      default:
        return 0;
    }
  });

  const totalPaginas = Math.ceil(librosOrdenados.length / LIBROS_POR_PAGINA);
  const librosPaginados = librosOrdenados.slice(
    (paginaActual - 1) * LIBROS_POR_PAGINA,
    paginaActual * LIBROS_POR_PAGINA
  );

  return (
    <div className="container">
      <h2 className="text-center my-4">📚 Mis Libros</h2>

      {/* Estadísticas */}
      <div className="row text-center mb-4">
        <div className="col-6 col-md-3 mb-2">
          <div className="stat-card bg-primary text-white">
            📚 Total: {totalLibros}
          </div>
        </div>
        <div className="col-6 col-md-3 mb-2">
          <div className="stat-card bg-success text-white">
            ✅ Leídos: {leidos}
          </div>
        </div>
        <div className="col-6 col-md-3 mb-2">
          <div className="stat-card bg-warning text-dark">
            📖 Leyendo: {leyendo}
          </div>
        </div>
        <div className="col-6 col-md-3 mb-2">
          <div className="stat-card bg-secondary text-white">
            🕓 Pendientes: {pendientes}
          </div>
        </div>
        <div className="col-12 mt-3">
          <div className="stat-card bg-info text-white">
            ⭐ Promedio calificación: {promedio}
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="d-flex flex-wrap justify-content-between mb-3 gap-2">
        <select
          className="form-select w-auto"
          value={filtroEstado}
          onChange={(e) => {
            setFiltroEstado(e.target.value);
            setPaginaActual(1);
          }}
        >
          <option value="todos">Todos</option>
          <option value="pendiente">Pendientes</option>
          <option value="leyendo">Leyendo</option>
          <option value="leido">Leídos</option>
        </select>

        <select
          className="form-select w-auto"
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
        >
          <option value="reciente">Más recientes</option>
          <option value="titulo-asc">Título A–Z</option>
          <option value="titulo-desc">Título Z–A</option>
          <option value="calificacion-desc">Calificación alta</option>
          <option value="calificacion-asc">Calificación baja</option>
        </select>

        <input
          type="text"
          placeholder="Buscar por título"
          className="form-control w-auto"
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPaginaActual(1);
          }}
        />
      </div>

      {/* Lista de libros */}
      <div className="row">
        {librosPaginados.map((libro) => (
          <div className="col-12 col-sm-6 col-md-4 mb-4" key={libro.id}>
            <div className="book-card p-3 shadow-sm h-100 d-flex flex-column justify-content-between">
              <div>
                <h5 className="book-title">{libro.titulo}</h5>
                <p>
                  <strong>Autor:</strong> {libro.autor}
                </p>
                <p>
                  <strong>Estado:</strong> {libro.estado}
                </p>
                {libro.genero && (
                  <p>
                    <strong>Género:</strong> {libro.genero}
                  </p>
                )}
                {libro.nota && (
                  <p>
                    <strong>Nota:</strong> {libro.nota}
                  </p>
                )}
                {libro.calificacion && (
                  <p>
                    <strong>Calificación:</strong> ⭐ {libro.calificacion}/10
                  </p>
                )}
                {libro.archivoURL && (
                  <div className="mt-2">
                    {libro.archivoURL.endsWith(".pdf") ? (
                      <a
                        href={libro.archivoURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-secondary btn-sm"
                      >
                        📄 Ver PDF
                      </a>
                    ) : (
                      <img
                        src={libro.archivoURL}
                        alt="Portada"
                        className="img-fluid rounded"
                        style={{ maxHeight: "200px", objectFit: "cover" }}
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="mt-3 d-flex justify-content-between">
                <button
                  className="btn btn-outline-primary btn-sm w-45"
                  onClick={() => handleEditar(libro.id)}
                >
                  ✏️ Editar
                </button>
                <button
                  className="btn btn-outline-danger btn-sm w-45"
                  onClick={() => handleEliminar(libro.id)}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPaginas }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${paginaActual === i + 1 ? "active" : ""}`}
                >
                  <button
                    onClick={() => setPaginaActual(i + 1)}
                    className="page-link"
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export { Home };
