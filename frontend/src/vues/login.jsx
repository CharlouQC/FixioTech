import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { loginUtilisateur } from "../../services/apiUtilisateur";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courriel: "",
    mot_de_passe: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.courriel || !formData.mot_de_passe) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    setIsLoading(true);

    loginUtilisateur(formData)
      .then((response) => {
        console.log("Réponse API login:", response);
        login(response.utilisateur);
        navigate("/");
      })
      .catch((err) => {
        console.error("Erreur connexion:", err);
        setError(err.message || "Erreur lors de la connexion");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Connexion</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-groupe">
            <label htmlFor="courriel">Adresse courriel</label>
            <input
              type="email"
              id="courriel"
              name="courriel"
              value={formData.courriel}
              onChange={handleChange}
              placeholder="Entrez votre adresse courriel"
            />
          </div>

          <div className="form-groupe">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="mot_de_passe"
              value={formData.mot_de_passe}
              onChange={handleChange}
              placeholder="Entrez votre mot de passe"
            />
          </div>

          <button
            type="submit"
            className="bouton-soumettre"
            disabled={isLoading}
          >
            {isLoading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        <p className="redirect-text">
          Pas encore de compte ? <Link to="/inscription">Inscrivez-vous</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
