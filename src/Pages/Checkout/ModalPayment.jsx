import PropTypes from 'prop-types';
import { Box, Button, Card, CardActions, CardContent, CircularProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import ModalLayout from '../../components/ModalLayout';
import { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import ServiceCheckout from '../../Service/ServiceCheckout';

const ModalPayment = (props) => {
  const authCtx = useAuth();
  const { open, handleClose, handlePayment } = props;
  const [isLoading, setIsLoading] = useState(false)
  const [listPayment, setListPayment] = useState(false)
  const [message, setMessage] = useState();
  const [selectPayment, setSelectPayment] = useState();

  useEffect(() => {
    setIsLoading(true);
    ServiceCheckout.GetPaymentMethod(authCtx.token)
        .then((response) => {
          if (response.status == 200) {
              setListPayment(response.data)
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
            {!isLoading && listPayment && listPayment.map((value, i) => {
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
                      <img src={value.imagePath} alt='' />
                    </ListItemIcon>
                    <ListItemText primary={value.name} />
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

ModalPayment.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  handlePayment: PropTypes.func
}

export default ModalPayment