import { Box, Button, Typography } from '@mui/material'
import InputField from '../../../Components/Input'
import { useEffect, useState } from 'react';
import useLoading from '../../../Hooks/useLoading';
import ServiceAdminPayment from '../../../Service/Admin/ServiceAdminPayment';
import SelectInput from '../../../components/SelectInput'
import LoadingAnimation from '../../../components/LoadingAnimation';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import useFlag from '../../../Hooks/useFlag';

const EditPagePayment = () => {
    const navigate = useNavigate();
    const authCtx = useAuth();
    const { id } = useParams();
    const [name, setName] = useState("");
    const [accNumber, setAccountNumber] = useState("");
    const [image, setImage] = useState(0);
    const [imageFile, setImageFile] = useState([]);
    const { isLoading, RunLoading, EndLoading } = useLoading();
    const { IsFlag, flag } = useFlag();

    useEffect(() => {
        RunLoading();
        Promise.allSettled([
            ServiceAdminPayment.GetPaymentById(id)
        ])
        .then(([data]) => {
            setName(data.value.data?.name);
            setAccountNumber(data.value.data?.accountNumber);
            setImage(data.value.data?.imagePath)
            EndLoading();
        })
        
        // .then((response) => {
        //     const dataOption = response?.data?.map((v) => {
        //         return { value: v.id, label: v.name }
        //     })
        //     setCategoryOption(dataOption)
        //     EndLoading();
        // })
        // .catch((error) => {
        //     EndLoading();
        //     console.log(error.response);
        // })
    }, [id, flag])

    const handleInputImage = (e) => {
        setImageFile(e.target.files[0])
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const sendData = new FormData();
        sendData.append("PaymentID", id);
        sendData.append("Name", name);
        sendData.append("AccountNumber", accNumber);
        sendData.append("Image", imageFile)

        console.log(imageFile)
        console.log(image)
        RunLoading();
        ServiceAdminPayment.EditPayment(authCtx.token, sendData)
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
                        //     navigate('/admin/category')
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
            Form Edit Payment Method 
            </Typography>
        <form method='POST' onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
            <Box>        
                <Typography variant='subtitle1'>Payment Method<span style={{ color: 'red'  }}>*</span></Typography>
                <InputField
                    type='text'
                    placeholder='Payment Name' 
                    name='name'
                    handleState={setName}
                    radiusBorder="md"
                    value={name}
                    required={true}
                />   
            </Box>
            <Box>        
                <Typography variant='subtitle1'>Account Number<span style={{ color: 'red'  }}>*</span></Typography>
                <InputField
                    type='text'
                    placeholder='No. Account' 
                    name='accountNumber'
                    handleState={setAccountNumber}
                    radiusBorder="md"
                    value={accNumber}
                    required={true}
                />   
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>        
                <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                    <Typography variant='subtitle1'>Logo<span style={{ color: 'red'  }}>*</span></Typography>
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
            </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'end', gap: '20px   ' }}>
                <Button type="submit" variant='contained'>
                    Update Data
                </Button>
                <Button type="submit" variant='contained' color='warning' onClick={() => navigate('/admin/payment')}>
                    Cancel
                </Button>
            </Box>    
        </form>
      </>
  )
}

export default EditPagePayment