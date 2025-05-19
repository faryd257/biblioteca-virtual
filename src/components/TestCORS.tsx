import { useEffect } from "react";

const TestCORS = () => {
  useEffect(() => {
    const testURL =
      "https://firebasestorage.googleapis.com/v0/b/biblioteca-virtual-57473.appspot.com/o/libros%2F1747614621872-Jaque_al_psicoanalista.pdf?alt=media";

    fetch(testURL)
      .then((res) => {
        if (res.ok) {
          console.log("✅ Acceso permitido (CORS OK)");
        } else {
          console.error("❌ CORS falló. Código HTTP:", res.status);
        }
      })
      .catch((error) => {
        console.error("❌ Error de red o CORS:", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h3>Probando acceso a Firebase Storage...</h3>
      <p>Ver consola (F12) para ver resultado.</p>
    </div>
  );
};

export { TestCORS };
