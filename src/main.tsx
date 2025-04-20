import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import { BrowserRouter } from "react-router-dom"; // ← IMPORTANTE

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {" "}
        {/* ← ENVOLVER LA APP */}
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
