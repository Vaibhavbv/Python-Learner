import { useEffect, useRef, useState } from 'react'
import hljs from 'highlight.js/lib/core'
import python from 'highlight.js/lib/languages/python'
import 'highlight.js/styles/atom-one-dark.min.css'
import QuizBlock from './QuizBlock'

hljs.registerLanguage('python', python)

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function CopyButton({ code }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async (e) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* fallback: do nothing */ }
  }
  return (
    <button
      onClick={handleCopy}
      className="font-mono text-[10px] px-2 py-1 rounded transition-all cursor-pointer absolute top-2 right-2"
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        color: copied ? 'var(--green)' : 'var(--text-muted)',
      }}
    >
      {copied ? 'copied ✓' : 'copy'}
    </button>
  )
}

export default function ContentPanel({ topic }) {
  const panelRef = useRef()
  const c = topic.content

  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.querySelectorAll('pre code').forEach(el => {
        hljs.highlightElement(el)
      })
    }
  }, [topic.id])

  if (c.locked) {
    return (
      <div className="rounded-lg p-10 text-center" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
        <span className="text-3xl block mb-3">🔒</span>
        <p className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
          Full content dropping soon.
        </p>
        <p className="font-mono text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
          Use the subtopics above as a study checklist.
        </p>
      </div>
    )
  }

  return (
    <div
      ref={panelRef}
      className="rounded-lg p-6 md:p-7"
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        borderLeft: `4px solid var(--${topic.imp})`,
      }}
    >
      {/* Vibe header */}
      <h3 className="font-display text-xl font-bold mb-5 leading-snug" style={{ color: 'var(--text-primary)' }}>
        {c.vibe}
      </h3>

      {/* Explanation */}
      <SectionTitle>The Real Explanation</SectionTitle>
      <div className="space-y-3 mb-6">
        {c.explanation.map((para, i) => (
          <p key={i} className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }} dangerouslySetInnerHTML={{ __html: para }} />
        ))}
      </div>

      {/* ASCII diagram */}
      <SectionTitle>Visual Breakdown</SectionTitle>
      <div className="rounded-md overflow-x-auto mb-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        <pre className="font-mono text-xs leading-relaxed p-4 whitespace-pre" style={{ color: 'var(--text-primary)' }}>
          {c.ascii}
        </pre>
      </div>

      {/* Code examples */}
      <SectionTitle>Code Examples</SectionTitle>
      {c.code.map((block, i) => (
        <div key={i} className="mb-5">
          <p className="font-mono text-sm font-bold mb-1.5" style={{ color: 'var(--text-primary)' }}>
            {block.label}
          </p>
          <div className="relative">
            <CopyButton code={block.code} />
            <pre><code className={`language-${block.language}`}>{block.code}</code></pre>
          </div>
        </div>
      ))}

      {/* Gotchas */}
      <SectionTitle>Gotchas 🚨</SectionTitle>
      <div className="space-y-2 mb-6">
        {c.gotchas.map((g, i) => (
          <div key={i} className="rounded-md p-3 text-sm" style={{ background: 'color-mix(in srgb, var(--must) 8%, var(--bg-surface))', border: '1px solid color-mix(in srgb, var(--must) 20%, transparent)' }}>
            <span className="font-bold" style={{ color: 'var(--must)' }}>🚨 {g.title}</span>
            <span style={{ color: 'var(--text-secondary)' }}> — {g.body}</span>
          </div>
        ))}
      </div>

      {/* Real World */}
      <SectionTitle>Real World Use 🌍</SectionTitle>
      <div className="rounded-md p-4 mb-6" style={{ background: 'color-mix(in srgb, var(--accent) 8%, var(--bg-surface))', border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)' }}>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }} dangerouslySetInnerHTML={{ __html: c.real_world }} />
      </div>

      {/* Quiz */}
      <SectionTitle>Quick Quiz 🎯</SectionTitle>
      <QuizBlock quiz={c.quiz} topicId={topic.id} />

      {/* Resources */}
      <SectionTitle>Resources 🔗</SectionTitle>
      <div className="flex flex-wrap gap-2">
        {c.resources.map((r, i) => (
          <a
            key={i}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs px-3 py-1.5 rounded-md transition-all duration-200 no-underline"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              color: 'var(--accent)',
            }}
          >
            {r.label} →
          </a>
        ))}
      </div>
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <h4
      className="font-mono text-xs uppercase tracking-widest mb-3 mt-6 pb-1.5"
      style={{ color: 'var(--accent)', borderBottom: '1px solid var(--border)' }}
    >
      {children}
    </h4>
  )
}
