'use client'

import { useFavoritesStore } from '../../../store/favoritesStore'
import PokemonGridCard from '@/components/common/pokemonGridCard'

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavoritesStore()

  return (
    <div className='container mx-auto py-8 px-4'>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='text-4xl font-bold mb-2'>Favorite Pokémon</h1>
          <p className='text-gray-600'>
            {favorites.length} {favorites.length === 1 ? 'Pokémon' : 'Pokémon'}{' '}
            saved
          </p>
        </div>

        {favorites.length > 0 && (
          <button
            onClick={clearFavorites}
            className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors'
          >
            Clear All
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className='text-center py-16'>
          <div className='text-6xl mb-4'>💔</div>
          <h2 className='text-2xl font-semibold mb-2'>No favorites yet</h2>
          <p className='text-gray-600'>
            Start adding Pokémon to your favorites!
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4'>
          {favorites.map(pokemon => (
            <PokemonGridCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  )
}
