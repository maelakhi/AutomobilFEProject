import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import './Register.css'
import { useEffect, useState } from 'react'
import Input from '../../Components/Input'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { Container, Paper, Stack } from '@mui/material'
import { ValidatePassword, ValidationConfirmPassword } from '../../Utils/Validation'
import Swal from 'sweetalert2';
import { ServiceLogin } from '../../Service/ServiceUser'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    ...theme.typography.body2,
    margin: theme.spacing(2),
    elevation: 0,
}));

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [valPass, setValPass] = useState({})
    const [valPassCon, setValPassCon] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        // To check the password strength and password is the same  
        if (valPass.value && valPassCon.value) {
            const data = { email : email, name: name, password: password}
            ServiceLogin.Register(data)
                .then((response) => {
                    if (response.status == 200) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${response.data.message}`,
                            showConfirmButton: false,
                            timer: 1000
                        });
                    } else {
                        Swal.fire({
                            position: "center",
                            icon: "warning",
                            title: `${response.data.message}`,
                            showConfirmButton: false,
                            timer: 1000
                        });
                    }
                })
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${valPass.value ? valPassCon.message : valPass.message}`,
                showConfirmButton: false,
                timer: 1000
            });
        }
       
    }

    useEffect(() => {
        if (password != "" ) {
            const validatePass = ValidatePassword(password)
            setValPass(validatePass)
        }
    }, [password]);

    useEffect(() => {
        if (confirmPassword != "" ) {
            const validatePass = ValidationConfirmPassword(password,confirmPassword)
            setValPassCon(validatePass)
        }
    }, [confirmPassword]);

    return (
      <>
        <form method='POST' className='container_register' onSubmit={handleSubmit} style={{ margin: "40px 0 0 0" }}>
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
                                required={true}
                            />
                            <Input
                                type='email'
                                placeholder='Email' 
                                name='email'
                                handleState={setEmail}
                                radiusBorder="md"
                                required={true}
                            />
                            <Input
                                type='password'
                                placeholder='Password' 
                                name='password'
                                handleState={setPassword}
                                radiusBorder="md"
                                error={!valPass?.value}
                                messageValidation={!valPass?.value? valPass?.message : null}
                                required={true}
                            />
                            <Input
                                type='password'
                                placeholder='Confirm Password' 
                                name='confirmPassword'
                                handleState={setConfirmPassword}
                                radiusBorder="md"
                                error={!valPassCon?.value}
                                messageValidation={!valPassCon?.value ? valPassCon?.message : null}
                                required={true}
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
      </>
  )
}

export default Register