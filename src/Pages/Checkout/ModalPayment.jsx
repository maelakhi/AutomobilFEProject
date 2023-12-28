import { Box, Button, Card, CardActions, CardContent, CircularProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import ModalLayout from '../../components/ModalLayout';
import gopay from '../../assets/Image/GOPAY.png';
import ovo from '../../assets/Image/OVO.png';
import dana from '../../assets/Image/dana.png';
import mandiri from '../../assets/Image/Mandiri.png';
import bca from '../../assets/Image/BCA.png';
import bni from '../../assets/Image/BNI.png';
import { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import ServiceCheckout from '../../Service/ServiceCheckout';

const ListPayment = [
  {id: 1, image: gopay, text:'GOPAY' },
  {id: 2, image: ovo, text:'OVO' },
  {id: 3, image: dana, text:'DANA' },
  {id: 4, image: mandiri, text:'MANDIRI' },
  {id: 5, image: bca, text:'BCA' },
  {id: 6, image: bni, text:'BNI' },
]

const ModalPayment = (props) => {
  const authCtx = useAuth();
  const { open, handleClose, handlePayment } = props;
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState();
  const [selectPayment, setSelectPayment] = useState();

  useEffect(() => {
    setIsLoading(true);
    ServiceCheckout.GetPaymentMethod(authCtx.token)
        .then((response) => {
          if (response.status == 200) {
              setIsLoading(false)
            } else {
              setIsLoading(false)
              setMessage(response.data.message)
            }
        }).catch(err => {
          setIsLoading(false)
          console.log(err.response)
        })
  }, [])

  const handleSelect = (value) => {
    setSelectPayment(value);
  }

  const handlePaymentOrder = () => {
    handlePayment(selectPayment)
  }
  
  return (
    <ModalLayout open={open} handleClose={handleClose}>
      <Card sx={{ width: '100%', boxShadow: 'none', p:2, m:'0px !important' }}>
          <Typography sx={{ fontSize: '1.5rem' }} color="black" textAlign='center' gutterBottom>
            Select Payment Method
          </Typography>
        <CardContent>
          <List>
            {isLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {message ? message : <CircularProgress />}
              </Box>
            )}
            {!isLoading && ListPayment && ListPayment.map((value, i) => {
              return (
                <ListItem
                  disablePadding
                  key={i}
                  onClick={handleSelect.bind(null, value.id)}
                  sx={{
                    backgroundColor: selectPayment && selectPayment == value.id ? 'lightgray' :'transparent'
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <img src={value.image} alt='' />
                    </ListItemIcon>
                    <ListItemText primary={value.text} />
                  </ListItemButton>
                </ListItem>
              )
            })}
            
          </List>
        </CardContent>
        <CardActions sx={{ width: '100%' }}>
          <Button
            variant="outlined" 
            color="success"
            onClick={handleClose}
            sx={{ width: '100%' }}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handlePaymentOrder}
            sx={{ width: '100%' }}
            disabled={isLoading || selectPayment == undefined}
          >
            Pay Now
          </Button>
        </CardActions>
      </Card>      
    </ModalLayout>
  )
}

export default ModalPayment