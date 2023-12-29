import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import './CreatePassword.css'
import { useState } from 'react'
import Input from '../../Components/Input'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Container, Stack, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ValidatePassword, ValidationConfirmPassword } from '../../Utils/Validation'
import ServiceUser from '../../Service/ServiceUser'
import Swal from 'sweetalert2'
import LoadingAnimation from '../../components/LoadingAnimation'
import useLoading from '../../Hooks/useLoading'
import useValidation from '../../Hooks/useValidation'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    ...theme.typography.body2,
    margin: theme.spacing(2),
    elevation: 0,
    
}));

const CreatePassword = () => {
    const { otpCode } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setNewPassword] = useState('');
    const { isLoading, RunLoading, EndLoading } = useLoading();
    const { validation : valPass } = useValidation(password,undefined,ValidatePassword);
    const { validation : valPassCon } = useValidation(confirmPassword, password,ValidationConfirmPassword);
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        RunLoading();
        if (valPass.value && valPassCon.value) {
            const data = {
                dtOkey: {
                    otpCode: otpCode
                },
                password: password,
                confirmPassword: confirmPassword
            }
              ServiceUser.CreateNewPassword(data)
                .then((response) => {
                    console.log(response)
                    if (response.status == 200) {
                        EndLoading();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${response.data.message}`,
                            showConfirmButton: false,
                            timer: 1000
                        });
                        setTimeout(() => {
                           navigate("/login")
                        }, 1001);
                    } else {
                        EndLoading();
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
            EndLoading();
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${valPass.value ? valPassCon.message : valPass.message}`,
                showConfirmButton: false,
                timer: 1000
            });
        }
    }

    return (
        <>
            {isLoading && (<LoadingAnimation />)}
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
                                error={!valPass?.value}
                                messageValidation={!valPass?.value ? valPass.message : null}
                                required={true} 
                            />
                            <Input 
                                type="password"
                                placeholder='Confirm New Password'
                                radiusBorder="md"
                                handleState={setNewPassword}
                                error={!valPassCon?.value}
                                messageValidation={!valPassCon?.value ? valPassCon?.message : null}
                                required={true}
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