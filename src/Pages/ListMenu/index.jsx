import { Box, Card, CardActions, CardContent, CardMedia, Container, Grid, Stack, Typography } from '@mui/material'
import background_header from '../../assets/Image/background_listmenu.png'
import { useEffect, useState } from 'react'
import { dataMobilListMenu, typeCar as typeCarRaw } from '../../data'
import Footer from '../../components/Footer'

const ListMenu = () => {
    const [dataCar, setDataCar] = useState([])
    const [typeCar, setTypeCar] = useState([])

    useEffect(() => {
        setDataCar(dataMobilListMenu)
        setTypeCar(typeCarRaw)
    }, [])

    return (
        <>
            <Container maxWidth='xl' sx={{ mt: '5em', padding: '0px !important' }}>
                {/* Header */}
                <Box
                    sx={{
                        margin: '0px !important',
                        padding: '0px !important',
                        backgroundImage: `url(${background_header})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: 'cover',
                        width: '100%',
                        height: '100%',
                        minHeight: '60vh'
                    }}
                >
                </Box>
                {/* Body */}
                <Box sx={{ padding: "5%" }}>
                    <Typography variant='h5' sx={{ textAlign: 'left'}}>
                        SUV
                    </Typography>
                    <br />
                    <Typography variant='h10' sx={{ textAlign: 'left', mb: "5% "}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Typography>
                </Box>
                
                <Box sx={{ padding: "5%" }}>
                    <Typography variant='h5' sx={{ textAlign: 'center', mb: "5% ", color: '#790B0A'}}>
                        Another favorite course
                    </Typography>
                    <Grid container rowGap={6} alignItems='center' justifyContent='center' >
                        {dataCar && dataCar.map((value) => {
                            return (
                                <>
                                   <Grid item lg={4} md={6} sm={12}>
                                    <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Card sx={{ maxWidth: 345, ":hover": { boxShadow: 3 } }}>
                                            <CardMedia
                                                sx={{ height: 140, width: '100%' }}
                                                image={value.image}
                                                title={value.typeCar}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="caption" component="p" color="gray">
                                                    {value.typeCar}
                                                </Typography>
                                                <Typography gutterBottom variant="h6" component="p" noWrap={true}>
                                                    {value.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                                    species, ranging across all continents except Antarctica
                                                </Typography>
                                                <Typography
                                                    variant="h6"
                                                    color="text.secondary"
                                                    sx={{ mt: '8%', color: '#790B0A' }}
                                                >
                                                    IDR { value.price }
                                                </Typography>
                                            </CardContent>
                                            <CardActions></CardActions>
                                        </Card>
                                    </Stack>
                                </Grid>
                                </>
                                
                            )
                        })}
                        
                    </Grid>
                </Box>


                {/* Footer */}
                <Footer />
            </Container>
        </>

    )

}

export default ListMenu