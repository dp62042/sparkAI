/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from './AuthProvider'

// --- 4. Navbar Component ---
// This now gets the dynamic user data from the AuthContext.
const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    // Here you would also call your backend logout endpoint
    // await fetch('/api/auth/logout', { method: 'POST' });
    logout()
    navigate('/login')
  }

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-cyan-700 to-cyan-900 text-white py-4 px-6 flex justify-between items-center shadow-lg w-full"
    >
      <Link to="/" className="text-2xl font-bold tracking-wide">
        ⚡ Spark AI
      </Link>
      <ul className="flex items-center space-x-6 text-lg">
        {currentUser ? (
          <>
            {/* This now displays the name from the database */}
            <li className="font-semibold">Hi, {currentUser.name}</li>
            <motion.li
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={handleLogout}
              className="cursor-pointer hover:text-cyan-300 transition"
            >
              Logout
            </motion.li>
          </>
        ) : (
          <>
            <motion.li
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link
                to="/login"
                className="cursor-pointer hover:text-cyan-300 transition"
              >
                Login
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link
                to="/signup"
                className="cursor-pointer hover:text-cyan-300 transition"
              >
                Signup
              </Link>
            </motion.li>
          </>
        )}
      </ul>
    </motion.nav>
  )
}

export default Navbar
