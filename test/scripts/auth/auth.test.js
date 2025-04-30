import { expect } from 'chai'
import supertest from 'supertest'
import app from '../../../src/index.js'
import { setup, Auth } from '../../utils/utils.js'

// Before and after actions
setup()

// Tests by endpoint
describe('[Auth] Check', () => {
  it('200 - Running', async () => {
    const response = await supertest(app).get('/api/crud/auth/check')

    expect(response.status).to.equal(200)
    expect(response.body).to.have.property('message', 'Auth running correctly')
  })
})

describe('[Auth] Register', () => {
  it('200 - Valid', async () => {
    const auth = new Auth()
    const response = await auth.register('valid')

    expect(response.status).to.equal(200)
    expect(response.body).to.have.property(
      'message',
      'User created successfully'
    )
  })

  it('400 - Invalid', async () => {
    const auth = new Auth()
    const response = await auth.register('invalid')

    expect(response.status).to.equal(400)
    expect(response.body).to.have.property(
      'message',
      "Invalid field 'lastName'"
    )
  })

  it('409 - Incorrect', async () => {
    const auth = new Auth()
    await auth.register('valid')
    const response = await auth.register('valid')

    expect(response.status).to.equal(409)
    expect(response.body).to.have.property('message', 'Email already exist')
  })
})

describe('[Auth] Login', () => {
  it('200 - Valid', async () => {
    const auth = new Auth()
    await auth.register('valid')
    const response = await auth.login('valid')

    expect(response.status).to.equal(200)
    expect(response.body).to.have.property('message', 'User loged successfully')
  })

  it('400 - Invalid', async () => {
    const auth = new Auth()
    const response = await auth.login('invalid')

    expect(response.status).to.equal(400)
    expect(response.body).to.have.property(
      'message',
      'Invalid email or password'
    )
  })

  it('401 - Incorrect', async () => {
    const auth = new Auth()
    await auth.register('valid')
    const response = await auth.login('incorrect')

    expect(response.status).to.equal(401)
    expect(response.body).to.have.property('message', 'Invalid credentials')
  })

  it('404 - Not found', async () => {
    const auth = new Auth()
    const response = await auth.login('valid')

    expect(response.status).to.equal(404)
    expect(response.body).to.have.property('message', 'Email does not exist')
  })
})

describe('[Auth] Admin', () => {
  it('200 - Valid', async () => {
    const auth = new Auth()
    const response = await auth.admin('valid')

    expect(response.status).to.equal(200)
    expect(response.body).to.have.property(
      'message',
      'Admin loged successfully'
    )
  })

  it('401 - Invalid', async () => {
    const auth = new Auth()
    const response = await auth.admin('invalid')

    expect(response.status).to.equal(401)
    expect(response.body).to.have.property('message', 'Invalid credentials')
  })
})
