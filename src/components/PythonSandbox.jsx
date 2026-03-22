import { useState, useRef, useEffect } from 'react'

let pyodideInstance = null
let pyodideInjecting = false

export default function PythonSandbox({ initialCode }) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState('')
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [isInitializing, setIsInitializing] = useState(false)

  const initPyodide = async () => {
    if (pyodideInstance) return pyodideInstance
    if (pyodideInjecting) {
      // Wait for it to finish if already injecting
      while (!pyodideInstance) {
        await new Promise(r => setTimeout(r, 100))
      }
      return pyodideInstance
    }

    pyodideInjecting = true
    setIsInitializing(true)
    
    // Inject the script dynamically
    await new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js'
      script.onload = resolve
      script.onerror = reject
      document.body.appendChild(script)
    })

    const py = await window.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/'
    })
    
    // Override stdout so we can catch print()
    py.runPython(`
      import sys
      from js import document
      import builtins
      
      class JSConsole:
          def __init__(self):
              self.output = ""
          def write(self, string):
              self.output += string
          def flush(self):
              pass
              
      sys.stdout = JSConsole()
      sys.stderr = JSConsole()
    `)
    
    pyodideInstance = py
    setIsInitializing(false)
    return py
  }

  const runCode = async () => {
    setIsEvaluating(true)
    setOutput('')
    
    try {
      const py = await initPyodide()
      
      // Clear previous output log
      py.runPython(`
        sys.stdout.output = ""
        sys.stderr.output = ""
      `)
      
      // Run the user code
      await py.runPythonAsync(code)
      
      // Extract the logged output
      const logs = py.runPython(`sys.stdout.output + sys.stderr.output`)
      setOutput(logs || 'Code finished execution without output.')

    } catch (err) {
      setOutput(err.toString())
    } finally {
      setIsEvaluating(false)
    }
  }

  return (
    <div className="rounded-xl overflow-hidden mb-5 border" style={{ borderColor: 'var(--border)' }}>
      {/* Editor Header */}
      <div className="flex justify-between items-center px-4 py-2 bg-[var(--bg-base)] border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-60"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-60"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 opacity-60"></div>
          <span className="ml-2 font-mono text-[10px] text-[var(--text-muted)]">live_sandbox.py</span>
        </div>
        <button
          onClick={runCode}
          disabled={isEvaluating || isInitializing}
          className="font-mono text-[10px] px-3 py-1 rounded-md transition-all font-bold cursor-pointer disabled:opacity-50"
          style={{ background: 'var(--green)', color: '#fff' }}
        >
          {isInitializing ? 'Downloading Python WASM...' : isEvaluating ? 'Running 🐍...' : '▶ Run Code'}
        </button>
      </div>

      {/* Editor Body */}
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck="false"
          className="w-full h-auto min-h-[120px] p-4 font-mono text-xs bg-[var(--bg-surface)] text-[var(--accent)] outline-none resize-y"
          style={{ 
            lineHeight: 1.6,
            tabSize: 4
          }}
          onKeyDown={(e) => {
            if (e.key === 'Tab') {
              e.preventDefault()
              const start = e.target.selectionStart
              const end = e.target.selectionEnd
              const newCode = code.substring(0, start) + '    ' + code.substring(end)
              setCode(newCode)
              setTimeout(() => {
                e.target.selectionStart = e.target.selectionEnd = start + 4
              }, 0)
            }
          }}
        />
      </div>

      {/* Terminal Output */}
      {output && (
        <div className="border-t bg-[#0a0a0f] p-4" style={{ borderColor: 'var(--border)' }}>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#6b6b82] mb-2">Terminal Output</p>
          <pre className="font-mono text-xs text-[#e8e8f0] whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  )
}
