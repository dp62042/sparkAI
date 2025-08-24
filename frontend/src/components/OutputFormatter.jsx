import React, { useEffect, useState } from 'react'

const OutputFormatter = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    if (!text) return

    setDisplayedText('') // reset output

    let i = 0 // local counter (fixes your issue)
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i))
      i++

      if (i >= text.length) {
        clearInterval(interval)
      }
    }, 25) // typing speed

    return () => clearInterval(interval)
  }, [text])

  // Split into lines for formatting
  const lines =
    displayedText.split('\n').filter((line) => line.trim() !== '') || []

  return (
    <div className="space-y-3 text-gray-700 leading-relaxed">
      {lines.map((line, index) => {
        if (line.startsWith('*') || line.startsWith('-')) {
          return (
            <li key={index} className="list-disc ml-6">
              {line.replace(/[*-]\s*/, '')}
            </li>
          )
        } else if (line.endsWith(':')) {
          return (
            <h4 key={index} className="font-semibold text-cyan-700 mt-3">
              {line}
            </h4>
          )
        } else {
          return <p key={index}>{line}</p>
        }
      })}
    </div>
  )
}

export default OutputFormatter
