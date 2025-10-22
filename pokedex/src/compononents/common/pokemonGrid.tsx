'use client'

import { useEffect, useState } from 'react'
import { fetchPokemonPaginated, PaginatedResponse } from '../../../api/api'
import PokemonGridCard from './pokemonGridCard'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export const PokemonGrid = () => {
  // State to store the paginated Pokemon data from API
  const [pokemonData, setPokemonData] = useState<PaginatedResponse | null>(null)
  // State to track when we're loading data from the API
  const [isLoading, setIsLoading] = useState(true)
  // State to track the current offset (where we are in the Pokemon list)
  const [currentOffset, setCurrentOffset] = useState(0)
  // State to track how many Pokemon to show per page
  const [pageSize, setPageSize] = useState(50)

  // useEffect hook runs whenever currentOffset or pageSize changes
  useEffect(() => {
    const getPokemonPage = async () => {
      try {
        setIsLoading(true) // Show loading state
        // Call our API function with current offset and page size
        const data = await fetchPokemonPaginated(currentOffset, pageSize)
        setPokemonData(data)
      } catch (error) {
        console.error('Failed to fetch Pokemon page:', error)
      } finally {
        setIsLoading(false) // Hide loading state
      }
    }

    getPokemonPage()
  }, [currentOffset, pageSize])

  // Calculate the current page number (1-based for user display)
  const currentPage = Math.floor(currentOffset / pageSize) + 1
  // Calculate total number of pages based on total Pokemon count
  const totalPages = Math.ceil((pokemonData?.totalCount || 0) / pageSize)

  // Function to handle when user clicks a page number
  const handlePageChange = (newPage: number) => {
    const newOffset = (newPage - 1) * pageSize
    setCurrentOffset(newOffset)
  }

  // Function to handle previous page button click
  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1)
    }
  }

  // Function to handle next page button click
  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1)
    }
  }

  // Function to generate which page numbers to show in the pagination
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // For many pages, show a window around the current page
      const startPage = Math.max(1, currentPage - 2)
      const endPage = Math.min(totalPages, currentPage + 2)

      // Add first page and ellipsis if needed
      if (startPage > 1) {
        pages.push(1)
        if (startPage > 2) pages.push('ellipsis-start')
      }

      // Add visible page range
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      // Add ellipsis and last page if needed
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('ellipsis-end')
        pages.push(totalPages)
      }
    }

    return pages
  }

  // Show loading spinner while fetching data
  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500'></div>
      </div>
    )
  }

  // Show error message if data failed to load
  if (!pokemonData) {
    return (
      <div className='flex justify-center items-center min-h-64'>
        <p className='text-gray-500'>Failed to load Pokemon data.</p>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {/* Display current page information */}
      <div className='text-center'>
        <p className='text-sm text-gray-600'>
          Showing{' '}
          <span className='font-semibold'>
            {currentOffset + 1}-{currentOffset + pokemonData.pokemon.length}
          </span>{' '}
          of{' '}
          <span className='font-semibold'>
            {pokemonData.totalCount.toLocaleString()}
          </span>{' '}
          Pokemon
        </p>
      </div>

      {/* The actual grid of Pokemon cards */}
      <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4'>
        {pokemonData.pokemon.map(pokemon => (
          <PokemonGridCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {/* Shadcn pagination component */}
      <Pagination>
        <PaginationContent>
          {/* Previous page button */}
          <PaginationItem>
            <PaginationPrevious
              href='#'
              onClick={e => {
                e.preventDefault()
                handlePrevious()
              }}
              className={
                currentPage <= 1 ? 'pointer-events-none opacity-50' : ''
              }
            />
          </PaginationItem>

          {/* Dynamic page number buttons */}
          {getPageNumbers().map((page, index) => (
            <PaginationItem key={index}>
              {page === 'ellipsis-start' || page === 'ellipsis-end' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href='#'
                  onClick={e => {
                    e.preventDefault()
                    handlePageChange(page as number)
                  }}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Next page button */}
          <PaginationItem>
            <PaginationNext
              href='#'
              onClick={e => {
                e.preventDefault()
                handleNext()
              }}
              className={
                currentPage >= totalPages
                  ? 'pointer-events-none opacity-50'
                  : ''
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default PokemonGrid
