import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Button, Card, CardActionArea, Stack, Typography } from '@mui/material';
import { FormService } from '../../../api';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addElement, resetForm, setFormId, setFormName, setSelectedElement } from '../../../store/slices/form-builder';

const MainDashboard = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formList, setFormList] = useState(null);

  const getAllFormAPICall = useMutation({
    mutationFn: () => FormService().getAllFormAPI(),

    onSuccess: (response) => {
      setFormList(response.data);
    }
  });

  useEffect(() => {
    dispatch(resetForm());
    getAllFormAPICall.mutateAsync();
  }, []);

  const handleFormClick = (form) => {    
    dispatch(setFormName(form.form_name));
    dispatch(setSelectedElement(null));
    dispatch(setFormId(form.id));

    form.form_data?.forEach((field) => {
      dispatch(addElement(field));
    });

    navigate(`/dashboard/form-builder`);
  };

  return (
    <Stack>
      <Stack width="70vw" margin="auto">
        <Stack flexDirection="row" justifyContent='end' marginTop={3} padding={2}>
          <Button variant='contained' onClick={() => navigate("/dashboard/form-builder")}>
            Create Form
          </Button>
        </Stack>
        <Grid container spacing={2}>
          {formList?.map((element) => {
            return (
              <Grid key={element.id} size={{ xs: 6, md: 4 }}>
                <Card>
                  <CardActionArea onClick={() => handleFormClick(element)}>
                    <Stack flexDirection="row" justifyContent="center" alignItems='center' padding={12}>
                      <Typography variant='h6'>{element.form_name}</Typography>
                    </Stack>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </Stack>
  );
}

export default MainDashboard;