import React from 'react';
import { FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
      }
      label={label}
    />
  );
};

export default Checkbox;
