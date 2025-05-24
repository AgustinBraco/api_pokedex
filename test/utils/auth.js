import supertest from 'supertest'
import app from '../../src/index.js'
import { auth } from './data.js'

export class Auth {
  constructor() {
    this.client = supertest(app)
  }

  async register(type) {
    return await this.client
      .post('/api/pokedex/auth/register')
      .set('Content-Type', 'application/json')
      .send(auth.register[type])
  }

  async login(type) {
    return await this.client
      .post('/api/pokedex/auth/login')
      .set('Content-Type', 'application/json')
      .send(auth.login[type])
  }

  async admin(type) {
    return await this.client
      .post('/api/pokedex/auth/login/admin')
      .set('Content-Type', 'application/json')
      .set('admin_key', auth.admin.key)
      .send(auth.admin[type])
  }

  static async admin() {
    const response = await supertest(app)
      .post('/api/pokedex/auth/login/admin')
      .set('Content-Type', 'application/json')
      .set('admin_key', auth.admin.key)
      .send(auth.admin.valid)

    const data = JSON.parse(response.res.text)
    return data.data
  }

  static async user() {
    const response = await supertest(app)
      .post('/api/pokedex/auth/register')
      .set('Content-Type', 'application/json')
      .send(auth.register.valid)

    const data = JSON.parse(response.res.text)
    return data.data
  }
}
