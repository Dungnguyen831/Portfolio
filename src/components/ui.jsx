import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

export const Reveal = ({ children, delay = 0, y = 18, className = '', as = 'div' }) => {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </M>
  )
}

export const Eyebrow = ({ children, color = 'text-sky-soft' }) => (
  <span className={`inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] ${color}`}>
    <span className="h-px w-5 bg-current opacity-60" />
    {children}
  </span>
)

export const SectionHeader = ({ eyebrow, title, desc, right }) => (
  <Reveal className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
    <div className="max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">{title}</h2>
      {desc && <p className="mt-3 text-[15px] leading-relaxed text-muted">{desc}</p>}
    </div>
    {right}
  </Reveal>
)

/** Card with a cursor-following hairline highlight. */
export const Spotlight = ({ as: Tag = 'div', className = '', children, ...rest }) => {
  const onMove = useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }, [])
  return (
    <Tag onMouseMove={onMove} className={`card spotlight ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

export const useMediaQuery = (query) => {
  const get = () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false)
  const [match, setMatch] = useState(get)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const fn = () => setMatch(mql.matches)
    fn()
    mql.addEventListener('change', fn)
    return () => mql.removeEventListener('change', fn)
  }, [query])
  return match
}

export const StatusPill = ({ className = '' }) => (
  <span className={`status-pill inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-emerald-300 ${className}`}>
    <span className="relative flex h-2 w-2">
      <span className="beacon absolute inline-flex h-full w-full rounded-full bg-go" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-go shadow-[0_0_8px_#22c55e]" />
    </span>
    Sẵn sàng nhận việc <span className="text-emerald-300/60">(Open to Work)</span>
  </span>
)

export const GithubIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.250 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.690 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
)

export const FigmaIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={className}>
    <path d="M8.5 2h3.5v7H8.5a3.5 3.5 0 1 1 0-7Z" />
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2Z" />
    <path d="M12 9h3.5a3.5 3.5 0 1 1-3.5 3.5V9Z" />
    <path d="M8.5 9H12v7H8.5a3.5 3.5 0 1 1 0-7Z" />
    <path d="M8.5 16H12v3.5A3.5 3.5 0 1 1 8.5 16Z" />
  </svg>
)

export const FlutterMark = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path fill="#38BDF8" d="M14.3 1 3.9 11.4l3.2 3.2L20.7 1z" />
    <path fill="#38BDF8" d="M14.3 11.1 8.8 16.6l3.2 3.2 2.3-2.3h6.4l-6.4-6.4z" />
    <path fill="#0284C7" d="m12 19.8 2.3 2.2h6.4l-6.4-6.4z" />
  </svg>
)
