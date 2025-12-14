import React, { useEffect, useMemo, useState } from "react";
import "./horaires.css";
import { useAuth } from "../context/AuthContext";
import { getHoraireByEmploye, addHoraire, updateHoraire } from "../../services/apiHoraire";

const JOURS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const k = (jour, type) => `${jour.toLowerCase()}_${type}`;

const Horaires = () => {
  const { user, role } = useAuth();
  const isEmploye = role === "employe";

  const [servicesSelectionnes, setServicesSelectionnes] = useState([]);

  const [horairesParJour, setHorairesParJour] = useState(() => {
    const base = {};
    JOURS.forEach((j) => {
      base[j] = { actif: false, debut: "08:00", fin: "17:00" };
    });
    return base;
  });

  const [horaireId, setHoraireId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const services = [
    "Réparation d'ordinateurs",
    "Réparation de cellulaires",
    "Réparation de tablettes",
    "Services à domicile",
    "Support technique",
    "Formation personnalisée",
  ];

  const heuresDisponibles = useMemo(
    () =>
      Array.from({ length: 11 }, (_, i) => {
        const h = String(i + 8).padStart(2, "0");
        return `${h}:00`;
      }),
    []
  );

  useEffect(() => {
    if (!user?.id || !isEmploye) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    getHoraireByEmploye(user.id)
      .then((h) => {
        if (!h) {
          setHoraireId(null);
          setServicesSelectionnes([]);
          return;
        }

        const next = {};
        JOURS.forEach((jour) => {
          const debut = h[k(jour, "debut")];
          const fin = h[k(jour, "fin")];
          const actif = debut != null && fin != null;

          next[jour] = {
            actif,
            debut: actif ? String(debut).slice(0, 5) : "08:00",
            fin: actif ? String(fin).slice(0, 5) : "17:00",
          };
        });

        // ✅ Recharge services proposés (JSONB => souvent déjà un array)
        const sp = h.services_proposes;
        if (Array.isArray(sp)) {
          setServicesSelectionnes(sp);
        } else {
          setServicesSelectionnes([]);
        }

        setHorairesParJour(next);
        setHoraireId(h.id);
      })
      .catch((err) => {
        setError(err.message || "Erreur lors du chargement de l'horaire.");
        setHoraireId(null);
        setServicesSelectionnes([]);
      })
      .finally(() => setLoading(false));
  }, [user, isEmploye]);

  const handleJourToggle = (jour) => {
    setHorairesParJour((prev) => ({
      ...prev,
      [jour]: { ...prev[jour], actif: !prev[jour].actif },
    }));
  };

  const handleServiceToggle = (service) => {
    setServicesSelectionnes((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleHeureDebutChange = (jour, heure) => {
    setHorairesParJour((prev) => ({
      ...prev,
      [jour]: { ...prev[jour], debut: heure },
    }));
  };

  const handleHeureFinChange = (jour, heure) => {
    setHorairesParJour((prev) => ({
      ...prev,
      [jour]: { ...prev[jour], fin: heure },
    }));
  };

  const handleSauvegarder = async () => {
    setError("");
    setSuccessMessage("");

    for (const jour of JOURS) {
      const d = horairesParJour[jour];
      if (d.actif && d.debut >= d.fin) {
        setError(`Erreur pour ${jour} : L'heure de fin doit être après l'heure de début`);
        return;
      }
    }

    try {
      const payload = {
        employe_id: user.id,
        services_proposes: servicesSelectionnes, // ✅ sauvegarde services
      };

      JOURS.forEach((jour) => {
        const d = horairesParJour[jour];
        payload[k(jour, "debut")] = d.actif ? d.debut : null;
        payload[k(jour, "fin")] = d.actif ? d.fin : null;
      });

      if (horaireId) {
        await updateHoraire(horaireId, payload);
        setSuccessMessage("Votre horaire a été mis à jour avec succès !");
      } else {
        const created = await addHoraire(payload);
        setHoraireId(created?.id ?? null);
        setSuccessMessage("Votre horaire a été créé avec succès !");
      }
    } catch (err) {
      setError(err.message || "Erreur lors de l'enregistrement de l'horaire");
    }
  };

  if (!isEmploye) {
    return (
      <div className="restricted-access">
        <h2>Accès Restreint</h2>
        <p>Cette page est réservée aux techniciens de FixioTech.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="horaires-container">
        <h1 className="horaires-titres">Gestion de mon horaire</h1>
        <div className="calendrier-section">Chargement…</div>
      </div>
    );
  }

  return (
    <div className="horaires-container">
      <h1 className="horaires-titres">Gestion de mon horaire</h1>

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="horaires-grid">
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

        <div className="calendrier-section">
          <h2 className="calendrier-titre">Mes disponibilités</h2>
          <p className="calendrier-description">
            Sélectionnez les jours où vous êtes disponible et définissez vos heures de début et de fin.
          </p>

          <div className="disponibilites-liste">
            {JOURS.map((jour) => (
              <div
                key={jour}
                className={`jour-row ${horairesParJour[jour].actif ? "jour-actif" : ""}`}
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
                        onChange={(e) => handleHeureDebutChange(jour, e.target.value)}
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
                        onChange={(e) => handleHeureFinChange(jour, e.target.value)}
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

          <button className="bouton-enregistrer-horaire" onClick={handleSauvegarder}>
            Enregistrer mon horaire
          </button>
        </div>
      </div>
    </div>
  );
};

export default Horaires;
