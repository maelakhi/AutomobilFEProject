import { Box, Button, Typography } from '@mui/material'
import InputField from '../../../Components/Input'
import { useEffect, useState } from 'react';
import useLoading from '../../../Hooks/useLoading';
import ServiceAdminProduct from '../../../Service/Admin/ServiceAdminProduct';
import SelectInput from '../../../components/SelectInput'
import LoadingAnimation from '../../../components/LoadingAnimation';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import useFlag from '../../../Hooks/useFlag';
import ServiceAdminUser from '../../../Service/Admin/ServiceAdminUser';
import useValidation from '../../../Hooks/useValidation';
import { ValidatePassword, ValidationConfirmPassword } from '../../../Utils/Validation';

const EditPageUser = () => {
    const navigate = useNavigate();
    const authCtx = useAuth();
    const { id } = useParams();
    const [toggle, setToggle] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // const [image, setImage] = useState(0);
    // const [imageFile, setImageFile] = useState([]);
    const [roleUser, setRoleUser] = useState(0);
    const userOption = [
        { value: 'user', label: "USER" },
        { value: 'admin', label: "ADMIN" }
    ];
    const { isLoading, RunLoading, EndLoading } = useLoading();
    const { validation : valPass } = useValidation(password, undefined, ValidatePassword);
    const { validation : valPassCon } = useValidation(confirmPassword, password,ValidationConfirmPassword);
    const { IsFlag, flag } = useFlag();

    useEffect(() => {
        RunLoading();
        ServiceAdminUser.GetDataByIdUser(authCtx.token, id)
        .then((dataUser) => {
            console.log(dataUser.data)
            setName(dataUser.data?.name);
            setEmail(dataUser.data?.email);
            setRoleUser(dataUser.data?.role);
            // setImage(dataProduct.value.data?.imagePath)
            EndLoading();
        })
    }, [id, flag])

    // const handleInputImage = (e) => {
    //     setImageFile(e.target.files[0])
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //         if (reader.readyState === 2) {
    //             setImage(reader.result);
    //         }
    //     };
    //     reader.readAsDataURL(e.target.files[0]);
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        const sendData = {
            id: id,
            email: email,
            name: name,
            password: password,
            confirmPassword: confirmPassword,
            role: roleUser
        }
        RunLoading();
        ServiceAdminUser.EditUser(authCtx.token, sendData)
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
                        IsFlag();
                        // setTimeout(() => {
                        //     navigate('/admin/product')
                        // }, 1100);
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
            }).catch(err => console.log(err.response))
    }

    return (
        <>
        {isLoading && (<LoadingAnimation />)}
        <Typography variant='h6' sx={{ padding: "2% 0", fontWeight: "600    " }}>
            Form Edit Product 
            </Typography>
        <form method='POST' onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
           <Box>        
                <Typography variant='subtitle1'>User Name<span style={{ color: 'red'  }}>*</span></Typography>
                <InputField
                    type='text'
                    placeholder='Name' 
                    name='name'
                    handleState={setName}
                    radiusBorder="md"
                    value={name}
                    required={true}
                />   
            </Box>
            <Box>        
                <Typography variant='subtitle1'>User Email<span style={{ color: 'red'  }}>*</span></Typography>
                <InputField
                    type='email'
                    placeholder='Email' 
                    name='email'
                    handleState={setEmail}
                    radiusBorder="md"
                    value={email}
                    required={true}
                />   
            </Box>            
            <Box>        
                <Button onClick={() => setToggle(prev => !prev)} variant='contained'>
                    Change Password
                </Button>
            </Box>
            {toggle && (
                <>
                    <Box>        
                        <Typography variant='subtitle1'>User Password<span style={{ color: 'red'  }}>*</span></Typography>
                        <InputField
                            type='password'
                            placeholder='Password' 
                            name='password'
                            handleState={setPassword}
                            radiusBorder="md"
                            error={!valPass?.value}
                            messageValidation={!valPass?.value? valPass?.message : null}
                            required={true}
                        />   
                    </Box>
                    <Box>        
                        <Typography variant='subtitle1'>User Confirm Password<span style={{ color: 'red'  }}>*</span></Typography>
                        <InputField
                            type='password'
                            placeholder='Confirm Password' 
                            name='confirmPassword'
                            handleState={setConfirmPassword}
                            radiusBorder="md"
                            error={!valPassCon?.value}
                            messageValidation={!valPassCon?.value ? valPassCon?.message : null}
                            required={true}
                        />   
                    </Box>  
                </>   
            )}
            <Box>        
                <Typography variant='subtitle1'>User Role<span style={{ color: 'red'  }}>*</span></Typography>
                <SelectInput 
                    value={roleUser}
                    handleState={setRoleUser}
                    listOption={userOption}
                    name="category"
                    required={true}
                />
            </Box>
            {/* <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>        
                <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                    <Typography variant='subtitle1'>Product Image<span style={{ color: 'red'  }}>*</span></Typography>
                    <div>
                        <input
                            type="file"
                            accept="image/png"
                            onChange={(e) => handleInputImage(e)}
                            // required={true}
                        />
                    </div>
                </Box>
                <img
                    src={image}
                    width={'200px'}
                    alt=""
                />
            </Box> */}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'end', gap: '20px   ' }}>
                <Button type="submit" variant='contained' color='success'>
                    Update Data
                </Button>
                <Button type="submit" variant='contained' color='warning' onClick={() => navigate('/admin/product')}>
                    Cancel
                </Button>
            </Box>    
        </form>
      </>
  )
}

export default EditPageUser