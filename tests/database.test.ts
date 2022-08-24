import DbConfig from '../src/config/DbConfig'
import IHorseData from '../src/interfaces/IHorseData'
import { Event } from '../src/models/Events'

describe('Trot race events', () => {
  let event: IHorseData

  beforeAll(() => {
    event = {
      event: 'start',
      horse: {
        id: 1,
        name: 'Stellar',
      },
      time: 0,
    }
  })
  it('Should connect to the database', async () => {
    const connect = await DbConfig.connectDB()
    expect(connect).toBeTruthy()
  })
  it('Should save the data in the database', async () => {
    const dataToSave = await new Event(event)
    const response = await dataToSave.save()
    expect(response).toBeTruthy()
  })
  afterAll((done) => {
    DbConfig.closeConnection()
    done()
  })
})
