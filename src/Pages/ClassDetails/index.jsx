import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { dataMobilListMenu, typeCar as typeCarRaw } from '../../data'
import Footer from '../../components/Footer'
import carImg from '../../assets/Image/Rectangle 12-7.png'
import { useParams } from 'react-router-dom'
import ServiceDetailClass from '../../Service/ServiceDetailClass'
import CardCar from '../../components/CardCar'


const ClassDetails = () => {
    const { id } = useParams();
    const [dataCar, setDataCar] = useState([])
    const [typeCar, setTypeCar] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [date, setDate] = useState('')

    //scroll to top first render
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    useEffect(() => {
        setIsLoading(true);
        ServiceDetailClass.GetDetailClass(id)
        .then((detailClass) => {
            setDataCar(detailClass.data)
            return detailClass.data
        })
        .then((response) => {
            const idCategory = response?.idCategory

            ServiceDetailClass.GetDataCarRelateType(idCategory)
                .then((response) => setTypeCar(response.data))
                .then((res)=> setIsLoading(false))
        })
    }, [id])

    const handleChange = (event) => {
        setDate(event.target.value);
    };

    return (
        <>
            <Container maxWidth={'xl'} sx={{ mt: '60px', padding: '0px !important' }}>
                {/* Body */}
                <Box sx={{ padding: "5%" }}>
                    <Grid container columnSpacing={5}>
                        <Grid item md={4} sm={12}>
                            <Box
                                component="img"
                                sx={{
                                    height: 266.67,
                                    width: '100%',
                                }}
                                alt="Car Image"
                                src={dataCar?.imagePath}
                                />
                        </Grid>
                        <Grid item md={8}>
                            <Grid container rowSpacing={5}>
                                <Grid item sm={12}>
                                    <Typography component="p">
                                        { dataCar.categoryName }
                                    </Typography>
                                    <Typography variant='h5' component="p">
                                        { dataCar?.name }
                                    </Typography>
                                    <Typography variant='h5' component="p" sx={{color:'#790B0A'}}>
                                        IDR { dataCar.price }
                                    </Typography>
                                </Grid>
                                <Grid item sm={12}>
                                    <FormControl sx={{ m: 1, minWidth: 300 }} size="small">
                                        <InputLabel id="demo-select-small-label">Select Schedule</InputLabel>
                                        <Select
                                            value={date}
                                            label="Select Schedule"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="">
                                            <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={12}>
                                    <Stack direction={{ sm: 'column', md:'row' }}  columnGap={2} rowGap={2}>
                                    <Button
                                        sx={{width:233.5, height:40}}
                                        variant='outlined'
                                        color='success'
                                    >
                                        Add To Cart 
                                    </Button>
                                    <Button
                                        sx={{width:233.5 ,height:40}}
                                        variant='contained'
                                        color='success'
                                    >
                                        Buy Now
                                    </Button>                                
                                </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Typography variant='h5' sx={{ textAlign: 'left'}}>
                        Description
                    </Typography>
                    <br />
                    <Typography display='block' variant='h10' sx={{ textAlign: 'left', mb: "5% "}}>
                       {dataCar.description}
                    </Typography>
                </Box>
                
                <Box sx={{ padding: "5%" }}>
                    <Typography variant='h5' sx={{ textAlign: 'center', mb: "5% ", color: '#790B0A'}}>
                        Another favorite course
                    </Typography>
                    <Grid container rowGap={6} alignItems='center' justifyContent='center' >
                        {typeCar && typeCar.map((value) => {
                            return (
                                <CardCar value={value} key={value.id} />
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

export default ClassDetails