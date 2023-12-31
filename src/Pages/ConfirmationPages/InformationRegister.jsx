import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import logoConfirmation from '../../assets/Image/image_confirmation.png'

const InformationRegister = () => {
    return (
      <>
        <Box
          component="img"
          sx={{ height: '100%', width: '100%' }}
          maxWidth={{ xs: '200px', sm: '300px' }}
          alt="Confirmation Image"
          src={logoConfirmation}
        />
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