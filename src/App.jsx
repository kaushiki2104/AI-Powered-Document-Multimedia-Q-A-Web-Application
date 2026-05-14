import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ Protected — bina login ke nahi jaega */}
        <Route path='/' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }/>

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* ✅ Koi bhi unknown route login pe bheje */}
        <Route path='*' element={<Navigate to='/login' replace />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App