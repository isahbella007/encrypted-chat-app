import { useState, useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'

function App() {
  const {currentUser} = useContext(AuthContext)
  // console.log(currentUser);

  // Protected Routed

  const ProtectedRoute = ({children}) => { 
    if(!currentUser){ 
      return <Navigate to = "/login"></Navigate>
    }

    return children

  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<ProtectedRoute><Home></Home></ProtectedRoute>}></Route>
        <Route path='/login' element = {<Login></Login>}></Route>
        <Route path='/register' element = {<Register></Register>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
