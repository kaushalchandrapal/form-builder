import React from 'react';
import { TextField, Checkbox, FormControlLabel, Typography, Stack } from '@mui/material';

const PropertiesPanel = ({ selectedElement, updateElement }) => {
  if (!selectedElement) return null;

  return (
    <div style={{ width: '20%', padding: '1rem', background: '#f9f9f9', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h6" gutterBottom>
        Properties
      </Typography>

      <TextField
        label="Label"
        value={selectedElement.label || ''}
        onChange={(e) => {
          updateElement({ ...selectedElement, label: e.target.value });
        }}
        fullWidth
        margin="normal"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={selectedElement.required || false}
            onChange={(e) => {
              updateElement({ ...selectedElement, required: e.target.checked });
            }}
          />
        }
        label="Required"
      />

      {selectedElement.minMax && (
        <Stack spacing={2} marginTop={2}>
          <TextField
            label="Min Value"
            type="number"
            value={selectedElement.min || ''}
            onChange={(e) => {
              updateElement({ ...selectedElement, min: e.target.value });
            }}
            fullWidth
          />
          <TextField
            label="Max Value"
            type="number"
            value={selectedElement.max || ''}
            onChange={(e) => {
              updateElement({ ...selectedElement, max: e.target.value });
            }}
            fullWidth
          />
        </Stack>
      )}
    </div>
  );
};

export default PropertiesPanel;
