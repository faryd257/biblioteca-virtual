import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    genero: "",
    estado: "pendiente",
    nota: "",
    calificacion: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const libro = {
      titulo: formData.titulo,
      autor: formData.autor,
      genero: formData.genero,
      estado: formData.estado,
      nota: formData.nota,
      ...(formData.calificacion
        ? { calificacion: parseFloat(formData.calificacion) }
        : {}),
      uid: user.uid,
      creadoEn: new Date(),
    };

    try {
      await addDoc(collection(db, "libros"), libro);
      navigate("/");
    } catch (error) {
      console.error("Error al guardar el libro:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <h2 className="text-center mb-4">Agregar nuevo libro</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="titulo"
              placeholder="Título"
              className="form-control my-2"
              value={formData.titulo}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="autor"
              placeholder="Autor"
              className="form-control my-2"
              value={formData.autor}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="genero"
              placeholder="Género"
              className="form-control my-2"
              value={formData.genero}
              onChange={handleChange}
            />
            <select
              name="estado"
              className="form-select my-2"
              value={formData.estado}
              onChange={handleChange}
            >
              <option value="pendiente">Pendiente</option>
              <option value="leyendo">Leyendo</option>
              <option value="leido">Leído</option>
            </select>
            <textarea
              name="nota"
              placeholder="Notas o reseña"
              className="form-control my-2"
              value={formData.nota}
              onChange={handleChange}
            />
            <input
              type="number"
              name="calificacion"
              placeholder="Calificación (1.0 - 10.0)"
              className="form-control my-2"
              value={formData.calificacion}
              onChange={handleChange}
              min={1}
              max={10}
              step={0.1}
            />
            <button type="submit" className="btn btn-success w-100 mt-3">
              Guardar libro
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { AddBook };
