import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritePokemon {
  id: number
  name: string
  sprite: string
}

interface FavoritesStore {
  favorites: FavoritePokemon[]
  addFavorite: (pokemon: FavoritePokemon) => void
  removeFavorite: (pokemon: number) => void
  isFavorite: (id: number) => boolean
  clearFavorites: () => void
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: pokemon => {
        set(state => {
          // Prevent duplicates
          if (state.favorites.some(fav => fav.id === pokemon.id)) {
            return state
          }
          return { favorites: [...state.favorites, pokemon] }
        })
      },

      removeFavorite: id => {
        set(state => ({
          favorites: state.favorites.filter(fav => fav.id !== id),
        }))
      },

      isFavorite: id => {
        return get().favorites.some(fav => fav.id === id)
      },

      clearFavorites: () => {
        set({ favorites: [] })
      },
    }),
    {
      name: 'pokemon-favorites', // localStorage key
      // Optional: Only store specific fields
      partialize: state => ({ favorites: state.favorites }),
    }
  )
)
