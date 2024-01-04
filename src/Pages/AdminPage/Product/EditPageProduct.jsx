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

const EditPageProduct = () => {
    const navigate = useNavigate();
    const authCtx = useAuth();
    const { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState(0);
    const [imageFile, setImageFile] = useState([]);
    const [category, setCategory] = useState(0);
    const [categoryOption, setCategoryOption] = useState([]);
    const { isLoading, RunLoading, EndLoading } = useLoading();
    const { IsFlag, flag } = useFlag();

    useEffect(() => {
        RunLoading();
        Promise.allSettled([
            ServiceAdminProduct.GetCategoryData(),
            ServiceAdminProduct.GetDataByIdProduct(id)
        ])
        .then(([optionCategory, dataProduct]) => {
            const dataOption = optionCategory.value.data.map((v) => {
                return { value: v.id, label: v.name }
            })
            setCategoryOption(dataOption);
            setName(dataProduct.value.data?.name);
            setCategory(dataProduct.value.data?.idCategory);
            setPrice(dataProduct.value.data?.price);
            setDescription(dataProduct.value.data?.description);
            setImage(dataProduct.value.data?.imagePath)
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
        sendData.append("ProductID", id);
        sendData.append("Name", name);
        sendData.append("Description", description);
        sendData.append("Price", price);
        sendData.append("IdCategory", category)
        sendData.append("Image", imageFile)

        RunLoading();
        ServiceAdminProduct.EditProduct(authCtx.token, sendData)
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
                <Typography variant='subtitle1'>Product Name<span style={{ color: 'red'  }}>*</span></Typography>
                <InputField
                    type='text'
                    placeholder='Product Name' 
                    name='name'
                    handleState={setName}
                    radiusBorder="md"
                    value={name}
                    required={true}
                />   
            </Box>
            <Box>        
                <Typography variant='subtitle1'>Product Description<span style={{ color: 'red'  }}>*</span></Typography>
                <InputField
                    type='text'
                    placeholder='Product Description' 
                    name='description'
                    handleState={setDescription}
                    radiusBorder="md"
                    value={description}
                    required={true}
                />   
            </Box>
            <Box>        
                <Typography variant='subtitle1'>Product Price<span style={{ color: 'red'  }}>*</span></Typography>
                <InputField
                    type='number'
                    placeholder='Product Price' 
                    name='price'
                    handleState={setPrice}
                    radiusBorder="md"
                    value={price}
                    required={true}
                />   
            </Box>
            <Box>        
                <Typography variant='subtitle1'>Product Category<span style={{ color: 'red'  }}>*</span></Typography>
                <SelectInput 
                    value={category}
                    handleState={setCategory}
                    listOption={categoryOption}
                    name="category"
                    required={true}
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>        
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
            </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'end', gap: '20px   ' }}>
                <Button type="submit" variant='contained'>
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

export default EditPageProduct