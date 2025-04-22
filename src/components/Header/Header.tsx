import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/FirebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { clearUser } from "../../redux/userSlice";
import { signOut } from "firebase/auth";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="main-header">
      <div className="container header-content">
        <Link to="/" className="logo">
          Bienvenido a Mi Biblioteca Virtual
        </Link>

        <nav className="nav-actions">
          {user ? (
            <>
              <Link to="/agregar" className="btn btn-success btn-sm me-2">
                + Agregar libro
              </Link>
              <span className="user-email">👤 {user.email}</span>
              <button
                onClick={handleLogout}
                className="btn btn-outline-light btn-sm ms-2"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light btn-sm me-2">
                Iniciar sesión
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Registrarse
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export { Header };
