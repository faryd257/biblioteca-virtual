import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";

const EditBook = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    genero: "",
    estado: "pendiente",
    nota: "",
    calificacion: "",
  });

  useEffect(() => {
    const obtenerLibro = async () => {
      if (!id) return;
      const docRef = doc(db, "libros", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData({
          titulo: data.titulo || "",
          autor: data.autor || "",
          genero: data.genero || "",
          estado: data.estado || "pendiente",
          nota: data.nota || "",
          calificacion: data.calificacion?.toString() || "",
        });
      }

      setLoading(false);
    };

    obtenerLibro();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    const docRef = doc(db, "libros", id);
    const libroActualizado = {
      ...formData,
      calificacion: formData.calificacion
        ? parseFloat(formData.calificacion)
        : null,
    };

    try {
      await updateDoc(docRef, libroActualizado);
      navigate("/");
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  if (loading) return <p className="text-center mt-4">Cargando libro...</p>;

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center">Editar libro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="titulo"
          className="form-control my-2"
          placeholder="Título"
          value={formData.titulo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="autor"
          className="form-control my-2"
          placeholder="Autor"
          value={formData.autor}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="genero"
          className="form-control my-2"
          placeholder="Género"
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
          className="form-control my-2"
          placeholder="Nota"
          value={formData.nota}
          onChange={handleChange}
        />
        <input
          type="number"
          name="calificacion"
          className="form-control my-2"
          placeholder="Calificación (1.0 - 10.0)"
          value={formData.calificacion}
          onChange={handleChange}
          min={1}
          max={10}
          step={0.1}
        />
        <button className="btn btn-primary w-100 mt-2" type="submit">
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export { EditBook };
