import { Method } from 'axios'

// Constants for API methods
export const METHODS = {
  GET: 'GET' as Method,
  POST: 'POST' as Method,
}

// Constants for API endpoints
export const ENDPOINTS = {
  AUTH: '/auth',
  RESULT: '/results',
}

// Constants for API headers
export const HEADERS = {
  'Content-Type': 'application/json',
}

// Event detay for long polling in seconds
export const RACE_DELAY = 15 * 1000
