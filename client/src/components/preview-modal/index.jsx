import React from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Modal,
  Radio,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { FormService } from '../../api';
import { useSnackbar } from '../../contexts/snackbar';

const PreviewModal = ({ open, formElements, onClose, formName, formId }) => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const saveFormAPICall = useMutation({
    mutationFn: (payload) => FormService().saveFormAPI(payload),
    onSuccess: () => {
      showSnackbar("Form saved successfully!", "success");
      navigate('/dashboard');
    },
    onError: (error) => {
      showSnackbar(`Failed to save form: ${error.response?.data?.message || error.message}`, "error");
    },
  });

  const updateFormAPICall = useMutation({
    mutationFn: (payload) => FormService().updateFormAPI(payload),
    onSuccess: () => {
      showSnackbar("Form updated successfully!", "success");
      navigate('/dashboard');
    },
    onError: (error) => {
      showSnackbar(`Failed to update form: ${error.response?.data?.message || error.message}`, "error");
    },
  });

  const handleSaveForm = () => {
    const formData = {
      formName: formName || 'Untitled Form',
      formData: formElements,
    };
    saveFormAPICall.mutateAsync(formData);
  };

  const handleUpdateForm = () => {
    const formData = {
      formName: formName || 'Untitled Form',
      formData: formElements,
    };

    const payload = {
      id: formId,
      payload: formData
    };

    updateFormAPICall.mutateAsync(payload);
  };

  const renderElement = (element) => {
    switch (element.name) {
      case 'textInput':
        return (
          <TextField
            label={element.label}
            placeholder={element.placeholder || ''}
            required={element.required || false}
            fullWidth
          />
        );
      case 'checkbox':
        return <FormControlLabel control={<Checkbox />} label={element.label} />;
      case 'radioButton':
        return <FormControlLabel control={<Radio />} label={element.label} />;
      case 'datePicker':
        return (
          <TextField
            type="date"
            label={element.label}
            required={element.required || false}
            fullWidth
          />
        );
      case 'fileUpload':
        return (
          <Button variant="outlined" component="label">
            {element.label}
            <input type="file" hidden />
          </Button>
        );
      case 'selectDropDown':
        return (
          <Select fullWidth defaultValue="" displayEmpty>
            <MenuItem value="" disabled>
              {element.label}
            </MenuItem>
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
          </Select>
        );
      default:
        return null;
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Stack
        style={{
          padding: '1rem',
          background: '#ffffff',
          margin: '5% auto',
          width: '50%',
          borderRadius: '8px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h5">{formName || 'Untitled Form'}</Typography>
        <Typography variant="h6" style={{ marginTop: '16px' }}>
          Form Preview
        </Typography>
        <Stack spacing={3} marginTop={3}>
          {formElements.map((element, index) => (
            <Stack key={index} spacing={3}>
              {renderElement(element)}
            </Stack>
          ))}
        </Stack>
        <Stack direction="row" justifyContent="space-between" style={{ marginTop: '16px' }}>
          {formId ? (
            <Button variant="contained" color="primary" onClick={handleUpdateForm} disabled={updateFormAPICall.isPending}>
              {updateFormAPICall.isPending ? 'Updating...' : 'Update Form'}
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleSaveForm} disabled={saveFormAPICall.isPending}>
              {saveFormAPICall.isPending ? 'Saving...' : 'Save Form'}
            </Button>
          )}
          <Button variant="outlined" color="primary" onClick={onClose}>
            Close
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default PreviewModal;
