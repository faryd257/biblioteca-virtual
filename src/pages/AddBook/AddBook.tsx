import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase/FirebaseConfig";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

// ✅ Función reutilizable para subir un archivo
const subirArchivo = async (archivo: File): Promise<string> => {
  const archivoRef = ref(storage, `libros/${Date.now()}-${archivo.name}`);
  console.log("📤 Subiendo archivo a:", archivoRef.fullPath); // Debug
  await uploadBytes(archivoRef, archivo);
  const url = await getDownloadURL(archivoRef);
  console.log("✅ Archivo subido. URL:", url); // Debug
  return url;
};

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

  const [archivo, setArchivo] = useState<File | null>(null);

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

    try {
      let archivoURL = "";
      if (archivo) {
        archivoURL = await subirArchivo(archivo);
      }

      const libro = {
        titulo: formData.titulo,
        autor: formData.autor,
        genero: formData.genero,
        estado: formData.estado,
        nota: formData.nota,
        ...(formData.calificacion
          ? { calificacion: parseFloat(formData.calificacion) }
          : {}),
        archivoURL,
        uid: user.uid,
        creadoEn: new Date(),
      };

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
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              className="form-control my-2"
              onChange={(e) => setArchivo(e.target.files?.[0] || null)}
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
