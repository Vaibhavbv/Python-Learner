import { useState } from 'react'
import { motion } from 'framer-motion'

export default function QuizBlock({ quiz, topicId }) {
  const [answers, setAnswers] = useState({})

  const handleAnswer = (qIdx, optIdx) => {
    if (answers[qIdx] !== undefined) return
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }))
  }

  return (
    <div className="space-y-5 mb-6">
      {quiz.map((q, qi) => {
        const answered = answers[qi] !== undefined
        const selectedIdx = answers[qi]
        const isCorrect = selectedIdx === q.answer

        return (
          <div key={`${topicId}_q${qi}`}>
            <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {qi + 1}. {q.q}
            </p>
            <div className="space-y-1.5">
              {q.options.map((opt, oi) => {
                let bg = 'var(--bg-surface)'
                let borderColor = 'var(--border)'
                let textColor = 'var(--text-secondary)'

                if (answered) {
                  if (oi === q.answer) {
                    bg = 'color-mix(in srgb, var(--green) 12%, var(--bg-surface))'
                    borderColor = 'var(--green)'
                    textColor = 'var(--green)'
                  } else if (oi === selectedIdx && !isCorrect) {
                    bg = 'color-mix(in srgb, var(--must) 12%, var(--bg-surface))'
                    borderColor = 'var(--must)'
                    textColor = 'var(--must)'
                  }
                }

                return (
                  <motion.button
                    key={oi}
                    whileHover={!answered ? { scale: 1.01 } : {}}
                    onClick={() => handleAnswer(qi, oi)}
                    disabled={answered}
                    className="w-full text-left font-mono text-xs px-3.5 py-2.5 rounded-md transition-all duration-200 cursor-pointer disabled:cursor-default"
                    style={{ background: bg, border: `1px solid ${borderColor}`, color: textColor }}
                  >
                    {String.fromCharCode(65 + oi)}) {opt}
                  </motion.button>
                )
              })}
            </div>
            {answered && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-body text-xs italic mt-2 px-1"
                style={{ color: 'var(--text-muted)' }}
              >
                {isCorrect ? '✅ ' : '❌ '}{q.explanation}
              </motion.p>
            )}
          </div>
        )
      })}
    </div>
  )
}
