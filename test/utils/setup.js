import mongoose from 'mongoose'

export const setup = () => {
  // Wait mongoose connection
  before(async () => {
    if (mongoose.connection.readyState === 0)
      throw new Error('Mongoose is not connected')
  })

  // Delete collections before each test
  beforeEach(async () => {
    const collections = mongoose.connection.collections
    for (const key in collections) await collections[key].deleteMany({})
  })

  // Delete collections after tests
  after(async () => {
    const collections = mongoose.connection.collections
    for (const key in collections) await collections[key].deleteMany({})
  })
}
