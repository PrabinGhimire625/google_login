import React from 'react'
import { useNavigate } from 'react-router-dom'


const PageNotFound = () => {
    const navigate=useNavigate();
  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
        <button className="bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow" onClick={() => navigate("/login")}> Go to Login </button>
    </div>
</>

 
  )
}

export default PageNotFound
