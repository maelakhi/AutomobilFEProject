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

function App() {

  return (
    <>
     <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage /> } />
          <Route path='/resetpassword' element={<ResetPasswordPage /> } />
          <Route path='/createpassword' element={<CreatePasswordPage /> } />
          <Route path='/listmenu' element={<ListMenuPage /> } />
          <Route path='/classdetails' element={<ClassDetailsPage /> } />
        </Route>
    </Routes>
    </>
  )
}

export default App
