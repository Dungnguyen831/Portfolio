import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, RotateCw } from 'lucide-react'
import { FlutterMark } from './ui'

/* Logical screen size of the device (CSS px) – close to a 6.1" phone. */
const SCREEN_W = 360
const SCREEN_H = 760
const BEZEL = 12
const FRAME_W = SCREEN_W + BEZEL * 2
const FRAME_H = SCREEN_H + BEZEL * 2

/* Where to draw the "ghost finger" for each scenario (percent of the screen). */
const HINTS = {
  drag: { x: 50, y: 46, drag: true, label: 'Kéo để di chuyển bản đồ' },
  tap: { x: 60, y: 38, label: 'Chạm vào biển cảnh báo' },
  report: { x: 50, y: 95, label: 'Nút báo cáo trên thanh điều hướng' },
}

function GhostFinger({ hint }) {
  const h = HINTS[hint]
  if (!h) return null
  return (
    <motion.div
      key={hint}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pointer-events-none absolute inset-0 z-20"
    >
      <div className="absolute inset-0 bg-black/25" />
      <motion.div
        className="absolute"
        style={{ left: `${h.x}%`, top: `${h.y}%` }}
        animate={h.drag ? { x: [-50, 50, -50] } : { x: 0 }}
        transition={h.drag ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } : {}}
      >
        <span className="ghost-ring absolute -left-6 -top-6 h-12 w-12 rounded-full border-2 border-white/80" />
        <span className="absolute -left-3.5 -top-3.5 h-7 w-7 rounded-full bg-white/90 shadow-[0_0_0_6px_rgba(255,255,255,0.18),0_6px_20px_rgba(0,0,0,0.4)]" />
      </motion.div>
      <div
        className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#0A0D14]/90 px-3 py-1.5 font-mono text-[11px] text-white backdrop-blur"
        style={{ top: h.y > 70 ? `${h.y - 12}%` : `${h.y + 9}%` }}
      >
        {h.label}
      </div>
    </motion.div>
  )
}

function useFitScale() {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const fit = () => {
      const avail = window.innerHeight - 120
      setScale(Math.max(0.74, Math.min(1, avail / FRAME_H)))
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])
  return scale
}

export default function InteractivePhone({ src, hint }) {
  const [nonce, setNonce] = useState(0)
  const [ready, setReady] = useState(false)
  const [time, setTime] = useState('')
  const timer = useRef()
  const scale = useFitScale()

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }))
    tick()
    const id = setInterval(tick, 30_000)
    return () => { clearInterval(id); clearTimeout(timer.current) }
  }, [])

  // Flutter keeps booting after the HTML `load` event – give the engine a moment to paint.
  const onLoad = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setReady(true), 1400) }
  const reload = () => { setReady(false); setNonce((n) => n + 1) }

  return (
    <div className="relative" style={{ width: FRAME_W * scale, height: FRAME_H * scale }}>
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: FRAME_W, height: FRAME_H, transform: `scale(${scale})` }}
      >
        {/* side buttons */}
        <span className="phone-btn absolute -left-[3px] top-[120px] h-8 w-[3px]" />
        <span className="phone-btn absolute -left-[3px] top-[170px] h-14 w-[3px]" />
        <span className="phone-btn absolute -left-[3px] top-[236px] h-14 w-[3px]" />
        <span className="phone-btn absolute -right-[3px] top-[190px] h-20 w-[3px]" />

        <div className="phone-shell relative h-full w-full rounded-[56px]" style={{ padding: BEZEL }}>
          <div className="relative h-full w-full overflow-hidden rounded-[44px] bg-black">
            {/* Status bar */}
            <div className="relative z-10 flex h-[38px] items-center justify-between bg-black px-7 text-[12px] font-semibold text-white">
              <span className="tabular-nums">{time}</span>
              <span className="flex items-center gap-1.5">
                <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor" aria-hidden="true"><rect x="0" y="6" width="3" height="4" rx="1" /><rect x="4.3" y="4" width="3" height="6" rx="1" /><rect x="8.6" y="2" width="3" height="8" rx="1" /><rect x="12.9" y="0" width="3" height="10" rx="1" /></svg>
                <span className="relative h-[10px] w-[20px] rounded-[3px] border border-white/50 p-[1.5px]"><span className="block h-full w-[78%] rounded-[1.5px] bg-white" /></span>
              </span>
            </div>

            {/* Dynamic Island */}
            <span className="absolute left-1/2 top-[9px] z-30 flex h-[26px] w-[104px] -translate-x-1/2 items-center justify-end rounded-full bg-black px-2.5 ring-1 ring-white/[0.04]">
              <span className="h-2 w-2 rounded-full bg-[#1a1f2e] ring-1 ring-[#2a3350]" />
            </span>

            {/* App viewport */}
            <div className="relative bg-[#0f131c]" style={{ height: SCREEN_H - 38 - 22 }}>
              <iframe
                key={nonce}
                id="traffichub-iframe"
                title="TrafficHub – Flutter Web Demo"
                src={src}
                loading="lazy"
                onLoad={onLoad}
                allow="geolocation; fullscreen; clipboard-write"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-full w-full border-0 bg-white"
              />

              <AnimatePresence>
                {!ready && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: 'blur(6px)' }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 z-10 flex flex-col bg-[#0b0e15] p-5"
                  >
                    <div className="skeleton h-11 rounded-xl" />
                    <div className="skeleton mt-4 flex-1 rounded-2xl" />
                    <div className="mt-4 grid grid-cols-4 gap-3">
                      {[0, 1, 2, 3].map((i) => <div key={i} className="skeleton h-10 rounded-xl" />)}
                    </div>
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-[#0A0D14]/90 px-5 py-4 backdrop-blur">
                        <motion.span animate={{ rotate: 360 }} transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}>
                          <FlutterMark size={22} />
                        </motion.span>
                        <span className="font-mono text-[11px] text-muted">Khởi động Flutter engine…</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>{hint && <GhostFinger hint={hint} />}</AnimatePresence>
            </div>

            {/* Home indicator */}
            <div className="flex h-[22px] items-center justify-center bg-black">
              <span className="h-[5px] w-[124px] rounded-full bg-white/85" />
            </div>
          </div>
          {/* glass reflection */}
          <span className="pointer-events-none absolute inset-0 rounded-[56px] bg-[linear-gradient(115deg,rgba(255,255,255,0.07)_0%,transparent_28%)]" />
        </div>
      </div>

      {/* Device controls */}
      <div className="absolute -right-14 top-10 flex flex-col gap-2">
        <button
          id="phone-reload"
          onClick={reload}
          aria-label="Làm mới demo"
          title="Làm mới demo"
          className="group grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-surface text-muted transition-colors hover:border-white/20 hover:text-white"
        >
          <RotateCw size={15} className="transition-transform duration-500 group-hover:rotate-180" />
        </button>
        <a
          id="phone-open"
          href={src}
          target="_blank"
          rel="noreferrer"
          aria-label="Mở toàn màn hình"
          title="Mở toàn màn hình"
          className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-surface text-muted transition-colors hover:border-white/20 hover:text-white"
        >
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  )
}
