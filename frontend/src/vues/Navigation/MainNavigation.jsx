import React from "react";
import { Link } from "react-router-dom";
import "./MainNavigation.css";

const MainNavigation = () => {
  return (
    <nav className="main-navigation">
      <div className="nav-brand">
        <Link to="/" className="brand-link">
          FixioTech
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">
            Accueil
          </Link>
        </li>
        <li>
          <Link to="/services_aides" className="nav-link">
            Services
          </Link>
        </li>
        <li>
          <Link to="/horaires" className="nav-link">
            Horaires
          </Link>
        </li>
        <li>
          <Link to="/rendez-vous" className="nav-link">
            Rendez-vous
          </Link>
        </li>
        <li>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
        </li>
        <li>
          <Link to="/client" className="nav-link">
            Mes demandes
          </Link>
        </li>
        <li>
          <Link to="/employe" className="nav-link">
            Espace employé
          </Link>
        </li>
        <li>
          <Link to="/login" className="nav-link login-link">
            Connexion
          </Link>
        </li>
        <li>
          <Link to="/inscription" className="nav-link signup-link">
            Inscription
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
