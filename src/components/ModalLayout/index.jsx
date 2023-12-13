import { Box, Modal } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius:'10px',
  boxShadow: 24
};


const ModalLayout = (props) => {
    const { open, handleClose, children } = props;
  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
    <Box sx={style}>
        {children}
    </Box>
    </Modal>
  )
}

export default ModalLayout