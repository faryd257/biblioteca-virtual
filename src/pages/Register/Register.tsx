import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = cred.user;
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
        })
      );

      navigate("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2>Crear cuenta</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control my-2"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          className="form-control my-2"
          placeholder="Contraseña"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary w-100" type="submit">
          Registrarse
        </button>
      </form>
    </div>
  );
}

export { Register };
