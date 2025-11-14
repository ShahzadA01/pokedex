'use client'

import Link from 'next/link'

export const NavBar = () => {
  return (
    <div className='bg-orange-300 h-10 w-full flex flex-inline gap-5'>
      <div className='flex flex-inline px-5 pt-2 gap-10'>
        <Link href={'/'}>Home</Link>
        <Link href={'/dex-lookup'}>PokeSearch</Link>
        <Link href={'/gen-display'}>PokeDisplay</Link>
        <Link href={'./favorites'}>Favorites</Link>
      </div>
    </div>
  )
}

export default NavBar
