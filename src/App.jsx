import { Route, Routes } from "react-router-dom";
import HomePage from './Pages/Home'
import LoginPage from './Pages/Login'
import RegisterPage from './Pages/Register'
import ResetPasswordPage from './Pages/ResetPassword'
import './App.css'

function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<HomePage /> } />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage /> } />
        <Route path='/resetpassword' element={<ResetPasswordPage /> } />
    </Routes>
    </>
  )
}

export default App
