import React, { useState } from "react";
import "./rendez-vous.css";

const RendezVous = () => {
  // États pour le formulaire
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    heure: "",
    technicien: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Liste des services disponibles (identiques à ceux de la page services)
  const services = [
    "Réparation d'ordinateurs",
    "Réparation de cellulaires",
    "Réparation de tablettes",
    "Services à domicile",
    "Support technique",
    "Formation personnalisée",
  ];

  // Liste temporaire des techniciens (sera remplacée par les données du backend)
  const techniciensDisponibles = [
    { id: 1, nom: "Jean Tremblay", specialite: "Ordinateurs et Réseaux" },
    { id: 2, nom: "Marie Dubois", specialite: "Appareils Mobiles" },
    { id: 3, nom: "Pierre Gagnon", specialite: "Support Général" },
    { id: 4, nom: "Sophie Leblanc", specialite: "Formation" },
  ];

  // Génère les créneaux horaires disponibles (8h à 18h)
  const creneauxHoraires = Array.from({ length: 11 }, (_, i) => {
    const heure = i + 8;
    return `${heure}:00`;
  });

  // Gère les changements dans le formulaire
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  // Gère la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Validations
    if (!formData.service) {
      setError("Veuillez sélectionner un service");
      return;
    }

    if (!formData.date) {
      setError("Veuillez sélectionner une date");
      return;
    }

    if (!formData.heure) {
      setError("Veuillez sélectionner une heure");
      return;
    }

    if (!formData.technicien) {
      setError("Veuillez sélectionner un technicien");
      return;
    }

    if (!formData.description.trim()) {
      setError("Veuillez décrire brièvement votre problème");
      return;
    }

    // Validation de la date (ne peut pas être dans le passé)
    const dateSelectionnee = new Date(formData.date);
    const aujourdhui = new Date();
    aujourdhui.setHours(0, 0, 0, 0);

    if (dateSelectionnee < aujourdhui) {
      setError("La date ne peut pas être dans le passé");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Appel à l'API backend pour créer le rendez-vous
      // await createRendezVous(formData);

      // Simulation d'un appel API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccessMessage(
        "Votre demande de rendez-vous a été envoyée avec succès ! Un technicien vous contactera bientôt pour confirmer."
      );

      // Réinitialise le formulaire
      setFormData({
        service: "",
        date: "",
        heure: "",
        technicien: "",
        description: "",
      });
    } catch (err) {
      setError(
        err.message || "Erreur lors de l'envoi de la demande de rendez-vous"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Obtient la date minimale (aujourd'hui) pour le sélecteur de date
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <div className="rendez-vous-container">
      <div className="rendez-vous-header">
        <h1>Prendre un Rendez-vous</h1>
        <p className="rendez-vous-intro">
          Sélectionnez un service, choisissez un technicien disponible et
          planifiez votre rendez-vous en quelques clics.
        </p>
      </div>

      <div className="rendez-vous-content">
        {/* Section des techniciens disponibles */}
        <div className="techniciens-section">
          <h2>Techniciens Disponibles</h2>
          <div className="techniciens-liste">
            {techniciensDisponibles.map((technicien) => (
              <div
                key={technicien.id}
                className={`technicien-card ${
                  formData.technicien === technicien.id.toString()
                    ? "technicien-selected"
                    : ""
                }`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    technicien: technicien.id.toString(),
                  })
                }
              >
                <div className="technicien-avatar">
                  {technicien.nom.charAt(0)}
                </div>
                <div className="technicien-info">
                  <h3>{technicien.nom}</h3>
                  <p>{technicien.specialite}</p>
                </div>
                {formData.technicien === technicien.id.toString() && (
                  <div className="technicien-check">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Formulaire de rendez-vous */}
        <div className="formulaire-section">
          <h2>Détails du Rendez-vous</h2>

          {error && <div className="error-message">{error}</div>}
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}

          <form onSubmit={handleSubmit} className="rendez-vous-form">
            <div className="form-groupe">
              <label htmlFor="service">Service requis *</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">-- Sélectionnez un service --</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-groupe">
                <label htmlFor="date">Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={getMinDate()}
                  className="form-input"
                />
              </div>

              <div className="form-groupe">
                <label htmlFor="heure">Heure *</label>
                <select
                  id="heure"
                  name="heure"
                  value={formData.heure}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">-- Sélectionnez une heure --</option>
                  {creneauxHoraires.map((heure) => (
                    <option key={heure} value={heure}>
                      {heure}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-groupe">
              <label htmlFor="description">Description du problème *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Décrivez brièvement le problème technique que vous rencontrez..."
                rows="5"
                className="form-textarea"
              />
            </div>

            <button
              type="submit"
              className="bouton-soumettre"
              disabled={isLoading}
            >
              {isLoading ? "Envoi en cours..." : "Réserver le rendez-vous"}
            </button>
          </form>

          <p className="form-note">
            * Champs obligatoires. Un technicien vous contactera dans les plus
            brefs délais pour confirmer votre rendez-vous.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RendezVous;
