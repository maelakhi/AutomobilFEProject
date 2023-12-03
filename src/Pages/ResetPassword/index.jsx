// import React from 'react'
import Layout from '../Layout'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import './ResetPassword.css'
import { useState } from 'react'
import Input from '../../Components/Input'
import { Link } from 'react-router-dom'
import { Stack } from '@mui/material'

const ResetPassword = () => {
    const [email, setEmail] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email)
    }


    return (
      <>
        <Layout>
            <form className='container_login' onSubmit={handleSubmit}>
                    <div className='container_form'>
                        <div className=''>
                            <Typography variant="h4" component="h3">
                                Reset Password
                            </Typography>
                            <Typography variant='h6' component='h4'>
                                Send OTP Code to your email address
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
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'end'}}>
                            <Stack direction="row" spacing={2}>
                                <Button
                                    component={Link} to="/Login"
                                    variant='outlined'
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
                        </div>
                    </div>       
           </form>
        </Layout>    
      </>
  )
}

export default ResetPassword