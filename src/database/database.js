import mongoose from 'mongoose'
import environment from '../environment/environment.js'

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${environment.DB_USER}:${environment.DB_PASSWORD}@cluster0.gtrolit.mongodb.net/api_crud?retryWrites=true&w=majority&appName=Cluster0`)
    console.log('Database connected successfully')
  } catch (error) {
    console.error('Error when connecting with database', error)
    process.exit(1)
  }
}

export default connectDB
