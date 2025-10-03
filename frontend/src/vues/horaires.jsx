import React, { useState } from "react";
import "./horaires.css";

const Horaires = () => {
  const [isEmployee] = useState(true);

  // État pour les services sélectionnés
  const [selectedServices, setSelectedServices] = useState([]);

  // État pour la semaine actuelle
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // État pour les créneaux horaires sélectionnés
  const [selectedSlots, setSelectedSlots] = useState([]);

  // Liste des services disponibles
  const services = [
    "Réparation d'ordinateurs",
    "Réparation de cellulaires",
    "Réparation de tablettes",
    "Services à domicile",
    "Support technique",
    "Formation personnalisée",
  ];

  // Génère les heures de travail (8h à 18h)
  const timeSlots = Array.from({ length: 11 }, (_, i) => `${i + 8}:00`);

  // Génère les jours de la semaine
  const weekDays = [
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
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  // Gère la sélection/déselection des créneaux horaires
  const handleSlotClick = (day, time) => {
    const slotId = `${day}-${time}`;
    setSelectedSlots((prev) =>
      prev.includes(slotId)
        ? prev.filter((slot) => slot !== slotId)
        : [...prev, slotId]
    );
  };

  // Fonction pour changer de semaine
  const changeWeek = (direction) => {
    setCurrentWeek((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
      return newDate;
    });
  };

  // Si l'utilisateur n'est pas un employé, affiche un message d'accès restreint
  if (!isEmployee) {
    return (
      <div className="restricted-access">
        <h2>Accès Restreint</h2>
        <p>Cette page est réservée aux techniciens de FixioTech.</p>
      </div>
    );
  }

  // Format de la date pour l'affichage
  const formatWeekDisplay = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay() + 1);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  };

  return (
    <div className="horaires-container">
      <h1 className="horaires-title">Gestion de mon horaire</h1>

      <div className="horaires-grid">
        {/* Section des services */}
        <div className="services-section">
          <h2 className="services-title">Mes services proposés</h2>
          <div className="services-list">
            {services.map((service) => (
              <label key={service} className="service-checkbox">
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                />
                {service}
              </label>
            ))}
          </div>
        </div>

        {/* Section du calendrier */}
        <div className="calendar-section">
          <div className="week-navigation">
            <button onClick={() => changeWeek("prev")}>
              Semaine précédente
            </button>
            <span className="current-week">
              {formatWeekDisplay(currentWeek)}
            </span>
            <button onClick={() => changeWeek("next")}>Semaine suivante</button>
          </div>

          <div className="calendar-grid">
            <div className="calendar-header"></div>
            {weekDays.map((day) => (
              <div key={day} className="calendar-header">
                {day}
              </div>
            ))}

            {timeSlots.map((time) => (
              <React.Fragment key={time}>
                <div className="time-slot time-label">{time}</div>
                {weekDays.map((day) => {
                  const slotId = `${day}-${time}`;
                  return (
                    <div
                      key={`${day}-${time}`}
                      className={`time-slot slot-cell ${
                        selectedSlots.includes(slotId) ? "slot-selected" : ""
                      }`}
                      onClick={() => handleSlotClick(day, time)}
                    ></div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>

          <button className="save-button">Enregistrer mon horaire</button>
        </div>
      </div>
    </div>
  );
};

export default Horaires;
