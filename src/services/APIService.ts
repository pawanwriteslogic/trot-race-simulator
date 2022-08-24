import axios from 'axios'
import { ErrorConstants } from '../config/ErrorConstants'
import Logger from '../config/Logger'
import IApiRequest from '../interfaces/IApiRequest'

class APIService {
  // Common API call for all the requests
  public async callAPI(parameters: IApiRequest) {
    try {
      const baseURL: string = process.env.BASE_URL || ''
      const apiURL: string = baseURL + parameters.endpoint

      const apiCallParams = {
        url: apiURL,
        method: parameters.method,
        headers: parameters.headers,
        data: parameters.params,
      }

      // API call with axios
      const response = await axios(apiCallParams)
      return response
    } catch (error) {
      Logger.log(ErrorConstants.API_CALL_ERROR)
      return error
    }
  }
}

export default new APIService()
