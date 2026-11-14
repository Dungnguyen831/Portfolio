import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Play, RotateCw, ShieldAlert } from 'lucide-react'
import { FlutterMark } from './ui'

/* Logical screen size of the device (CSS px) – close to a 6.1" phone. */
const SCREEN_W = 360
const SCREEN_H = 760
const BEZEL = 12
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

export default function InteractivePhone({ src, hint, booted, onBoot }) {
  const [nonce, setNonce] = useState(0)
  const [ready, setReady] = useState(false)
  const [time, setTime] = useState('')
  const timer = useRef()
  const scale = useFitScale()

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }))
    tick()
    const id = setInterval(tick, 30_000)
    return () => {
      clearInterval(id)
      clearTimeout(timer.current)
    }
  }, [])

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
                <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor" aria-hidden="true">
                  <rect x="0" y="6" width="3" height="4" rx="1" />
                  <rect x="4.3" y="4" width="3" height="6" rx="1" />
                  <rect x="8.6" y="2" width="3" height="8" rx="1" />
                  <rect x="12.9" y="0" width="3" height="10" rx="1" />
                </svg>
                <span className="relative h-[10px] w-[20px] rounded-[3px] border border-white/50 p-[1.5px]">
                  <span className="block h-full w-[78%] rounded-[1.5px] bg-white" />
                </span>
              </span>
            </div>

            {/* Dynamic Island */}
            <span className="absolute left-1/2 top-[9px] z-30 flex h-[26px] w-[104px] -translate-x-1/2 items-center justify-end rounded-full bg-black px-2.5 ring-1 ring-white/[0.04]">
              <span className="h-2 w-2 rounded-full bg-[#1a1f2e] ring-1 ring-[#2a3350]" />
            </span>

            {/* App viewport */}
            <div className="relative bg-[#0f131c]" style={{ height: SCREEN_H - 38 - 22 }}>
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
                /* Lightweight Interactive Poster before booting CanvasKit */
                <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#0b0f18] p-5">
                  <svg
                    viewBox="0 0 360 700"
                    className="pointer-events-none absolute inset-0 h-full w-full opacity-85"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                  >
                    {[...Array(14)].map((_, i) => (
                      <line
                        key={'h' + i}
                        x1="0"
                        x2="360"
                        y1={30 + i * 50}
                        y2={15 + i * 52}
                        stroke="#162033"
                        strokeWidth={i % 3 === 0 ? 6 : 2}
                      />
                    ))}
                    {[...Array(9)].map((_, i) => (
                      <line
                        key={'v' + i}
                        y1="0"
                        y2="700"
                        x1={20 + i * 44}
                        x2={40 + i * 42}
                        stroke="#162033"
                        strokeWidth={i % 2 === 0 ? 5 : 2}
                      />
                    ))}
                    <path
                      d="M 30 580 C 110 470, 140 360, 195 310 S 290 180, 335 95"
                      fill="none"
                      stroke="#0284C7"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Simulated map markers */}
                  {[
                    [32, 34, '#F97316', 'Ùn tắc Ngã Tư Sở'],
                    [62, 26, '#EF4444', 'SOS Khẩn cấp'],
                    [54, 52, '#38BDF8', 'Camera giao thông'],
                  ].map(([x, y, c, lbl], i) => (
                    <div
                      key={i}
                      className="pointer-events-none absolute flex items-center gap-1.5"
                      style={{ left: `${x}%`, top: `${y}%` }}
                    >
                      <span
                        className="ghost-ring absolute -left-3 -top-3 h-6 w-6 rounded-full"
                        style={{ background: `${c}55`, animationDelay: `${i * 0.35}s` }}
                      />
                      <span
                        className="h-3 w-3 rounded-full ring-2 ring-[#0b0f18]"
                        style={{ background: c }}
                      />
                      <span className="rounded-md border border-white/10 bg-[#0a0d14]/90 px-2 py-0.5 font-mono text-[9.5px] text-slate-200">
                        {lbl}
                      </span>
                    </div>
                  ))}

                  {/* Top status pill inside preview */}
                  <div className="relative z-10 flex items-center justify-between rounded-xl border border-white/10 bg-[#0a0d14]/90 px-3.5 py-2.5 backdrop-blur">
                    <span className="flex items-center gap-2 font-mono text-[11px] text-white">
                      <FlutterMark size={13} /> TrafficHub · OSM Live
                    </span>
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
                      13 modules
                    </span>
                  </div>

                  {/* Center Call-to-Action to boot live Flutter engine */}
                  <div className="relative z-10 my-auto flex flex-col items-center rounded-2xl border border-white/15 bg-[#0A0D14]/95 p-5 text-center shadow-2xl backdrop-blur-md">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-sky-soft/30 bg-sky/[0.12] text-sky-soft">
                      <FlutterMark size={24} />
                    </div>
                    <p className="mt-3 text-base font-semibold text-white">
                      TrafficHub Flutter Web
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      Bản build Flutter thực tế (232 commits · 121 file Dart). Bấm để khởi chạy trực tiếp trong khung điện thoại.
                    </p>
                    <button
                      id="boot-traffichub-btn"
                      type="button"
                      onClick={onBoot}
                      className="btn btn-sky mt-4 w-full justify-center !h-11 !text-xs font-semibold"
                    >
                      <Play size={14} fill="currentColor" /> Khởi chạy Live Demo
                    </button>
                  </div>

                  {/* Bottom bar preview */}
                  <div className="relative z-10 flex items-center justify-around rounded-2xl border border-white/10 bg-[#0a0d14]/90 py-2.5 font-mono text-[10px] text-muted backdrop-blur">
                    <span className="text-sky-soft">Bản đồ</span>
                    <span>Cộng đồng</span>
                    <span className="flex items-center gap-1 text-signal">
                      <ShieldAlert size={11} /> SOS
                    </span>
                    <span>AI Bot</span>
                  </div>
                </div>
              )}

              <AnimatePresence>
                {booted && !ready && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 z-10 flex flex-col bg-[#0b0e15] p-5"
                  >
                    <div className="skeleton h-11 rounded-xl" />
                    <div className="skeleton mt-4 flex-1 rounded-2xl" />
                    <div className="mt-4 grid grid-cols-4 gap-3">
                      {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="skeleton h-10 rounded-xl" />
                      ))}
                    </div>
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-[#0A0D14]/90 px-5 py-4 backdrop-blur">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
                        >
                          <FlutterMark size={22} />
                        </motion.span>
                        <span className="font-mono text-[11px] text-muted">
                          Đang tải Flutter Web Engine…
                        </span>
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
          type="button"
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
