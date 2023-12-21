import { Box, Container, CssBaseline, Stack } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import logoPage from '../../Assets/Frame 1738.png'

const ConfirmationLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Container maxWidth='xl' sx={{ padding: '0px !important' }} >
        <Box>
          <Link to={"/"}>
            <Box
              component="img"
              sx={{
                height: '100%',
                width: '100%'
              }}
              maxHeight={{ xs: '40px', sm: '100%' }}
              maxWidth={{ xs: '100px', sm: '200px' }}
              alt="Car Image"
              src={logoPage}
            />
          </Link>
        </Box>
        <Stack
          sx={{
            display: 'flex',
            direction:"column",
            justifyContent:'center',
            alignItems:'center',
            rowGap:2,
            minHeight: '85vh',
            minWidth: '95vw',
            gap: 3
          }}
        >
          <Outlet />
        </Stack>
      </Container>
    </Box>
  )
}

export default ConfirmationLayout;