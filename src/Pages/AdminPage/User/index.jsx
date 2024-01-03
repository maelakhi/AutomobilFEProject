import { useEffect, useState } from 'react'
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
import ServiceAdminUser from '../../../Service/Admin/ServiceAdminUser'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const UserAdmin = () => {
  const navigate = useNavigate();
  const authCtx = useAuth();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { isLoading, RunLoading, EndLoading } = useLoading();
  const { flag, IsFlag } = useFlag();

  useEffect(() => {
    RunLoading();
    ServiceAdminUser.GetUsers(authCtx.token)
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
      confirmButtonText: "Yes, Inactive it!"
    }).then((result) => {
      if (result.isConfirmed) {
        RunLoading();
        ServiceAdminUser.DeactivateUser(authCtx.token, id)
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
        ServiceAdminUser.ActivateUser(authCtx.token, id)
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
  
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to Delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        RunLoading();
        ServiceAdminUser.DeleteUser(authCtx.token, id)
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

  return (
    <>
      {isLoading && (<LoadingAnimation />)}
      <Box sx={{ width: '100%', display: "flex", justifyContent: "end", margin: "1% 0" }}>
        <Button
          variant='contained'
          onClick={() => navigate('create')}
        >
          Add User
        </Button>
      </Box>
      <TableContainer component={Paper}>
      <Table stickyHeader sx={{ minWidth: 700, maxHeight: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>User Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="right">Role</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
            ).map((row) => (
                <StyledTableRow key={row.id}>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.email}</StyledTableCell>
                <StyledTableCell align="center">{row.role}</StyledTableCell>
                <StyledTableCell align="right">{row.isActive ? (
                    <Button variant='contained' sx={{ backgroundColor: 'green', fontSize: '0.8em' }} onClick={handleDeactivate.bind(null,row.id)}>
                      Activate
                    </Button>
                  ): (
                    <Button variant='contained' sx={{backgroundColor: 'red', fontSize: '0.8em'}} onClick={handleActivated.bind(null, row.id)}>
                        Inactivate
                    </Button>
                    
                  )}
                </StyledTableCell>
                <StyledTableCell sx={{ maxWidth: "300px" }} align="center">
                  <Button
                    variant='contained'
                    color='info'
                    sx={{ backgroundColor: '#FFA500', fontSize: '0.8em', mx: "10px" }}
                    onClick={() => navigate(`edit/${row.id}`) }
                  >
                    Edit
                  </Button>
                  <Button
                    variant='contained'
                    sx={{ backgroundColor: 'red', fontSize: '0.8em', mx: "10px" }}
                    onClick={handleDelete.bind(null, row.id)}
                  >
                    Delete
                  </Button>
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

export default UserAdmin