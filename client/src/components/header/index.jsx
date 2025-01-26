import { Stack, Typography } from '@mui/material';

const HeaderComponent = () => {
  return (
    <Stack sx={{ height: '7vh', bgcolor: 'black', flexDirection: 'row', alignItems: 'center', }}>
      <Stack marginLeft={2}>
        <Typography variant='h6' color='#ffff'>Form Builder</Typography>
      </Stack>
      
    </Stack>
  );
}

export default HeaderComponent;