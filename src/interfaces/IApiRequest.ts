import { Method } from 'axios'

// Interface for API requests
export default interface IApiRequest {
  endpoint: string
  method: Method
  headers: any
  token: string
  params?: any
}
