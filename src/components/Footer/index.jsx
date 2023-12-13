import { Box, Container, Grid, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import { Circle } from '@mui/icons-material';
import { typeCar } from '../../data';
import WA from '../../assets/Image/Frame 1744.png';
import IC2 from '../../assets/Image/Group 100.png';
import IC3 from '../../assets/Image/Group 97.png';
import IC4 from '../../assets/Image/Group 98.png';
import IC5 from '../../assets/Image/Group 99.png';

const Footer = () => {
    return (
      <>
        <Container maxWidth={false} sx={{mx: '0px !important', px: '0px !important', py: '2%', borderTop: '1px solid #d3d3d3' }}>
          <Grid container spacing={3} sx={{ px: '8%'}}>
            <Grid item lg={4} >
                <Typography sx={{ fontWeight:'800', pb: '5%'}}>
                    About Us
                </Typography>
                <Typography variant="caption" component="p" color="text.secondary" sx={{ textAlign: 'justify'}}>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                    sunt explicabo.
                </Typography>
            </Grid>
            <Grid item lg={4} >
                <Typography sx={{ fontWeight:'800'}}>
                    Product
                </Typography>
                <Grid container >
                    {typeCar && typeCar.slice(0,6).map((value) => {
                        return (
                            <Grid item lg={6} key={value.id}>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon sx={{ minWidth: '20px !important'}}>
                                            <Circle  style={{ fontSize: '8px'}}/>
                                        </ListItemIcon>
                                        <span style={{ fontSize: '15px'}}>
                                            {value.typeCar}
                                        </span>
                                    </ListItemButton>
                                </ListItem>
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
                <Grid item lg={4} >
                    <Box>
                        <Typography sx={{ fontWeight:'800', pb: '3%'}}>
                            About Us
                        </Typography>
                        <Typography variant="caption" component="p" color="text.secondary" sx={{ textAlign: 'justify'}}>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.
                        </Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ fontWeight:'800', py: '5%'}}>
                            Contact Us
                        </Typography>
                            <Grid container>
                                <Grid item lg={2} md={2} xs={2}>
                                    <img src={WA} alt='' width={'40px'}/>
                                </Grid>
                                <Grid item lg={2} md={2} xs={2}>
                                    <img src={IC2} alt='' width={'40px'}/>
                                </Grid>
                                <Grid item lg={2} md={2} xs={2}>
                                    <img src={IC3} alt='' width={'40px'}/>
                                </Grid>
                                <Grid item lg={2} md={2} xs={2}>
                                    <img src={IC4} alt='' width={'40px'}/>
                                </Grid>
                                <Grid item lg={2} md={2} xs={2}>
                                    <img src={IC5} alt='' width={'40px'}/>
                                </Grid>
                        </Grid>
                    </Box>
            </Grid>
          </Grid>
        </Container>
    </>
  )
}

export default Footer