import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { ErrorConstants } from './ErrorConstants'
import { SuccessConstants } from './SuccessConstants'
import Logger from './Logger'
dotenv.config()

class DbConfig {
  public dbURL: string

  constructor() {
    this.dbURL = process.env.MONGO_DB_URL || ''
  }

  // Create database connection
  async connectDB() {
    return await mongoose
      .connect(this.dbURL)
      .then(() => {
        Logger.log(SuccessConstants.DATABASE_CONNECTED)
        return true
      })
      .catch(() => {
        Logger.log(ErrorConstants.DATABASE_CONNECTIION_ERROR)
        return false
      })
  }

  // Close database connection
  async closeConnection() {
    mongoose.connection.close()
  }
}

export default new DbConfig()
