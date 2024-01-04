import { Box, Button, Input, Typography } from '@mui/material'
import InputField from '../../../Components/Input'
import { useEffect, useState } from 'react';
import useLoading from '../../../Hooks/useLoading';
import ServiceAdminCategory from '../../../Service/Admin/ServiceAdminCategory';
import SelectInput from '../../../components/SelectInput'
import LoadingAnimation from '../../../components/LoadingAnimation';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';

const AddPageCategory = () => {
    const navigate = useNavigate();
    const authCtx = useAuth();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(0);
    const [imageFile, setImageFile] = useState([]);
    const [categoryOption, setCategoryOption] = useState([]);
    const { isLoading, RunLoading, EndLoading } = useLoading();

    useEffect(() => {
        RunLoading();
        ServiceAdminCategory.GetCategoryData()
        .then((response) => {
            const dataOption = response?.data?.map((v) => {
                return { value: v.id, label: v.name }
            })
            setCategoryOption(dataOption)
            EndLoading();
        })
        .catch((error) => {
            EndLoading();
            console.log(error.response);
        })
    }, [])
    
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
        sendData.append("Name", name);
        sendData.append("Description", description);
        sendData.append("Image", imageFile)

        RunLoading();
        ServiceAdminCategory.AddCategory(authCtx.token, sendData)
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
                        setTimeout(() => {
                            navigate('/admin/category')
                        }, 1100);
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
            Form Add Category 
            </Typography>
        <form method='POST' onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
            <Box>        
                <Typography variant='subtitle1'>Category Name<span style={{ color: 'red'  }}>*</span></Typography>
                <InputField
                    type='text'
                    placeholder='Category Name' 
                    name='name'
                    handleState={setName}
                    radiusBorder="md"
                    required={true}
                />   
            </Box>
            <Box>        
                <Typography variant='subtitle1'>Category Description<span style={{ color: 'red'  }}>*</span></Typography>
                <InputField
                    type='text'
                    placeholder='Category Description' 
                    name='description'
                    handleState={setDescription}
                    radiusBorder="md"
                    required={true}
                />   
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>        
                <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                    <Typography variant='subtitle1'>Category Image<span style={{ color: 'red'  }}>*</span></Typography>
                    <div>
                        <input
                            type="file"
                            accept="image/png"
                            onChange={(e) => handleInputImage(e)}
                            required={true}
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
                    Create Data
                </Button>
                <Button type="submit" variant='contained' color='warning' onClick={() => navigate('/admin/category')}>
                    Cancel
                </Button>
            </Box>    
        </form>
      </>
  )
}

export default AddPageCategory