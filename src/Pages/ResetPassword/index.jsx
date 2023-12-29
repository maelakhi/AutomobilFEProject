// import React from 'react'
import Layout from '../Layout'
import Typography from '@mui/material/Typography'
import './ResetPassword.css'
import { useState } from 'react'
import Input from '../../Components/Input'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Paper, Stack, Button} from '@mui/material'
import { styled } from '@mui/material/styles'
import ServiceUser from '../../Service/ServiceUser'
import Swal from 'sweetalert2'
import LoadingAnimation from '../../components/LoadingAnimation'
import useLoading from '../../Hooks/useLoading'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    ...theme.typography.body2,
    margin: theme.spacing(2),
    elevation: 0,
    
}));

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const { isLoading, RunLoading, EndLoading } = useLoading();
    const navigate = useNavigate();



    const handleSubmit = (e) => {
        e.preventDefault();
        RunLoading();
        ServiceUser.ResetPassword(email)
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
                setTimeout(() => {
                    navigate('/otppage')
                }, 1010);
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
    }


    return (
        <>
        {isLoading && (<LoadingAnimation />)}
        <form method='POST' className='container_resetPassword' onSubmit={handleSubmit}>
            <Container maxWidth='sm'>
                <Stack spacing={6}>
                    <Item elevation={0}>
                        <Typography variant="h4" component="h3">
                            Reset Password
                        </Typography>
                        <Typography variant='h6' component='h4'>
                            Send Link reset password to your email address
                        </Typography>
                    </Item>
                    <Item elevation={0}>
                        <Input 
                            name='email'
                            type='email'
                            placeholder='Email'
                            handleState={setEmail}
                            radiusBorder="md"
                            required={true}
                        />
                    </Item>
                    <Item elevation={0}>
                        <Stack direction="row" spacing={2} justifyContent='end'>
                        <Button
                            component={Link} to="/Login"
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

export default ResetPassword