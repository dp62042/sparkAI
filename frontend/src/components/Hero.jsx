/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Copy, Share2, Check } from 'lucide-react'
import OutputFormatter from './OutputFormatter'

const Hero = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleSubmit = async () => {
    if (!input.trim()) return
    setIsLoading(true)
    setOutput('')
    try {
      const response = await axios.post(`http://localhost:8080/ai`, {
        prompt: input,
      })
      setOutput(response.data.response)
    } catch (error) {
      console.error('API Error:', error)
      setOutput('⚠️ Error communicating with AI service')
    }
    setIsLoading(false)
  }

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Spark AI Response',
          text: output,
        })
      } catch (err) {
        console.log('Sharing failed:', err)
      }
    } else {
      alert('Sharing is not supported on this browser. Please copy instead.')
    }
  }

  return (
    <div className="flex flex-col items-center min-h-[75vh] bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      {/* Input Section */}
      <motion.textarea
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-2/3 lg:w-1/2 h-[100px] md:[200px] p-4 border border-gray-300 rounded-2xl shadow-sm 
                   focus:ring-2 focus:ring-cyan-500 outline-none resize-none"
        placeholder="✨ Ask Spark AI anything..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={5}
      />

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="mt-4 px-6 py-2 bg-cyan-600 text-white rounded-xl shadow-md 
                   hover:bg-cyan-700 transition-all flex items-center gap-2 disabled:opacity-50"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin w-5 h-5" /> Generating...
          </>
        ) : (
          '⚡ Generate'
        )}
      </motion.button>

      {/* Output Section */}
      <AnimatePresence>
        {output && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5 }}
            className="mt-8 w-full md:w-2/3 lg:w-1/2 p-6 bg-white border border-gray-200 
                       rounded-2xl shadow-xl"
          >
            <h3 className="font-bold text-lg mb-3 text-cyan-700">
              💡 Spark AI Response
            </h3>
            <OutputFormatter text={output} />

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 border rounded-lg hover:bg-gray-200 transition"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy
                  </>
                )}
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 border rounded-lg hover:bg-gray-200 transition"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Hero
