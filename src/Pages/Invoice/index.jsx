import { Box, Container, Stack, Typography } from "@mui/material"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const InvociePage = () => {
    return (
       <Container maxWidth='xl' sx={{ mt: '5em' }}>
            <Stack direction="row">
                <Typography variant="caption" sx={{ color: 'gray' }} >Home</Typography>
                <Typography variant="caption"><KeyboardArrowRightIcon sx={{ fontSize: '1.5em'}}/></Typography>
                <Typography variant="caption">Invoice</Typography>
            </Stack>
            <Box sx={{ padding: '3% 0' }}>
                <Typography variant="h5" component="h2" color="#790B0A">
                    Menu Invoice
                </Typography>
            </Box>
       </Container>
  )
}

export default InvociePage