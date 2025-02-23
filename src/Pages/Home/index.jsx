import { Box, Card, CardContent, CardMedia, Container, Grid, Stack, Typography } from '@mui/material'
import background_header from '../../assets/Image/background_home.png'
import imgTwo from '../../assets/Image/image_bg.png'
import imgThree from '../../assets/Image/image_bg2.png'
import { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import './Home.css'
import ServiceLandingPage from '../../Service/ServiceLandingPage'
import LoadingAnimation from '../../components/LoadingAnimation'
import CardCar from '../../components/CardCar'
import useLoading from '../../Hooks/useLoading'

const Home = () => {
    const [dataCar, setDataCar] = useState([])
    const [typeCar, setTypeCar] = useState([])
    const { isLoading, RunLoading, EndLoading } = useLoading();

    useEffect(() => {
        RunLoading();
        Promise.allSettled([
            ServiceLandingPage.GetCarsLimit(),
            ServiceLandingPage.GetCategoryData()
        ])
        .then(([getCarsLimit, categoryData]) => {
            setDataCar(getCarsLimit.value.data)
            setTypeCar(categoryData.value.data)
        })
        .then((response) => EndLoading())
        .catch((error) => EndLoading())
        
    }, [])

    return (
        <>
            {isLoading && (<LoadingAnimation />)}
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
                        height: '100%'                      
                    }}
                >
                    <Stack
                        spacing={6}
                        alignItems="center"
                        justifyContent="center"
                        border='2px solid white'
                        direction='column'
                        height= '100%'
                        minHeight= '60vh'
                    >
                        <Box sx={{ width: "80%", py: '2%' }}>
                            <Typography
                                color="white"
                                textAlign="center"
                                sx={{ fontSize: '2em', fontWeight: "600", lineHeight: '39px', my: '2%' }}
                            >
                                We provide driving lessons for various types of cars
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '1.5em', fontWeight: "100", lineHeight: '29px',
                                    textAlign: 'center',  color: 'white',
                                }}
                            >
                                Professional staff who are ready to help you to
                                become a much-needed reliable driver
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center', width: '80%' }}>
                            <Grid container justifyContent='center'>
                                <Grid item lg={4} >
                                    <Stack>
                                        <Typography
                                            color="white"
                                            textAlign="center"
                                            sx={{ fontSize: '32px', fontWeight: "600", lineHeight: '39px', my: '2%' }}
                                        >
                                            50+
                                        </Typography>
                                        <Typography
                                            variant='p'
                                            color="white"
                                            textAlign="center"
                                            sx={{ px: '15%', py: '5%'  }}
                                        >
                                            A class ready to make you a reliable driver
                                        </Typography>
                                    </Stack>
                                </Grid> 
                                <Grid item lg={4}>
                                    <Stack>
                                        <Typography
                                            color="white"
                                            textAlign="center"
                                            sx={{ fontSize: '32px', fontWeight: "600", lineHeight: '39px', my: '2%' }}
                                        >
                                            20+
                                        </Typography>
                                        <Typography
                                            variant='p'
                                            color="white"
                                            textAlign="center"
                                            sx={{ px: '15%', py: '5%'  }}
                                        >
                                            Professional workforce with great experience
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid item lg={4} >
                                    <Stack>
                                        <Typography
                                            color="white"
                                            textAlign="center"
                                            sx={{ fontSize: '32px', fontWeight: "600", lineHeight: '39px', my: '2%' }}
                                        >
                                            10+
                                        </Typography>
                                        <Typography
                                            variant='p'
                                            color="white"
                                            textAlign="center"
                                            sx={{ px: '15%', py: '5%' }}
                                        >
                                            Cooperate with driver service partners
                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    </Stack>
                </Box>
                {/* Body */}
                <Container maxWidth='lg' sx={{padding: '0px !important'}}>
                    <Typography variant='h5' sx={{ textAlign: 'center', my: "5% "}}>
                        Join us for the course
                    </Typography>
                    <Grid container rowGap={6} alignItems='center' justifyContent='center' >
                        {dataCar && dataCar.map((value, index) => {
                            return (
                                <CardCar value={value} key={index} />
                            )
                        })}
                        
                    </Grid>
                </Container>
                <Container maxWidth='xl' sx={{ px: '0 !important', py: '5%' }}>
                    <Grid container columnSpacing={2}>
                        <Grid item md={7}  xs={12}>
                            <div className='box_header_benefit'>
                                <Typography variant='h5'sx={{ py: '2%', width:'100%'}}>
                                    Gets your best benefit
                                </Typography>
                                <Typography variant="p" component='p' color="text.secondary" textAlign={'justify'} sx={{ py: '2%'}}>
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam.
                                </Typography>
                                <Typography variant="p" component='p' color="text.secondary" textAlign={'justify'} sx={{ py: '2%'}}>
                                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item md={5} xs={12}>
                                <Box
                                    sx={{
                                        backgroundImage: `url(${imgThree})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'bottom',
                                        backgroundOrigin: 'border-box',
                                        width: '100%',
                                        height: '100%'
                                    }}
                                >
                                    <img
                                        src={imgTwo}
                                        style={{
                                            padding: "0 8%  0  0",
                                            width: '100%',
                                            backgroundSize: 'cover',
                                            zIndex: 10
                                        }}     
                                    />
                                </Box>
                        </Grid>
                    </Grid>
                </Container>
                <Container maxWidth='lg' sx={{padding: '0px !important'}}>
                    <Typography variant='h5' sx={{ textAlign: 'center', mb: "5% "}}>
                        More car type you can choose
                    </Typography>
                    <Grid container rowGap={6} alignItems='center' justifyContent='center' >
                        {typeCar && typeCar.map((value, index) => {
                            return (
                                <Grid item lg={3} md={4} sm={6} xs={6} key={index}>
                                    <Stack
                                        sx={{ justifyContent: 'center', alignItems: 'center', textDecoration: 'none' }}
                                        component={Link}
                                        to={`/listmenu/${value.id}`}
                                    >
                                        <Card sx={{ maxWidth: 345, boxShadow: 1,":hover": { boxShadow: 3 } }}>
                                            <CardMedia
                                                sx={{ height: 140, minWidth: { lg:'180px', xs:'155px' }, width: '100%' }}
                                                image={`${import.meta.env.VITE_BASE_URL}/${value?.imagePath}`}
                                                // title={value.type_name}
                                            />
                                            <CardContent>
                                                <Typography
                                                    variant="p"
                                                    component="p"
                                                    color="text.secondary"
                                                    sx={{ mt: '8%', color: 'black', textAlign: 'center'}}
                                                >
                                                    { value.name }
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Stack>
                                </Grid>
                            )
                        })}
                        
                    </Grid>
                </Container>
                {/* Footer */}
                <Footer />
            </Container>

        </>
  )
}

export default Home