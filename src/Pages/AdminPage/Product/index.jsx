import { useEffect, useState } from 'react'
import ServiceAdminProduct from '../../../Service/Admin/ServiceAdminProduct'
import useAuth from '../../../Hooks/useAuth'
import useLoading from '../../../Hooks/useLoading'
import useFlag from '../../../Hooks/useFlag'
import LoadingAnimation from '../../../components/LoadingAnimation'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, TableFooter, TablePagination, Typography } from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {   
    backgroundColor: '#790B0A',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#790B0A1A',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ProductAdmin = () => {
  const navigate = useNavigate();
  const authCtx = useAuth();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { isLoading, RunLoading, EndLoading } = useLoading();
  const { flag, IsFlag } = useFlag()

  useEffect(() => {
    RunLoading();
    ServiceAdminProduct.GetDataAllProduct(authCtx.token)
      .then((response) => {
        setData(response.data);
        EndLoading();
      })
    .catch((error) => console.log(error))
  }, [flag])

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };

  const handleDeactivate = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to Deactivate!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Deactivate it!"
    }).then((result) => {
      if (result.isConfirmed) {
        RunLoading();
        ServiceAdminProduct.DeactivateProduct(authCtx.token, id)
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
      }
    });
  }

  const handleActivated = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to Activated!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Activate it!"
    }).then((result) => {
      if (result.isConfirmed) {
        RunLoading();
        ServiceAdminProduct.ActivateProduct(authCtx.token, id)
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
      }
    });
  }
  
  // const handleDelete = (id) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to Delete this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, Delete it!"
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       RunLoading();
  //       ServiceAdminProduct.DeleteProduct(authCtx.token, id)
  //         .then((response) => {
  //               if (response.status == 200) {
  //                   EndLoading();
  //                   Swal.fire({
  //                       position: "center",
  //                       icon: "success",
  //                       title: `${response.data.message}`,
  //                       showConfirmButton: false,
  //                       timer: 1000
  //                   });
  //                   IsFlag();
  //               } else {
  //                   EndLoading();
  //                   Swal.fire({
  //                       position: "center",
  //                       icon: "error",
  //                       title: `${response.data.message}`,
  //                       showConfirmButton: false,
  //                       timer: 1000
  //                   });
  //               }
  //           }).catch((error) => {
  //               EndLoading();
  //               Swal.fire({
  //                       position: "center",
  //                       icon: "error",
  //                       title: `${error.message}`,
  //                       showConfirmButton: false,
  //                       timer: 1000
  //                   });
  //           })
  //     }
  //   });
  // }

  return (
    <>
      {isLoading && (<LoadingAnimation />)}
      <Box sx={{ padding: '0.1% 0' }}>
        <Typography variant="h5" component="h2">
            Menu Admin Product
        </Typography>
      </Box>
      <Box sx={{ width: '100%', display: "flex", justifyContent: "end", margin: "1% 0" }}>
        <Button
          variant='outlined'
          color='success'
          onClick={() => navigate('create')}
        >
          Add Product
        </Button>
      </Box>
      <TableContainer component={Paper}>
      <Table stickyHeader sx={{ minWidth: 700, maxHeight: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Course Image</StyledTableCell>
            <StyledTableCell>Course Name</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
            ).map((row) => (
                <StyledTableRow key={row.id}>
                <StyledTableCell >
                   <img src={`${import.meta.env.VITE_BASE_URL}/${row.imagePath}`} alt={row.name} width={'80px'} />
                </StyledTableCell>
                <StyledTableCell >
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.isActive ? (
                    <Button variant='contained' sx={{ backgroundColor: 'green', fontSize: '0.8em' }} onClick={handleDeactivate.bind(null,row.id)}>
                      Activate
                    </Button>
                  ): (
                  <Button variant='contained' sx={{backgroundColor: 'red', fontSize: '0.8em'}} onClick={handleActivated.bind(null, row.id)}>
                    Deactivate
                  </Button>
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">Rp.{new Intl.NumberFormat().format(row.price)}</StyledTableCell>
                <StyledTableCell align="right">{row.categoryName}</StyledTableCell>
                <StyledTableCell sx={{ maxWidth: "300px" }} align="left">
                  <Typography variant='p' sx={{ wordWrap: "break-word"}}>
                    {row.description}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell sx={{ maxWidth: "300px" }} align="left">
                  <Button
                    variant='contained'
                    color='success'
                    sx={{ fontSize: '0.8em', mx: "10px" }}
                    onClick={() => navigate(`edit/${row.id}`) }
                  >
                    Edit
                  </Button>
                  {/* <Button
                    variant='contained'
                    sx={{ backgroundColor: 'red', fontSize: '0.8em', mx: "10px" }}
                    onClick={handleDelete.bind(null, row.id)}
                  >
                    Delete
                  </Button> */}
                </StyledTableCell>
                </StyledTableRow>
            ))}
            {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                <StyledTableCell colSpan={6} />
                </TableRow>
            )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={12}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                    inputProps: {
                    'aria-label': 'rows per page',
                    },
                    native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </>
  )
}

export default ProductAdmin