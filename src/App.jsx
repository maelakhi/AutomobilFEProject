import { Route, Routes } from "react-router-dom";
import LoginPage from './Pages/Login'
import RegisterPage from './Pages/Register'
import ResetPasswordPage from './Pages/ResetPassword'
import CreatePasswordPage from './Pages/CreatePassword'
import './App.css'
import Layout from "./Pages/Layout";

function App() {

  return (
    <>
     <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage /> } />
          <Route path='/resetpassword' element={<ResetPasswordPage /> } />
          <Route path='/createpassword' element={<CreatePasswordPage /> } />
        </Route>
    </Routes>
    </>
  )
}

export default App
