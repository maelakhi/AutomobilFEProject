import { Route, Routes } from "react-router-dom";
import HomePage from './Pages/Home'
import LoginPage from './Pages/Login'
import './App.css'

function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<HomePage /> } />
        <Route path='/login' element={<LoginPage />} />
    </Routes>
    </>
  )
}

export default App
