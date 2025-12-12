/**
 * Génère un tableau d'heures disponibles de 8h à 18h
 * @returns {string[]} Tableau des créneaux horaires au format "HH:00"
 */
export const generateTimeSlots = () => {
  return Array.from({ length: 11 }, (_, i) => {
    const h = String(i + 8).padStart(2, "0");
    return `${h}:00`;
  });
};

/**
 * Heures disponibles statiques (8h à 18h)
 */
export const HEURES_DISPONIBLES = generateTimeSlots();
