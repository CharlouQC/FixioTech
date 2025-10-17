import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainNavigation from "./vues/Navigation/MainNavigation";
import Accueil from "./vues/accueil";
import Login from "./vues/login";
import Inscription from "./vues/inscription";
import Services from "./vues/services_aides";
import Horaires from "./vues/horaires";
import RendezVous from "./vues/rendez-vous";
import Contact from "./vues/contact";

function App() {
  return (
    <Router>
      <div className="app">
        <MainNavigation />
        <main>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/login" element={<Login />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/services_aides" element={<Services />} />
            <Route path="/horaires" element={<Horaires />} />
            <Route path="/rendez-vous" element={<RendezVous />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
