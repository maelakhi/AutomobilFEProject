import { Box, Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
        <Container
            maxWidth='xl'
            sx={{
                padding: '0px !important',
                minHeight: "100vh",
                backgroundColor: 'white'
          }}
        >
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          border: '2px solid black'
        }}>
        <Typography color="gray" variant='h4' fontWeight={'800'}>
          OoPS......
        </Typography> 
        <Typography color="text.secondary" fontWeight={'800'}>
          Not Found Page
        </Typography> 
        <Button
          component={Link} to="/"
          variant='contained'
          color='success'
        >
          Back To Home
      </Button>
      </Box>
      </Container>
  )
}

export default NotFoundPage