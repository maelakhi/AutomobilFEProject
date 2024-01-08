import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import ServiceDetailClass from '../../Service/ServiceDetailClass'
import CardCar from '../../components/CardCar'
import LoadingAnimation from '../../components/LoadingAnimation'
import'./ClassDetails.css';
import Swal from 'sweetalert2'
import useAuth from '../../Hooks/useAuth'
import useLoading from '../../Hooks/useLoading'
import useDate from '../../Hooks/useDate'
import SelectInput from '../../components/SelectInput'
import ModalPayment from '../Checkout/ModalPayment'
import ServiceCheckout from '../../Service/ServiceCheckout'
import { FormatDate } from '../../Utils/FormatDate'


const ClassDetails = () => {
    const authCtx = useAuth();
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [dataCar, setDataCar] = useState([])
    const [typeCar, setTypeCar] = useState([])
    const [modalPayment, setModalPayment] = useState(false);
    const [buyNowId, setModalBuyNowId] = useState(null);
    const { isLoading, RunLoading, EndLoading } = useLoading();
    const [startDate, setStartDate] = useState(0)
    const { date } = useDate();

    //scroll to top first render
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    useEffect(() => {
        RunLoading();
        ServiceDetailClass.GetDetailClass(id)
        .then((detailClass) => {
            setDataCar(detailClass.data)
            return detailClass.data
        })
        .then((response) => {
            const idCategory = response?.idCategory

            ServiceDetailClass.GetDataCarRelateType(idCategory)
                .then((response) => setTypeCar(response.data))
                .then((res) => EndLoading())
        })
        .finally((res)=> EndLoading())
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
            RunLoading();
            ServiceDetailClass.AddToCart(authCtx.token, date[startDate]?.valueDate, dataCar.id)
                .then((response) => {
                    if (response.status == 200) {
                        EndLoading();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${response.data.message}`,
                            showConfirmButton: false,
                            timer: 1000
                        });
                    } else {
                        EndLoading();
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
            RunLoading();
            ServiceDetailClass.AddToCartBuyNow(authCtx.token, date[startDate]?.valueDate, dataCar.id)
                .then((response) => {
                    if (response.status == 200) {
                        EndLoading();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${response.data.message}`,
                            showConfirmButton: false,
                            timer: 1000
                        });
                        setModalBuyNowId(parseInt(response.data.data))
                        setTimeout(() => {
                            setModalPayment(true);
                        }, 1100);
                    } else {
                        EndLoading();
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

    const handlePayment = (idPaymentMethod) => {
        setModalPayment(false);
        RunLoading();
        ServiceCheckout.CheckOutInvoice(authCtx.token, idPaymentMethod, [buyNowId])
        .then((response) => {
            if (response.status == 200) {
            EndLoading();
            Swal.fire({
                position: "center",
                icon: "success",
                title: `${response.data.message}`,
                showConfirmButton: false,
                timer: 1000
            });
            setTimeout(() => {
                navigate("/confirmationPurchase")
            }, 1100);
            } else {
            EndLoading();
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${response.data.message}`,
                showConfirmButton: false,
                timer: 1000
            });
            }
        })
        .catch((error) => {
            console.log(error)
            EndLoading();
        })
    }

    return (
        <>
            {isLoading && (<LoadingAnimation />)}
            {modalPayment && (
                <ModalPayment
                    open={modalPayment}
                    handleClose={()=> setModalPayment(false)}
                    selectedItems={[id]} 
                    handlePayment={handlePayment}
                />
            )}
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
                                <Grid item sm={6} >
                                    <SelectInput 
                                        value={startDate}
                                        handleState={setStartDate}
                                        listOption={date}
                                        name="date"
                                        required={true}
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