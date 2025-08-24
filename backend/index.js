import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDb } from './db.js'
import { GoogleGenerativeAI } from '@google/generative-ai' // correct import

const app = express()

const PORT = process.env.PORT || 3001
const APIKEY = process.env.APIKEY

import authRoutes from './routes/auth.routes.js'

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)
app.use(express.json())
app.use(cookieParser())

// Connect Database
connectDb()

// Initialize Gemini
const genAI = new GoogleGenerativeAI(APIKEY)

// Routes
app.use('/api/auth', authRoutes)

// AI Generation Endpoint
app.post('/ai', async (req, res, next) => {
  try {
    const { prompt } = req.body

    if (!prompt || prompt.trim() === '') {
      return res.status(400).json({ error: 'Prompt is required' })
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const result = await model.generateContent(prompt)

    res.json({ response: result.response.text() })
  } catch (error) {
    next(error) // pass to error handler
  }
})

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('AI Error:', err.message)

  if (err.name === 'TypeError' && err.message.includes('fetch failed')) {
    return res.status(503).json({
      error: 'AI service is temporarily unavailable. Please try again later.',
    })
  }

  res.status(500).json({
    error: 'Something went wrong. Please try again later.',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined,
  })
})

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
})
