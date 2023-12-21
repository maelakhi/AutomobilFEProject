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
import { useContext } from "react";
import authContext from "./Context/authContext";
import Cookie from 'js-cookie';
import { token_name } from './data';
import NotFoundPage from "./Pages/NotFound";


function App() {
  const authCtx = useContext(authContext)

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
          <Route path='/resetpassword' element={<ResetPasswordPage /> } />
          <Route path='/createpassword' element={<CreatePasswordPage /> } />
          <Route path='/listmenu/:typeName' element={<ListMenuPage /> } />
          <Route path='/classdetails' element={<ClassDetailsPage /> } />
          <Route path='/checkout' element={<CheckoutPage /> } />
          <Route path='/myclass' element={<MyClassPage /> } />
        </Route>
        <Route path='/' element={<ConfirmationLayout />}>
          <Route path="confirmationEmail/:token" element={<EmailConfirmation />} />
          <Route path="confirmationPurchase" element={<PurchaseConfirmation />} />
        </Route>
       <Route path='*' exact={true} element={<NotFoundPage/>} />
    </Routes>
    </>
  )
}

export default App
