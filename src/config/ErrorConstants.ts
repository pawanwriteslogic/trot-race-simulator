// Enum for consoling errors
export enum ErrorConstants {
  SERVER_ERROR = 'Internal Server Error!',
  DATABASE_CONNECTIION_ERROR = 'Error connecting to database!',
  TOKEN_ERROR = 'Error getting token',
  GET_RACE_EVENTS_ERROR = 'Error getting race events',
  SAVE_RACE_EVENTS_ERROR = 'Error saving race events',
  USER_AUTHENTICATION_ERROR = 'Error getting token in user authentication',
  API_CALL_ERROR = 'Error in calling API',
  UNAUTHORIZED = 'Invalid Credentials',
  NO_CONTENT = 'Server is busy. Wait and try again.',
  TOKEN_MISSING = 'Authentication token is missing, or does not match an active session',
  TIME_OUT = 'Request timed out while waiting for new events',
}
