class PokedexDTO {
  constructor(pokemon) {
    this.name = pokemon.name || ''
    this.image = pokemon.image || ''
    this.types = JSON.stringify(pokemon.types) || '[]'
    this.category = pokemon.category || ''
    this.generation = pokemon.generation || ''
    this.height = pokemon.height || 0
    this.weight = pokemon.weight || 0
    this.stats = JSON.stringify(pokemon.stats) || '{}'
    this.level = 1
  }
}

export default PokedexDTO
