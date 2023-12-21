import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { ServiceLogin } from '../../Service/ServiceUser';
import logoConfirmation from '../../assets/Image/image_confirmation.png'
import CloseIcon from '@mui/icons-material/Close';

const EmailConfirmation = () => {
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Failed Verified");

  useEffect(() => {
    setIsLoading(true);
    ServiceLogin.VerifiedAccount(token)
      .then((response) => {
        if (response.status == 200) {
          setIsSuccess(true);
        } else if (response.status == 404) {
          setErrorMessage(response.data.message)
        }
      })
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
    
  }, [token]);

  return (
    <>
      {isLoading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
      {!isLoading && isSuccess && (
        <Box
          component="img"
          sx={{ height: '100%', width: '100%' }}
          maxWidth={{ xs: '200px', sm: '300px' }}
          alt="Confirmation Image"
          src={logoConfirmation}
        />
      )}
      {!isLoading && !isSuccess && (
        <Box sx={{ display: 'flex' }}>
          <CloseIcon />
        </Box>
      )}
      <Typography
        sx={{
          color: "#790B0A",
          fontSize: { xs: '1rem', sm:'2rem' },
          fontWeight:600
        }}
      >
         {isLoading ? "Waiting for Verified" : isSuccess ? "Email Confirmation Success" : errorMessage}
      </Typography>
      <Typography
        fontWeight=""
       sx={{
          color: "#790B0A",
          fontSize: { xs: '0.7rem', sm:'1.2rem' },
          fontWeight:100
        }}
      >
        {isLoading ?
          "Your account in progress verified" :
          isSuccess ? 
            "Your email already! Please login first to access the web" :
            "Your email failed verification! Please login and get verified again"
        } 
      </Typography>
      {!isLoading && 
      <Button
          component={Link} to="/login"
          variant='contained'
          color='success'
      >
          LOGIN HERE
        </Button>
       }
    </>
  )
}

export default EmailConfirmation