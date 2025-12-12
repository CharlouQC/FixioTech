import React from 'react';

const SubmitButton = ({ isLoading, children, className = 'bouton-soumettre', ...props }) => {
  return (
    <button
      type="submit"
      className={className}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? 'Chargement...' : children}
    </button>
  );
};

export default SubmitButton;
