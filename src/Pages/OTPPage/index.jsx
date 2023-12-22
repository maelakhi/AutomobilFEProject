// import React from 'react'
import Typography from '@mui/material/Typography'
import './OTPClass.css'
import { useState } from 'react'
import Input from '../../Components/Input'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Paper, Stack, Button} from '@mui/material'
import { styled } from '@mui/material/styles'
import ServiceUser from '../../Service/ServiceUser'
import Swal from 'sweetalert2'
import LoadingAnimation from '../../components/LoadingAnimation'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    ...theme.typography.body2,
    margin: theme.spacing(2),
    elevation: 0,
    
}));

const OTPPage = () => {
    const [otpCode, setOtpCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        ServiceUser.VerifieOTPCode(otpCode)
            .then((response) => {
                console.log(response)
                if (response.status == 200) {
                    setIsLoading(false)
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${response.data.message}`,
                        showConfirmButton: false,
                        timer: 1000
                    });
                    setTimeout(() => {
                        navigate(`/createpassword/${otpCode}`)
                    }, 1010);
                } else {
                    setIsLoading(false)
                    Swal.fire({
                            position: "center",
                            icon: "warning",
                            title: `${response.data.message}`,
                            showConfirmButton: false,
                            timer: 1000
                        });
                }
            })
    }


    return (
        <>
            {isLoading && (<LoadingAnimation />)}
        <form method='POST' className='container_otp' onSubmit={handleSubmit}>
            <Container maxWidth='sm'>
                <Stack spacing={6}>
                    <Item elevation={0}>
                        <Typography variant="h4" component="h3">
                            OTP Code
                        </Typography>
                        <Typography variant='h6' component='h4'>
                            Verified Code to Reset Password
                        </Typography>
                    </Item>
                    <Item elevation={0}>
                        <Input 
                            name='OTPcode'
                            type='text'
                            placeholder='OTP Code Here'
                            handleState={setOtpCode}
                            radiusBorder="md"
                            required={true}
                        />
                    </Item>
                    <Item elevation={0}>
                        <Stack direction="row" spacing={2} justifyContent='end'>
                        <Button
                            component={Link} to="/resetPassword"
                            variant='outlined'
                            color='success'
                        >
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            variant='contained'
                            color='success'
                        >
                            Confirm
                        </Button>                                
                    </Stack>
                    </Item>
                </Stack>
            </Container>
        </form>  
      </>
  )
}

export default OTPPage