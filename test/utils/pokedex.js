import supertest from 'supertest'
import app from '../../src/index.js'
import { pokedex } from './data.js'

export class Pokedex {
  constructor(token) {
    this.token = token
    this.client = supertest(app)
  }

  async getAll() {
    const result = await this.client
      .get('/api/pokedex')
      .set('Authorization', `Bearer ${this.token}`)

    const response = JSON.parse(result.res.text)
    response.status = result.status
    return response
  }

  async deleteAll() {
    const result = await this.client
      .delete('/api/pokedex')
      .set('Authorization', `Bearer ${this.token}`)

    const response = JSON.parse(result.res.text)
    response.status = result.status
    return response
  }

  async get(type) {
    const result = await this.client
      .get(`/api/pokedex/${pokedex.name[type]}`)
      .set('Authorization', `Bearer ${this.token}`)

    const response = JSON.parse(result.res.text)
    response.status = result.status
    return response
  }

  async create(type) {
    const result = await this.client
      .post('/api/pokedex')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`)
      .send(pokedex[type])

    const response = JSON.parse(result.res.text)
    response.status = result.status
    return response
  }

  async upgrade(type) {
    const result = await this.client
      .patch(`/api/pokedex/${pokedex.name[type]}`)
      .set('Authorization', `Bearer ${this.token}`)

    const response = JSON.parse(result.res.text)
    response.status = result.status
    return response
  }

  async delete(type) {
    const result = await this.client
      .delete(`/api/pokedex/${pokedex.name[type]}`)
      .set('Authorization', `Bearer ${this.token}`)

    const response = JSON.parse(result.res.text)
    response.status = result.status
    return response
  }

  async search(type) {
    const result = await this.client
      .get(`/api/pokedex/search/${pokedex.name[type]}`)
      .set('Authorization', `Bearer ${this.token}`)

    const response = JSON.parse(result.res.text)
    response.status = result.status
    return response
  }
}
