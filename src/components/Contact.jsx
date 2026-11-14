import { useState } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { profile } from '../data'
import { GithubIcon, SectionHeader } from './ui'

const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent('[Portfolio] Liên hệ công việc')}`

export default function Contact() {
  const [copied, setCopied] = useState(null)

  const copy = async (key, text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      /* clipboard unavailable – ignore */
    }
  }

  return (
    <section id="contact" className="px-5 pb-10 pt-4 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="04 — Liên hệ"
          title="Đang tìm cơ hội Thực tập / Intern Mobile App (Flutter)."
          desc={`Sẵn sàng phỏng vấn tại ${profile.location}. Email là cách nhanh nhất để liên hệ.`}
        />

        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <a
            href={`mailto:${profile.email}`}
            className="link text-2xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {profile.email}
          </a>
          <button
            id="copy-email"
            type="button"
            onClick={() => copy('email', profile.email)}
            aria-label="Sao chép email"
            className="grid h-10 w-10 place-items-center rounded-lg border border-line text-muted transition-colors hover:text-fg"
          >
            {copied === 'email' ? <Check size={16} className="text-go" /> : <Copy size={16} />}
          </button>
          <span role="status" aria-live="polite" className="text-sm text-go">
            {copied === 'email' && 'Đã sao chép email'}
            {copied === 'phone' && 'Đã sao chép số điện thoại'}
          </span>
        </div>

        <ul className="mt-12 grid divide-y divide-line border-y border-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          <li className="py-5 sm:px-0 lg:pr-6">
            <a href={gmailUrl} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-1.5 text-sm">
              Soạn nhanh bằng Gmail <ArrowUpRight size={14} />
            </a>
          </li>
          <li className="flex items-center gap-3 py-5 lg:px-6">
            <a
              href={`tel:${profile.phone.replace(/\s/g, '')}`}
              className="link font-mono text-sm"
            >
              {profile.phone}
            </a>
            <button
              id="copy-phone"
              type="button"
              onClick={() => copy('phone', profile.phone)}
              aria-label="Sao chép số điện thoại"
              className="text-muted transition-colors hover:text-fg"
            >
              {copied === 'phone' ? <Check size={14} className="text-go" /> : <Copy size={14} />}
            </button>
          </li>
          <li className="py-5 lg:px-6">
            <a href={profile.github} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-2 text-sm">
              <GithubIcon size={15} /> @{profile.username}
            </a>
          </li>
          <li className="py-5 lg:pl-6">
            <a id="download-cv" href={profile.cv} download="CV_Nguyen_Dung.pdf" className="link text-sm">
              Tải CV (PDF · {profile.cvSizeKb} KB)
            </a>
          </li>
        </ul>

        <footer className="mt-24 flex flex-col justify-between gap-4 border-t border-line py-6 text-xs text-dim md:flex-row md:items-center">
          <p className="max-w-md leading-relaxed">“{profile.motto}”</p>
          <div className="flex items-center gap-6">
            <p>
              © {new Date().getFullYear()} {profile.name} · React, Vite &amp; Tailwind CSS
            </p>
            <a href="#home" className="link">
              ↑ Đầu trang
            </a>
          </div>
        </footer>
      </div>
    </section>
  )
}
