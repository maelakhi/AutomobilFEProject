// import React from 'react'
import Layout from '../Layout'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import './CreatePassword.css'
import { useState } from 'react'
import Input from '../../Components/Input'
import { Link } from 'react-router-dom'
import { Stack } from '@mui/material'

const CreatePassword = () => {
    const [newPassword, setPassword] = useState('');
    const [confirmNewPassword, setNewPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newPassword, confirmNewPassword)
    }


    return (
      <>
        <Layout>
            <form className='container_login' onSubmit={handleSubmit}>
                    <div className='container_form'>
                        <div className=''>
                            <Typography variant="h4" component="h3">
                                Create Password
                            </Typography>
                        </div>
                        <div className='container_input'>
                            <Input 
                                type='password'
                                placeholder='New Password'
                                handleState={setPassword}
                                radiusBorder="md"
                            />
                            <Input 
                                placeholder='Confirm New Password'
                                handleState={setNewPassword}
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
                                    component={Link} to="/"
                                    variant='contained'
                                    type='submit'
                                    color='success'
                                >
                                    Submit
                                </Button>                                
                            </Stack>
                        </div>
                    </div>       
           </form>
        </Layout>    
      </>
  )
}

export default CreatePassword