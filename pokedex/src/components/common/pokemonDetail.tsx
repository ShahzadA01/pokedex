'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useFavoritesStore } from '../../../store/favoritesStore'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Heart } from 'lucide-react'

interface PokemonDetailProps {
  pokemon: any
}

export default function PokemonDetail({ pokemon }: PokemonDetailProps) {
  const [selectedSprite, setSelectedSprite] = useState('official-artwork')
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore()

  const sprites = {
    'official-artwork': pokemon.sprites.other['official-artwork'].front_default,
    default: pokemon.sprites.front_default,
    shiny: pokemon.sprites.front_shiny,
    back: pokemon.sprites.back_default,
    'back-shiny': pokemon.sprites.back_shiny,
  }

  const handleFavoriteToggle = () => {
    const favoriteData = {
      id: pokemon.id,
      name: pokemon.name,
      sprite: pokemon.sprites.other['official-artwork'].front_default,
      types: pokemon.types.map((t: any) => t.type.name),
    }

    if (isFavorite(pokemon.id)) {
      removeFavorite(pokemon.id)
    } else {
      addFavorite(favoriteData)
    }
  }

  return (
    <div>
      <div className='mb-6'>
        <Link
          href='/'
          className='inline-flex items-center gap-2 text-blue-500 hover:text-red-500'
        >
          Home
        </Link>
      </div>

      <div className='flex bg-grey-400'>
        <div className=''>
          <div className='bg-blue-100 rounded-lg shadow-md p-6'>
            <div className='mb-4'>
              <Image
                src={
                  sprites[selectedSprite as keyof typeof sprites] ||
                  sprites['official-artwork']
                }
                alt={pokemon.name}
                width={300}
                height={300}
                className='w-full h-auto'
              />
            </div>
            <Button
              onClick={handleFavoriteToggle}
              className='w-full py-2 px-4 bg-gray-100 rounded-lg'
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite(pokemon.id)
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-400'
                }`}
              />
              {isFavorite(pokemon.id)
                ? 'remove from Favorites'
                : 'Add to Favorites'}
            </Button>
          </div>
        </div>

        <div>
          <div className='bg-white rounded-lg p-6'>
            <div className='mb-6'>
              <h1 className='text-4xl font-bold'> {pokemon.name}</h1>
              <p>#{pokemon.id.toString().padStart(3, '0')}</p>
            </div>
          </div>
          {/* Stats Grid */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-6'>
            <div className='text-center p-4 bg-gray-50 rounded-lg'>
              <p className='text-sm text-gray-600'>Height</p>
              <p className='text-lg font-semibold'>
                {(pokemon.height / 10).toFixed(1)} m
              </p>
            </div>

            <div className='text-center p-4 bg-gray-50 rounded-lg'>
              <p className='text-sm text-gray-600'>Weight</p>
              <p className='text-lg font-semibold'>
                {(pokemon.weight / 10).toFixed(1)} kg
              </p>
            </div>

            <div className='text-center p-4 bg-gray-50 rounded-lg'>
              <p className='text-sm text-gray-600'>Base Exp</p>
              <p className='text-lg font-semibold'>
                {pokemon.base_experience || 'N/A'}
              </p>
            </div>

            <div className='text-center p-4 bg-gray-50 rounded-lg'>
              <p className='text-sm text-gray-600'>Abilities</p>
              <p className='text-lg font-semibold capitalize'>
                {pokemon.abilities
                  .slice(0, 2)
                  .map((a: any) => a.ability.name)
                  .join(', ')}
              </p>
            </div>
          </div>
          {/* Base Stats */}
          <div className='mb-6'>
            <h3 className='text-xl font-semibold mb-4'>Base Stats</h3>
            <div className='space-y-3'>
              {pokemon.stats.map((stat: any) => (
                <div key={stat.stat.name} className='flex items-center'>
                  <span className='w-32 text-sm capitalize text-gray-600'>
                    {stat.stat.name.replace('-', ' ')}:
                  </span>
                  <div className='flex-1 bg-gray-200 rounded-full h-2'>
                    <div
                      className='bg-blue-500 h-2 rounded-full'
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    ></div>
                  </div>
                  <span className='w-12 text-right font-medium'>
                    {stat.base_stat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
