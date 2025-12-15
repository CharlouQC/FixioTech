import React, { useEffect, useState } from "react";
import "./rendez-vous.css";
import { useAuth } from "../context/AuthContext";
import { addRendezVous } from "../../services/apiRendezVous";
import {
  getEmployes,
  getEmployesDisponibles,
  getEmployesParService,
} from "../../services/apiUtilisateur";

import { SERVICES } from "../constants";
import { HEURES_DISPONIBLES } from "../utils/timeSlots.js";

// Constante pour l'état initial du formulaire
const INITIAL_FORM_DATA = {
  service: "",
  date: "",
  heure: "",
  technicien: "",
  description: "",
};

// Helper pour générer le titre dynamique de la section techniciens
const getTechniciensTitle = (afficherAll, date, heure) => {
  if (afficherAll) return "Techniciens (tous)";
  if (date && heure) return "Techniciens Disponibles";
  return "Techniciens pour ce service";
};

// Composant réutilisable pour afficher la liste des techniciens
const TechniciensListe = ({ techniciens, selectedId, onSelect }) => (
  <div className="techniciens-liste">
    {techniciens.map((t) => (
      <div
        key={t.id}
        className={`technicien-card ${
          selectedId === String(t.id) ? "technicien-selected" : ""
        }`}
        onClick={() => onSelect(String(t.id))}
      >
        <div className="technicien-avatar">
          {String(t.nom_complet || t.email || "T")
            .charAt(0)
            .toUpperCase()}
        </div>
        <div className="technicien-info">
          <h3>{t.nom_complet || "Technicien"}</h3>
          <p>Support & Réparation</p>
        </div>
        {selectedId === String(t.id) && (
          <div className="technicien-check">✓</div>
        )}
      </div>
    ))}
  </div>
);

// Composant pour afficher l'état des techniciens (chargement/vide/liste)
const TechniciensDisplay = ({
  loading,
  techniciens,
  selectedId,
  onSelect,
  emptyMessage,
}) => {
  if (loading) {
    return <div className="loading-tech">Chargement des techniciens…</div>;
  }

  if (techniciens.length === 0) {
    return <div className="no-tech">{emptyMessage}</div>;
  }

  return (
    <TechniciensListe
      techniciens={techniciens}
      selectedId={selectedId}
      onSelect={onSelect}
    />
  );
};

