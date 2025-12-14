import React from "react";

/**
 * Composant réutilisable pour sélectionner une heure
 * @param {string} label - Label du champ
 * @param {string} id - ID HTML du select
 * @param {string} value - Valeur sélectionnée
 * @param {Function} onChange - Callback de changement
 * @param {string[]} heures - Tableau des heures disponibles
 * @param {string} className - Classe CSS personnalisée
 */
const HeureSelect = ({ label, id, value, onChange, heures, className = "heure-select" }) => {
  return (
    <div className="heure-groupe">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={className}
      >
        {heures.map((heure) => (
          <option key={heure} value={heure}>
            {heure}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HeureSelect;
