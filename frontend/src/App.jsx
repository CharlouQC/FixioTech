import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainNavigation from './vues/Navigation/MainNavigation';
import Accueil from './vues/accueil';
import Login from './vues/login';
import Inscription from './vues/inscription';

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
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
