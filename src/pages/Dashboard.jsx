import React from 'react'
import UploadBox from '../components/UploadBox'
import ChatBox from '../components/ChatBox'

const Dashboard = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 p-6 md:p-10'>

      <div className='max-w-6xl mx-auto'>

        <div className='text-center mb-10'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-gray-800 mb-3 tracking-tight'>
            AI Multimedia Q&A App
          </h1>

          <p className='text-gray-600 text-lg'>
            Upload files and interact with AI seamlessly
          </p>
        </div>

        <div className='bg-white shadow-2xl rounded-3xl p-6 md:p-8 border border-gray-200 backdrop-blur-sm'>

          <div className='mb-8'>
            <UploadBox />
          </div>

          <div>
            <ChatBox />
          </div>

        </div>

      </div>

    </div>
  )
}

export default Dashboard