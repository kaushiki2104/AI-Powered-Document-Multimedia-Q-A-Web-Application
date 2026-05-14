import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm px-4 sm:px-6 md:px-10 py-4'>

      <div className='max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4'>

        <h1 className='text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent tracking-tight'>
          AI Multimedia Q&A
        </h1>

        <div className='flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-sm sm:text-base font-medium'>

          <Link
            to='/'
            className='px-4 py-2 rounded-xl hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-300'
          >
            Dashboard
          </Link>

          <Link
            to='/login'
            className='px-4 py-2 rounded-xl hover:bg-blue-100 hover:text-blue-600 transition-all duration-300'
          >
            Login
          </Link>

          <Link
            to='/register'
            className='bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-5 py-2 rounded-xl shadow-md hover:scale-105 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300'
          >
            Register
          </Link>

        </div>

      </div>

    </nav>
  )
}

export default Navbar