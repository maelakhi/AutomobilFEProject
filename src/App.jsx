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
import { role_name, token_name } from './DataStatic';
import NotFoundPage from "./Pages/NotFound";
import InformationRegister from "./Pages/ConfirmationPages/InformationRegister";
import OTPPage from "./Pages/OTPPage";
import useAuth from "./Hooks/useAuth";
import InvociePage from "./Pages/Invoice";
import AuthLogin from "./AuthRoute/AuthLogin";
import AuthRole from "./AuthRoute/AuthRole";
import LayoutAdminPage from './Pages/AdminPage/Layout/index';
import DashBoard from "./Pages/AdminPage/Dashboard";
import ProductAdmin from "./Pages/AdminPage/Product";
import CategoryAdmin from "./Pages/AdminPage/Category";
import InvoiceAdmin from "./Pages/AdminPage/Invoice";
import AddPageProduct from "./Pages/AdminPage/Product/AddPageProduct";
import EditPageProduct from "./Pages/AdminPage/Product/EditPageProduct";

function App() {
  const authCtx = useAuth();

  if (authCtx.token == "") {
    authCtx.token = Cookie.get(token_name)
    authCtx.role = Cookie.get(role_name)
  }
  
  return (
    <>
     <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='login' element={<LoginPage />} /> 
          <Route path='register' element={<RegisterPage /> } />
          <Route path='resetpassword' element={<ResetPasswordPage />} />
          <Route path='createpassword/:otpCode' element={<CreatePasswordPage /> } />
          <Route path='listmenu/:typeName' element={<ListMenuPage /> } />
          <Route path='classdetails/:id' element={<ClassDetailsPage /> } />
          <Route path='otppage' element={<OTPPage /> } />
          <Route path='invoice' element={<AuthLogin><InvociePage/></AuthLogin>} />
          <Route path='checkout' element={<AuthLogin><CheckoutPage /></AuthLogin>} />
          <Route path='myclass' element={<AuthLogin><MyClassPage /></AuthLogin>} />
        </Route>
        <Route path='/' element={<ConfirmationLayout />}>
          <Route path="confirmationEmail/:token" element={<EmailConfirmation />} />
          <Route path="confirmationPurchase" element={<PurchaseConfirmation />} />
          <Route path="informationEmail" element={<InformationRegister />} />
        </Route>
        <Route path='/admin' element={
          <AuthLogin><AuthRole>
          <LayoutAdminPage />
        </AuthRole></AuthLogin>
        }>
          <Route index element={<DashBoard />} />
          <Route path="product" element={<ProductAdmin />} />
          <Route path="product/create" element={<AddPageProduct />} />
          <Route path="product/edit/:id" element={<EditPageProduct />} />
          <Route path="category" element={<CategoryAdmin />} />
          <Route path="invoice" element={<InvoiceAdmin />} />
        </Route>
       <Route path='*' exact={true} element={<NotFoundPage/>} />
    </Routes>
    </>
  )
}

export default App
