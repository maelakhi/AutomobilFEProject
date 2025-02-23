// import React from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import './Login.css'
import { useState, useEffect } from 'react'
import Input from '../../Components/Input'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Paper, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ValidatePassword } from '../../Utils/Validation'
import ServiceUser from '../../Service/ServiceUser'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { role_name, token_name } from '../../DataStatic';
import useAuth from '../../Hooks/useAuth'
import useLoading from '../../Hooks/useLoading'
import LoadingAnimation from '../../components/LoadingAnimation';
import useValidation from '../../Hooks/useValidation'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    ...theme.typography.body2,
    margin: theme.spacing(2),
    elevation: 0,
}));

const Login = () => {
    const navigate = useNavigate()
    const authCtx = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isLoading, RunLoading, EndLoading } = useLoading();
    const { validation } = useValidation(password,undefined,ValidatePassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validation.value) {
            RunLoading();
            ServiceUser.Login(email, password)
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
                    var expiresTime = new Date(new Date().getTime() + 15 * 60 * 1000);
                    setTimeout(() => {
                        Cookies.set(token_name, response.data.data.token, { expires: expiresTime })
                        Cookies.set(role_name, response.data.data.role, { expires: expiresTime })
                        authCtx.setLogIn(response.data.data.token, response.data.data.role)
                        const role = response.data.data.role;
                        if (role.toLowerCase() == "admin") {
                            navigate('/admin')
                        } else {
                            navigate('/')
                        }
                    }, 1010);
                } else {
                    EndLoading();
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: `${response.data.message}`,
                        showConfirmButton: false,
                        timer: 1000
                    });
                }
            }).catch((error) => {
                EndLoading();
                Swal.fire({
                        position: "center",
                        icon: "error",
                        title: `${error.message}`,
                        showConfirmButton: false,
                        timer: 1000
                    });
            })
        } else {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: `Password ${validation.message}`,
                showConfirmButton: false,
                timer: 1500
            });
        }

    }

    return (
        <>
        {isLoading && (<LoadingAnimation/>)}
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