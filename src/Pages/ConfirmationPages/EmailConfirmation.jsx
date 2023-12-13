import { Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const EmailConfirmation = () => {
  return (
    <>
      <Typography
        sx={{
          color: "#790B0A",
          fontSize: { xs: '1rem', sm:'2rem' },
          fontWeight:600
        }}
      >
          Email Confirmation Success
      </Typography>
      <Typography
        fontWeight=""
       sx={{
          color: "#790B0A",
          fontSize: { xs: '0.7rem', sm:'1.2rem' },
          fontWeight:100
        }}
      >
          Your email already! Please login first to access the web
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

export default EmailConfirmation