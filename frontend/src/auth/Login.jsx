import React, { useContext } from 'react' // Import useContext
import { Link, useNavigate } from 'react-router-dom'
// Import your AuthContext, ensuring the path is correct relative to this file.
import { AuthContext } from '../components/AuthProvider.jsx'

const Login = () => {
  const [formData, setFormData] = React.useState({ email: '', password: '' })
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()

  // Get the login function from the global context
  const { login } = useContext(AuthContext)

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
      // Make the API call to your backend
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      // Handle errors from the API
      if (!res.ok) {
        throw new Error(data.message || 'Failed to login')
      }

      // --- THIS IS THE FIX ---
      // On successful login, update the global state with the user data from the API
      login(data)

      setLoading(false)
      navigate('/') // Now this redirect will work correctly
    } catch (err) {
      setLoading(false)
      setError(err.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-cyan-700 to-cyan-900 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md sm:p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 sm:text-3xl">
          Login ⚡Spark AI
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="••••••••"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
              />
              <label
                htmlFor="remember-me"
                className="block ml-2 text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-cyan-600 hover:text-cyan-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div className="text-sm text-center text-gray-600">
            <p>
              Don't have an account?
              <Link
                to={'/signup'}
                className="font-semibold text-cyan-600 hover:text-cyan-500 mx-2"
              >
                Sign up
              </Link>
            </p>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-cyan-600 border border-transparent rounded-md shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:bg-cyan-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          {error && <p className="text-sm text-center text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login
