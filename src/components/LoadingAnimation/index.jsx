import { Backdrop, CircularProgress } from '@mui/material'

const LoadingAnimation = () => {
  return (
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        // onClick={handleClose}
    >
        <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default LoadingAnimation