import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const url = process.env.MONGO_URI
export const connectDb = async () => {
  try {
    await mongoose.connect(url).then(() => {
      console.log('Database connected successfully!')
    })
  } catch (error) {
    console.log('there is error in database connection!')
  }
}