const RendezVous = () => {
  const { user } = useAuth();

  // ---------- UI state ----------
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  // Tous les employés (pour affichage quand pas de filtre complet)
  const [allEmployes, setAllEmployes] = useState([]);
  const [loadingAllTech, setLoadingAllTech] = useState(true);

  // Employés disponibles pour un créneau (date+heure+service)
  const [techniciensDispo, setTechniciensDispo] = useState([]);
  const [loadingDispo, setLoadingDispo] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // 08:00 → 18:00, format "HH:mm"
  const creneauxHoraires = HEURES_DISPONIBLES;

  // ---------- Helpers ----------
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // ✅ IMPORTANT : reset immédiat du technicien + liste dispo si service change
  const handleChange = (e) => {
    setError("");
    const { name, value } = e.target;

    setFormData((f) => {
      if (name === "service") {
        return { ...f, service: value, technicien: "" };
      }
      return { ...f, [name]: value };
    });

    if (name === "service") {
      // vider visuellement la liste en attendant la réponse
      setTechniciensDispo([]);
    }
  };

  // Charger tous les employés (affichage quand pas encore date+heure+service)
  useEffect(() => {
    let alive = true;
    setLoadingAllTech(true);
    setError("");

    getEmployes()
      .then((list) => {
        if (!alive) return;
        setAllEmployes(list || []);
      })
      .catch((err) => {
        if (!alive) return;
        setAllEmployes([]);
        setError(err.message || "Erreur lors du chargement des techniciens.");
      })
      .finally(() => alive && setLoadingAllTech(false));

    return () => {
      alive = false;
    };
  }, []);

  // ✅ Filtrer en direct selon le niveau d'information disponible
  useEffect(() => {
    const { date, heure, service } = formData;

    // Si aucun service sélectionné, on ne filtre pas
    if (!service) {
      setTechniciensDispo([]);
      return;
    }

    let alive = true;
    setLoadingDispo(true);
    setError("");

    // Logique de filtrage progressive :
    // 1. Service seul : filtre par service
    // 2. Service + date : filtre par service et disponibilité générale
    // 3. Service + date + heure : filtre par service et disponibilité spécifique

    // Fonction helper pour charger et mettre à jour la liste des techniciens
    const loadTechniciens = (promise, errorMsg) => {
      promise
        .then((list) => {
          if (!alive) return;
          const next = list || [];
          setTechniciensDispo(next);

          if (
            formData.technicien &&
            !next.some((t) => String(t.id) === String(formData.technicien))
          ) {
            setFormData((f) => ({ ...f, technicien: "" }));
          }
        })
        .catch((err) => {
          if (!alive) return;
          setTechniciensDispo([]);
          setError(err.message || errorMsg);
        })
        .finally(() => alive && setLoadingDispo(false));
    };

    if (!date) {
      // Filtrage par service seulement
      loadTechniciens(
        getEmployesParService(service),
        "Erreur lors du chargement des techniciens pour ce service."
      );
    } else if (!heure) {
      // Filtrage par service et date (disponibilité générale)
      loadTechniciens(
        getEmployesParService(service),
        "Erreur lors du chargement des techniciens pour ce service."
      );
    } else {
      // Filtrage complet : service + date + heure
      loadTechniciens(
        getEmployesDisponibles(date, heure, service),
        "Erreur lors du chargement des techniciens disponibles."
      );
    }

    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.service, formData.date, formData.heure]);

  // ---------- Submit ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!formData.service) return setError("Veuillez sélectionner un service");
    if (!formData.date) return setError("Veuillez sélectionner une date");
    if (!formData.heure) return setError("Veuillez sélectionner une heure");
    if (!formData.technicien)
      return setError("Veuillez sélectionner un technicien");
    if (!formData.description.trim())
      return setError("Veuillez décrire brièvement votre problème");

    const dateSelectionnee = new Date(formData.date);
    const aujourdhui = new Date();
    aujourdhui.setHours(0, 0, 0, 0);

    if (dateSelectionnee < aujourdhui)
      return setError("La date ne peut pas être dans le passé");

    if (!user?.id) return setError("Vous devez être connecté pour réserver.");

    setIsLoading(true);

    try {
      await addRendezVous({
        client_id: user.id,
        employe_id: formData.technicien,
        service: formData.service,
        date_rdv: formData.date,
        heure_rdv: formData.heure,
        description_probleme: formData.description,
      });

      setSuccessMessage("Votre rendez-vous a été réservé avec succès !");
      setFormData({
        service: "",
        date: "",
        heure: "",
        technicien: "",
        description: "",
      });
      setTechniciensDispo([]);
    } catch (err) {
      setError(err.message || "Aucun technicien disponible à cette heure.");
    } finally {
      setIsLoading(false);
    }
  };

  // Liste de techniciens à afficher :
  // - Pas de service : TOUS les employés
  // - Service sélectionné : techniciens filtrés par service (et disponibilité si date+heure)
  const afficherAll = !formData.service;
  const listeTechniciens = afficherAll ? allEmployes : techniciensDispo;
  const loadingTech = afficherAll ? loadingAllTech : loadingDispo;

  // ---------- Render ----------
  return (
    <div className="rendez-vous-container">
      <div className="rendez-vous-header">
        <h1>Prendre un Rendez-vous</h1>
        <p className="rendez-vous-intro">
          Sélectionnez un service, choisissez un technicien disponible et
          planifiez votre rendez-vous.
        </p>
      </div>

      <div className="rendez-vous-content">
        {/* TECHNICIENS */}
        <div className="techniciens-section">
          <h2>{getTechniciensTitle(afficherAll, formData.date, formData.heure)}</h2>

          {!afficherAll && !formData.heure ? (
            <div className="no-tech">
              Sélectionnez une heure pour voir les techniciens disponibles.
            </div>
          ) : (
            <TechniciensDisplay
              loading={loadingTech}
              techniciens={listeTechniciens}
              selectedId={formData.technicien}
              onSelect={(id) => setFormData((f) => ({ ...f, technicien: id }))}
              emptyMessage="Aucun technicien disponible pour ce créneau."
            />
          )}
        </div>

        {/* FORMULAIRE */}
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
                {SERVICES.map((service) => (
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
                  {creneauxHoraires.map((h) => (
                    <option key={h} value={h}>
                      {h}
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
                placeholder="Décrivez brièvement le problème technique..."
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
            * Champs obligatoires. Un technicien vous contactera pour confirmer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RendezVous;
