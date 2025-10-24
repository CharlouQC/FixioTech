import React, { useState } from "react";
import "./client.css";

const Client = () => {
  // Simulation de demandes (sera remplacé par les données du backend)
  const [demandes, setDemandes] = useState([
    {
      id: 1,
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

  // Filtre pour afficher toutes les demandes ou filtrer par statut
  const [filtreStatut, setFiltreStatut] = useState("tous");
  const [afficherModalResolution, setAfficherModalResolution] = useState(false);
  const [demandeAResoudre, setDemandeAResoudre] = useState(null);
  const [problemeResolu, setProblemeResolu] = useState(null);

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

  const ouvrirModalResolution = (demande) => {
    setDemandeAResoudre(demande);
    setProblemeResolu(null);
    setAfficherModalResolution(true);
  };

  const fermerModalResolution = () => {
    setAfficherModalResolution(false);
    setDemandeAResoudre(null);
    setProblemeResolu(null);
  };

  const archiverDemande = () => {
    if (problemeResolu === null) {
      alert("Veuillez indiquer si le problème a été résolu");
      return;
    }

    if (problemeResolu === false) {
      // Si le problème n'est pas résolu, on signale à l'équipe mais on N'ARCHIVE PAS
      alert(
        "Votre signalement a été envoyé à notre équipe.\n\nLa demande restera visible et un technicien vous recontactera dans les plus brefs délais."
      );

      // Ici le backend devrait mettre à jour le statut (ex: "probleme_persiste")
      setDemandes(
        demandes.map((d) =>
          d.id === demandeAResoudre.id
            ? { ...d, statut: "en_cours", problemeSignale: true }
            : d
        )
      );

      fermerModalResolution();
      return;
    }

    // Si le problème EST résolu, on archive
    setDemandes(demandes.filter((d) => d.id !== demandeAResoudre.id));
    alert("Demande archivée avec succès ! Merci pour votre retour.");
    fermerModalResolution();
  };

  return (
    <div className="client-container">
      <div className="client-header">
        <h1>Mes Demandes</h1>
        <p className="client-intro">
          Consultez l'état de vos demandes de support technique et les réponses
          de nos techniciens.
        </p>
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
            <div className="aucune-demande-icon">📋</div>
            <h2>Vous n'avez fait aucune demande pour l'instant</h2>
            <p>
              Besoin d'aide ? Prenez rendez-vous avec l'un de nos techniciens
              experts.
            </p>
            <button
              onClick={() => (window.location.href = "/rendez-vous")}
              className="btn-nouvelle-demande"
            >
              Prendre un rendez-vous
            </button>
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
                    <div className="demande-info-row">
                      <div className="demande-info-item">
                        <span className="info-label">Service</span>
                        <span className="info-value">{demande.service}</span>
                      </div>
                      <div className="demande-info-item">
                        <span className="info-label">Technicien</span>
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
                      <span className="info-label">Votre problème</span>
                      <p>{demande.description}</p>
                    </div>

                    {demande.statut === "traitee" && demande.resultat && (
                      <div className="demande-resultat">
                        <span className="resultat-label">
                          ✅ Réponse du technicien
                        </span>
                        <p className="resultat-texte">{demande.resultat}</p>

                        {/* Bouton pour archiver la demande */}
                        <div className="resolution-actions">
                          <button
                            className="btn-archiver"
                            onClick={() => ouvrirModalResolution(demande)}
                          >
                            ✓ Évaluer la résolution
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal de résolution */}
      {afficherModalResolution && demandeAResoudre && (
        <div className="modal-overlay" onClick={fermerModalResolution}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Évaluer la résolution - Demande #{demandeAResoudre.id}</h2>
              <button className="modal-close" onClick={fermerModalResolution}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-question">
                <p className="question-label">
                  Le technicien a indiqué que votre problème a été traité.
                </p>
                <p className="question-text">
                  <strong>Votre problème a-t-il été résolu ?</strong>
                </p>

                <div className="reponse-buttons">
                  <button
                    className={`btn-reponse btn-oui ${
                      problemeResolu === true ? "active" : ""
                    }`}
                    onClick={() => setProblemeResolu(true)}
                  >
                    ✅ Oui, c'est résolu
                  </button>
                  <button
                    className={`btn-reponse btn-non ${
                      problemeResolu === false ? "active" : ""
                    }`}
                    onClick={() => setProblemeResolu(false)}
                  >
                    ❌ Non, le problème persiste
                  </button>
                </div>

                {problemeResolu === true && (
                  <p className="info-message success-message">
                    ✅ Parfait ! La demande sera archivée et retirée de votre
                    liste.
                  </p>
                )}

                {problemeResolu === false && (
                  <p className="info-message warning-message">
                    ⚠️ Notre équipe sera informée que le problème persiste. La
                    demande restera visible et un technicien vous recontactera
                    dans les plus brefs délais.
                  </p>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-annuler" onClick={fermerModalResolution}>
                Annuler
              </button>
              <button
                className="btn-confirmer-archivage"
                onClick={archiverDemande}
              >
                {problemeResolu === true
                  ? "Archiver la demande"
                  : "Envoyer le signalement"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Client;
