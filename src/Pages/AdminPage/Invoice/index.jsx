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
import { Button, TableFooter, TablePagination } from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions'
import { useNavigate } from 'react-router-dom'
import ServiceAdminInvoice from '../../../Service/Admin/ServiceAdminInvoice'

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

const InvoiceAdmin = () => {
  const navigate = useNavigate();
  const authCtx = useAuth();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { isLoading, RunLoading, EndLoading } = useLoading();
  const { flag, IsFlag } = useFlag()

  useEffect(() => {
    RunLoading();
    ServiceAdminInvoice.GetInvoiceData(authCtx.token)
      .then((response) => {
        setData(response.data);
        EndLoading();
      })
    .catch((error) => console.log(error))
  }, [])

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

  const handleViewInvoice = (id) => {
    return navigate(`${id}`)
  }

  return (
    <>
      {isLoading && (<LoadingAnimation />)}
      <TableContainer component={Paper}>
      <Table stickyHeader sx={{ minWidth: 700, maxHeight: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Invoice Id</StyledTableCell>
            <StyledTableCell align="center">Order Number</StyledTableCell>
            <StyledTableCell align="center">User Number</StyledTableCell>
            <StyledTableCell align="center">Total Items</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
            ).map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell > {row.id} </StyledTableCell>
                <StyledTableCell align="center">{row.idOrder}</StyledTableCell>
                <StyledTableCell align="center">{row.idUser}</StyledTableCell>
                <StyledTableCell align="center">{row.totalCourse}</StyledTableCell>
                <StyledTableCell align="center">{row.status}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant='contained'
                    sx={{ backgroundColor: 'blue', fontSize: '0.8em', mx: "10px" }}
                    onClick={handleViewInvoice.bind(null, row.id)}
                  >
                    View
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

export default InvoiceAdmin