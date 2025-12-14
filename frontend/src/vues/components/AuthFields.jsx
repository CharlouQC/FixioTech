import React from "react";
import FormInput from "./FormInput.jsx";

/**
 * Composant réutilisable pour les champs courriel et mot de passe
 * @param {Object} formData - Données du formulaire
 * @param {Function} handleChange - Gestionnaire de changement
 * @param {boolean} showConfirmPassword - Afficher le champ de confirmation
 */
const AuthFields = ({ formData, handleChange, showConfirmPassword = false }) => {
  return (
    <>
      <FormInput
        label="Adresse courriel"
        id="courriel"
        name="courriel"
        type="email"
        value={formData.courriel}
        onChange={handleChange}
        placeholder="Entrez votre adresse courriel"
        autoComplete="email"
      />

      <FormInput
        label="Mot de passe"
        id="password"
        name="mot_de_passe"
        type="password"
        value={formData.mot_de_passe}
        onChange={handleChange}
        placeholder="Entrez votre mot de passe"
        autoComplete={showConfirmPassword ? "new-password" : "current-password"}
      />

      {showConfirmPassword && (
        <FormInput
          label="Confirmer le mot de passe"
          id="confirmer_mot_de_passe"
          name="confirmer_mot_de_passe"
          type="password"
          value={formData.confirmer_mot_de_passe}
          onChange={handleChange}
          placeholder="Confirmez votre mot de passe"
          autoComplete="new-password"
        />
      )}
    </>
  );
};

export default AuthFields;
