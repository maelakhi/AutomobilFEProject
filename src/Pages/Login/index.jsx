// import React from 'react'
import Layout from '../Layout'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import './Login.css'
import { useState } from 'react'
import Input from '../../Components/Input'
import { Link } from 'react-router-dom'

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
                    <div className='container_form'>
                        <div className=''>
                            <Typography variant="h3" component="h2">
                                Welcome Back!
                            </Typography>
                            <Typography variant='h5' component='h3'>
                                Please login first
                            </Typography>
                        </div>
                        <div className='container_input'>
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
                        <div>
                            <Typography variant="caption" component="p">
                                Forgot Password ?{' '}
                                <Link
                                    className='btn-link'
                                    to={'/'}
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
                                    to={'/'}
                                >
                                    Sign Up here
                                </Link>
                                </Typography>
                            </div>
                        </div>
                </div>       
                
           </form>
        </Layout>    
      </>
  )
}

export default Login