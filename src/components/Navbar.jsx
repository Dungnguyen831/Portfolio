import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks, profile } from '../data'
import { GithubIcon } from './ui'

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
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-30% 0px -50% 0px' },
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
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? 'border-line bg-base/90 backdrop-blur-md' : 'border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8" aria-label="Điều hướng chính">
        <a href="#home" id="nav-logo" className="text-sm font-medium tracking-tight text-fg">
          {profile.name}
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => {
            const isActive = active === l.href.slice(1)
            return (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`block py-2 text-[13px] transition-colors ${
                    isActive ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 bottom-0 h-px bg-fg"
                      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                    />
                  )}
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
            className="hidden h-9 w-9 place-items-center rounded-lg text-muted transition-colors hover:text-fg sm:grid"
          >
            <GithubIcon size={17} />
          </a>
          <a
            id="nav-cv"
            href={profile.cv}
            download="CV_Nguyen_Dung.pdf"
            className="btn btn-primary hidden !h-9 !px-3.5 !text-[13px] sm:inline-flex"
          >
            Tải CV
          </a>
          <button
            id="nav-toggle"
            type="button"
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-fg md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Đóng menu' : 'Mở menu'}
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
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-base md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col px-5 py-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line py-3.5 text-[15px] text-fg"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="py-4">
                <a href={profile.cv} download="CV_Nguyen_Dung.pdf" className="btn btn-primary w-full">
                  Tải CV (PDF · {profile.cvSizeKb} KB)
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
