import { ENDPOINTS, HEADERS, METHODS } from '../config/CommonConstants'
import IApiRequest from '../interfaces/IApiRequest'
import IUserAuth from '../interfaces/IUserAuth'
import IEventResponse from '../interfaces/IEventReponse'
import IAuthResponse from '../interfaces/IAuthResponse'
import APIService from './APIService'
import { Event } from '../models/Events'
import { ErrorConstants } from '../config/ErrorConstants'
import Logger from '../config/Logger'

class EventService {
  // Authenticating user
  public async authenticateUser(): Promise<IAuthResponse> {
    let token: string = ''
    let response: any
    try {
      const userCredentials: IUserAuth = {
        email: process.env.USER_EMAIL || '',
        password: process.env.USER_PASSWORD || '',
      }

      const params: IApiRequest = {
        endpoint: ENDPOINTS.AUTH,
        method: METHODS.POST,
        params: userCredentials,
        headers: HEADERS,
        token: '',
      }

      // Calling API for authenticating user
      response = await APIService.callAPI(params)
      token = response?.data?.token
      process.env.TOKEN_KEY = 'Bearer ' + token
    } catch (error) {
      Logger.log(ErrorConstants.USER_AUTHENTICATION_ERROR)
      return response
    }
    return response
  }

  // Get race events
  public async getRaceEvents(): Promise<IEventResponse> {
    let events: any

    const token = process.env.TOKEN_KEY || ''
    try {
      const params: IApiRequest = {
        endpoint: ENDPOINTS.RESULT,
        method: METHODS.GET,
        token: '',
        headers: {
          ...HEADERS,
          Authorization: token,
        },
      }

      // Calling API for getting race events
      const response = await APIService.callAPI(params)
      events = response
      Logger.log(`'events:'  ${JSON.stringify(events?.data)}`)
    } catch (error) {
      Logger.log(ErrorConstants.GET_RACE_EVENTS_ERROR)
    }
    return events
  }

  // Saving race events in the database
  public async saveRaceEvents(params: any) {
    try {
      const dataToSave = new Event({
        event: params.event,
        horse: params.horse,
        time: params.time,
      })

      await dataToSave.save()
    } catch (error) {
      Logger.log(ErrorConstants.SAVE_RACE_EVENTS_ERROR)
    }
  }
}

export default new EventService()
