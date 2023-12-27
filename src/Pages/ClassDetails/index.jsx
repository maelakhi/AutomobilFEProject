import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import React, { forwardRef, useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import ServiceDetailClass from '../../Service/ServiceDetailClass'
import CardCar from '../../components/CardCar'
import LoadingAnimation from '../../components/LoadingAnimation'
import DatePicker from "react-datepicker";
import'./ClassDetails.css';
import Swal from 'sweetalert2'
import useAuth from '../../Hooks/useAuth'

const ClassDetails = () => {
    const authCtx = useAuth();
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [dataCar, setDataCar] = useState([])
    const [typeCar, setTypeCar] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [startDate, setStartDate] = useState(new Date())

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

    const handleAddCart = () => {
        if (authCtx.token == undefined) {
            Swal.fire({
                title: "Do you want to add the cart? Please LOG IN first",
                showCancelButton: true,
                confirmButtonText: "LOG IN"
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    navigate('/login')
                }
            });
        } else {
            setIsLoading(true);
            ServiceDetailClass.AddToCart(authCtx.token, startDate, dataCar.id)
                .then((response) => {
                    if (response.status == 200) {
                        setIsLoading(false)
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${response.data.message}`,
                            showConfirmButton: false,
                            timer: 1000
                        });
                    } else {
                        setIsLoading(false)
                        Swal.fire({
                            position: "center",
                            icon: "warning",
                            title: `${response.data.message}`,
                            showConfirmButton: false,
                            timer: 1000
                        });
                    }
            }).catch(err => console.log(err.response))
        }

    }

    const handleBuyNow = () => {
        if (authCtx.token == undefined) {
            Swal.fire({
                title: "Do you want to add the cart? Please LOG IN first",
                showCancelButton: true,
                confirmButtonText: "LOG IN"
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    navigate('/login')
                }
            });
        } else {
            console.log('API')
        }
    }
    
    // eslint-disable-next-line react/display-name, react/prop-types
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className={`example-custom-input`} onClick={onClick} ref={ref}>
            {value}
        </button>
    ));

    return (
        <>
            {isLoading && (<LoadingAnimation />)}
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
                                <Grid item sm={12} >
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        customInput={<ExampleCustomInput />}
                                    />
                                </Grid>
                                <Grid item sm={12}>
                                    <Stack direction={{ sm: 'column', md:'row' }}  columnGap={2} rowGap={2}>
                                    <Button
                                        sx={{width:233.5, height:40}}
                                        variant='outlined'
                                        color='success'
                                        onClick={handleAddCart}
                                    >
                                        Add To Cart 
                                    </Button>
                                    <Button
                                        sx={{width:233.5 ,height:40}}
                                        variant='contained'
                                            color='success'
                                            onClick={handleBuyNow}
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