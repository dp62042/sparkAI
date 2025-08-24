// src/components/AuthProvider.jsx

import React, { createContext, useEffect, useState } from 'react'

// 1. Create and export the context itself.
// Other components will import this to access the user data.
export const AuthContext = createContext()

// 2. Create and export the provider component as a named export.
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    // On initial load, check localStorage to see if the user was already logged in.
    JSON.parse(localStorage.getItem('user')) || null
  )

  // This function will be called from your Login component after a successful API call.
  const login = (userData) => {
    setCurrentUser(userData)
  }

  const logout = () => {
    setCurrentUser(null)
  }

  // Use useEffect to save the user to localStorage whenever it changes.
  // This keeps the user logged in even after a page refresh.
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser))
    } else {
      localStorage.removeItem('user')
    }
  }, [currentUser])

  const value = { currentUser, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
