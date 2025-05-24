import { expect } from 'chai'
import supertest from 'supertest'
import app from '../../../src/index.js'
import { setup, Auth, User } from '../../utils/utils.js'

// Before and after actions
setup()

// Tests by endpoint
describe('[Users] Check', () => {
  it('200 - Running', async () => {
    const response = await supertest(app).get('/api/pokedex/users/check')

    expect(response.status).to.equal(200)
    expect(response.body).to.have.property('message', 'Users running correctly')
  })
})

describe('[Users] Get all', () => {
  it('200 - Valid', async () => {
    const token = await Auth.admin()
    const user = new User(token)
    const response = await user.getAll()

    expect(response.status).to.equal(200)
    expect(response).to.have.property('message', 'Users retrieved successfully')
  })

  it('401 - No token', async () => {
    const user = new User()
    const response = await user.getAll()

    expect(response.status).to.equal(401)
    expect(response).to.have.property('message', 'Invalid or missing token')
  })

  it('403 - Invalid token', async () => {
    const token = await Auth.user()
    const user = new User(token)
    const response = await user.getAll()

    expect(response.status).to.equal(403)
    expect(response).to.have.property('message', 'Access denied')
  })
})

describe('[Users] Delete all', () => {
  it('200 - Valid', async () => {
    const token = await Auth.admin()
    const user = new User(token)
    const response = await user.deleteAll()

    expect(response.status).to.equal(200)
    expect(response).to.have.property('message', 'Users deleted successfully')
  })

  it('401 - No token', async () => {
    const user = new User()
    const response = await user.deleteAll()

    expect(response.status).to.equal(401)
    expect(response).to.have.property('message', 'Invalid or missing token')
  })

  it('403 - Invalid token', async () => {
    const token = await Auth.user()
    const user = new User(token)
    const response = await user.deleteAll()

    expect(response.status).to.equal(403)
    expect(response).to.have.property('message', 'Access denied')
  })
})

describe('[Users] Create', () => {
  it('200 - Valid', async () => {
    const token = await Auth.admin()
    const user = new User(token)
    const response = await user.create('valid')

    expect(response.status).to.equal(200)
    expect(response).to.have.property('message', 'User created successfully')
  })

  it('400 - Invalid', async () => {
    const token = await Auth.admin()
    const user = new User(token)
    const response = await user.create('invalid')

    expect(response.status).to.equal(400)
    expect(response).to.have.property('message', "Invalid field 'last_name'")
  })

  it('401 - No token', async () => {
    const user = new User()
    const response = await user.create('valid')

    expect(response.status).to.equal(401)
    expect(response).to.have.property('message', 'Invalid or missing token')
  })

  it('403 - Invalid token', async () => {
    const token = await Auth.user()
    const user = new User(token)
    const response = await user.create('valid')

    expect(response.status).to.equal(403)
    expect(response).to.have.property('message', 'Access denied')
  })

  it('409 - Duplicate', async () => {
    const token = await Auth.admin()
    const user = new User(token)
    await user.create('valid')
    const response = await user.create('valid')

    expect(response.status).to.equal(409)
    expect(response).to.have.property('message', 'Email already exist')
  })
})

describe('[Users] Get by ID', () => {
  it('200 - Valid', async () => {
    const token = await Auth.admin()
    const user = new User(token)
    await user.create('valid')
    const response = await user.get('valid')

    expect(response.status).to.equal(200)
    expect(response).to.have.property('message', 'User retrieved successfully')
  })

  it('401 - No token', async () => {
    const user = new User()
    await user.create('valid')
    const response = await user.get('valid')

    expect(response.status).to.equal(401)
    expect(response).to.have.property('message', 'Invalid or missing token')
  })

  it('403 - Invalid token', async () => {
    const token = await Auth.user()
    const user = new User(token)
    await user.create('valid')
    const response = await user.get('valid')

    expect(response.status).to.equal(403)
    expect(response).to.have.property('message', 'Access denied')
  })

  it('404 - Invalid ID', async () => {
    const token = await Auth.admin()
    const user = new User(token)
    await user.create('valid')
    const response = await user.get('invalid')

    expect(response.status).to.equal(404)
    expect(response).to.have.property('message', 'User not found')
  })
})

describe('[Users] Update by ID', () => {
  it('200 - Valid', async () => {
    const token = await Auth.admin()
    const user = new User(token)
    await user.create('valid')
    const response = await user.update('valid')

    expect(response.status).to.equal(200)
    expect(response).to.have.property('message', 'User updated successfully')
  })

  it('400 - Invalid', async () => {
    const token = await Auth.admin()
    const user = new User(token)
    await user.create('valid')
    const response = await user.update('invalid')

    expect(response.status).to.equal(400)
    expect(response).to.have.property('message', "Invalid field 'last_name'")
  })

  it('401 - No token', async () => {
    const user = new User()
    const response = await user.update('valid')

    expect(response.status).to.equal(401)
    expect(response).to.have.property('message', 'Invalid or missing token')
  })

  it('403 - Invalid token', async () => {
    const token = await Auth.user()
    const user = new User(token)
    const response = await user.update('valid')

    expect(response.status).to.equal(403)
    expect(response).to.have.property('message', 'Access denied')
  })

  it('404 - Not found', async () => {
    const token = await Auth.admin()
    const user = new User(token)
    const response = await user.update('notFound')

    expect(response.status).to.equal(404)
    expect(response).to.have.property('message', 'User not found')
  })

  it('409 - Duplicate', async () => {
    const token = await Auth.admin()
    const user = new User(token)
    await user.create('valid')
    await user.create('duplicate')
    const response = await user.update('duplicate')

    expect(response.status).to.equal(409)
    expect(response).to.have.property('message', 'Email already exist')
  })
})

describe('[Users] Delete by ID', () => {
  it('200 - Valid', async () => {
    const token = await Auth.admin()
    const user = new User(token)
    await user.create('valid')
    const response = await user.delete('valid')

    expect(response.status).to.equal(200)
    expect(response).to.have.property('message', 'User deleted successfully')
  })

  it('401 - No token', async () => {
    const user = new User()
    await user.create('valid')
    const response = await user.delete('valid')

    expect(response.status).to.equal(401)
    expect(response).to.have.property('message', 'Invalid or missing token')
  })

  it('403 - Invalid token', async () => {
    const token = await Auth.user()
    const user = new User(token)
    await user.create('valid')
    const response = await user.delete('valid')

    expect(response.status).to.equal(403)
    expect(response).to.have.property('message', 'Access denied')
  })

  it('404 - Invalid ID', async () => {
    const token = await Auth.admin()
    const user = new User(token)
    await user.create('valid')
    const response = await user.delete('invalid')

    expect(response.status).to.equal(404)
    expect(response).to.have.property('message', 'User not found')
  })
})
