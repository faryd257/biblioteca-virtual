// src/hooks/useAuthListener.ts
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../redux/userSlice";

export const useAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ uid: user.uid, email: user.email }));
      } else {
        dispatch(clearUser());
      }
    });

    // Limpia el listener cuando el componente se desmonta
    return () => unsubscribe();
  }, [dispatch]);
};
