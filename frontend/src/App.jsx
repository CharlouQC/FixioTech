import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainNavigation from "./vues/Navigation/MainNavigation";
import Accueil from "./vues/accueil";
import Login from "./vues/login";
import Inscription from "./vues/inscription";
import Services from "./vues/services_aides";

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
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
