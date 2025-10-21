'use client'

import { useEffect, useState } from 'react'
import { fetchPokemonData } from '../../../api/api'
import { Input } from '@/compononents/ui/input'
import { Button } from '@/compononents/ui/button'
import PokemonCard from '@/compononents/common/pokemonCard'

interface PokemonData {
  name: string
  id: number
  height: number
  weight: number
  sprites: any
}

export const DexLookup = () => {
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null)
  const [searchTrigger, setSearchTrigger] = useState<string | null>(null) // Add this to control when to search

  useEffect(() => {
    // Only run if searchTrigger has a value (not null and not empty
    if (searchTrigger && searchTrigger.trim()) {
      const getPokemon = async () => {
        try {
          setIsLoading(true)
          const data = await fetchPokemonData(
            'pokemon',
            searchTrigger.toLowerCase()
          )
          setPokemonData(data)
        } catch (error) {
          console.error('Failed to fetch: ', error)
          setPokemonData(null)
        } finally {
          setIsLoading(false)
        }
      }

      getPokemon()
    }
  }, [searchTrigger])

  const handleSearch = () => {
    if (userInput.trim()) {
      setSearchTrigger(userInput.trim()) // Trigger the search
    }
  }

  // Determine what to show in PokemonCard
  const showInitialState = !searchTrigger && !isLoading && !pokemonData

  return (
    <div className='flex flex-col min-h-screen items-center justify-center space-y-6'>
      <PokemonCard
        pokemonData={pokemonData}
        isLoading={isLoading}
        showInitialState={showInitialState}
      />

      <div className='flex items-center space-x-2'>
        <Input
          placeholder='Pokemon Name/ID'
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          disabled={isLoading}
        />
        <Button
          variant='outline'
          onClick={handleSearch}
          disabled={isLoading || !userInput.trim()}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </div>
    </div>
  )
}

export default DexLookup
