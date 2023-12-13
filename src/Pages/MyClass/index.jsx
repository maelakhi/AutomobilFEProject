import { useEffect, useState } from "react"
import { Box, Card, CardContent, CardMedia, Container, Divider, List, ListItem, Typography } from "@mui/material"
import './MyClass.css'
import { MyClass } from '../../data';
import Footer from "../../components/Footer";

const MyClassPage = () => {
    const [data, setData] = useState([])
    useEffect(() => {
      setData(MyClass)
    
    //   return () => {
    //     second
    //   }
    }, [])
    
    return (
      <> 
        <Container maxWidth='lg' sx={{ mt: '5em', padding: '0px !important', minHeight: '85vh' }}>
            <List sx={{ width: '100%'   }}>
                {data && data.map((value, i) => {
                    return (
                        <Box sx={{ width: '100%', ":hover": { bgcolor: 'lightgray' }, cursor: 'pointer' }} key={i}>
                            <ListItem alignItems="flex-start" width='100%' >
                                <Card sx={{ display: 'flex', width: '100%', boxShadow: 'none', bgcolor: 'transparent' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 151 }}
                                        image={value.image}
                                        alt="Live from space album cover"
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography variant="caption" color="text.secondary" component="div">
                                                {value.typeCar}
                                            </Typography>
                                            <Typography component="div" variant="h5">
                                                {value.title}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                Schedule : {value.schedule}
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