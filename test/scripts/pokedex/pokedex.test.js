import { expect } from 'chai'
import supertest from 'supertest'
import app from '../../../src/index.js'
import { setup, Auth, Pokedex } from '../../utils/utils.js'

// Before and after actions
setup()

// Tests by endpoint
describe('[Pokedex] Check', () => {
  it('200 - Running', async () => {
    const response = await supertest(app).get('/api/pokedex/check')

    expect(response.status).to.equal(200)
    expect(response.body).to.have.property(
      'message',
      'Pokedex running correctly'
    )
  })
})

describe('[Pokedex] Get all', () => {
  it('200 - Valid', async () => {
    const token = await Auth.user()
    const pokedex = new Pokedex(token)
    const response = await pokedex.getAll()

    expect(response.status).to.equal(200)
    expect(response).to.have.property(
      'message',
      'Pokemon retrieved successfully'
    )
  })

  it('401 - No token', async () => {
    const pokedex = new Pokedex()
    const response = await pokedex.getAll()

    expect(response.status).to.equal(401)
    expect(response).to.have.property('message', 'Invalid or missing token')
  })
})

describe('[Pokedex] Delete all', () => {
  it('200 - Valid', async () => {
    const token = await Auth.user()
    const pokedex = new Pokedex(token)
    const response = await pokedex.deleteAll()

    expect(response.status).to.equal(200)
    expect(response).to.have.property('message', 'Pokemon deleted successfully')
  })

  it('401 - No token', async () => {
    const pokedex = new Pokedex()
    const response = await pokedex.deleteAll()

    expect(response.status).to.equal(401)
    expect(response).to.have.property('message', 'Invalid or missing token')
  })
})

describe('[Pokedex] Create', () => {
  it('200 - Valid', async () => {
    const token = await Auth.user()
    const pokedex = new Pokedex(token)
    const response = await pokedex.create('valid')

    expect(response.status).to.equal(200)
    expect(response).to.have.property('message', 'Pokemon created successfully')
  })

  it('400 - Invalid', async () => {
    const token = await Auth.user()
    const pokedex = new Pokedex(token)
    const response = await pokedex.create('invalid')

    expect(response.status).to.equal(400)
    expect(response).to.have.property('message', "Invalid field 'category'")
  })

  it('401 - No token', async () => {
    const pokedex = new Pokedex()
    const response = await pokedex.create('valid')

    expect(response.status).to.equal(401)
    expect(response).to.have.property('message', 'Invalid or missing token')
  })

  it('409 - Duplicate', async () => {
    const token = await Auth.user()
    const pokedex = new Pokedex(token)
    await pokedex.create('valid')
    const response = await pokedex.create('valid')

    expect(response.status).to.equal(409)
    expect(response).to.have.property('message', 'Pokemon already exist')
  })
})

describe('[Pokedex] Get by name', () => {
  it('200 - Valid', async () => {
    const token = await Auth.user()
    const pokedex = new Pokedex(token)
    await pokedex.create('valid')
    const response = await pokedex.get('valid')

    expect(response.status).to.equal(200)
    expect(response).to.have.property(
      'message',
      'Pokemon retrieved successfully'
    )
  })

  it('401 - No token', async () => {
    const pokedex = new Pokedex()
    await pokedex.create('valid')
    const response = await pokedex.get('valid')

    expect(response.status).to.equal(401)
    expect(response).to.have.property('message', 'Invalid or missing token')
  })

  it('404 - Invalid ID', async () => {
    const token = await Auth.user()
    const pokedex = new Pokedex(token)
    await pokedex.create('valid')
    const response = await pokedex.get('invalid')

    expect(response.status).to.equal(404)
    expect(response).to.have.property('message', 'Pokemon not found')
  })
})

describe('[Pokedex] Delete by name', () => {
  it('200 - Valid', async () => {
    const token = await Auth.user()
    const pokedex = new Pokedex(token)
    await pokedex.create('valid')
    const response = await pokedex.delete('valid')

    expect(response.status).to.equal(200)
    expect(response).to.have.property('message', 'Pokemon deleted successfully')
  })

  it('401 - No token', async () => {
    const pokedex = new Pokedex()
    await pokedex.create('valid')
    const response = await pokedex.delete('valid')

    expect(response.status).to.equal(401)
    expect(response).to.have.property('message', 'Invalid or missing token')
  })

  it('404 - Invalid ID', async () => {
    const token = await Auth.user()
    const pokedex = new Pokedex(token)
    await pokedex.create('valid')
    const response = await pokedex.delete('invalid')

    expect(response.status).to.equal(404)
    expect(response).to.have.property('message', 'Pokemon not found')
  })
})

describe('[Pokedex] Upgrade by name', () => {
  it('200 - Valid', async () => {
    const token = await Auth.user()
    const user = new Pokedex(token)
    await user.create('valid')
    const response = await user.upgrade('valid')

    expect(response.status).to.equal(200)
    expect(response).to.have.property('message', 'Pokemon updated successfully')
  })

  it('401 - No token', async () => {
    const user = new Pokedex()
    const response = await user.upgrade('valid')

    expect(response.status).to.equal(401)
    expect(response).to.have.property('message', 'Invalid or missing token')
  })

  it('404 - Invalid ID', async () => {
    const token = await Auth.user()
    const user = new Pokedex(token)
    await user.create('valid')
    const response = await user.upgrade('invalid')

    expect(response.status).to.equal(404)
    expect(response).to.have.property('message', 'Pokemon not found')
  })
})

describe('[Pokedex] Search by name', () => {
  it('200 - Valid', async () => {
    const token = await Auth.user()
    const pokedex = new Pokedex(token)
    const response = await pokedex.search('valid')

    expect(response.status).to.equal(200)
    expect(response).to.have.property(
      'message',
      'Pokemon retrieved successfully'
    )
  })

  it('401 - No token', async () => {
    const pokedex = new Pokedex()
    await pokedex.create('valid')
    const response = await pokedex.search('valid')

    expect(response.status).to.equal(401)
    expect(response).to.have.property('message', 'Invalid or missing token')
  })

  it('404 - Invalid ID', async () => {
    const token = await Auth.user()
    const pokedex = new Pokedex(token)
    const response = await pokedex.search('invalid')

    expect(response.status).to.equal(404)
    expect(response).to.have.property('message', 'Pokemon not found')
  })
})
