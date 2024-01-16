import PropTypes from 'prop-types';
import { Box, Modal } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { sm:400, xs: 300 },
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

ModalLayout.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  children: PropTypes.element
}

export default ModalLayout