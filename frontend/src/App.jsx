// App.jsx

import React from 'react'
import Home from './pages/Home'
import Login from './auth/Login'
import Signup from './auth/Signup'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './components/AuthProvider'
import { ProtectedRoute } from './components/ProtectedRoute'

const App = () => {
  return (
    <main>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Route */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </main>
  )
}

export default App
