import { createContext, useState, useCallback, useEffect } from 'react'

export const ProgressContext = createContext()

export function ProgressProvider({ children }) {
  const [done, setDone] = useState(() => {
    try {
      const saved = localStorage.getItem('py_roadmap_v2')
      return saved ? new Set(JSON.parse(saved)) : new Set()
    } catch {
      return new Set()
    }
  })

  // --- Streak Logic ---
  const [streak, setStreak] = useState(() => {
    try {
      const saved = localStorage.getItem('py_streak')
      if (!saved) return { count: 1, lastDate: new Date().toDateString() }
      
      const { count, lastDate } = JSON.parse(saved)
      const last = new Date(lastDate)
      const now = new Date()
      // Normalize to midnight to check day difference
      const diffTime = Math.abs(new Date(now.toDateString()) - new Date(last.toDateString()))
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays === 0) return { count, lastDate } // already logged today
      if (diffDays === 1) return { count: count + 1, lastDate: now.toDateString() } // perfectly consecutive
      return { count: 1, lastDate: now.toDateString() } // streak broken
    } catch {
      return { count: 1, lastDate: new Date().toDateString() }
    }
  })

  // Whenever streak calculates on load, ensure it's saved immediately so today is logged
  useEffect(() => {
    localStorage.setItem('py_streak', JSON.stringify(streak))
  }, [streak])

  // --- Rank Logic ---
  const count = done.size
  let rank = "Script Kiddie 🥚"
  if (count >= 10) rank = "Snake Charmer 🐍"
  if (count >= 30) rank = "Data Wizard 🧙‍♂️"
  if (count >= 50) rank = "Python Grandmaster 👑"

  const toggle = useCallback((id) => {
    setDone(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      localStorage.setItem('py_roadmap_v2', JSON.stringify([...next]))
      return next
    })
  }, [])

  const reset = useCallback(() => {
    setDone(new Set())
    localStorage.removeItem('py_roadmap_v2')
  }, [])

  return (
    <ProgressContext.Provider value={{ done, toggle, reset, count, rank, streak: streak.count }}>
      {children}
    </ProgressContext.Provider>
  )
}
