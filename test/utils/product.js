import supertest from 'supertest'
import app from '../../src/index.js'
import { products } from './data.js'

export class Product {
  constructor(token) {
    this.token = token
    this.client = supertest(app)
  }

  async create(type) {
    const result = await this.client
      .post('/api/crud/products')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`)
      .send(products[type])

    const response = JSON.parse(result.res.text)
    response.status = result.status
    return response
  }

  async update(product, type) {
    if (type === 'invalidID') {
      const result = await this.client
        .put(`/api/crud/products/${products.invalidID}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.token}`)
        .send(products.valid)

      const response = JSON.parse(result.res.text)
      response.status = result.status
      return response
    }

    const result = await this.client
      .put(`/api/crud/products/${product._id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`)
      .send(products[type])

    const response = JSON.parse(result.res.text)
    response.status = result.status
    return response
  }

  async delete(product, type) {
    if (type) {
      const result = await this.client
        .delete(`/api/crud/products/${products.invalidID}`)
        .set('Authorization', `Bearer ${this.token}`)

      const response = JSON.parse(result.res.text)
      response.status = result.status
      return response
    }

    const result = await this.client
      .delete(`/api/crud/products/${product._id}`)
      .set('Authorization', `Bearer ${this.token}`)

    const response = JSON.parse(result.res.text)
    response.status = result.status
    return response
  }

  invalidID() {
    return products.invalidID
  }
}
