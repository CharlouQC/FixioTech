import React, { useState } from "react";
import "./employe.css";

const Employe = () => {
  // Simulation de demandes reçues (sera remplacé par les données du backend)
  const [demandes, setDemandes] = useState([
    {
      id: 1,
      client: {
        nom: "Sophie Martin",
        courriel: "sophie.martin@email.com",
      },
      service: "Réparation d'ordinateurs",
      technicien: "Jean Tremblay",
      date: "2025-10-20",
      heure: "10:00",
      description: "Mon ordinateur ne démarre plus, écran noir au démarrage.",
      statut: "en_attente",
      dateCreation: "2025-10-17",
    },
    {
      id: 2,
      client: {
        nom: "Marc Lefebvre",
        courriel: "marc.lefebvre@email.com",
      },
      service: "Support technique",
      technicien: "Marie Dubois",
      date: "2025-10-18",
      heure: "14:00",
      description: "Problème de connexion internet sur mon portable.",
      statut: "traitee",
      dateCreation: "2025-10-15",
      resultat:
        "Problème résolu ! Le pilote WiFi était désactivé. Nous l'avons réactivé et tout fonctionne correctement maintenant.",
    },
    {
      id: 3,
      client: {
        nom: "Julie Gagnon",
        courriel: "julie.gagnon@email.com",
      },
      service: "Réparation de cellulaires",
      technicien: "Pierre Gagnon",
      date: "2025-10-25",
      heure: "15:00",
      description:
        "L'écran de mon téléphone est fissuré et ne répond plus au toucher.",
      statut: "en_cours",
      dateCreation: "2025-10-16",
    },
  ]);

  const [filtreStatut, setFiltreStatut] = useState("tous");
  const [demandeSelectionnee, setDemandeSelectionnee] = useState(null);
  const [messageResolution, setMessageResolution] = useState("");
  const [afficherModal, setAfficherModal] = useState(false);

  const demandesFiltrees =
    filtreStatut === "tous"
      ? demandes
      : demandes.filter((d) => d.statut === filtreStatut);

  const getStatutBadge = (statut) => {
    const badges = {
      en_attente: { classe: "statut-attente", texte: "En attente" },
      en_cours: { classe: "statut-encours", texte: "En cours" },
      traitee: { classe: "statut-traitee", texte: "Traitée" },
    };
    return badges[statut] || badges.en_attente;
  };

  const getStatutIcon = (statut) => {
    const icons = {
      en_attente: "⏱️",
      en_cours: "🔧",
      traitee: "✅",
    };
    return icons[statut] || "📋";
  };

  const ouvrirModalTraitement = (demande) => {
    setDemandeSelectionnee(demande);
    setMessageResolution(demande.resultat || "");
    setAfficherModal(true);
  };

  const fermerModal = () => {
    setAfficherModal(false);
    setDemandeSelectionnee(null);
    setMessageResolution("");
  };

  const changerStatut = (demandeId, nouveauStatut) => {
    setDemandes(
      demandes.map((d) =>
        d.id === demandeId ? { ...d, statut: nouveauStatut } : d
      )
    );
  };

  const enregistrerTraitement = () => {
    if (!messageResolution.trim()) {
      alert("Veuillez ajouter un message de résolution");
      return;
    }

    setDemandes(
      demandes.map((d) =>
        d.id === demandeSelectionnee.id
          ? { ...d, statut: "traitee", resultat: messageResolution }
          : d
      )
    );

    fermerModal();
  };

  const supprimerDemande = (demandeId) => {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette demande ?\n\nCette action est irréversible."
    );

    if (confirmation) {
      // Ici, le backend supprimera la demande
      setDemandes(demandes.filter((d) => d.id !== demandeId));
      alert("Demande supprimée avec succès.");
    }
  };

  return (
    <div className="employe-container">
      <div className="employe-header">
        <h1>Espace Employé</h1>
        <p className="employe-intro">
          Gérez les demandes de support de vos clients et suivez leur
          avancement.
        </p>
      </div>

      {/* Statistiques */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-info">
            <span className="stat-nombre">
              {demandes.filter((d) => d.statut === "en_attente").length}
            </span>
            <span className="stat-label">En attente</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔧</div>
          <div className="stat-info">
            <span className="stat-nombre">
              {demandes.filter((d) => d.statut === "en_cours").length}
            </span>
            <span className="stat-label">En cours</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <span className="stat-nombre">
              {demandes.filter((d) => d.statut === "traitee").length}
            </span>
            <span className="stat-label">Traitées</span>
          </div>
        </div>
        <div className="stat-card total">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <span className="stat-nombre">{demandes.length}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="filtres-container">
        <div className="filtres-groupe">
          <button
            className={`filtre-btn ${filtreStatut === "tous" ? "active" : ""}`}
            onClick={() => setFiltreStatut("tous")}
          >
            Toutes ({demandes.length})
          </button>
          <button
            className={`filtre-btn ${
              filtreStatut === "en_attente" ? "active" : ""
            }`}
            onClick={() => setFiltreStatut("en_attente")}
          >
            En attente (
            {demandes.filter((d) => d.statut === "en_attente").length})
          </button>
          <button
            className={`filtre-btn ${
              filtreStatut === "en_cours" ? "active" : ""
            }`}
            onClick={() => setFiltreStatut("en_cours")}
          >
            En cours ({demandes.filter((d) => d.statut === "en_cours").length})
          </button>
          <button
            className={`filtre-btn ${
              filtreStatut === "traitee" ? "active" : ""
            }`}
            onClick={() => setFiltreStatut("traitee")}
          >
            Traitées ({demandes.filter((d) => d.statut === "traitee").length})
          </button>
        </div>
      </div>

      {/* Liste des demandes */}
      <div className="demandes-container">
        {demandesFiltrees.length === 0 ? (
          <div className="aucune-demande">
            <div className="aucune-demande-icon">📭</div>
            <h2>Vous n'avez reçu aucune demande pour l'instant</h2>
            <p>
              Les nouvelles demandes de support apparaîtront ici dès qu'un
              client prendra rendez-vous.
            </p>
          </div>
        ) : (
          <div className="demandes-liste">
            {demandesFiltrees.map((demande) => {
              const statut = getStatutBadge(demande.statut);
              return (
                <div key={demande.id} className="demande-card">
                  <div className="demande-header-card">
                    <div className="demande-id-statut">
                      <span className="demande-id">Demande #{demande.id}</span>
                      <span className={`statut-badge ${statut.classe}`}>
                        {getStatutIcon(demande.statut)} {statut.texte}
                      </span>
                    </div>
                    <span className="demande-date">
                      Créée le{" "}
                      {new Date(demande.dateCreation).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="demande-body">
                    {/* Informations client */}
                    <div className="client-info">
                      <h3>👤 Informations client</h3>
                      <div className="client-details">
                        <div className="client-detail">
                          <span className="detail-label">Nom :</span>
                          <span className="detail-value">
                            {demande.client.nom}
                          </span>
                        </div>
                        <div className="client-detail">
                          <span className="detail-label">Courriel :</span>
                          <span className="detail-value">
                            {demande.client.courriel}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Informations rendez-vous */}
                    <div className="demande-info-row">
                      <div className="demande-info-item">
                        <span className="info-label">Service</span>
                        <span className="info-value">{demande.service}</span>
                      </div>
                      <div className="demande-info-item">
                        <span className="info-label">Technicien assigné</span>
                        <span className="info-value">{demande.technicien}</span>
                      </div>
                    </div>

                    <div className="demande-info-row">
                      <div className="demande-info-item">
                        <span className="info-label">Date du rendez-vous</span>
                        <span className="info-value">
                          {new Date(demande.date).toLocaleDateString()} à{" "}
                          {demande.heure}
                        </span>
                      </div>
                    </div>

                    <div className="demande-description">
                      <span className="info-label">
                        Description du problème
                      </span>
                      <p>{demande.description}</p>
                    </div>

                    {demande.statut === "traitee" && demande.resultat && (
                      <div className="demande-resultat">
                        <span className="resultat-label">
                          ✅ Message de résolution
                        </span>
                        <p className="resultat-texte">{demande.resultat}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="actions-container">
                      {demande.statut === "en_attente" && (
                        <button
                          className="btn-action btn-encours"
                          onClick={() => changerStatut(demande.id, "en_cours")}
                        >
                          🔧 Prendre en charge
                        </button>
                      )}
                      {demande.statut === "en_cours" && (
                        <button
                          className="btn-action btn-traiter"
                          onClick={() => ouvrirModalTraitement(demande)}
                        >
                          ✅ Marquer comme traitée
                        </button>
                      )}
                      {demande.statut === "traitee" && (
                        <button
                          className="btn-action btn-modifier"
                          onClick={() => ouvrirModalTraitement(demande)}
                        >
                          ✏️ Modifier la résolution
                        </button>
                      )}

                      {/* Bouton Supprimer (visible par défaut, backend gérera l'affichage Admin) */}
                      <button
                        className="btn-action btn-supprimer"
                        onClick={() => supprimerDemande(demande.id)}
                      >
                        🗑️ Supprimer la demande
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal de traitement */}
      {afficherModal && demandeSelectionnee && (
        <div className="modal-overlay" onClick={fermerModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Traiter la demande #{demandeSelectionnee.id}</h2>
              <button className="modal-close" onClick={fermerModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-info">
                Client : <strong>{demandeSelectionnee.client.nom}</strong>
              </p>
              <p className="modal-info">
                Service : <strong>{demandeSelectionnee.service}</strong>
              </p>
              <label htmlFor="messageResolution">
                Message de résolution pour le client *
              </label>
              <textarea
                id="messageResolution"
                value={messageResolution}
                onChange={(e) => setMessageResolution(e.target.value)}
                placeholder="Décrivez la solution apportée au problème du client..."
                rows="6"
              />
            </div>
            <div className="modal-footer">
              <button className="btn-annuler" onClick={fermerModal}>
                Annuler
              </button>
              <button
                className="btn-enregistrer"
                onClick={enregistrerTraitement}
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employe;
