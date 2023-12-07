import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { dataMobilListMenu, typeCar as typeCarRaw } from '../../data'
import Footer from '../../components/Footer'
import carImg from '../../assets/Image/Rectangle 12-7.png'


const ClassDetails = () => {
    const [dataCar, setDataCar] = useState([])
    const [typeCar, setTypeCar] = useState([])
    const [date, setDate] = useState('')

    useEffect(() => {
        setDataCar(dataMobilListMenu)
        setTypeCar(typeCarRaw)
    }, [])

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
                                src={carImg}
                                />
                        </Grid>
                        <Grid item md={8}>
                            <Grid container rowSpacing={5}>
                                <Grid item sm={12}>
                                    <Typography>
                                        SUV
                                    </Typography>
                                    <Typography variant='h5'>
                                        Hyundai Palisade 2021
                                    </Typography>
                                    <Typography variant='h5' sx={{color:'#790B0A'}}>
                                        IDR 800.000
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
                                    <Stack direction="row" spacing={2}>
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Typography>
                    <Typography variant='h9' sx={{ textAlign: 'left', mb: "5% "}}>
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

export default ClassDetails