import React from 'react'

const Button = ({ children, primary, className = "", onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2 ${
      primary
        ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:shadow-purple-500/30 border border-transparent'
        : 'bg-white text-purple-600 border-2 border-purple-100 hover:border-purple-300 hover:bg-purple-50'
    } ${className}`}
  >
    {children}
  </button>
)

export default Button
