import { Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import ServiceAdminInvoice from '../../../Service/Admin/ServiceAdminInvoice'
import useAuth from '../../../Hooks/useAuth'
import { useParams } from 'react-router-dom'
import useLoading from '../../../Hooks/useLoading'
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { FormatDate } from '../../../Utils/FormatDate'

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const ViewInvoice = () => {
    const authCtx = useAuth();
    const { id } = useParams();
    const [data, setData] = React.useState({});
    const { isLoading, RunLoading, EndLoading } = useLoading();

    React.useEffect(() => {
        RunLoading();
        ServiceAdminInvoice.GetInvoiceById(authCtx.token, id)
            .then((response) => {
                setData(response.data);
                setTimeout(() => {
                    
                    EndLoading();
                }, 1000);
            })
    }, [])

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <>
            <Box>
                <Typography variant='h5' sx={{ textAlign: 'center', fontWeight: '600', pb: '50px' }}>
                    Detail Invoice
                </Typography>
                <Box sx={{ display: 'flex', flexDirection:'column'}}>
                    <Typography variant='p' sx={{ fontWeight: '600' }}>No.Invoice : {data.id }</Typography>
                    <Typography variant='p' sx={{ fontWeight: '600' }}>Date : {FormatDate(data.createdAt)}</Typography>
                    <Typography variant='p' sx={{ fontWeight: '600' }}>Payment : {data?.paymentMethod?.name }</Typography>
                    <Typography variant='p' sx={{ fontWeight: '600' }}>Total Price : Rp. {new Intl.NumberFormat().format(data.totalAmount)}</Typography>
                    <Box sx={{ py: '5%'}}>
                        <TableContainer component={Paper    }>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell align='left'>No</StyledTableCell>
                                    <StyledTableCell align="center">Course Name</StyledTableCell>
                                    <StyledTableCell align="center">Type</StyledTableCell>
                                    <StyledTableCell align="right">Schedule</StyledTableCell>
                                    <StyledTableCell align="right">Price</StyledTableCell>
                                </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                {data?.orderDetails?.map((row, i) => (
                                    <TableRow
                                        key={i}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align='left'>{i+1}</TableCell>
                                        <TableCell align='left'>{row?.product?.name}</TableCell>
                                        <TableCell align="left">{row?.product?.categoryName}</TableCell>
                                        <TableCell align="right">{FormatDate(row?.dateSchedule)}</TableCell>
                                        <TableCell align="right">Rp. {new Intl.NumberFormat().format(row?.product?.price)}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
        </Box>
        </>
  )
}

export default ViewInvoice