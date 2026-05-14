import { useState } from 'react'
import api from '../services/api'

const ChatBox = () => {

  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const askQuestion = async () => {

    const res = await api.post('/chat', {
      question
    })

    setAnswer(res.data.answer)
  }

  return (
    <div className='bg-white/90 backdrop-blur-md p-5 sm:p-6 md:p-8 rounded-3xl shadow-2xl mt-6 border border-gray-200 transition-all duration-300'>

      <div className='mb-5'>
        <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-2'>
          Ask AI Anything
        </h2>

        <p className='text-gray-500 text-sm sm:text-base'>
          Type your question below and get instant AI-powered answers
        </p>
      </div>

      <textarea
        className='w-full border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none p-4 rounded-2xl resize-none text-gray-700 text-sm sm:text-base transition-all duration-200'
        rows='5'
        placeholder='Ask your question here...'
        onChange={(e) => setQuestion(e.target.value)}
      />

      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5'>

        <button
          onClick={askQuestion}
          className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto'
        >
          Ask AI
        </button>

        <span className='text-gray-400 text-sm text-center sm:text-right'>
          AI response generated instantly
        </span>

      </div>

      {answer && (
        <div className='mt-8 bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-2xl p-5 shadow-inner'>

          <h3 className='text-lg font-semibold text-gray-800 mb-3'>
            AI Answer
          </h3>

          <p className='text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base'>
            {answer}
          </p>

        </div>
      )}

    </div>
  )
}

export default ChatBox