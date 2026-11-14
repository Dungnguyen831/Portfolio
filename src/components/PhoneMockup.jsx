import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Play, RotateCw } from 'lucide-react'
import { FlutterMark } from './ui'

/* Logical screen size (CSS px) – close to a 6.1" phone. */
const SCREEN_W = 360
const SCREEN_H = 720
const BEZEL = 10
const FRAME_W = SCREEN_W + BEZEL * 2
const FRAME_H = SCREEN_H + BEZEL * 2

/* Where to draw the "ghost finger" for each scenario (percent of the screen). */
const HINTS = {
  drag: { x: 50, y: 46, drag: true, label: 'Kéo để di chuyển bản đồ OSM' },
  tap: { x: 60, y: 38, label: 'Chạm vào điểm cảnh báo sự cố' },
  report: { x: 50, y: 92, label: 'Gửi báo cáo / phát tín hiệu SOS' },
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
        <span className="absolute -left-3.5 -top-3.5 h-7 w-7 rounded-full bg-white/90" />
      </motion.div>
      <div
        className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-base/90 px-3 py-1.5 text-xs text-white"
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
      const avail = window.innerHeight - 190
      setScale(Math.max(0.74, Math.min(1, avail / FRAME_H)))
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])
  return scale
}

export default function InteractivePhone({ src, hint, booted, onBoot }) {
  const [nonce, setNonce] = useState(0)
  const [ready, setReady] = useState(false)
  const timer = useRef()
  const scale = useFitScale()

  useEffect(() => () => clearTimeout(timer.current), [])

  // Flutter keeps booting after the HTML `load` event – give the engine a moment to paint.
  const onLoad = () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setReady(true), 1200)
  }
  const reload = () => {
    if (!booted) {
      onBoot?.()
      return
    }
    setReady(false)
    setNonce((n) => n + 1)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: FRAME_W * scale, height: FRAME_H * scale }}>
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{ width: FRAME_W, height: FRAME_H, transform: `scale(${scale})` }}
        >
          <div
            className="h-full w-full rounded-[44px] border border-white/15 bg-[#050506]"
            style={{ padding: BEZEL }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-black">
              {booted ? (
                <iframe
                  key={nonce}
                  id="traffichub-iframe"
                  title="TrafficHub – Flutter Web Demo"
                  src={src}
                  onLoad={onLoad}
                  allow="geolocation; fullscreen; clipboard-write"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-full w-full border-0 bg-white"
                />
              ) : (
                <div className="flex h-full w-full flex-col justify-between bg-surface p-7">
                  <span className="flex items-center gap-2 text-sm font-medium text-fg">
                    <FlutterMark size={18} /> TrafficHub
                  </span>

                  <div>
                    <p className="text-2xl font-semibold leading-tight tracking-tight text-fg">
                      Bản build Flutter Web thực tế.
                    </p>
                    <ul className="mt-4 space-y-1.5 text-sm text-muted">
                      <li>Bản đồ cảnh báo giao thông (OpenStreetMap)</li>
                      <li>Phát tín hiệu SOS qua WebSocket</li>
                      <li>Trợ lý AI Gemini &amp; giọng nói</li>
                    </ul>
                    <button
                      id="boot-traffichub-btn"
                      type="button"
                      onClick={onBoot}
                      className="btn btn-primary mt-7 w-full"
                    >
                      <Play size={14} fill="currentColor" /> Khởi chạy Live Demo
                    </button>
                  </div>

                  <p className="text-xs leading-relaxed text-dim">
                    Lần đầu có thể mất vài giây để tải Flutter Web Engine.
                  </p>
                </div>
              )}

              <AnimatePresence>
                {booted && !ready && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 z-10 flex flex-col bg-surface p-5"
                  >
                    <div className="skeleton h-11 rounded-xl" />
                    <div className="skeleton mt-4 flex-1 rounded-2xl" />
                    <div className="mt-4 grid grid-cols-4 gap-3">
                      {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="skeleton h-10 rounded-xl" />
                      ))}
                    </div>
                    <p className="absolute inset-x-0 top-1/2 text-center text-sm text-muted" role="status">
                      Đang tải Flutter Web Engine…
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>{hint && <GhostFinger hint={hint} />}</AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5 text-[13px]">
        <button
          id="phone-reload"
          type="button"
          onClick={reload}
          className="link inline-flex items-center gap-1.5"
        >
          <RotateCw size={13} /> {booted ? 'Làm mới' : 'Khởi chạy'}
        </button>
        <a
          id="phone-open"
          href={src}
          target="_blank"
          rel="noreferrer"
          className="link inline-flex items-center gap-1.5"
        >
          <ExternalLink size={13} /> Mở toàn màn hình
        </a>
      </div>
    </div>
  )
}
