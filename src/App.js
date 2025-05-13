//import React from "react"; TODO: remove if not needed
//import AjoutTache from "./composant/AjoutTache.js"; TODO: remove if not needed
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
