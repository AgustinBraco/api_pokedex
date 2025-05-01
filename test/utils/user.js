import supertest from 'supertest'
import app from '../../src/index.js'
import { users } from './data.js'

export class User {
  constructor(token) {
    this.token = token
    this.client = supertest(app)
  }

  async create(type) {
    const result = await this.client
      .post('/api/crud/users')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`)
      .send(users[type])

    const response = JSON.parse(result.res.text)
    response.status = result.status
    return response
  }

  async update(user, type) {
    if (type === 'invalidID') {
      const result = await this.client
        .put(`/api/crud/users/${users.invalidID}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.token}`)
        .send(users.valid)

      const response = JSON.parse(result.res.text)
      response.status = result.status
      return response
    }

    if (type === 'duplicate') {
      const result = await this.client
        .put(`/api/crud/users/${user._id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.token}`)
        .send(users.valid)

      const response = JSON.parse(result.res.text)
      response.status = result.status
      return response
    }

    const result = await this.client
      .put(`/api/crud/users/${user._id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`)
      .send(users[type])

    const response = JSON.parse(result.res.text)
    response.status = result.status
    return response
  }

  async delete(user, type) {
    if (type) {
      const result = await this.client
        .delete(`/api/crud/users/${users.invalidID}`)
        .set('Authorization', `Bearer ${this.token}`)

      const response = JSON.parse(result.res.text)
      response.status = result.status
      return response
    }

    const result = await this.client
      .delete(`/api/crud/users/${user._id}`)
      .set('Authorization', `Bearer ${this.token}`)

    const response = JSON.parse(result.res.text)
    response.status = result.status
    return response
  }

  invalidID() {
    return users.invalidID
  }
}
