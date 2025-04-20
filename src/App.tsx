import "./App.css";
import { AppRouter } from "./routes/AppRouter";
import { useAuthListener } from "./hooks/useAuthListener"; // 👈 Importá el hook

function App() {
  useAuthListener(); // 👈 Activá el listener cuando arranca la app

  return <AppRouter />;
}

export default App;
