import { Grid, Card, CardActions, CardContent, CardMedia, Checkbox, Container, Divider, Button, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, Paper, Stack, Typography, useMediaQuery } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from "react";
import { dataMobil } from '../../data';
import ModalLayout from "../../components/ModalLayout";
import ModalPayment from "./ModalPayment";

const Checkout = () => {
  const [dataCar, setDataCar] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [modalPayment, setModalPayment] = useState(false);

  useEffect(() => {
    setDataCar(dataMobil);
  }, []);

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
    const updatedData = dataCar.filter((item) => item.id !== deleteItemId);
    setDataCar(updatedData);
    setSelectedItems((prevSelectedItems) => prevSelectedItems.filter((item) => item !== deleteItemId));
    handleCloseDeleteModal();
  };

  const totalSelectedPrice = dataCar.reduce((total, item) => {
    if (selectedItems.includes(item.id)) {
      return total + parseFloat(item.price);
    }
    return total;
  }, 0);

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleModalPayment = () => {
    setModalPayment(prev => !prev);
  }

  return (
    <Container maxWidth="xl" sx={{ mt: '60px', padding: '0px !important' }}>
      {modalPayment && (<ModalPayment open={modalPayment} handleClose={handleModalPayment} />)}
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
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary="Pilih Semua"
                        />
                    </ListItemButton>
                </ListItem>
                <Divider />
                {dataCar.map((value) => (
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
                                        image={value.image}
                                        sx={{objectFit: "contain"}}
                                        />
                                        <CardContent>
                                            <Stack>
                                                <Typography variant="body1">
                                                {value.typeCar}
                                                </Typography>
                                                <Typography noWrap variant="h6">
                                                {value.title}
                                                </Typography>
                                                <Typography noWrap>
                                                Schedule: Wednesday, 27 July 2022
                                                </Typography>
                                                <Typography variant="h6" sx={{ color: '#790B0A'}}>
                                                IDR {value.price}.00
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
  );
}

export default Checkout;
