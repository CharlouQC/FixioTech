import React from 'react';

const FormInput = ({ 
  label, 
  id, 
  name, 
  type = "text", 
  value, 
  onChange, 
  placeholder = "", 
  autoComplete = "off",
  required = false 
}) => {
  return (
    <div className="form-groupe">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
      />
    </div>
  );
};

export default FormInput;
