import * as React from 'react';
import ServiceAdminDashboard from '../../../Service/Admin/ServiceAdminDashboard';
import useAuth from '../../../Hooks/useAuth';
import useLoading from '../../../Hooks/useLoading';
import { PieChart } from '@mui/x-charts';
import { Box, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DashBoard = () => {
  const authCtx = useAuth();
  const navigate = useNavigate();
  const [dataProduct, setDataProduct] = React.useState([])
  const [dataUser, setDataUser] = React.useState([])
  const { isLoading, RunLoading, EndLoading } = useLoading();
  

  React.useEffect(() => {
    RunLoading();
    Promise.allSettled([
      ServiceAdminDashboard.GetDashboardProduct(authCtx.token),
      ServiceAdminDashboard.GetDashboardUsers(authCtx.token)
    ])
      .then(([dataProduct, dataUser]) => {
        if (dataProduct.value.status == 403) {
          navigate("/")
        }
        const customDataProduct = dataProduct.value.data.data?.map((v, i) => {
          return { id: i, value: v.totalProduct, label: v.categoryName }
        })
        const customDataUser = dataUser.value.data.data?.map((v, i) => {
          return { id: i, value: v.totalUsers, label: v.statusUser == "True" ? "Active" : "Inactive" }
        })
        setDataProduct(customDataProduct)
        setDataUser(customDataUser)
        
        EndLoading();
      })
      .catch((error) => console.log(error))

  }, []);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >  
        <Typography variant='h5' sx={{ fontWeight: 600, textAlign: 'center' }}>
          Data Product in Category
        </Typography>  
        <PieChart
          series={[
            {
              data: dataProduct,
            },
          ]}
          width={400}
          height={200}
        />
     </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >  
        <Typography variant='h5' sx={{ fontWeight: 600, textAlign: 'center' }}>
          Data User
        </Typography>  
        <PieChart
          series={[
            {
              data: dataUser,
            },
          ]}
          width={400}
          height={200}
          colors={['#E86342','#94B9F3']}
        />
     </Box>
    </>
  );
}

export default DashBoard