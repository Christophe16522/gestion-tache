import React from "react";
import AjoutTache from "./composant/AjoutTache.js";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
function App() {
  return (
    <div>
      {/* <AjoutTache /> */}
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
