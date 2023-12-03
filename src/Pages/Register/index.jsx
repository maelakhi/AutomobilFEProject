import React from 'react'
import Layout from '../Layout'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import './Register.css'
import { useState } from 'react'
import Input from '../../Components/Input'
import { Link } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password, confirmPassword, name)
    }

    return (
      <>
        <Layout>
            <form className='container_login' onSubmit={handleSubmit}>
                    <div className='container_form'>
                        <div>
                            <Typography variant="h3" component="h2">
                                Lets Join our couse!
                            </Typography>
                            <Typography variant='h5' component='h3'>
                                Please register first
                            </Typography>
                        </div>
                        <div className='container_input'>
                            <Input
                                type='name'
                                placeholder='Name' 
                                name='name'
                                handleState={setName}
                                radiusBorder="md"
                            />
                            <Input
                                type='email'
                                placeholder='Email' 
                                name='email'
                                onChange={setEmail}
                                radiusBorder="md"
                            />
                            <Input
                                type='password'
                                placeholder='Password' 
                                name='password'
                                onChange={setPassword}
                                radiusBorder="md"
                            />
                            <Input
                               type='password'
                                placeholder='Confirm Password' 
                                name='confirmPassword'
                                onChange={setConfirmPassword}
                                radiusBorder="md"
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'end'}}>
                            <Button
                                variant='contained'
                                type='submit'
                                color='success'
                            >
                                Sign up
                            </Button>
                        </div>
                        <Typography variant="caption" component="p">
                            Have account? {' '}
                            <Link
                                className='btn-link'
                                to={'/login'}
                            >
                                Log In here
                            </Link>
                        </Typography>

                </div>       
                
           </form>
        </Layout>    
      </>
  )
}

export default Register