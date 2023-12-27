import { Route, Routes } from "react-router-dom";
import HomePage from './Pages/Home'
import LoginPage from './Pages/Login'
import RegisterPage from './Pages/Register'
import ResetPasswordPage from './Pages/ResetPassword'
import CreatePasswordPage from './Pages/CreatePassword'
import ListMenuPage from './Pages/ListMenu'
import './App.css'
import Layout from "./Pages/Layout";
import ClassDetailsPage from "./Pages/ClassDetails";
import CheckoutPage from "./Pages/Checkout";
import ConfirmationLayout from './components/ConfirmationLayout';
import EmailConfirmation from "./Pages/ConfirmationPages/EmailConfirmation";
import PurchaseConfirmation from "./Pages/ConfirmationPages/PurchaseConfirmation";
import MyClassPage from "./Pages/MyClass";
import Cookie from 'js-cookie';
import { token_name } from './data';
import NotFoundPage from "./Pages/NotFound";
import InformationRegister from "./Pages/ConfirmationPages/InformationRegister";
import OTPPage from "./Pages/OTPPage";
import useAuth from "./Hooks/useAuth";
import InvociePage from "./Pages/Invoice";


function App() {
  const authCtx = useAuth();

  if (authCtx.token == "") {
    authCtx.token = Cookie.get(token_name)
  }
  
  return (
    <>
     <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage /> } />
          <Route path='/resetpassword' element={<ResetPasswordPage />} />
          <Route path='/invoice' element={<InvociePage/>} />
          <Route path='/createpassword/:otpCode' element={<CreatePasswordPage /> } />
          <Route path='/listmenu/:typeName' element={<ListMenuPage /> } />
          <Route path='/classdetails/:id' element={<ClassDetailsPage /> } />
          <Route path='/checkout' element={<CheckoutPage /> } />
          <Route path='/myclass' element={<MyClassPage />} />
          <Route path='/otppage' element={<OTPPage /> } />
        </Route>
        <Route path='/' element={<ConfirmationLayout />}>
          <Route path="confirmationEmail/:token" element={<EmailConfirmation />} />
          <Route path="confirmationPurchase" element={<PurchaseConfirmation />} />
          <Route path="informationEmail" element={<InformationRegister />} />
        </Route>
       <Route path='*' exact={true} element={<NotFoundPage/>} />
    </Routes>
    </>
  )
}

export default App
