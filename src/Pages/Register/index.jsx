import React from 'react'
import Layout from '../Layout'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import './Register.css'
import { useState } from 'react'
import Input from '../../Components/Input'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { Container, Paper, Stack } from '@mui/material'


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    ...theme.typography.body2,
    margin: theme.spacing(2),
    elevation: 0,
    
}));

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
            <form className='container_register' onSubmit={handleSubmit}>
                <Container maxWidth='sm'>
                    <Stack spacing={6}>
                        <Item elevation={0}>
                            <Typography variant="h3" component="h2" color="#790B0A">
                                Lets Join our couse!
                            </Typography>
                            <Typography variant='h5' component='h3' color="#4F4F4F">
                                Please register first
                            </Typography>
                        </Item>
                        <Item elevation={0}>
                            <div className='input_spacing_register' color="green">
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
                        </Item>
                        <Item elevation={0}>
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
                        </Item>
                    </Stack>
                </Container>
           </form>
        </Layout>    
      </>
  )
}

export default Register