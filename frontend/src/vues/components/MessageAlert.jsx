import React from 'react';

/**
 * Composant pour afficher les messages d'erreur et de succès
 */
export default function MessageAlert({ error, success }) {
  if (!error && !success) return null;

  return (
    <>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </>
  );
}
