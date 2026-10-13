import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navLinks, profile } from '../data'
import { GithubIcon, StatusPill } from './ui'

const Logo = () => (
  <a href="#home" id="nav-logo" className="group flex items-center gap-2.5" aria-label="Trang chủ">
    <span className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 bg-white/[0.04] font-mono text-[11px] font-semibold text-white transition-colors group-hover:border-sky-soft/40">
      ND
    </span>
    <span className="text-sm font-medium tracking-tight text-white">
      Anh Dũng<span className="text-dim"> / flutter</span>
    </span>
  </a>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const ids = navLinks.map((l) => l.href.slice(1))
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open ? 'border-b border-white/[0.06] bg-base/75 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-4">
          <Logo />
          <StatusPill className="hidden lg:inline-flex" />
        </div>

        <ul className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((l) => {
            const isActive = active === l.href.slice(1)
            return (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  className={`relative block rounded-md px-3 py-1.5 text-[13px] transition-colors ${isActive ? 'text-white' : 'text-muted hover:text-white'}`}
                >
                  {isActive && (
                    <motion.span layoutId="nav-active" className="absolute inset-0 rounded-md bg-white/[0.06]" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a id="nav-github" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hidden h-8 w-8 place-items-center rounded-md text-muted transition-colors hover:bg-white/5 hover:text-white sm:grid">
            <GithubIcon size={16} />
          </a>
          <a id="nav-cta" href="#contact" className="btn btn-primary hidden !h-8 !rounded-md !px-3 !text-[13px] sm:inline-flex">
            Liên hệ <ArrowUpRight size={14} />
          </a>
          <button
            id="nav-toggle"
            className="grid h-9 w-9 place-items-center rounded-md border border-white/10 text-fg md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Mở menu"
            aria-expanded={open}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col px-5 pb-4">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block border-b border-white/[0.06] py-3.5 text-[15px] text-fg">
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-4"><StatusPill /></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
