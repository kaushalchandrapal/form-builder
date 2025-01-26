import React from 'react';
import { TextField } from '@mui/material';

const TextInput = ({ label, placeholder, required }) => {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      required={required}
      fullWidth
    />
  );
};

export default TextInput;
