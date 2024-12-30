import React from "react";
import { Routes, Route } from "react-router-dom";

// Import des composants
import AjoutTache from "./composant/AjoutTache";
// import About from "./composant/About";
// import Contact from "./composant/Contact";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AjoutTache />} />
      {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} /> */}
    </Routes>
  );
}

export default AppRoutes;