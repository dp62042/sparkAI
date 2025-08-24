// src/components/ProtectedRoute.jsx

import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
// Import the actual AuthContext from your provider file
import { AuthContext } from './AuthProvider'

// Use a named export to match your App.jsx import
export const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext)

  if (!currentUser) {
    // If no user is logged in, redirect to the login page.
    return <Navigate to="/login" replace />
  }

  // If the user is logged in, render the child components (e.g., the Home page).
  return children
}
