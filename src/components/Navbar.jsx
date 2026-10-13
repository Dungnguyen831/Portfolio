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
      {profile.name}<span className="text-dim"> / dev</span>
    </span>
  </a>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const ids = navLinks.map((l) => l.href.slice(1))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-30% 0px -40% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? 'border-b border-white/[0.06] bg-base/80 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-4">
          <Logo />
          <StatusPill className="hidden lg:inline-flex" />
        </div>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => {
            const sectionId = l.href.slice(1)
            const isActive = active === sectionId
            return (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  className={`relative block rounded-lg px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-muted hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-white/[0.07] border border-white/[0.06]"
                      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            id="nav-github"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="hidden h-8 w-8 place-items-center rounded-lg border border-white/[0.08] text-muted transition-colors hover:border-white/20 hover:text-white sm:grid"
          >
            <GithubIcon size={16} />
          </a>
          <a
            id="nav-cta"
            href="#contact"
            className="btn btn-primary hidden !h-8 !rounded-lg !px-3 !text-[13px] sm:inline-flex"
          >
            Liên hệ <ArrowUpRight size={14} />
          </a>
          <button
            id="nav-toggle"
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-fg md:hidden"
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
            className="border-b border-white/[0.06] bg-base/95 backdrop-blur-2xl md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col px-5 py-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/[0.04] py-3 text-[14.5px] font-medium text-fg hover:text-sky-soft"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-4 pb-2">
                <StatusPill />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
