// components/FormField.tsx
import React from "react";
import { TextField } from "@mui/material";

interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  maxLength?: number;
  required?: boolean;
}

const FormInput: React.FC<FormFieldProps> = ({
  label,
  type = "text",
  placeholder,
  error = false,
  helperText,
  required = false,
  maxLength,
}) => (
  <div className="">
    <TextField
      error={error}
      id="standard-error-helper-text"
      type={type}
      label={label}
      placeholder={placeholder}
      fullWidth
      margin="normal"
      helperText={helperText}
      variant="standard"
      inputProps={{
        maxLength: maxLength,
      }}
      required={required}
    />
  </div>
);

export default FormInput;
