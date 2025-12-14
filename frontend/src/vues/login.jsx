import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { loginUtilisateur } from "../../services/apiUtilisateur";
import { useAuth } from "../context/AuthContext.jsx";
import SubmitButton from "./components/SubmitButton.jsx";
import FormInput from "./components/FormInput.jsx";
import MessageAlert from "./components/MessageAlert.jsx";
import AuthFields from "./components/AuthFields.jsx";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courriel: "",
    mot_de_passe: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
        // Le backend retourne directement l'utilisateur: {id, email, nom_complet, role}
        const u = response?.utilisateur || response?.user || response || {};

        // Normalisation des champs clés
        const normalized = {
          ...u,
          id:
            u.id ?? u.client_id ?? u.utilisateur_id ?? u.id_utilisateur ?? null,
          role: ((u.role ?? u.type ?? "") + "").toLowerCase() || "client",
          email: u.email ?? u.courriel ?? "",
          nom_complet:
            u.nom_complet ??
            u.nom ??
            `${u.prenom ?? ""} ${u.nom_famille ?? ""}`.trim(),
        };

        // (Optionnel) stocker le token si fourni
        if (response?.token) {
          localStorage.setItem("auth_token", response.token);
        }

        // Injection dans le contexte
        login(normalized);

        // Redirection par rôle (adapte aux routes existantes)
        switch (normalized.role) {
          case "admin":
            navigate("/admin");
            break;
          case "employe":
          case "employé":
            navigate("/employe");
            break;
          case "client":
          default:
            navigate("/client");
            break;
        }
      })
      .catch((err) => {
        console.error("Erreur connexion:", err);
        setError(err?.message || "Erreur lors de la connexion");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Connexion</h2>
        <MessageAlert error={error} />

        <form onSubmit={handleSubmit}>
          <AuthFields
            formData={formData}
            handleChange={handleChange}
            showConfirmPassword={false}
          />

          <SubmitButton isLoading={isLoading}>
            Se connecter
          </SubmitButton>
        </form>

        <p className="redirect-text">
          Pas encore de compte ? <Link to="/inscription">Inscrivez-vous</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
