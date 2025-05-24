import logger from '../logger/logger.js'
import PokedexDTO from '../DTO/pokedex.dto.js'
import { Responses } from '../utils/utils.js'

export const isValidPokemon = async (req, res, next) => {
  logger.info(`Pokedex middleware receive ${req.method} ${req.originalUrl}`)

  const {
    name,
    image,
    types,
    category,
    generation,
    height,
    weight,
    stats,
    level
  } = req.body

  const pokemon = new PokedexDTO({
    name,
    image,
    types,
    category,
    generation,
    height,
    weight,
    stats,
    level
  })

  // Validate fields
  const numberFields = ['height', 'weight', 'level']
  const textFields = [
    'name',
    'image',
    'types',
    'category',
    'generation',
    'stats'
  ]

  for (const field of textFields)
    if (typeof pokemon[field] !== 'string' || pokemon[field].trim() === '')
      return Responses.badRequest(res, `Invalid field '${field}'`)

  for (const field of numberFields)
    if (typeof pokemon[field] !== 'number' || isNaN(pokemon[field]))
      return Responses.badRequest(res, `Invalid field '${field}'`)

  req.pokemon = pokemon
  logger.info(`Pokedex middleware passed`)
  return next()
}
