import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./inscription.css";
import { addUtilisateur } from "../../services/apiUtilisateur";

const Inscription = () => {
  const [formData, setFormData] = useState({
    courriel: "",
    mot_de_passe: "",
    confirmer_mot_de_passe: "",
    role: "client", // Par défaut, le rôle est client
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validations
    if (
      !formData.courriel ||
      !formData.mot_de_passe ||
      !formData.confirmer_mot_de_passe ||
      !formData.role
    ) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    // Validation du format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.courriel)) {
      setError("Veuillez entrer une adresse courriel valide");
      return;
    }

    if (formData.mot_de_passe !== formData.confirmer_mot_de_passe) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (formData.mot_de_passe.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    // Réinitialise les messages d'erreur
    setError("");

    try {
      await addUtilisateur(formData); 
      setSuccessMessage("Votre compte a été créé avec succès !");
      // navigate("/login");
    } catch (err) {
      setError(err.message || "Erreur lors de la création du compte");
    }
  };

  return (
    <div className="inscription-container">
      <div className="inscription-box">
        <h2>Inscription</h2>
        {error && <div className="error-message">{error}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-groupe">
            <label htmlFor="role">Type de compte</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="select-role"
            >
              <option value="client">Client</option>
              <option value="employe">Employé</option>
            </select>
          </div>
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
          <div className="form-groupe">
            <label htmlFor="confirmer_mot_de_passe">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              id="confirmer_mot_de_passe"
              name="confirmer_mot_de_passe"
              value={formData.confirmer_mot_de_passe}
              onChange={handleChange}
              placeholder="Confirmez votre mot de passe"
            />
          </div>
          <button type="submit" className="bouton-soumettre">
            S'inscrire
          </button>
        </form>
        <p className="redirect-text">
          Déjà un compte ? <Link to="/login">Connectez-vous</Link>
        </p>
      </div>
    </div>
  );
};

export default Inscription;
