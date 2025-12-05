import React from 'react'
import { Heart, Star } from 'lucide-react'

const TestimonialCard = ({ name, text, rating }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 relative">
    <div className="absolute -top-3 -left-3 bg-purple-600 text-white p-2 rounded-full shadow-lg">
      <Heart size={16} fill="currentColor" />
    </div>
    <div className="flex text-yellow-400 mb-3">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} fill={i < rating ? 'currentColor' : 'none'} className={i < rating ? '' : 'text-slate-300'} />
      ))}
    </div>
    <p className="text-slate-600 italic mb-4 text-sm leading-relaxed">"{text}"</p>
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-100 to-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs">
        {name.charAt(0)}
      </div>
      <p className="font-bold text-slate-800 text-sm">{name}</p>
    </div>
  </div>
)

export default TestimonialCard
