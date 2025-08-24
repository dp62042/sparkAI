/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      // --- DEBUGGING STEP ---
      // First, get the raw text from the response to see what the server is actually sending.
      const responseText = await res.text()
      console.log('Raw Server Response:', responseText)

      // Now, try to parse it as JSON.
      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        // If parsing fails, it means the response wasn't JSON.
        // We'll throw an error with the raw text to make debugging easier.
        throw new Error(
          `Server sent an invalid response. \nResponse: ${responseText}`
        )
      }
      // --- END DEBUGGING STEP ---

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create an account')
      }

      setLoading(false)
      // On successful registration, redirect to the login page
      navigate('/login')
    } catch (err) {
      setLoading(false)
      setError(err.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-cyan-700 to-cyan-900 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md sm:p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 sm:text-3xl">
          Create an Account for ⚡Spark AI
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Dharmendra Pandit"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="pandit@gmail.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="••••••••"
            />
          </div>
          <div className="text-sm text-center text-gray-600">
            <p>
              Already have an account?
              <Link
                to={'/login'}
                className="mx-2 font-semibold text-cyan-600 hover:text-cyan-500"
              >
                Login
              </Link>
            </p>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-cyan-600 border border-transparent rounded-md shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:bg-cyan-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
          {error && (
            <pre className="text-sm text-center text-red-500 whitespace-pre-wrap">
              {error}
            </pre>
          )}
        </form>
      </div>
    </div>
  )
}

export default Signup
