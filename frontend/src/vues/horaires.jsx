import React, { useState } from "react";
import "./horaires.css";

const Horaires = () => {
  const [isEmploye] = useState(true);

  // État pour les services sélectionnés
  const [servicesSelectionnes, setServicesSelectionnes] = useState([]);

  // État pour les horaires par jour (début et fin)
  const [horairesParJour, setHorairesParJour] = useState({
    Lundi: { actif: false, debut: "08:00", fin: "17:00" },
    Mardi: { actif: false, debut: "08:00", fin: "17:00" },
    Mercredi: { actif: false, debut: "08:00", fin: "17:00" },
    Jeudi: { actif: false, debut: "08:00", fin: "17:00" },
    Vendredi: { actif: false, debut: "08:00", fin: "17:00" },
    Samedi: { actif: false, debut: "08:00", fin: "17:00" },
    Dimanche: { actif: false, debut: "08:00", fin: "17:00" },
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Liste des services disponibles
  const services = [
    "Réparation d'ordinateurs",
    "Réparation de cellulaires",
    "Réparation de tablettes",
    "Services à domicile",
    "Support technique",
    "Formation personnalisée",
  ];

  // Génère les heures disponibles (8h à 18h)
  const heuresDisponibles = Array.from({ length: 11 }, (_, i) => {
    const heure = i + 8;
    return `${heure.toString().padStart(2, "0")}:00`;
  });

  // Génère les jours de la semaine
  const joursSemaines = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  // Gère la sélection/déselection des services
  const handleServiceToggle = (service) => {
    setServicesSelectionnes((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  // Gère l'activation/désactivation d'un jour
  const handleJourToggle = (jour) => {
    setHorairesParJour((prev) => ({
      ...prev,
      [jour]: {
        ...prev[jour],
        actif: !prev[jour].actif,
      },
    }));
  };

  // Gère le changement d'heure de début
  const handleHeureDebutChange = (jour, heure) => {
    setHorairesParJour((prev) => ({
      ...prev,
      [jour]: {
        ...prev[jour],
        debut: heure,
      },
    }));
  };

  // Gère le changement d'heure de fin
  const handleHeureFinChange = (jour, heure) => {
    setHorairesParJour((prev) => ({
      ...prev,
      [jour]: {
        ...prev[jour],
        fin: heure,
      },
    }));
  };

  // Sauvegarde l'horaire
  const handleSauvegarder = async () => {
    setError("");
    setSuccessMessage("");

    // Validation : au moins un service sélectionné
    if (servicesSelectionnes.length === 0) {
      setError("Veuillez sélectionner au moins un service");
      return;
    }

    // Validation : au moins un jour actif
    const joursActifs = Object.entries(horairesParJour).filter(
      // eslint-disable-next-line no-unused-vars
      ([_, data]) => data.actif
    );

    if (joursActifs.length === 0) {
      setError("Veuillez sélectionner au moins un jour de disponibilité");
      return;
    }

    // Validation : vérifier que l'heure de fin est après l'heure de début
    for (const [jour, data] of joursActifs) {
      if (data.actif && data.debut >= data.fin) {
        setError(
          `Erreur pour ${jour} : L'heure de fin doit être après l'heure de début`
        );
        return;
      }
    }

    try {
      // TODO: Appel à l'API backend pour sauvegarder l'horaire
      // await saveHoraire({ services: servicesSelectionnes, horaires: horairesParJour });

      // Simulation d'un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccessMessage("Votre horaire a été enregistré avec succès !");
    } catch (err) {
      setError(err.message || "Erreur lors de l'enregistrement de l'horaire");
    }
  };

  // Si l'utilisateur n'est pas un employé, affiche un message d'accès restreint
  if (!isEmploye) {
    return (
      <div className="restricted-access">
        <h2>Accès Restreint</h2>
        <p>Cette page est réservée aux techniciens de FixioTech.</p>
      </div>
    );
  }

  return (
    <div className="horaires-container">
      <h1 className="horaires-titres">Gestion de mon horaire</h1>

      {error && <div className="error-message">{error}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <div className="horaires-grid">
        {/* Section des services */}
        <div className="services-section">
          <h2 className="services-titres">Mes services proposés</h2>
          <div className="liste-services">
            {services.map((service) => (
              <label key={service} className="service-checkbox">
                <input
                  type="checkbox"
                  checked={servicesSelectionnes.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                />
                {service}
              </label>
            ))}
          </div>
        </div>

        {/* Section des disponibilités */}
        <div className="calendrier-section">
          <h2 className="calendrier-titre">Mes disponibilités</h2>
          <p className="calendrier-description">
            Sélectionnez les jours où vous êtes disponible et définissez vos
            heures de début et de fin.
          </p>

          <div className="disponibilites-liste">
            {joursSemaines.map((jour) => (
              <div
                key={jour}
                className={`jour-row ${
                  horairesParJour[jour].actif ? "jour-actif" : ""
                }`}
              >
                <div className="jour-checkbox-container">
                  <label className="jour-checkbox">
                    <input
                      type="checkbox"
                      checked={horairesParJour[jour].actif}
                      onChange={() => handleJourToggle(jour)}
                    />
                    <span className="jour-nom">{jour}</span>
                  </label>
                </div>

                {horairesParJour[jour].actif && (
                  <div className="heures-container">
                    <div className="heure-groupe">
                      <label htmlFor={`debut-${jour}`}>Début</label>
                      <select
                        id={`debut-${jour}`}
                        value={horairesParJour[jour].debut}
                        onChange={(e) =>
                          handleHeureDebutChange(jour, e.target.value)
                        }
                        className="heure-select"
                      >
                        {heuresDisponibles.map((heure) => (
                          <option key={heure} value={heure}>
                            {heure}
                          </option>
                        ))}
                      </select>
                    </div>

                    <span className="heure-separateur">—</span>

                    <div className="heure-groupe">
                      <label htmlFor={`fin-${jour}`}>Fin</label>
                      <select
                        id={`fin-${jour}`}
                        value={horairesParJour[jour].fin}
                        onChange={(e) =>
                          handleHeureFinChange(jour, e.target.value)
                        }
                        className="heure-select"
                      >
                        {heuresDisponibles.map((heure) => (
                          <option key={heure} value={heure}>
                            {heure}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            className="bouton-enregistrer-horaire"
            onClick={handleSauvegarder}
          >
            Enregistrer mon horaire
          </button>
        </div>
      </div>
    </div>
  );
};

export default Horaires;
