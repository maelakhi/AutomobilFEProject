import Layout from '../Layout'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import './Register.css'
import { useState } from 'react'
import Input from '../../Components/Input'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { Container, Paper, Stack } from '@mui/material'
import { ValidatePassword, ValidationConfirmPassword } from '../../Utils/Validation'


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
    const [validation, setValidation] = useState({})
    const [validatePassword, setValidatePassword] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // To check the password strength
        const validatePass = ValidatePassword(password)
        setValidatePassword(validatePass)

        // To validate the password is the same        
        const validationPass = ValidationConfirmPassword(password, confirmPassword)
        setValidation(validationPass)

        if (!validationPass.value) {
            console.log('API')
        } 
    }

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
                                error={!validatePassword?.value}
                                messageValidation={!validatePassword?.value? validatePassword?.message : null}
                                required={true}
                            />
                            <Input
                                type='password'
                                placeholder='Confirm Password' 
                                name='confirmPassword'
                                handleState={setConfirmPassword}
                                radiusBorder="md"
                                error={!validation?.value}
                                messageValidation={!validation?.value ? validation?.message : null}
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