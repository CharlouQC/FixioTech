import React from "react";
import "./services_aides.css";

const ServicesAides = () => {
  const services = [
    {
      id: 1,
      titre: "Diagnostic et Dépannage Informatique",
      description:
        "Assistance en direct par vidéo pour diagnostiquer et résoudre les problèmes de votre ordinateur, tablette ou téléphone intelligent.",
      details: [
        "Analyse des problèmes de performance",
        "Résolution des erreurs système",
        "Suppression de logiciels malveillants",
        "Optimisation du système",
      ],
      icone: "🖥️",
      couleur: "#3498db",
    },
    {
      id: 2,
      titre: "Installation et Configuration",
      description:
        "Guidage pas à pas pour l'installation et la configuration de vos logiciels et périphériques.",
      details: [
        "Installation de logiciels et applications",
        "Configuration de périphériques",
        "Mise à jour des pilotes",
        "Paramétrage de la sécurité",
      ],
      icone: "⚙️",
      couleur: "#9b59b6",
    },
    {
      id: 4,
      titre: "Récupération de Données",
      description:
        "Aide à la récupération de vos fichiers perdus ou supprimés accidentellement.",
      details: [
        "Récupération de fichiers effacés",
        "Sauvegarde de données",
        "Transfert de données",
        "Conseil en stockage sécurisé",
      ],
      icone: "💾",
      couleur: "#e67e22",
    },
    {
      id: 5,
      titre: "Formation Personnalisée",
      description:
        "Sessions de formation individuelles pour mieux maîtriser vos outils numériques.",
      details: [
        "Initiation aux logiciels courants",
        "Utilisation avancée des applications",
        "Sécurité et bonnes pratiques",
        "Productivité numérique",
      ],
      icone: "📚",
      couleur: "#1abc9c",
    },
    {
      id: 6,
      titre: "Support Professionnel",
      description:
        "Solutions adaptées aux besoins des professionnels et des entreprises.",
      details: [
        "Configuration de postes de travail",
        "Gestion des outils collaboratifs",
        "Support logiciels métiers",
        "Conseil en infrastructure",
      ],
      icone: "💼",
      couleur: "#e74c3c",
    },
  ];

  const process = [
    {
      step: "1",
      titre: "Prenez Rendez-vous",
      description: "Choisissez la date et l'heure qui vous conviennent",
      icone: "📅",
    },
    {
      step: "2",
      titre: "Connexion Vidéo",
      description:
        "Connectez-vous à l'heure du rendez-vous via notre plateforme",
      icone: "🎥",
    },
    {
      step: "3",
      titre: "Assistance en Direct",
      description: "Notre expert résout votre problème en temps réel",
      icone: "🔧",
    },
    {
      step: "4",
      titre: "Problème Résolu",
      description: "Vous repartez avec une solution efficace et durable",
      icone: "✅",
    },
  ];

  const garanties = [
    {
      icone: "⚡",
      titre: "Intervention Rapide",
      description: "Disponibilité 24h/24, 7j/7",
    },
    {
      icone: "🔒",
      titre: "Sécurité Garantie",
      description: "Confidentialité totale de vos données",
    },
    {
      icone: "👨‍💻",
      titre: "Experts Certifiés",
      description: "Techniciens qualifiés et expérimentés",
    },
    {
      icone: "💯",
      titre: "Satisfaction Client",
      description: "Support jusqu'à résolution complète",
    },
  ];

  return (
    <div className="services-container">
      {/* Hero Section */}
      <div className="services-hero">
        <div className="hero-content">
          <h1 className="hero-title">Nos Services d'Assistance Technique</h1>
          <p className="hero-subtitle">
            Bénéficiez d'une assistance technique professionnelle en temps réel
            grâce à nos sessions vidéo personnalisées. Nos experts sont
            disponibles 24h/24 pour résoudre tous vos problèmes techniques.
          </p>
          <button
            onClick={() => (window.location.href = "/rendez-vous")}
            className="hero-cta"
          >
            Réserver une Session
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <section className="services-section">
        <div className="section-header">
          <h2 className="section-title">Nos Services</h2>
          <p className="section-subtitle">
            Une gamme complète de services pour répondre à tous vos besoins
            techniques
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div
              key={service.id}
              className="service-card"
              style={{ "--card-color": service.couleur }}
            >
              <div className="service-card-header">
                <div className="service-icon">{service.icone}</div>
                <h3>{service.titre}</h3>
              </div>
              <p className="service-description">{service.description}</p>
              <ul className="service-details">
                {service.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
              <div className="service-card-footer">
                <button className="service-btn">En savoir plus</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="section-header">
          <h2 className="section-title">Comment Ça Marche ?</h2>
          <p className="section-subtitle">
            Un processus simple et efficace en 4 étapes
          </p>
        </div>

        <div className="process-grid">
          {process.map((step, index) => (
            <div key={index} className="process-card">
              <div className="process-number">{step.step}</div>
              <div className="process-icon">{step.icone}</div>
              <h3>{step.titre}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Garanties Section */}
      <section className="garanties-section">
        <div className="section-header">
          <h2 className="section-title">Nos Garanties</h2>
          <p className="section-subtitle">
            Votre satisfaction est notre priorité
          </p>
        </div>

        <div className="garanties-grid">
          {garanties.map((garantie, index) => (
            <div key={index} className="garantie-card">
              <div className="garantie-icon">{garantie.icone}</div>
              <h4>{garantie.titre}</h4>
              <p>{garantie.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <h3>Prêt à Résoudre Vos Problèmes Techniques ?</h3>
        <p>
          Prenez rendez-vous avec l'un de nos experts et obtenez une assistance
          personnalisée en quelques clics.
        </p>
        <button
          onClick={() => (window.location.href = "/rendez-vous")}
          className="cta-bouton"
        >
          Prendre Rendez-vous Maintenant
        </button>
      </section>
    </div>
  );
};

export default ServicesAides;
