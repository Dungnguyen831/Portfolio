import { useEffect, useId, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

export const Reveal = ({ children, delay = 0, y = 12, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.6, delay, ease: EASE }}
  >
    {children}
  </motion.div>
)

export const SectionHeader = ({ index, title, desc, right }) => (
  <Reveal className="mb-12 flex flex-col justify-between gap-6 border-t border-line pt-6 md:flex-row md:items-end">
    <div className="max-w-2xl">
      <p className="font-mono text-xs text-dim">{index}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{title}</h2>
      {desc && <p className="mt-3 text-[15px] leading-relaxed text-muted">{desc}</p>}
    </div>
    {right}
  </Reveal>
)

/** Hairline definition list: [{ k, v }] */
export const Rows = ({ items, labelWidth = '160px', mono = false }) => (
  <dl className="divide-y divide-line border-y border-line">
    {items.map(({ k, v }) => (
      <div
        key={k}
        className="grid gap-1 py-3 sm:items-baseline sm:gap-6 sm:[grid-template-columns:var(--label-w)_1fr]"
        style={{ '--label-w': labelWidth }}
      >
        <dt className="text-xs text-dim">{k}</dt>
        <dd className={`text-[14px] leading-relaxed text-fg ${mono ? 'font-mono text-[13px]' : ''}`}>{v}</dd>
      </div>
    ))}
  </dl>
)

/**
 * Accessible tabs (WAI-ARIA tabs, selection follows focus, roving tabindex).
 * tabs: [{ id, label, content }]
 */
export function Tabs({ label, tabs }) {
  const uid = useId()
  const [active, setActive] = useState(tabs[0].id)
  const refs = useRef({})

  const select = (id, focus = false) => {
    setActive(id)
    const el = refs.current[id]
    if (el) {
      if (focus) el.focus()
      el.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    }
  }

  const onKeyDown = (e, i) => {
    let next
    if (e.key === 'ArrowRight') next = (i + 1) % tabs.length
    else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = tabs.length - 1
    else return
    e.preventDefault()
    select(tabs[next].id, true)
  }

  return (
    <div>
      <div role="tablist" aria-label={label} className="tablist">
        {tabs.map((t, i) => {
          const on = t.id === active
          return (
            <button
              key={t.id}
              ref={(el) => (refs.current[t.id] = el)}
              id={`${uid}-tab-${t.id}`}
              type="button"
              role="tab"
              className="tab"
              aria-selected={on}
              tabIndex={on ? 0 : -1}
              onClick={() => select(t.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {t.label}
            </button>
          )
        })}
      </div>
      {tabs.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${t.id}`}
          hidden={t.id !== active}
          tabIndex={t.id === active ? 0 : undefined}
        >
          <div className="pt-6">{t.content}</div>
        </div>
      ))}
    </div>
  )
}

/** Closes a modal <dialog> after its exit transition has finished. */
async function closeWithAnimation(dialog) {
  if (!dialog.open || dialog.hasAttribute('data-closing')) return
  dialog.setAttribute('data-closing', '')
  const animations = dialog.getAnimations({ subtree: true })
  if (animations.length > 0) {
    await Promise.race([
      Promise.allSettled(animations.map((a) => a.finished)),
      new Promise((r) => setTimeout(r, 800)),
    ])
  }
  dialog.removeAttribute('data-closing')
  dialog.close()
}

/**
 * Native <dialog> modal wrapper:
 * - opens with showModal(), closes with an exit animation (see index.css)
 * - closedby="any" gives Esc + light-dismiss; Esc / light-dismiss are routed through the same animated close
 * - coordinate-based backdrop click fallback when closedBy is unsupported
 */
export const ModalDialog = ({ open, onClose, titleId, className = '', children }) => {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    else if (!open && dialog.open) closeWithAnimation(dialog)
  }, [open])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleClose = () => onClose?.()
    const handleCancel = (e) => {
      e.preventDefault()
      closeWithAnimation(dialog)
    }
    dialog.addEventListener('close', handleClose)
    dialog.addEventListener('cancel', handleCancel)

    let handleBackdropClick
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      handleBackdropClick = (event) => {
        if (event.target !== dialog) return
        const r = dialog.getBoundingClientRect()
        const inside =
          r.top <= event.clientY &&
          event.clientY <= r.top + r.height &&
          r.left <= event.clientX &&
          event.clientX <= r.left + r.width
        if (!inside) closeWithAnimation(dialog)
      }
      dialog.addEventListener('click', handleBackdropClick)
    }

    return () => {
      dialog.removeEventListener('close', handleClose)
      dialog.removeEventListener('cancel', handleCancel)
      if (handleBackdropClick) dialog.removeEventListener('click', handleBackdropClick)
    }
  }, [onClose])

  return (
    <dialog
      ref={dialogRef}
      {...{ closedby: 'any' }}
      aria-labelledby={titleId}
      className={`m-auto border-0 bg-transparent p-0 text-fg outline-none open:flex ${className}`}
    >
      {children}
    </dialog>
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
  <span className={`inline-flex items-center gap-2 text-sm text-muted ${className}`}>
    <span className="h-2 w-2 rounded-full bg-go" aria-hidden="true" />
    Đang tìm cơ hội Thực tập / Intern · Hà Nội
  </span>
)

export const GithubIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
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
