export interface PokemonListItem {
  name: string
  id: number
  sprite: string
}

export interface PaginatedResponse {
  pokemon: PokemonListItem[]
  totalCount: number
  nextOffset: number | null
  prevOffset: number | null
}

export const fetchPokemonData = async (category: string, query: string) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/${category}/${query}`
    )

    if (!response.ok) {
      throw new Error(`HTTP Error Occurred! Status: ${response.status}`)
    }
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('Error fetching data: ' + error)
    throw error
  }
}

export async function fetchPokemonPaginated(
  offset: number = 0,
  limit: number = 50
): Promise<PaginatedResponse> {
  try {
    // First, get the paginated list
    const listResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    )
    const listData = await listResponse.json()

    // Fetch details for the current page in parallel
    const pokemonDetails = await Promise.all(
      listData.results.map(async (pokemon: { name: string; url: string }) => {
        const response = await fetch(pokemon.url)
        const data = await response.json()
        return {
          name: data.name,
          id: data.id,
          sprite:
            data.sprites.other['official-artwork'].front_default ||
            data.sprites.front_default,
        }
      })
    )

    // Calculate pagination info
    const totalCount = listData.count
    const nextOffset = listData.next ? offset + limit : null
    const prevOffset = listData.previous ? offset - limit : null

    return {
      pokemon: pokemonDetails.sort((a, b) => a.id - b.id),
      totalCount,
      nextOffset,
      prevOffset,
    }
  } catch (error) {
    console.error('Error fetching paginated Pokemon:', error)
    throw error
  }
}
