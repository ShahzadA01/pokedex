'use client'
import Image from 'next/image'

interface PokemonData {
  name: string
  id: number
  height: number
  weight: number
  sprites: {
    front_default: string
    // You can add other sprites here later
    front_shiny?: string
    other?: {
      'official-artwork': {
        front_default: string
      }
    }
  }
}

interface Props {
  pokemonData: PokemonData | null
  isLoading: boolean
  showInitialState: boolean
}

export const PokemonCard = ({
  pokemonData,
  isLoading,
  showInitialState = true,
}: Props) => {
  if (showInitialState) {
    return (
      <div className='flex items-center justify-center p-8 rounded-lg shadow-md border border-gray-200 min-h-[300px] bg-white'>
        <div className='text-center'>
          <div className='text-6xl mb-4'>🔍</div>
          <p className='text-gray-600'>Search for a Pokemon to see its data!</p>
          <p className='text-sm text-gray-400 mt-2'>Try "pikachu" or "25"</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center p-8 rounded-lg shadow-md border border-gray-200 min-h-[300px] bg-white'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4'></div>
          <p className='text-gray-600'>Searching for Pokemon...</p>
        </div>
      </div>
    )
  }

  if (!pokemonData) {
    return (
      <div className='flex items-center justify-center p-8 rounded-lg shadow-md border border-gray-200 min-h-[300px] bg-white'>
        <div className='text-center'>
          <div className='text-6xl mb-4'>❌</div>
          <p className='text-gray-600'>Pokemon not found!</p>
          <p className='text-sm text-gray-400 mt-2'>
            Try a different name or ID
          </p>
        </div>
      </div>
    )
  }

  const { name, id, height, weight, sprites } = pokemonData

  return (
    <div className='flex flex-col items-center space-y-6 p-8 rounded-lg shadow-md border border-gray-200 bg-white max-w-md w-full'>
      {/* Pokemon Name and ID */}
      <div className='text-center'>
        <h2 className='text-3xl font-bold capitalize text-black'>{name}</h2>
        <p className='text-gray-500 text-lg'>
          #{id.toString().padStart(3, '0')}
        </p>
      </div>

      {/* Pokemon Image */}
      {sprites.front_default && (
        <div className='relative'>
          <Image
            src={sprites.front_default}
            alt={`${name} sprite`}
            width={150}
            height={150}
            className='animate-fade-in'
          />
        </div>
      )}

      {/* Pokemon Stats */}
      <div className='grid grid-cols-2 gap-6 w-full text-center'>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <p className='font-semibold text-gray-700'>Height</p>
          <p className='text-xl text-black'>{height / 10}m</p>
        </div>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <p className='font-semibold text-black'>Weight</p>
          <p className='text-xl text-black'>{weight / 10}kg</p>
        </div>
      </div>

      {/* Optional: Add types, abilities, etc. later */}
      <div className='text-center text-sm text-gray-500'>
        <p>More details coming soon...</p>
      </div>
    </div>
  )
}

export default PokemonCard
