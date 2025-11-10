'use client'

import PokemonGrid from '@/components/common/pokemonGrid'

export const DexLookup = () => {
  return (
    <div className='flex flex-col min-h-screen items-center justify-center space-y-6'>
      <PokemonGrid />
    </div>
  )
}

export default DexLookup
