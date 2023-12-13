import { Button, Card, CardActions, CardContent, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import ModalLayout from '../../components/ModalLayout';
import gopay from '../../assets/Image/GOPAY.png';
import ovo from '../../assets/Image/OVO.png';
import dana from '../../assets/Image/dana.png';
import mandiri from '../../assets/Image/Mandiri.png';
import bca from '../../assets/Image/BCA.png';
import bni from '../../assets/Image/BNI.png';

const ListPayment = [
  {id: 1, image: gopay, text:'GOPAY' },
  {id: 2, image: ovo, text:'OVO' },
  {id: 3, image: dana, text:'DANA' },
  {id: 4, image: mandiri, text:'MANDIRI' },
  {id: 5, image: bca, text:'BCA' },
  {id: 6, image: bni, text:'BNI' },
]

const ModalPayment = (props) => {
    const { open, handleClose } = props;
  return (
    <ModalLayout open={open} handleClose={handleClose}>
      <Card sx={{ width: '100%', boxShadow: 'none', p:2, m:'0px !important' }}>
          <Typography sx={{ fontSize: '1.5rem' }} color="black" textAlign='center' gutterBottom>
            Select Payment Method
          </Typography>
        <CardContent>
          <List>
            {ListPayment && ListPayment.map((value, i) => {
              return (
                <ListItem disablePadding key={i}>
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
          <Button variant="outlined" color="success" onClick={handleClose} sx={{ width: '100%'}}>
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleClose} sx={{ width: '100%'}}>
            Pay Now
          </Button>
        </CardActions>
      </Card>      
    </ModalLayout>
  )
}

export default ModalPayment