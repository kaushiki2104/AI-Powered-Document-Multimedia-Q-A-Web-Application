import React from 'react'

const SummaryCard = ({ summary }) => {
  return (
    <div className='mt-6 bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-3xl p-5 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-xl'>

      <div className='flex items-center gap-3 mb-5'>
        
        <div className='w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-xl shadow-md'>
          ✨
        </div>

        <div>
          <h2 className='text-2xl sm:text-3xl font-bold text-gray-800'>
            AI Summary
          </h2>

          <p className='text-gray-500 text-sm sm:text-base'>
            Generated smart summary from your uploaded content
          </p>
        </div>

      </div>

      <div className='bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-inner'>

        <p className='text-gray-700 leading-8 text-sm sm:text-base whitespace-pre-line'>
          {summary}
        </p>

      </div>

    </div>
  )
}

export default SummaryCard