import { Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const InformationRegister = () => {
    return (
      <>
        <Typography
        fontWeight=""
       sx={{
          color: "#790B0A",
          fontSize: { xs: '0.7rem', sm:'1.2rem' },
          fontWeight:100
        }}
      >
        Please Check Your Email to Verified Your Account
      </Typography>
       <Button
          component={Link} to="/login"
          variant='contained'
          color='success'
      >
          LOGIN HERE
            </Button>
    </>
  )
}

export default InformationRegister