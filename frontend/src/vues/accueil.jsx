import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useRoleNavigation } from "../hooks/useRoleNavigation";
import "./accueil.css";

const Accueil = () => {
  const { role } = useAuth();
  const { navigateToBooking, navigateToSecondary } = useRoleNavigation();

  // Texte des boutons selon le rôle
  const textePremierBouton = role === 'employe' ? 'Mes rendez-vous' : 'Prendre rendez-vous';
  const texteSecondBouton = role === 'employe' ? 'Gérer mes horaires' : 'Découvrir nos services';
  return (
    <div className="accueil-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Votre Partenaire en Support Informatique
          </h1>
          <p className="hero-text">
            Solutions complètes de support technique et services informatiques.
            Assistance à distance, dépannage sur site, formation et conseils
            personnalisés pour tous vos besoins technologiques.
          </p>
          <div className="cta-boutons">
            <button 
              onClick={navigateToBooking}
              className="cta-bouton-primary"
            >
              {textePremierBouton}
            </button>
            <button 
              onClick={navigateToSecondary}
              className="cta-bouton-secondary"
            >
              {texteSecondBouton}
            </button>
          </div>
        </div>
        <div className="hero-decorations">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>
      </div>

      {/* Services Section */}
      <section className="services-section">
        <h2 className="section-title">Nos Services</h2>
        <p className="section-subtitle">
          Des solutions informatiques adaptées à vos besoins
        </p>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">💻</div>
            <h3>Support Technique</h3>
            <p>
              Assistance technique à distance ou sur site pour résoudre tous vos
              problèmes informatiques rapidement et efficacement.
            </p>
          </div>
          <div className="service-card">
            <div className="service-icon">🔧</div>
            <h3>Dépannage & Réparation</h3>
            <p>
              Diagnostic et réparation de vos ordinateurs, portables, tablettes
              et smartphones. Intervention rapide avec garantie.
            </p>
          </div>
          <div className="service-card">
            <div className="service-icon">🔒</div>
            <h3>Sécurité Informatique</h3>
            <p>
              Protection contre les virus, installation d'antivirus, sauvegarde
              de données et sécurisation de votre réseau.
            </p>
          </div>
          <div className="service-card">
            <div className="service-icon">🏠</div>
            <h3>Service à Domicile</h3>
            <p>
              Nos techniciens se déplacent chez vous pour diagnostiquer et
              résoudre vos problèmes informatiques sur place.
            </p>
          </div>
          <div className="service-card">
            <div className="service-icon">⚙️</div>
            <h3>Installation & Configuration</h3>
            <p>
              Installation de logiciels, configuration réseau, mise à niveau
              système et optimisation de performances.
            </p>
          </div>
          <div className="service-card">
            <div className="service-icon">🎓</div>
            <h3>Formation Personnalisée</h3>
            <p>
              Cours individuels pour maîtriser vos logiciels, naviguer en
              sécurité et utiliser vos appareils efficacement.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-us-section">
        <h2 className="section-title">Pourquoi Choisir FixioTech ?</h2>
        <div className="why-us-grid">
          <div className="why-us-card">
            <div className="why-us-icon">⚡</div>
            <h3>Intervention Rapide</h3>
            <p>
              Support technique disponible rapidement. Résolution à distance en
              quelques heures ou intervention sur site sous 24h.
            </p>
          </div>
          <div className="why-us-card">
            <div className="why-us-icon">✅</div>
            <h3>Expertise Certifiée</h3>
            <p>
              Techniciens qualifiés et certifiés. Solutions professionnelles
              pour particuliers et entreprises.
            </p>
          </div>
          <div className="why-us-card">
            <div className="why-us-icon">👨‍💻</div>
            <h3>Support 24/7</h3>
            <p>
              Service client disponible en tout temps. Assistance technique à
              distance pour les urgences informatiques.
            </p>
          </div>
          <div className="why-us-card">
            <div className="why-us-icon">💰</div>
            <h3>Tarifs Transparents</h3>
            <p>
              Devis gratuit et détaillé. Pas de frais cachés. Tarification
              claire et compétitive pour tous nos services.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">5000+</div>
            <div className="stat-label">Interventions Réussies</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">98%</div>
            <div className="stat-label">Taux de Satisfaction</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support Disponible</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">10+</div>
            <div className="stat-label">Années d'Expérience</div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="section-title">Ce Que Disent Nos Clients</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">
              "Support technique excellent ! Mon réseau d'entreprise est
              maintenant parfaitement sécurisé. Service professionnel et
              rapide."
            </p>
            <div className="testimonial-author">- Marie L.</div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">
              "L'équipe a installé tout notre système informatique.
              Configuration impeccable et formation claire. Je recommande
              vivement !"
            </p>
            <div className="testimonial-author">- Jean-François D.</div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">
              "Assistance à distance très efficace. Problème résolu en 30
              minutes. Prix honnête et service client au top !"
            </p>
            <div className="testimonial-author">- Sophie M.</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>{role === 'employe' ? 'Gérer Vos Rendez-vous' : 'Besoin d\'Assistance Informatique ?'}</h2>
        <p>
          {role === 'employe' 
            ? 'Consultez vos rendez-vous assignés et gérez votre planning efficacement'
            : 'Contactez-nous dès maintenant pour un diagnostic gratuit et une solution adaptée à vos besoins'
          }
        </p>
        <button 
          onClick={navigateToBooking}
          className="cta-button-large"
        >
          {textePremierBouton}
        </button>
      </section>
    </div>
  );
};

export default Accueil;
