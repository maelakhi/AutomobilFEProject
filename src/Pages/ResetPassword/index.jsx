// import React from 'react'
import Layout from '../Layout'
import Typography from '@mui/material/Typography'
import './ResetPassword.css'
import { useState } from 'react'
import Input from '../../Components/Input'
import { Link } from 'react-router-dom'
import { Container, Paper, Stack, Button} from '@mui/material'
import { styled } from '@mui/material/styles'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    ...theme.typography.body2,
    margin: theme.spacing(2),
    elevation: 0,
    
}));

const ResetPassword = () => {
    const [email, setEmail] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email)
    }


    return (
      <>
        <Layout>
            <form className='container_resetPassword' onSubmit={handleSubmit}>
                <Container maxWidth='sm'>
                    <Stack spacing={6}>
                        <Item elevation={0}>
                            <Typography variant="h4" component="h3">
                                Reset Password
                            </Typography>
                            <Typography variant='h6' component='h4'>
                                Send OTP Code to your email address
                            </Typography>
                        </Item>
                        <Item elevation={0}>
                            <Input 
                                name='email'
                                type='email'
                                placeholder='Email'
                                handleState={setEmail}
                                radiusBorder="md"
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
                                component={Link} to="/createpassword"
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
        </Layout>    
      </>
  )
}

export default ResetPassword