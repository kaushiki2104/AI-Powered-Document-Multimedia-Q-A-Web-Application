import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, LockKeyhole, LogIn } from 'lucide-react'

const Login = () => {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  if (localStorage.getItem('token')) {
    navigate('/')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const res = await api.post('/auth/login', formData)

      localStorage.setItem('token', res.data.access_token)

      navigate('/')

    } catch (error) {
      alert('Login Failed — check your credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 px-4 py-10'>

      <div className='w-full max-w-md bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-3xl p-6 sm:p-8'>

        {/* Header */}
        <div className='text-center mb-8'>

          <div className='w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center justify-center shadow-lg mb-4'>
            <LogIn className='text-white w-8 h-8' />
          </div>

          <h1 className='text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2'>
            Welcome Back
          </h1>

          <p className='text-gray-500 text-sm sm:text-base'>
            Login to continue using AI Multimedia Q&A
          </p>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-5'>

          {/* Email */}
          <div>

            <label className='text-sm font-semibold text-gray-700 block mb-2'>
              Email Address
            </label>

            <div className='relative'>

              <Mail className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />

              <input
                type='email'
                name='email'
                placeholder='Enter Email'
                className='w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 outline-none transition-all duration-300'
                onChange={handleChange}
              />

            </div>

          </div>

          {/* Password */}
          <div>

            <label className='text-sm font-semibold text-gray-700 block mb-2'>
              Password
            </label>

            <div className='relative'>

              <LockKeyhole className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />

              <input
                type='password'
                name='password'
                placeholder='Enter Password'
                className='w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 outline-none transition-all duration-300'
                onChange={handleChange}
              />

            </div>

          </div>

          {/* Button */}
          <button
            type='submit'
            disabled={loading}
            className={`w-full py-3 rounded-2xl font-semibold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2
              ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-blue-600 hover:to-indigo-600 hover:scale-[1.02] active:scale-95'
              }`}
          >

            <LogIn className='w-5 h-5' />

            {loading ? 'Loading...' : 'Login'}

          </button>

        </form>

        {/* Register Link */}
        <p className='text-center text-sm text-gray-500 mt-6'>
          Don't have an account?{' '}

          <Link
            to='/register'
            className='text-indigo-600 font-semibold hover:underline'
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  )
}

export default Login