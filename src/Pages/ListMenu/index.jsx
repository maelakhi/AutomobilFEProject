import { Box, Card, CardActions, CardContent, CardMedia, Container, Grid, Stack, Typography } from '@mui/material'
// import background_header from '../../assets/Image/background_listmenu.png'
import { useEffect, useState } from 'react'
// import { dataMobilListMenu, typeCar as typeCarRaw } from '../../data'
import Footer from '../../components/Footer'
import { useParams } from 'react-router'
import ServiceListMenu from '../../Service/ServiceListMenu'
import LoadingAnimation from '../../components/LoadingAnimation'

const ListMenu = () => {
    let { typeName } = useParams();
    const [dataCar, setDataCar] = useState([])
    const [typeCar, setTypeCar] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        Promise.allSettled([
            ServiceListMenu.GetDataCarByType(typeName),
            ServiceListMenu.GetDataCarRelateType(typeName)
        ])
        .then(([typeCar, dataCar]) => {
            setTypeCar(typeCar.value.data)
            setDataCar(dataCar.value.data)
        })
        .then((response)=> setIsLoading(false))
    }, [typeName])

    return (
        <>
            <Container maxWidth='xl' sx={{ mt: '5em', padding: '0px !important' }}>
            {isLoading && (<LoadingAnimation />)}
                {/* Header */}
                <Box
                    component="img"
                    sx={{
                        margin: '0px !important',
                        padding: '0px !important',
                        backgroundImage: `url(data:image/jpeg;base64,${typeCar.image})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: 'cover',
                        width: '100%',
                        height: '100%',
                        minHeight: '60vh'
                    }}
                />
                {/* Body */}
                <Box sx={{ padding: "5%" }}>
                    <Typography variant='h5' sx={{ textAlign: 'left'}}>
                        {typeCar.type_name}
                    </Typography>
                    <br />
                    <Typography variant='h10' sx={{ textAlign: 'left', mb: "5% "}}>
                        {typeCar.description}
                    </Typography>
                </Box>
                
                <Container maxWidth='lg' sx={{padding: '5% 0 !important'}}>
                    <Typography variant='h5' sx={{ textAlign: 'center', mb: "5% ", color: '#790B0A'}}>
                        Another favorite course
                    </Typography>
                    <Grid container rowGap={5} columnSpacing={3} alignItems='center' justifyContent='center' >
                        {dataCar && dataCar.map((value, index) => {
                            return (
                                <Grid item lg={4} md={6} sm={12} key={index}>
                                    <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Card sx={{ maxWidth: 345, ":hover": { boxShadow: 3 } }}>
                                            <CardMedia
                                                sx={{ height: 140, width: '100%'  }}
                                                image={`data:image/jpeg;base64, ${value.image}`}
                                                title={value.type_name}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="caption" component="p" color="gray">
                                                    {value.type_name}
                                                </Typography>
                                                <Typography gutterBottom variant="h6" component="p" >
                                                    {value.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    paragraph={true}
                                                    sx={{
                                                        wordBreak: "break-word",
                                                        textAlign: 'justify',
                                                        height: '100%'
                                                    }}
                                                    noWrap={true}
                                                >
                                                    {value.description}
                                                </Typography>
                                                <Typography
                                                    variant="h6"
                                                    color="text.secondary"
                                                    sx={{ mt: '8%', color: 'black' }}
                                                >
                                                    IDR { value.price }
                                                </Typography>
                                            </CardContent>
                                            <CardActions></CardActions>
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

export default ListMenu