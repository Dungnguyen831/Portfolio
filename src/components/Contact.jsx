import { useState } from 'react'
import { ArrowUpRight, Check, Copy, FileDown, Mail, Phone, Send } from 'lucide-react'
import { profile } from '../data'
import { GithubIcon, Reveal, SectionHeader, Spotlight, StatusPill } from './ui'

const field =
  'w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-3 text-[14px] text-white outline-none transition-colors placeholder:text-dim focus:border-sky-soft/50 focus:bg-white/[0.04]'

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const [copied, setCopied] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const d = new FormData(form)
    setStatus('sending')
    // Mở mail client – thay bằng API/EmailJS/Formspree khi triển khai thật.
    const subject = encodeURIComponent(`Liên hệ từ ${d.get('name')}`)
    const body = encodeURIComponent(`${d.get('message')}\n\n— ${d.get('name')} (${d.get('email')})`)
    setTimeout(() => {
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      setStatus('sent')
      form.reset()
    }, 500)
  }

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* ignore */ }
  }

  return (
    <section id="contact" className="px-5 pb-10 pt-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Liên hệ"
          title="Cùng xây sản phẩm tiếp theo"
          desc="Đang tìm Software Developer (Flutter / Java Spring Boot)? Tôi phản hồi trong vòng 24 giờ."
          right={<StatusPill />}
        />

        <div className="grid gap-3 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <form id="contact-form" onSubmit={onSubmit} className="card space-y-3 p-6 sm:p-7">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs text-muted">Tên</span>
                  <input id="f-name" name="name" required placeholder="Nguyễn Văn A" autoComplete="name" className={field} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs text-muted">Email</span>
                  <input id="f-email" name="email" type="email" required placeholder="ban@congty.com" autoComplete="email" className={field} />
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-xs text-muted">Tin nhắn</span>
                <textarea id="f-msg" name="message" required rows={5} placeholder="Mô tả ngắn về vị trí / dự án…" className={`${field} resize-none`} />
              </label>
              <div className="flex items-center justify-between pt-1">
                <span className="hidden text-xs text-dim sm:block">Mở ứng dụng email của bạn với nội dung đã điền.</span>
                <button id="f-submit" disabled={status === 'sending'} className="btn btn-primary disabled:opacity-60">
                  {status === 'sent' ? <Check size={15} /> : <Send size={15} />}
                  {status === 'sending' ? 'Đang mở…' : status === 'sent' ? 'Đã mở email' : 'Gửi tin nhắn'}
                </button>
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-3">
              <Spotlight className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-dim">Email</p>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <a href={`mailto:${profile.email}`} className="truncate text-[15px] text-white hover:text-sky-soft">{profile.email}</a>
                  <button id="copy-email" onClick={copyEmail} aria-label="Sao chép email" className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-white/10 text-muted transition-colors hover:text-white">
                    {copied ? <Check size={14} className="text-go" /> : <Copy size={14} />}
                  </button>
                </div>
              </Spotlight>
              <div className="grid grid-cols-2 gap-3">
                <Spotlight as="a" href={`tel:${profile.phone.replace(/\s/g, '')}`} className="group p-5">
                  <Phone size={16} className="text-muted group-hover:text-white" />
                  <p className="mt-4 text-[13px] text-fg">{profile.phone}</p>
                </Spotlight>
                <Spotlight as="a" href={profile.github} target="_blank" rel="noreferrer" className="group p-5">
                  <div className="flex justify-between"><GithubIcon size={16} className="text-muted group-hover:text-white" /><ArrowUpRight size={14} className="text-dim group-hover:text-white" /></div>
                  <p className="mt-4 text-[13px] text-fg">GitHub</p>
                </Spotlight>
              </div>
              <a id="download-cv" href={profile.cv} download className="btn btn-ghost mt-auto !h-12 justify-center">
                <FileDown size={15} className="text-muted" /> Tải CV (PDF)
              </a>
            </div>
          </Reveal>
        </div>

        <footer className="mt-24 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] py-6 text-xs text-dim sm:flex-row">
          <p className="flex items-center gap-2"><Mail size={12} /> © {new Date().getFullYear()} {profile.name} · Built with React & Tailwind</p>
          <a href="#home" className="transition-colors hover:text-white">↑ Về đầu trang</a>
        </footer>
      </div>
    </section>
  )
}
