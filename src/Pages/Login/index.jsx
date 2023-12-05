// import React from 'react'
import Layout from '../Layout'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import './Login.css'
import { useState } from 'react'
import Input from '../../Components/Input'
import { Link } from 'react-router-dom'
import { Container, Paper, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    ...theme.typography.body2,
    margin: theme.spacing(2),
    elevation: 0,
    
}));

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password)
    }


    return (
      <>
        <Layout>
            <form className='container_login' onSubmit={handleSubmit}>
                <Container maxWidth='sm'>
                    <Stack spacing={6}>
                        <Item elevation={0}>
                            <Typography variant="h3" component="h2" color="#790B0A">
                                Welcome Back!
                            </Typography>
                            <br />
                            <Typography variant='h5' component='h3' color="#4F4F4F">
                                Please login first
                            </Typography>
                        </Item>
                        <Item elevation={0}>
                            <div className='input_spacing_login'>
                                <Input 
                                    name='email'
                                    type='email'
                                    placeholder='Email'
                                    handleState={setEmail}
                                    radiusBorder="md"
                                />
                                <Input 
                                    type='password'
                                    placeholder='Password' 
                                    name='password'
                                    handleState={setPassword}
                                    radiusBorder="md"
                                />
                            </div>
                        </Item>
                        <Item elevation={0}>
                            <Typography variant="caption" component="p">
                                Forgot Password ?{' '}
                                <Link
                                    className='btn-link'
                                    to={'/resetpassword'}
                                >
                                    Click Here
                                </Link>
                            </Typography>
                            <div style={{ display: 'flex', justifyContent: 'end'}}>
                                <Button
                                    variant='contained'
                                    type='submit'
                                    color='success'
                                >
                                    Login
                                </Button>
                            </div>
                            <div className='text-signup'>
                                <Typography variant="caption" component="p">
                                    Dont have account? {' '}
                                    <Link
                                    className='btn-link'
                                    to={'/register'}
                                >
                                    Sign Up here
                                </Link>
                                </Typography>
                            </div>
                        </Item>
                    </Stack>
                </Container>
            </form>
        </Layout>    
      </>
  )
}

export default Login