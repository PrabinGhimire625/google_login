import './App.css'
import {Navigate, BrowserRouter, Routes, Route } from 'react-router-dom'
import GoogleLogin from './pages/GoogleLogin'
import Dashboard from './pages/Dashboard'
import PageNotFound from './pages/PageNotFound'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useState } from 'react'
import RefreshHandler from './pages/RefreshHandler'

function App() {
  const [isAuthenticated, setIsAuthenticated]=useState(false);
  const GoogleAuthWrapper=()=>{
    return(
     <GoogleOAuthProvider clientId='687900192771-rqsgh5k9r6kvqt7kmiatsh9cov55a5qv.apps.googleusercontent.com'>
       <GoogleLogin>
       </GoogleLogin>
     </GoogleOAuthProvider>
    )
  }

  const PrivateRoute=({element})=>{
    return isAuthenticated ? element : <Navigate to="/login"/>
  }

  return (
    <>
    <BrowserRouter>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
    <Routes>
      <Route path='/login' element={<GoogleAuthWrapper/>}/>
      <Route path='/' element={<Navigate to="/login"/>}/>
      <Route path='/dashboard' element={<PrivateRoute element={<Dashboard/>}/>}/>
      <Route path='/*' element={<PageNotFound/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
