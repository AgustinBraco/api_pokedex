import express from 'express'
import logger from '../logger/logger.js'
import PokedexDAO from '../DAO/pokedex.dao.js'
import { isValidPokemon, isAuth } from '../middlewares/middlewares.js'
import { Responses, getPokemon } from '../utils/utils.js'

const pokedex = express.Router()

// Check
pokedex.get('/check', (req, res) => {
  try {
    logger.info('GET /api/pokedex/check received')
    return Responses.success(res, 'Pokedex running correctly')
  } catch (error) {
    return Responses.error(res, error)
  }
})

// Get all
pokedex.get('/', isAuth, async (req, res) => {
  try {
    logger.info('GET /api/pokedex received')

    let data

    data = await PokedexDAO.getAll()

    // Convert to JSON
    data = data.map(pokemon => ({
      ...pokemon,
      types: JSON.parse(pokemon.types),
      stats: JSON.parse(pokemon.stats)
    }))

    return Responses.success(res, 'Pokemon retrieved successfully', data)
  } catch (error) {
    return Responses.error(res, error)
  }
})

// Delete all
pokedex.delete('/', isAuth, async (req, res) => {
  try {
    logger.info(`DELETE /api/pokedex received`)

    await PokedexDAO.deleteAll()

    return Responses.success(res, 'Pokemon deleted successfully')
  } catch (error) {
    return Responses.error(res, error)
  }
})

// Create
pokedex.post('/', isAuth, isValidPokemon, async (req, res) => {
  try {
    logger.info('POST /api/pokedex received')

    let pokemon, data, limit

    pokemon = req.pokemon

    // Validate if already exist
    data = await PokedexDAO.get(pokemon.name)
    if (data) return Responses.conflict(res, 'Pokemon already exist')

    limit = await PokedexDAO.getAll()
    if (limit.length >= 6) return Responses.conflict(res, 'Pokemon limit reached')

    await PokedexDAO.create(pokemon)

    return Responses.success(res, 'Pokemon created successfully')
  } catch (error) {
    return Responses.error(res, error)
  }
})

// Get by name
pokedex.get('/:name', isAuth, async (req, res) => {
  try {
    const { name } = req.params
    logger.info(`GET /api/pokedex/${name} received`)

    let data

    // Validate if exist
    data = await PokedexDAO.get(name)
    if (!data) return Responses.notFound(res, 'Pokemon not found')

    // Convert to JSON
    data.types = JSON.parse(data.types)
    data.stats = JSON.parse(data.stats)

    return Responses.success(res, 'Pokemon retrieved successfully', data)
  } catch (error) {
    return Responses.error(res, error)
  }
})

// Delete by name
pokedex.delete('/:name', isAuth, async (req, res) => {
  try {
    const { name } = req.params
    logger.info(`DELETE /api/pokedex/${name} received`)

    let data

    // Validate if exist
    data = await PokedexDAO.get(name)
    if (!data) return Responses.notFound(res, 'Pokemon not found')

    await PokedexDAO.delete(name)

    return Responses.success(res, 'Pokemon deleted successfully')
  } catch (error) {
    return Responses.error(res, error)
  }
})

// Upgrade by name
pokedex.patch('/:name', isAuth, async (req, res) => {
  try {
    const { name } = req.params
    logger.info(`PATCH /api/pokedex/${name} received`)

    let data

    // Validate if exist
    data = await PokedexDAO.get(name)
    if (!data) return Responses.notFound(res, 'Pokemon not found')

    // Update and validate level
    data = await PokedexDAO.upgrade(name)
    if (data.maxLevel)
      return Responses.badRequest(res, 'Pokemon is already at max level (100)')

    return Responses.success(res, 'Pokemon updated successfully')
  } catch (error) {
    return Responses.error(res, error)
  }
})

// Search by name
pokedex.get('/search/:name', isAuth, async (req, res) => {
  try {
    const { name } = req.params
    logger.info(`GET /api/pokedex/search/${name} received`)

    let pokemon

    // Validate if exist
    pokemon = await getPokemon(name)
    if (!pokemon) return Responses.notFound(res, 'Pokemon not found')

    return Responses.success(res, 'Pokemon retrieved successfully', pokemon)
  } catch (error) {
    return Responses.error(res, error)
  }
})

export default pokedex
