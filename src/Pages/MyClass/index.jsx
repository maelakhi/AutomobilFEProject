import { useEffect, useState } from "react"
import { Box, Card, CardContent, CardMedia, Container, Divider, List, ListItem, Typography } from "@mui/material"
import Footer from "../../components/Footer";
import LoadingAnimation from '../../components/LoadingAnimation';
import ServiceMyClass from "../../Service/ServiceMyClass";
import useAuth from '../../Hooks/useAuth';
import useLoading from "../../Hooks/useLoading";
import { FormatDate } from "../../Utils/FormatDate";

const MyClassPage = () => {
    const authCtx = useAuth();
    const [data, setData] = useState([])
    const { isLoading, RunLoading, EndLoading } = useLoading();

    useEffect(() => {
        RunLoading();
        ServiceMyClass.GetMyClass(authCtx.token)
        .then((orderDetails) => {
            setData(orderDetails.data)
        })
        .then((res) => EndLoading())
        .catch((res) => {
            console.error(res)
           EndLoading()
        })
    }, [])

    return (
        <> 
        {isLoading && (<LoadingAnimation />)}
        <Container maxWidth='lg' sx={{ mt: '5em', padding: '0px !important', minHeight: '55vh' }}>
            <List sx={{ width: '100%' }}>
                {data.length == 0 && (<Typography variant="h5" textAlign="center">Data Kosong</Typography>)}
                {data && data.map((value, i) => {
                    return (
                        <Box sx={{ width: '100%', ":hover": { bgcolor: 'lightgray' }, cursor: 'pointer' }} key={i}>
                            <ListItem alignItems="flex-start" width='100%' >
                                <Card
                                    sx={{
                                        display: 'flex',
                                        width: '100%',
                                        boxShadow: 'none',
                                        flexDirection: { lg: "row", xs:"column" },
                                        bgcolor: 'transparent',
                                        padding: '1  % 0'
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            width: { lg: 151, xs: "100%" },
                                            objectFit: "fill"
                                        }}
                                        image={value.product.imagePath}
                                        alt="Live from space album cover"
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography variant="caption" color="text.secondary" component="div">
                                                {value.product.categoryName}
                                            </Typography>
                                            <Typography component="div" variant="h5">
                                                {value.product.name}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                Schedule : {FormatDate(value.dateSchedule)}
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                </Card>
                            </ListItem>
                            {i < data?.length-1 && <Divider variant="middle" component="li" sx={{ borderWidth: '1px', borderColor: "black" }} />}
                        </Box>
                    )
                })}
            </List>
        </Container>
        {/* Footer */}
        <Footer />
      </>
  )
}

export default MyClassPage