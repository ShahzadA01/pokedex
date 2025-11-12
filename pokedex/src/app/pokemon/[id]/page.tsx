import PokemonDetail from '@/components/common/pokemonDetail'
import { fetchPokemonData } from '../../../../api/api'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function PokemonPage({ params }: PageProps) {
  const { id } = await params

  try {
    //Validate ID is a number
    const pokemonId = parseInt(id)
    if (isNaN(pokemonId) || pokemonId < 1 || pokemonId > 1302) {
      //insert notfound function
      console.log('lol')
    }

    const pokemonData = await fetchPokemonData('pokemon', id)

    return <PokemonDetail pokemon={pokemonData} />
  } catch (error) {
    console.error('Failed to fetch Pokemon', error)
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params

  try {
    const pokemonData = await fetchPokemonData('pokemon', id)
    return {
      title: `#${pokemonData.id} - ${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)} | Pokédex`,
      description: `Details for ${pokemonData.name} - ${pokemonData.types.map((t: any) => t.type.name).join('/')} type Pokémon`,
    }
  } catch (error) {
    console.error('failed to gen metadata', error)
    return {
      title: 'Pokémon Not Found',
      description: 'The requested Pokémon could not be found.',
    }
  }
}
