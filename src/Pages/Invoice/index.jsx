import { Box, Container, Paper, Stack, TableCell, TableContainer, TableHead, TableRow, Typography, Table, TableBody, Button, tableCellClasses } from "@mui/material"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ServiceInvoice from "../../Service/ServiceInvoice";
import useAuth from "../../Hooks/useAuth";
import Footer from "../../components/Footer";
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingAnimation from "../../components/LoadingAnimation";
import useLoading from "../../Hooks/useLoading";

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

const InvociePage = () => {
  const authCtx = useAuth();
  const [invoice, setInvoice] = useState([]);
  const { isLoading, RunLoading, EndLoading } = useLoading();

  useEffect(() => {
    RunLoading();
    ServiceInvoice.GetInvoice(authCtx.token)
    .then((invoice) => {
        setInvoice(invoice.data)
    })
    .then((res)=> EndLoading())
}, [])

    return (
    <>
      {isLoading && (<LoadingAnimation />)}
      <Container maxWidth='xl' sx={{ mt: '5em' }}>
        <Stack direction="row">
          <Typography variant="caption" color='inherit' component={Link} to ="/" style={{ textDecoration: 'none' }}>Home</Typography>
          <Typography variant="caption"><KeyboardArrowRightIcon sx={{ fontSize: '1.5em'}}/></Typography>
          <Typography variant="caption" color="#790B0A">Invoice</Typography>
        </Stack>
        <Box sx={{ padding: '3% 0' }}>
          <Typography variant="h5" component="h2">
              Menu Invoice
          </Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>No</StyledTableCell>
                <StyledTableCell align="right">No. Invoice</StyledTableCell>
                <StyledTableCell align="right">Date</StyledTableCell>
                <StyledTableCell align="right">Total Course</StyledTableCell>
                <StyledTableCell align="right">Total Price</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow> 
            </TableHead>
            <TableBody>
            {invoice && invoice.map((value) => (
              <StyledTableRow key={value.id}>
                <StyledTableCell component="th" scope="row">
                    {value.id}
                </StyledTableCell>
                <StyledTableCell align="right">{value.id}</StyledTableCell>
                <StyledTableCell align="right">{value.createdAt}</StyledTableCell>
                <StyledTableCell align="right">{value.totalCourse}</StyledTableCell>
                <StyledTableCell align="right">{value.totalPrice}</StyledTableCell>
                <StyledTableCell align="right">
                    <Button variant='outlined' color='success'>Details</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
      <Footer/>
      </Container>
    </>
  )
}

export default InvociePage