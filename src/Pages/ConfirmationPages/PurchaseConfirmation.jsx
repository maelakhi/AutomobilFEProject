import { Home } from '@mui/icons-material'
import { Button, Stack, Typography, useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom'

const PurchaseConfirmation = () => {
    const witdhFlag =  useMediaQuery('(max-width:600px)')
  return (
    <>
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
                component={Link} to="/login"
                variant='contained'
                color='success'
                sx={{
                    fontWeight: 600,
                    fontSize: { xs:'0.7em',sm: '1.2em'}
                }}
            >
                LOGIN HERE
            </Button>
        </Stack>
    </>
  )
}

export default PurchaseConfirmation