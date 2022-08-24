import { StatusCodes } from 'http-status-codes'
import { RACE_DELAY } from '../config/CommonConstants'
import EventService from './EventService'
import { ErrorConstants } from '../config/ErrorConstants'
import Logger from '../config/Logger'
import { SuccessConstants } from '../config/SuccessConstants'

class RaceService {
  // Starting race server
  public async initiateRaceSimulator() {
    // Authenticating user
    await EventService.authenticateUser()
      .then((response: any) => {
        if (response?.response?.status === StatusCodes.UNAUTHORIZED) {
          // User Unauthorized
          Logger.log(ErrorConstants.UNAUTHORIZED, StatusCodes.UNAUTHORIZED)
        } else if (
          response?.response?.status === StatusCodes.SERVICE_UNAVAILABLE
        ) {
          // Service unavailable
          this.initiateRaceSimulator()
          Logger.log(ErrorConstants.NO_CONTENT, StatusCodes.SERVICE_UNAVAILABLE)
        } else if (response?.status === StatusCodes.OK) {
          // Getting race events
          Logger.log(SuccessConstants.SUCCESSFUL_AUTHENTICATION, StatusCodes.OK)
          this.beginTrotRace()
        }
      })
      .catch(() => {
        // Go back to authenticating user
        Logger.log(ErrorConstants.TOKEN_ERROR)
      })
  }

  // Getting race events and processing
  private async beginTrotRace() {
    // Getting race events
    await EventService.getRaceEvents()
      .then(async (events: any) => {
        if (events.status === StatusCodes.OK) {
          // save race events
          await EventService.saveRaceEvents(events?.data)
          this.beginTrotRace()
          Logger.log(SuccessConstants.SUCCESSFUL_REQUEST, StatusCodes.OK)
        } else if (events?.response?.status === StatusCodes.UNAUTHORIZED) {
          // User authorized
          this.initiateRaceSimulator()
          Logger.log(ErrorConstants.TOKEN_MISSING, StatusCodes.UNAUTHORIZED)
        } else if (events.status === StatusCodes.NO_CONTENT) {
          // In case of no data, check for events after event delay
          setTimeout(() => {
            this.beginTrotRace()
          }, RACE_DELAY)
          Logger.log(ErrorConstants.TIME_OUT, StatusCodes.NO_CONTENT)
        }
      })
      .catch(() => {
        // Go back to authenticating user
        Logger.log(ErrorConstants.GET_RACE_EVENTS_ERROR)
        this.initiateRaceSimulator()
      })
  }
}

export default new RaceService()
