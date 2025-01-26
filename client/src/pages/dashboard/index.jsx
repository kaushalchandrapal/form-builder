import React from 'react';
import HeaderComponent from '../../components/header'
import { Outlet } from 'react-router-dom'
import { Stack } from '@mui/material'

const Dashboard = () => {
  return (
    <>
      <HeaderComponent />
      <Stack bgcolor="lightgrey" height="93vh">
        <Outlet />
      </Stack>
    </>
  )
}

export default Dashboard