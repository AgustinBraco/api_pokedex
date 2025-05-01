import { expect } from 'chai'
import supertest from 'supertest'
import app from '../../../src/index.js'
import { setup, Auth, Product } from '../../utils/utils.js'

// Before and after actions
setup()

// Tests by endpoint
describe('[Products] Check', () => {
  it('200 - Running', async () => {
    const response = await supertest(app).get('/api/crud/products/check')

    expect(response.status).to.equal(200)
    expect(response.body).to.have.property(
      'message',
      'Products running correctly'
    )
  })
})

describe('[Products] Get all', () => {
  it('200 - Valid', async () => {
    const response = await supertest(app).get('/api/crud/products')

    expect(response.status).to.equal(200)
    expect(response.body).to.have.property(
      'message',
      'Products retrieved successfully'
    )
  })
})

describe('[Products] Get by ID', () => {
  it('200 - Valid', async () => {
    const token = await Auth.admin()
    const product = new Product(token)
    const result = await product.create('valid')

    const response = await supertest(app).get(
      `/api/crud/products/${result.data._id}`
    )

    expect(response.status).to.equal(200)
    expect(response.body).to.have.property(
      'message',
      'Product retrieved successfully'
    )
  })

  it('404 - Invalid ID', async () => {
    const token = await Auth.admin()
    const product = new Product(token)
    const response = await supertest(app).get(
      `/api/crud/products/${product.invalidID()}`
    )

    expect(response.status).to.equal(404)
    expect(response.body).to.have.property('message', 'Product not found')
  })
})

describe('[Products] Create', () => {
  it('200 - Valid', async () => {
    const token = await Auth.admin()
    const product = new Product(token)
    const response = await product.create('valid')

    expect(response.status).to.equal(200)
    expect(response).to.have.property('message', 'Product created successfully')
  })

  it('400 - Invalid', async () => {
    const token = await Auth.admin()
    const product = new Product(token)
    const response = await product.create('invalid')

    expect(response.status).to.equal(400)
    expect(response).to.have.property('message', "Invalid field 'category'")
  })

  it('401 - No token', async () => {
    const product = new Product()
    const response = await product.create('valid')

    expect(response.status).to.equal(401)
    expect(response).to.have.property('message', 'Invalid or missing token')
  })

  it('403 - Invalid token', async () => {
    const token = await Auth.user()
    const product = new Product(token)
    const response = await product.create('valid')

    expect(response.status).to.equal(403)
    expect(response).to.have.property('message', 'Access denied')
  })
})

describe('[Products] Update by ID', () => {
  it('200 - Valid', async () => {
    const token = await Auth.admin()
    const product = new Product(token)
    const result = await product.create('valid')
    const response = await product.update(result.data, 'valid')

    expect(response.status).to.equal(200)
    expect(response).to.have.property('message', 'Product updated successfully')
  })

  it('400 - Invalid', async () => {
    const token = await Auth.admin()
    const product = new Product(token)
    const result = await product.create('valid')
    const response = await product.update(result.data, 'invalid')

    expect(response.status).to.equal(400)
    expect(response).to.have.property('message', "Invalid field 'category'")
  })

  it('401 - No token', async () => {
    const product = new Product()
    const response = await product.update({}, 'valid')

    expect(response.status).to.equal(401)
    expect(response).to.have.property('message', 'Invalid or missing token')
  })

  it('403 - Invalid token', async () => {
    const token = await Auth.user()
    const product = new Product(token)
    const response = await product.update({}, 'valid')

    expect(response.status).to.equal(403)
    expect(response).to.have.property('message', 'Access denied')
  })

  it('404 - Invalid ID', async () => {
    const token = await Auth.admin()
    const product = new Product(token)
    const response = await product.update({}, 'invalidID')

    expect(response.status).to.equal(404)
    expect(response).to.have.property('message', 'Product not found')
  })
})

describe('[Products] Delete by ID', () => {
  it('200 - Valid', async () => {
    const token = await Auth.admin()
    const product = new Product(token)
    const result = await product.create('valid')
    const response = await product.delete(result.data)

    expect(response.status).to.equal(200)
    expect(response).to.have.property('message', 'Product deleted successfully')
  })

  it('401 - No token', async () => {
    const product = new Product()
    const response = await product.delete({}, 'valid')

    expect(response.status).to.equal(401)
    expect(response).to.have.property('message', 'Invalid or missing token')
  })

  it('403 - Invalid token', async () => {
    const token = await Auth.user()
    const product = new Product(token)
    const response = await product.delete({}, 'valid')

    expect(response.status).to.equal(403)
    expect(response).to.have.property('message', 'Access denied')
  })

  it('404 - Invalid ID', async () => {
    const token = await Auth.admin()
    const product = new Product(token)
    const response = await product.delete({}, 'valid')

    expect(response.status).to.equal(404)
    expect(response).to.have.property('message', 'Product not found')
  })
})

describe('[Products] Delete all', () => {
  it('200 - Valid', async () => {
    const token = await Auth.admin()

    const response = await supertest(app)
      .delete('/api/crud/products')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).to.equal(200)
    expect(response.body).to.have.property(
      'message',
      'Products deleted successfully'
    )
  })

  it('401 - No token', async () => {
    const response = await supertest(app)
      .delete('/api/crud/products')
      .set('Authorization', 'Bearer ')

    expect(response.status).to.equal(401)
    expect(response.body).to.have.property(
      'message',
      'Invalid or missing token'
    )
  })

  it('403 - Invalid token', async () => {
    const token = await Auth.user()

    const response = await supertest(app)
      .delete('/api/crud/products')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).to.equal(403)
    expect(response.body).to.have.property('message', 'Access denied')
  })
})
