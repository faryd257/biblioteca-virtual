// src/hooks/useUserBooks.ts
import { useEffect, useState } from "react";
import { db } from "../firebase/FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface Libro {
  id: string;
  titulo: string;
  autor: string;
  genero: string;
  estado: string;
  nota?: string;
  calificacion?: number;
  creadoEn?: any;
}

export const useUserBooks = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [libros, setLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLibros = async () => {
      if (!user) return;

      try {
        const q = query(collection(db, "libros"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Libro[];

        setLibros(docs);
      } catch (error) {
        console.error("Error al obtener libros:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLibros();
  }, [user]);

  return { libros, loading };
};
