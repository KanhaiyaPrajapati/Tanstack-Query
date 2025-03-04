import React from "react";

const InputFields = ({
  type = "text",
  className = "form-control",
  value,
  onChange,
  placeholder = "Enter the Username",
  required = false,
}) => {
  return (
    <div>
      <input
        type={type}
        className={className}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default InputFields;
