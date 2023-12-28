import { useEffect, useState } from "react"
import { Box, Card, CardContent, CardMedia, Container, Divider, List, ListItem, Typography } from "@mui/material"
import Footer from "../../components/Footer";
import LoadingAnimation from '../../components/LoadingAnimation';
import ServiceMyClass from "../../Service/ServiceMyClass";
import useAuth from '../../Hooks/useAuth';

const MyClassPage = () => {
    const authCtx = useAuth();
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true);
        ServiceMyClass.GetMyClass(authCtx.token)
        .then((orderDetails) => {
            setData(orderDetails.data)
        })
        .then((res) => setIsLoading(false))
        .catch((res) => {
            console.error(res)
            setIsLoading(false)
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
                                <Card sx={{ display: 'flex', width: '100%', boxShadow: 'none', bgcolor: 'transparent', padding: '1  % 0' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 151 }}
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
                                                Schedule : {value.dateSchedule}
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                </Card>
                            </ListItem>
                            <Divider variant="middle" component="li" sx={{ borderWidth: '1px', borderColor: "black" }} />  
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