import { Box, Card, CardActions, CardContent, CardMedia, Container, Grid, Stack, Typography } from '@mui/material'
// import background_header from '../../assets/Image/background_listmenu.png'
import { useEffect, useState } from 'react'
// import { dataMobilListMenu, typeCar as typeCarRaw } from '../../data'
import Footer from '../../components/Footer'
import { useParams } from 'react-router'
import ServiceListMenu from '../../Service/ServiceListMenu'
import LoadingAnimation from '../../components/LoadingAnimation'
import CardCar from '../../components/CardCar'

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
        .then((response) => setIsLoading(false))
        .catch((error) => { setIsLoading(false) })
        
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
                        backgroundImage: `url(${typeCar.imagePath})`,
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
                        {dataCar.length <= 0 && (
                            <Typography variant='h5'>Data Kosong</Typography>
                        )}
                        {dataCar.length > 0 && dataCar.map((value, index) => {
                            return (
                                <CardCar value={value} key={index} />
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