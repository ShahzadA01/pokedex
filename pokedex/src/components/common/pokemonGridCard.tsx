import Image from 'next/image'
import Link from 'next/link'

// Define the props interface for type safety
interface PokemonGridCardProps {
  pokemon: {
    name: string
    id: number
    sprite: string
  }
}

/**
 * Individual card component that displays a Pokemon's sprite, ID, and name
 * Clicking the card navigates to the Pokemon's detail page
 */
export const PokemonGridCard = ({ pokemon }: PokemonGridCardProps) => {
  return (
    <Link
      href={`/pokemon/${pokemon.id}`}
      className='group block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-all'
    >
      <div className='flex flex-col items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-blue-200 h-full'>
        {/* Pokemon Sprite */}
        <div className='relative w-16 h-16 mb-2'>
          {pokemon.sprite ? (
            <Image
              src={pokemon.sprite}
              alt={pokemon.name}
              fill
              className='object-contain group-hover:scale-110 transition-transform'
              sizes='64px'
            />
          ) : (
            // Fallback if sprite is missing
            <div className='w-full h-full bg-gray-100 rounded flex items-center justify-center'>
              <span className='text-xs text-gray-400'>No image</span>
            </div>
          )}
        </div>

        {/* Pokemon ID */}
        <p className='text-xs text-gray-500 font-mono'>
          #{pokemon.id.toString().padStart(3, '0')}
        </p>

        {/* Pokemon Name */}
        <p className='text-sm font-medium capitalize text-center leading-tight mt-1'>
          {pokemon.name}
        </p>
      </div>
    </Link>
  )
}

export default PokemonGridCard
