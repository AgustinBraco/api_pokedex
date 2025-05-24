import logger from '../logger/logger.js'

export const getPokemon = async pokemon => {
  try {
    logger.info(`Requesting "${pokemon}" to PokeAPI`)

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`

    const res = await fetch(url)
    if (!res.ok) return false

    // Basic information
    const data = await res.json()
    const name = data.name
    const image = data.sprites.front_default
    const height = data.height / 10 // (decimeters to meters)
    const weight = data.weight / 10 // (hectograms to kilos)

    // Types
    const typesData = data.types.map(t => t.type.name)
    const types = [typesData[0], typesData[1] || '']

    // Stats
    const stats = {}
    data.stats.forEach(s => (stats[s.stat.name] = s.base_stat))

    // Category
    let category

    const speciesRes = await fetch(data.species.url)
    const speciesData = await speciesRes.json()

    const isLegenday = speciesData.is_legendary
    const isMythical = speciesData.is_mythical

    if (isLegenday) category = 'Legendary'
    else if (isMythical) category = 'Mythic'
    else category = 'Common'

    // Format fields
    const generation = speciesData.generation.name.replace('generation-', '')
    const special_attack = stats['special-attack']
    const special_defense = stats['special-defense']

    const result = {
      name,
      image,
      types,
      category,
      generation,
      height,
      weight,
      stats: {
        hp: stats.hp,
        speed: stats.speed,
        attack: stats.attack,
        special_attack,
        defense: stats.defense,
        special_defense
      }
    }

    logger.info(`PokeAPI result: ${JSON.stringify(result)}`)

    return result
  } catch (error) {
    logger.error(`Error getting Pokemon: ${error}`)
    throw new Error(error)
  }
}
