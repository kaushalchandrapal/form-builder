import React from 'react';
import { Button, Typography } from '@mui/material';

const FileUpload = ({ label, onChange }) => {
  const handleFileChange = (e) => {
    onChange(e.target.files[0]); // Pass the selected file to the parent
  };

  return (
    <div>
      <Typography variant="body1" gutterBottom>
        {label}
      </Typography>
      <Button
        variant="contained"
        component="label"
        color="primary"
      >
        Upload File
        <input
          type="file"
          hidden
          onChange={handleFileChange}
        />
      </Button>
    </div>
  );
};

export default FileUpload;
