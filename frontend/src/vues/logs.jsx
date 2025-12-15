import React, { useState } from "react";
import "./logs.css";

const Logs = () => {
  // Simulation de logs (sera remplacé par les données du backend)
  const [logs] = useState([
    {
      id: 1,
      type: "connexion",
      utilisateur: "admin@fixiotech.com",
      action: "Connexion réussie",
      details: "Connexion depuis l'adresse IP 192.168.1.100",
      dateHeure: "2025-10-24T09:15:32",
      statut: "succes",
    },
    {
      id: 2,
      type: "rdv_creation",
      utilisateur: "sophie.martin@email.com",
      action: "Nouveau rendez-vous créé",
      details:
        "Rendez-vous #45 - Réparation d'ordinateurs - Technicien: Jean Tremblay",
      dateHeure: "2025-10-24T09:30:15",
      statut: "succes",
    },
    {
      id: 3,
      type: "connexion",
      utilisateur: "jean.tremblay@fixiotech.com",
      action: "Connexion réussie",
      details: "Connexion depuis l'adresse IP 192.168.1.105",
      dateHeure: "2025-10-24T09:45:00",
      statut: "succes",
    },
    {
      id: 4,
      type: "rdv_modification",
      utilisateur: "jean.tremblay@fixiotech.com",
      action: "Rendez-vous mis à jour",
      details: "Rendez-vous #45 - Statut changé de 'en_attente' à 'en_cours'",
      dateHeure: "2025-10-24T10:00:12",
      statut: "succes",
    },
    {
      id: 5,
      type: "connexion",
      utilisateur: "utilisateur@email.com",
      action: "Tentative de connexion échouée",
      details: "Mot de passe incorrect - Adresse IP 203.45.12.89",
      dateHeure: "2025-10-24T10:15:45",
      statut: "erreur",
    },
    {
      id: 6,
      type: "inscription",
      utilisateur: "nouveau.client@email.com",
      action: "Nouveau compte créé",
      details: "Type de compte: Client - Nom: Marc Dupont",
      dateHeure: "2025-10-24T10:30:22",
      statut: "succes",
    },
    {
      id: 7,
      type: "rdv_traitement",
      utilisateur: "jean.tremblay@fixiotech.com",
      action: "Rendez-vous terminé",
      details: "Rendez-vous #45 - Marqué comme terminé avec message de résolution",
      dateHeure: "2025-10-24T11:15:30",
      statut: "succes",
    },
    {
      id: 8,
      type: "rdv_suppression",
      utilisateur: "admin@fixiotech.com",
      action: "Rendez-vous supprimé",
      details: "Rendez-vous #23 - Supprimé par l'administrateur (client inactif)",
      dateHeure: "2025-10-24T11:45:18",
      statut: "avertissement",
    },
    {
      id: 9,
      type: "connexion",
      utilisateur: "marie.dubois@fixiotech.com",
      action: "Connexion réussie",
      details: "Connexion depuis l'adresse IP 192.168.1.108",
      dateHeure: "2025-10-24T12:00:05",
      statut: "succes",
    },
    {
      id: 10,
      type: "rdv_archivage",
      utilisateur: "sophie.martin@email.com",
      action: "Rendez-vous archivé",
      details: "Rendez-vous #45 - Archivé par le client (problème résolu)",
      dateHeure: "2025-10-24T12:30:42",
      statut: "succes",
    },
    {
      id: 11,
      type: "rdv_creation",
      utilisateur: "julie.gagnon@email.com",
      action: "Nouveau rendez-vous créé",
      details: "Rendez-vous #46 - Support technique - Technicien: Marie Dubois",
      dateHeure: "2025-10-24T13:15:20",
      statut: "succes",
    },
    {
      id: 12,
      type: "connexion",
      utilisateur: "admin@fixiotech.com",
      action: "Déconnexion",
      details: "Session terminée normalement",
      dateHeure: "2025-10-24T13:45:00",
      statut: "succes",
    },
  ]);

  const [filtreType, setFiltreType] = useState("tous");
  const [filtreStatut, setFiltreStatut] = useState("tous");
  const [recherche, setRecherche] = useState("");

  // Filtrage des logs
  const logsFiltres = logs.filter((log) => {
    const matchType = filtreType === "tous" || log.type === filtreType;
    const matchStatut = filtreStatut === "tous" || log.statut === filtreStatut;
    const matchRecherche =
      log.utilisateur.toLowerCase().includes(recherche.toLowerCase()) ||
      log.action.toLowerCase().includes(recherche.toLowerCase()) ||
      log.details.toLowerCase().includes(recherche.toLowerCase());

    return matchType && matchStatut && matchRecherche;
  });

  // Fonction pour obtenir l'icône selon le type
  const getTypeIcon = (type) => {
    const icons = {
      connexion: "🔐",
      inscription: "📝",
      rdv_creation: "➕",
      rdv_modification: "✏️",
      rdv_traitement: "✅",
      rdv_suppression: "🗑️",
      rdv_archivage: "📦",
    };
    return icons[type] || "📋";
  };

  // Fonction pour obtenir la classe CSS selon le statut
  const getStatutClass = (statut) => {
    const classes = {
      succes: "statut-succes",
      erreur: "statut-erreur",
      avertissement: "statut-avertissement",
    };
    return classes[statut] || "statut-succes";
  };

  // Fonction pour obtenir le badge de statut
  const getStatutBadge = (statut) => {
    const badges = {
      succes: "✓",
      erreur: "✗",
      avertissement: "⚠",
    };
    return badges[statut] || "•";
  };

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("fr-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  // Fonction pour obtenir le label français du type
  const getTypeLabel = (type) => {
    const labels = {
      connexion: "Connexion",
      inscription: "Inscription",
      rdv_creation: "Création de rendez-vous",
      rdv_modification: "Modification de rendez-vous",
      rdv_traitement: "Traitement de rendez-vous",
      rdv_suppression: "Suppression de rendez-vous",
      rdv_archivage: "Archivage de rendez-vous",
    };
    return labels[type] || type;
  };

  return (
    <div className="logs-container">
      <div className="logs-header">
        <h1>📊 Logs Système</h1>
        <p className="logs-intro">
          Suivez tous les événements importants et les actions des utilisateurs
          sur la plateforme.
        </p>
      </div>

      {/* Statistiques rapides */}
      <div className="stats-logs-container">
        <div className="stat-log-card">
          <div className="stat-log-icon">📋</div>
          <div className="stat-log-info">
            <span className="stat-log-nombre">{logs.length}</span>
            <span className="stat-log-label">Total d'événements</span>
          </div>
        </div>
        <div className="stat-log-card succes">
          <div className="stat-log-icon">✓</div>
          <div className="stat-log-info">
            <span className="stat-log-nombre">
              {logs.filter((l) => l.statut === "succes").length}
            </span>
            <span className="stat-log-label">Succès</span>
          </div>
        </div>
        <div className="stat-log-card erreur">
          <div className="stat-log-icon">✗</div>
          <div className="stat-log-info">
            <span className="stat-log-nombre">
              {logs.filter((l) => l.statut === "erreur").length}
            </span>
            <span className="stat-log-label">Erreurs</span>
          </div>
        </div>
        <div className="stat-log-card avertissement">
          <div className="stat-log-icon">⚠</div>
          <div className="stat-log-info">
            <span className="stat-log-nombre">
              {logs.filter((l) => l.statut === "avertissement").length}
            </span>
            <span className="stat-log-label">Avertissements</span>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="logs-filtres-container">
        <div className="recherche-container">
          <input
            type="text"
            placeholder="🔍 Rechercher dans les logs..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="recherche-input"
          />
        </div>

        <div className="filtres-row">
          <div className="filtre-groupe">
            <label>Type d'événement :</label>
            <select
              value={filtreType}
              onChange={(e) => setFiltreType(e.target.value)}
              className="filtre-select"
            >
              <option value="tous">Tous les types</option>
              <option value="connexion">Connexion</option>
              <option value="inscription">Inscription</option>
              <option value="rdv_creation">Création de rendez-vous</option>
              <option value="rdv_modification">
                Modification de rendez-vous
              </option>
              <option value="rdv_traitement">Traitement de rendez-vous</option>
              <option value="rdv_suppression">
                Suppression de rendez-vous
              </option>
              <option value="rdv_archivage">Archivage de rendez-vous</option>
            </select>
          </div>

          <div className="filtre-groupe">
            <label>Statut :</label>
            <select
              value={filtreStatut}
              onChange={(e) => setFiltreStatut(e.target.value)}
              className="filtre-select"
            >
              <option value="tous">Tous les statuts</option>
              <option value="succes">Succès</option>
              <option value="erreur">Erreurs</option>
              <option value="avertissement">Avertissements</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des logs */}
      <div className="logs-liste-container">
        {logsFiltres.length === 0 ? (
          <div className="aucun-log">
            <div className="aucun-log-icon">🔍</div>
            <h2>Aucun événement trouvé</h2>
            <p>Aucun log ne correspond à vos critères de recherche.</p>
          </div>
        ) : (
          <div className="logs-table">
            <div className="table-header">
              <div className="col-date">Date & Heure</div>
              <div className="col-type">Type</div>
              <div className="col-utilisateur">Utilisateur</div>
              <div className="col-action">Action</div>
              <div className="col-details">Détails</div>
              <div className="col-statut">Statut</div>
            </div>
            <div className="table-body">
              {logsFiltres.map((log) => (
                <div
                  key={log.id}
                  className={`log-row ${getStatutClass(log.statut)}`}
                >
                  <div className="col-date">
                    <span className="date-value">
                      {formatDate(log.dateHeure)}
                    </span>
                  </div>
                  <div className="col-type">
                    <span className="type-badge">
                      {getTypeIcon(log.type)} {getTypeLabel(log.type)}
                    </span>
                  </div>
                  <div className="col-utilisateur">
                    <span className="utilisateur-value">{log.utilisateur}</span>
                  </div>
                  <div className="col-action">
                    <span className="action-value">{log.action}</span>
                  </div>
                  <div className="col-details">
                    <span className="details-value">{log.details}</span>
                  </div>
                  <div className="col-statut">
                    <span
                      className={`statut-badge ${getStatutClass(log.statut)}`}
                    >
                      {getStatutBadge(log.statut)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Informations sur les résultats */}
      <div className="logs-footer">
        <p>
          Affichage de <strong>{logsFiltres.length}</strong> événement(s) sur{" "}
          <strong>{logs.length}</strong> au total
        </p>
      </div>
    </div>
  );
};

export default Logs;
