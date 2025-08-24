/* eslint-disable no-unused-vars */
// Footer.jsx
import React from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-200 py-6 mt-10"
    >
      <div className="text-center space-y-2 flex flex-col items-center justify-center">
        <p className="font-semibold">
          &copy; 2025 Spark AI. All rights reserved.
        </p>
        <p className="text-sm">Empowering AI education and innovation.</p>
      </div>
    </motion.footer>
  )
}

export default Footer
