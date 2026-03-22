import { useCallback } from 'react'

export function useSoundEffects() {
  const playPop = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.setValueAtTime(400, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05)
      gain.gain.setValueAtTime(0.1, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.05)
    } catch (e) { /* ignore */ }
  }, [])

  const playSwoosh = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()
      
      osc.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(120, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15)
      
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(1000, ctx.currentTime)
      filter.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.15)

      gain.gain.setValueAtTime(0, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.02)
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15)
      
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.15)
    } catch (e) { /* ignore */ }
  }, [])

  const playLevelUp = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      
      // Chime sequence: C5, E5, G5, C6
      const freqs = [523.25, 659.25, 783.99, 1046.50]
      const duration = 0.1
      
      freqs.forEach((freq, i) => {
        const time = ctx.currentTime + (i * duration)
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        
        osc.connect(gain)
        gain.connect(ctx.destination)
        
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, time)
        
        gain.gain.setValueAtTime(0, time)
        gain.gain.linearRampToValueAtTime(0.1, time + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration * 1.5)
        
        osc.start(time)
        osc.stop(time + duration * 1.5)
      })
    } catch (e) { /* ignore */ }
  }, [])

  return { playPop, playSwoosh, playLevelUp }
}
