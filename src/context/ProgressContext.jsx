import { createContext, useState, useCallback } from 'react'

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
    <ProgressContext.Provider value={{ done, toggle, reset, count: done.size }}>
      {children}
    </ProgressContext.Provider>
  )
}
