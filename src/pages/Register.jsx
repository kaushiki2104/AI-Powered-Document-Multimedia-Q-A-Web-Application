import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate, Link } from 'react-router-dom'
import { User, Mail, LockKeyhole, UserPlus } from 'lucide-react'

const Register = () => {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

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

      await api.post('/auth/register', formData)

      alert('Registration Successful')

      navigate('/login')

    } catch (error) {

      console.log(error)

      alert('Registration Failed')

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
            <UserPlus className='text-white w-8 h-8' />
          </div>

          <h1 className='text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2'>
            Create Account
          </h1>

          <p className='text-gray-500 text-sm sm:text-base'>
            Register to start using AI Multimedia Q&A
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className='space-y-5'
        >

          {/* Name */}
          <div>

            <label className='text-sm font-semibold text-gray-700 block mb-2'>
              Full Name
            </label>

            <div className='relative'>

              <User className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />

              <input
                type='text'
                name='name'
                placeholder='Enter Name'
                className='w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 outline-none transition-all duration-300'
                onChange={handleChange}
              />

            </div>

          </div>

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

            <UserPlus className='w-5 h-5' />

            {loading ? 'Loading...' : 'Register'}

          </button>

        </form>

        {/* Login Link */}
        <p className='text-center text-sm text-gray-500 mt-6'>
          Already have an account?{' '}

          <Link
            to='/login'
            className='text-indigo-600 font-semibold hover:underline'
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  )
}

export default Register