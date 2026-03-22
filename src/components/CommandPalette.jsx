import { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Moon, Sun, RefreshCw, Code2 } from 'lucide-react'
import { TOPICS_MAP } from '../data'
import { useTheme } from '../context/ThemeContext'
import { useProgress } from '../hooks/useProgress'

export default function CommandPalette({ isOpen, onClose, onSelectTopic }) {
  const [query, setQuery] = useState('')
  const { theme, toggle: toggleTheme } = useTheme()
  const { reset } = useProgress()

  useEffect(() => {
    if (isOpen) setQuery('')
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="relative w-full max-w-2xl mx-4 overflow-hidden rounded-2xl shadow-2xl border"
            style={{ 
              background: 'var(--bg-surface)', 
              borderColor: 'var(--border)' 
            }}
          >
            <Command 
              className="w-full h-full flex flex-col"
              filter={(value, search) => {
                if (value.toLowerCase().includes(search.toLowerCase())) return 1
                return 0
              }}
            >
              <div className="flex items-center px-4 border-b" style={{ borderColor: 'var(--border)' }}>
                <Search size={18} style={{ color: 'var(--text-muted)' }} />
                <Command.Input
                  autoFocus
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Search topics or type a command..."
                  className="flex-1 px-4 py-5 font-mono text-sm bg-transparent outline-none border-none placeholder:text-gray-500"
                  style={{ color: 'var(--text-primary)' }}
                />
                <span className="font-mono text-[10px] px-2 py-1 rounded border" style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}>
                  ESC to close
                </span>
              </div>

              <Command.List 
                className="max-h-[60vh] overflow-y-auto p-2"
                style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--text-muted) transparent' }}
              >
                <Command.Empty className="py-12 text-center font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
                  No results found for "{query}"
                </Command.Empty>

                <Command.Group heading="Global Commands" className="text-xs font-mono mb-2 px-2 text-gray-500 pt-2">
                  <Command.Item
                    value="Toggle Dark/Light Theme"
                    onSelect={() => {
                      toggleTheme()
                      onClose()
                    }}
                    className="flex items-center gap-3 px-3 py-3 mt-1 rounded-lg cursor-pointer transition-colors aria-selected:bg-white/5 data-[selected=true]:bg-white/5"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    <span className="font-display font-medium text-sm">Toggle {theme === 'dark' ? 'Light' : 'Dark'} Theme</span>
                  </Command.Item>

                  <Command.Item
                    value="Reset All Progress"
                    onSelect={() => {
                      if (confirm('Are you sure you want to completely reset your progress?')) {
                        reset()
                        onClose()
                      }
                    }}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors aria-selected:bg-white/5 data-[selected=true]:bg-white/5"
                    style={{ color: 'var(--must)' }}
                  >
                    <RefreshCw size={16} />
                    <span className="font-display font-medium text-sm">Reset All Progress</span>
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Python Topics" className="text-xs font-mono mb-2 px-2 text-gray-500 pt-4">
                  {Object.values(TOPICS_MAP).map((topic) => (
                    <Command.Item
                      key={topic.id}
                      value={topic.name + ' ' + topic.subtopics.join(' ')}
                      onSelect={() => onSelectTopic(topic.id)}
                      className="flex items-center gap-3 px-3 py-3 my-1 rounded-lg cursor-pointer transition-colors aria-selected:bg-white/5 data-[selected=true]:bg-white/5"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <Code2 size={16} style={{ color: `var(--${topic.imp})` }} />
                      <div className="flex flex-col">
                        <span className="font-display font-medium text-sm">{topic.name}</span>
                        <span className="font-mono text-[10px] mt-0.5 truncate max-w-md" style={{ color: 'var(--text-muted)' }}>
                          {topic.subtopics.join(' · ')}
                        </span>
                      </div>
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
