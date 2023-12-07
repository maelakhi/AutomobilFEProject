// import React from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import './Login.css'
import { useContext, useState } from 'react'
import Input from '../../Components/Input'
import { Link } from 'react-router-dom'
import { Container, Paper, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ValidatePassword } from '../../Utils/Validation'
import authContext from '../../Context/authContext'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    ...theme.typography.body2,
    margin: theme.spacing(2),
    elevation: 0,
}));

const Login = () => {
    const authCtx = useContext(authContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validation, setValidation] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationPass = ValidatePassword(password)
        setValidation(validationPass)
        authCtx.setLogIn({type: "LOGIN", value: false})
    }


    return (
      <>
        <form method='POST' className='container_login' onSubmit={handleSubmit}>
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
                                required={true}  
                            />
                            <Input 
                                name='password'
                                type='password'
                                placeholder='Password' 
                                handleState={setPassword}
                                radiusBorder="md"
                                error={!validation?.value}
                                messageValidation={!validation?.value ? validation?.message : null}
                                required={true}                            
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
      </>
  )
}

export default Login