import { Route, Routes } from "react-router-dom";
import HomePage from './Pages/Home'
import LoginPage from './Pages/Login'
import RegisterPage from './Pages/Register'
import './App.css'

function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<HomePage /> } />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage /> } />
    </Routes>
    </>
  )
}

export default App
