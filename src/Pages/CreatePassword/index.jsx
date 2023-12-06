// import React from 'react'
import Layout from '../Layout'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import './CreatePassword.css'
import { useState } from 'react'
import Input from '../../Components/Input'
import { Link } from 'react-router-dom'
import { Container, Stack, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ValidationConfirmPassword } from '../../Utils/Validation'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    ...theme.typography.body2,
    margin: theme.spacing(2),
    elevation: 0,
    
}));

const CreatePassword = () => {
    const [newPassword, setPassword] = useState('');
    const [confirmNewPassword, setNewPassword] = useState('');
    const [validation, setValidation] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationPass = ValidationConfirmPassword(newPassword, confirmNewPassword)
        setValidation(validationPass)
        if (!validationPass.value) {
            console.log('API')
        } 
    }

    return (
      <>
        <form method='POST' className='container_createPassword' onSubmit={handleSubmit}>
            <Container maxWidth="sm">
                <Stack spacing={6}>
                    <Item elevation={0}>
                        <Typography variant="h4" component="h3">
                            Create Password
                        </Typography>
                    </Item> 
                    <Item elevation={0}>
                        <div className='input_spacing_createPassword'>
                            <Input 
                                type='password'
                                placeholder='New Password'
                                radiusBorder="md"
                                handleState={setPassword}
                                required={true}
                            />
                            <Input 
                                placeholder='Confirm New Password'
                                radiusBorder="md"
                                handleState={setNewPassword}
                                required={true}
                                error={!validation?.value}
                                messageValidation={!validation?.value ? validation?.message : null}
                            />
                        </div>
                    </Item>
                    <Item elevation={0}>
                        <Stack direction="row" spacing={2} justifyContent='end'>
                            <Button
                                component={Link} to="/Login"
                                variant='outlined'
                                color='success'
                            >
                                Cancel
                            </Button>
                            <Button
                                // component={Link} to="/"
                                variant='contained'
                                type='submit'
                                color='success'
                            >
                                Submit
                            </Button>
                        </Stack>    
                    </Item>
                </Stack>
            </Container>
        </form>  
      </>
  )
}

export default CreatePassword