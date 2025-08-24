// controllers/auth.controller.js
import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

// --- REGISTER ---
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' })
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    })

    await newUser.save()
    res.status(201).json({ message: 'User registered successfully!' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// --- LOGIN ---
export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'Invalid credentials' })
    }

    const isMatch = await bcryptjs.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d', // Token expires in 1 day
    })

    // Exclude password from the user object that gets sent in the response
    const { password: userPassword, ...userInfo } = user._doc

    res
      .cookie('token', token, {
        httpOnly: true, // Prevents client-side JS from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'strict', // Mitigates CSRF attacks
      })
      .status(200)
      .json(userInfo)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// --- LOGOUT ---
export const logout = (req, res) => {
  try {
    res
      .clearCookie('token')
      .status(200)
      .json({ message: 'Logged out successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
