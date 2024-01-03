import React from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
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
import InvoiceDetailsPage from "./Pages/Invoice/ViewInvoice";
import AuthLogin from "./AuthRoute/AuthLogin";
import AuthRole from "./AuthRoute/AuthRole";
import LayoutAdminPage from './Pages/AdminPage/Layout/index';
import DashBoard from "./Pages/AdminPage/Dashboard";
import ProductAdmin from "./Pages/AdminPage/Product";
import CategoryAdmin from "./Pages/AdminPage/Category";
import InvoiceAdmin from "./Pages/AdminPage/Invoice";
import AddPageProduct from "./Pages/AdminPage/Product/AddPageProduct";
import EditPageProduct from "./Pages/AdminPage/Product/EditPageProduct";
import ViewInvoiceAdmin from './Pages/AdminPage/Invoice/ViewInvoice'
import AddPageCategory from "./Pages/AdminPage/Category/AddPageCategory";
import EditPageCategory from "./Pages/AdminPage/Category/EditPageCategory";
import UserAdmin from "./Pages/AdminPage/User";
import AddPageUser from "./Pages/AdminPage/User/AddPageUser";
import EditPageUser from "./Pages/AdminPage/User/EditPageUser";

function App() {
  const authCtx = useAuth();
  const navigate = useNavigate();

  if (authCtx.token == "") {
    authCtx.token = Cookie.get(token_name)
    authCtx.role = Cookie.get(role_name)
  }
  
  
  React.useEffect(() => {
    if (authCtx.role == "admin") {
      return navigate("/admin");
    }
  }, [authCtx.role])

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
          <Route path='invoice/:details' element={<AuthLogin><InvoiceDetailsPage/></AuthLogin>} />
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
          <Route path="category/create" element={<AddPageCategory />} />
          <Route path="category/edit/:id" element={<EditPageCategory />} />
          <Route path="invoice" element={<InvoiceAdmin />} />
          <Route path="invoice/:id" element={<ViewInvoiceAdmin />} />
          <Route path="user" element={<UserAdmin />} />
          <Route path="user/create" element={<AddPageUser />} />
          <Route path="user/edit/:id" element={<EditPageUser />} />
        </Route>
       <Route path='*' exact={true} element={<NotFoundPage/>} />
    </Routes>
    </>
  )
}

export default App
