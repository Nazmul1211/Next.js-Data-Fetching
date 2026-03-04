import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <nav>
      <ul className='flex gap-8 text-xl text-blue-400 justify-center px-10 py-8'>
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/posts">Posts</Link>
        <Link href="/meals">Meals</Link>
        <Link href="/products">Products</Link>
        <Link href="/products/add">Add Products</Link>
        <Link href="/register">Register</Link>
      </ul>
    </nav>

  )
}
