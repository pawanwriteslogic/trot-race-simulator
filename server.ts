import express, { Express } from 'express'
import dbConfig from './src/config/DbConfig'
import dotenv from 'dotenv'
import RaceService from './src/services/RaceService'
import { ErrorConstants } from './src/config/ErrorConstants'
import { SuccessConstants } from './src/config/SuccessConstants'
import Logger from './src/config/Logger'
dotenv.config()

// Initialize express
const app: Express = express()
const port = process.env.NODE_PORT || 5000

app.use(express.json())

// Starting server
app.listen(port, async (error: void) => {
  if (error != null) {
    Logger.log(ErrorConstants.SERVER_ERROR)
  } else {
    Logger.log(SuccessConstants.SERVER_CONNECTED + ` ${port}`)

    // Connecting to database
    await dbConfig
      .connectDB()
      .then((isDbConnected) => {
        if (isDbConnected) {
          // Initiating race simulator
          RaceService.initiateRaceSimulator()
        }
      })
      .catch(() => {
        Logger.log(ErrorConstants.DATABASE_CONNECTIION_ERROR)
      })
  }
})
