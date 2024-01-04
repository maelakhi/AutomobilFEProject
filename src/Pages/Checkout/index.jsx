import { Grid, Card, CardActions, CardContent, CardMedia, Checkbox, Container, Divider, Button, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, Paper, Stack, Typography, useMediaQuery } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from "react";
import ModalPayment from "./ModalPayment";
import ServiceCheckout from "../../Service/ServiceCheckout";
import LoadingAnimation from "../../components/LoadingAnimation";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useLoading from "../../Hooks/useLoading";
import useFlag from "../../Hooks/useFlag";
import { useNavigate } from "react-router-dom";
import { FormatDate } from "../../Utils/FormatDate";

const Checkout = () => {
  const authCtx = useAuth();
  const [dataCar, setDataCar] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [modalPayment, setModalPayment] = useState(false);
  const { isLoading, RunLoading, EndLoading } = useLoading();
  const { flag, IsFlag } = useFlag();
  const navigate = useNavigate();

  useEffect(() => {
    RunLoading();
    ServiceCheckout.GetItems(authCtx.token)
    .then((orderDetails) => {
        setDataCar(orderDetails.data)
    })
    .then((res)=> EndLoading())
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [flag])


  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(id)) {
        return prevSelectedItems.filter((item) => item !== id);
      } else {
        return [...prevSelectedItems, id];  
      }
    });
  };

  const handleSelectAllChange = () => {
    if (selectedItems.length === dataCar.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(dataCar.map((item) => item.id));
    }
  };

  const handleOpenDeleteModal = (id) => {
    setDeleteItemId(id);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteItemId(null);
  };

  const handleDelete = () => {
    RunLoading();
    ServiceCheckout.DeleteItem(authCtx.token, deleteItemId)
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
        IsFlag();
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
  })
    handleCloseDeleteModal();
  };

  const totalSelectedPrice = dataCar ? (dataCar?.reduce((total, item) => {
      if (selectedItems.includes(item.id)) {
        return total + parseFloat(item.product.price);
      }
      return total;
    }, 0)) : (0)

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleModalPayment = () => {
    if (selectedItems.length <=  0) {
      Swal.fire({
          position: "center",
          icon: "warning",
          title: "Select Items First",
          showConfirmButton: false,
          timer: 1000
      });
    } else {
      setModalPayment(prev => !prev);
    }
  }

  const handlePayment = (idPaymentMethod) => {
    setModalPayment(false);
    RunLoading();
    ServiceCheckout.CheckOutInvoice(authCtx.token,idPaymentMethod, selectedItems)
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
          IsFlag();
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
    <Container maxWidth="xl" sx={{ mt: '60px', padding: '0px !important' }}>
        {modalPayment && (
          <ModalPayment
            open={modalPayment}
            handleClose={handleModalPayment}
            selectedItems={selectedItems} 
            handlePayment={handlePayment}
          />
        )}
        <Paper sx={{ p: 1 }}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Checkbox
                            edge="start"
                            checked={selectedItems.length === dataCar.length}
                            onChange={handleSelectAllChange}
                            inputProps={{ 'aria-labelledby': 'select-all-checkbox' }}
                            className="custom-checkbox"
                            color="success"
                            disabled={dataCar?.length === 0}
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary="Pilih Semua"
                        />
                    </ListItemButton>
                </ListItem>
                <Divider />
                {dataCar.length == 0 && (<Typography variant="h5" textAlign="center">You have not made any purchases yet.</Typography>)}
                {dataCar && dataCar.map((value) => (
                    <ListItem key={value.id}>
                        <Card sx={{width: '100%', border: 'none', boxShadow: 'none', borderBottom: 1, borderColor: '#BDBDBD'}}>
                            <Grid container>
                                <Grid item md={0.5} sx={{display:'flex', justifyContent: 'center'}}>
                                    <Checkbox
                                    edge="start"
                                    checked={selectedItems.includes(value.id)}
                                    onChange={() => handleCheckboxChange(value.id)}
                                    inputProps={{ 'aria-labelledby': `label-${value.id}` }}
                                    className="custom-checkbox"
                                    color="success"
                                    />
                                </Grid>
                                <Grid item md={11} sx={{display: 'flex'}}>
                                    <Stack direction="row" spacing={2}>
                                        <CardMedia
                                        component="img"
                                        alt="Car Image"
                                        width='200'
                                        height='133.33'
                                        image={value.product.imagePath}
                                        sx={{objectFit: "contain"}}
                                        />
                                        <CardContent>
                                            <Stack>
                                                <Typography variant="body1">
                                                {value.typeCar}
                                                </Typography>
                                                <Typography noWrap variant="h6">
                                                {value.product.name}
                                                </Typography>
                                                <Typography noWrap>
                                                {FormatDate(value.dateSchedule)}
                                                </Typography>
                                                <Typography variant="h6" sx={{ color: '#790B0A'}}>
                                                IDR {value.product.price}.00
                                                </Typography>
                                            </Stack>
                                        </CardContent>
                                    </Stack>
                                </Grid>
                                <Grid item md={0.5} sx={{display: 'flex'}}>
                                    <CardActions>
                                    <IconButton onClick={() => handleOpenDeleteModal(value.id)} sx={{ color: '#EB5757' }}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                    </CardActions>
                                </Grid>
                            </Grid>
                        </Card>
                    </ListItem>
                ))}  
            </List>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">
                    Total Price: IDR {totalSelectedPrice.toFixed(3)}
                </Typography>
                  <Button
                    variant='contained'
                    color='success'
                    sx={{ width: isSmallScreen ? '100%' : 'auto' }}
                    onClick={handleModalPayment}
                  >
                    Pay Now
                </Button>
            </Stack>
        </Paper>

      {/* Delete Confirmation Modal */}
      <Modal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', p: 4, width: '300px' }}>
            <Typography variant="h6" id="delete-modal-title" sx={{ mb: 2 }}>
                Confirm Deletion
            </Typography>
            <Typography id="delete-modal-description">
                Are you sure you want to delete this item from your cart?
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button variant="outlined" color="success" onClick={handleCloseDeleteModal}>
                Cancel
                </Button>
                <Button variant="contained" color="success" onClick={handleDelete}>
                Delete
                </Button>
            </Stack>
        </Paper>
        </Modal>
    </Container>
  </>
  );
}

export default Checkout;
