import { Home } from '@mui/icons-material'
import { Box, Button, Stack, Typography, useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom'
import logoConfirmation from '../../assets/Image/image_confirmation.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PurchaseConfirmation = () => {
    const witdhFlag =  useMediaQuery('(max-width:600px)')
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
            sx={{
            color: "#790B0A",
            fontSize: { xs: '1rem', sm:'2rem' },
            fontWeight:600
            }}
        >
            Purchase Successfully
        </Typography>
        <Typography
            fontWeight=""
            sx={{
                color: "#790B0A",
                fontSize: { xs: '0.9rem', sm:'1.4rem' },
                fontWeight:100
            }}
        >
          That’s Great! We’re ready for driving day
        </Typography>
        <Stack
              direction='row'
              gap={2}
        >
            <Button
                component={Link} to="/"
                variant='outlined'
                color='success'
                sx={{
                    fontWeight: 600,
                    fontSize: { xs:'0.7em',sm: '1.2em'}
                }}
            >
                  <Home fontSize={ witdhFlag ? 'small':'medium' } /> Back to Home
            </Button>
            <Button
                component={Link} to="/invoice"
                variant='contained'
                color='success'
                sx={{
                    fontWeight: 600,
                    fontSize: { xs:'0.7em',sm: '1.2em'}
                }}
            >
               <ArrowForwardIcon/> Open Invoice
            </Button>
        </Stack>
    </>
  )
}

export default PurchaseConfirmation