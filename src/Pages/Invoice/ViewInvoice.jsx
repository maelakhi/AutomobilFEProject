import { Box, Container, Paper, Stack, TableCell, TableContainer, TableHead, TableRow, Typography, Table, TableBody, Button, tableCellClasses, Grid } from "@mui/material"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ServiceInvoice from "../../Service/ServiceInvoice";
import useAuth from "../../Hooks/useAuth";
import Footer from "../../components/Footer";
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingAnimation from "../../components/LoadingAnimation";
import useLoading from "../../Hooks/useLoading";
import { FormatDate } from "../../Utils/FormatDate";

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

const InvoiceDetails = () => {
  let { details } = useParams();
  const authCtx = useAuth();
  const [invoice, setInvoice] = useState([]);
  const { isLoading, RunLoading, EndLoading } = useLoading();

  useEffect(() => {
    RunLoading();
    ServiceInvoice.GetInvoiceDetails(authCtx.token, details)
    .then((invoice) => {  
        setInvoice(invoice.data)
    })
    .then((res)=> EndLoading())
}, [details])

useEffect(() => {
    window.scrollTo(0, 0)
}, [])

    return (
    <>
      {isLoading && (<LoadingAnimation />)}
      <Container maxWidth='xl' sx={{ mt: '5em' }}>
        <Stack direction="row">
          <Typography variant="caption" color='inherit' component={Link} to ="/" style={{ textDecoration: 'none' }}>Home</Typography>
          <Typography variant="caption"><KeyboardArrowRightIcon sx={{ fontSize: '1.5em'}}/></Typography>
          <Typography variant="caption" color='inherit' component={Link} to ="/invoice" style={{ textDecoration: 'none' }}>Invoice</Typography>
          <Typography variant="caption"><KeyboardArrowRightIcon sx={{ fontSize: '1.5em'}}/></Typography>
          <Typography variant="caption" color="#790B0A">Details Invoice</Typography>
        </Stack>
        <Box sx={{ padding: '1% 0' }}>
          <Typography variant="h5" component="h2">
              Details Invoice
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection:'column'}}>
          <Typography variant='p'>No. Invoice : OTO0000{invoice.id}</Typography>
          <Grid container sx={{ alignItems: "center" }}>
            <Grid item xs={10} >
              <Typography variant='p'>Date : {FormatDate(invoice.createdAt)}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant='p'>Total Price IDR {new Intl.NumberFormat().format(invoice.totalAmount)}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ py: '2%'}}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>No</StyledTableCell>
                  <StyledTableCell align="center">Course Name</StyledTableCell>
                  <StyledTableCell align="center">Type</StyledTableCell>
                  <StyledTableCell align="center">Schedule</StyledTableCell>
                  <StyledTableCell align="center">Price</StyledTableCell>
                </TableRow> 
              </TableHead>
              <TableBody>
              {invoice?.orderDetails?.map((row, idx) => (
                <StyledTableRow key={idx}>
                  <StyledTableCell component="th" scope="row">
                    {idx+1}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row?.product?.name}</StyledTableCell>
                  <TableCell align="center">{row?.product?.categoryName}</TableCell>
                  <StyledTableCell align="center">{FormatDate(row?.dateSchedule)}</StyledTableCell>
                  <StyledTableCell align="center">IDR {new Intl.NumberFormat().format(row?.product?.price)}</StyledTableCell>
                </StyledTableRow>
              ))}
              </TableBody>
            </Table>
            {invoice.length == 0 && (<Typography variant="h5" textAlign="center">You have not made any purchases yet.</Typography>)}
          </TableContainer>
        </Box>
      <Footer/>
      </Container>
    </>
  )
}

export default InvoiceDetails