import { useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy, FileDown, Mail, MapPin, Phone, Send } from 'lucide-react'
import { profile } from '../data'
import { GithubIcon, Reveal, SectionHeader, Spotlight, StatusPill } from './ui'

const field =
  'w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-3 text-[14px] text-white outline-none transition-colors placeholder:text-dim focus:border-sky-soft/50 focus:bg-white/[0.04]'

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const [copiedField, setCopiedField] = useState(null)
  const formRef = useRef(null)

  const buildMailParams = (form) => {
    const d = new FormData(form)
    const name = d.get('name') || 'Nhà tuyển dụng'
    const email = d.get('email') || ''
    const message = d.get('message') || ''
    const subject = `[Portfolio] Liên hệ từ ${name}`
    const body = `${message}\n\n— ${name}${email ? ` (${email})` : ''}`
    return { subject, body }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const { subject, body } = buildMailParams(form)
    setStatus('sending')
    setTimeout(() => {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setStatus('sent')
    }, 250)
  }

  const openGmailCompose = () => {
    const form = formRef.current
    const { subject, body } = form
      ? buildMailParams(form)
      : { subject: '[Portfolio] Liên hệ công việc', body: '' }
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setStatus('sent')
  }

  const copyValue = async (key, text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(key)
      setTimeout(() => setCopiedField(null), 1800)
    } catch {
      /* ignore */
    }
  }

  return (
    <section id="contact" className="px-5 pb-10 pt-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Liên hệ"
          title="Kết nối & Cơ hội hợp tác"
          desc={`Đang tìm kiếm cơ hội Thực tập / Fresher / Junior Flutter Developer hoặc Full-stack (Flutter + Spring Boot) tại ${profile.location}.`}
          right={<StatusPill />}
        />

        <div className="grid gap-3 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <form
              ref={formRef}
              id="contact-form"
              onSubmit={onSubmit}
              className="card space-y-3 p-6 sm:p-7"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs text-muted">Tên của bạn / Quý công ty</span>
                  <input
                    id="f-name"
                    name="name"
                    required
                    placeholder="Nguyễn Văn A — Công ty ABC"
                    autoComplete="name"
                    className={field}
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs text-muted">Email phản hồi</span>
                  <input
                    id="f-email"
                    name="email"
                    type="email"
                    required
                    placeholder="hr@congty.com"
                    autoComplete="email"
                    className={field}
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-xs text-muted">Nội dung trao đổi</span>
                <textarea
                  id="f-msg"
                  name="message"
                  required
                  rows={5}
                  placeholder="Thông tin vị trí tuyển dụng hoặc dự án cần trao đổi…"
                  className={`${field} resize-none`}
                />
              </label>
              <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
                <span className="text-xs text-dim">
                  Chọn mở trình mail mặc định hoặc soạn trực tiếp trên Gmail Web.
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    id="f-gmail"
                    type="button"
                    onClick={openGmailCompose}
                    className="btn btn-ghost !h-10 !text-xs"
                  >
                    Soạn bằng Gmail Web <ArrowUpRight size={14} />
                  </button>
                  <button
                    id="f-submit"
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn btn-primary !h-10 disabled:opacity-60"
                  >
                    {status === 'sent' ? <Check size={15} /> : <Send size={15} />}
                    {status === 'sending'
                      ? 'Đang mở…'
                      : status === 'sent'
                        ? 'Đã mở trình soạn thư'
                        : 'Mở ứng dụng Email'}
                  </button>
                </div>
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-3">
              <Spotlight className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-dim">Email trực tiếp</p>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <a
                    href={`mailto:${profile.email}`}
                    className="truncate text-[15px] text-white hover:text-sky-soft"
                  >
                    {profile.email}
                  </a>
                  <button
                    id="copy-email"
                    type="button"
                    onClick={() => copyValue('email', profile.email)}
                    aria-label="Sao chép email"
                    title="Sao chép email"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-white/10 text-muted transition-colors hover:text-white"
                  >
                    {copiedField === 'email' ? (
                      <Check size={14} className="text-go" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>
              </Spotlight>

              <div className="grid grid-cols-2 gap-3">
                <Spotlight className="p-5">
                  <div className="flex items-center justify-between">
                    <Phone size={16} className="text-muted" />
                    <button
                      id="copy-phone"
                      type="button"
                      onClick={() => copyValue('phone', profile.phone)}
                      aria-label="Sao chép số điện thoại"
                      title="Sao chép số điện thoại"
                      className="grid h-7 w-7 place-items-center rounded-md border border-white/10 text-muted transition-colors hover:text-white"
                    >
                      {copiedField === 'phone' ? (
                        <Check size={12} className="text-go" />
                      ) : (
                        <Copy size={12} />
                      )}
                    </button>
                  </div>
                  <a
                    href={`tel:${profile.phone.replace(/\s/g, '')}`}
                    className="mt-3 block font-mono text-[13px] text-fg hover:text-sky-soft"
                  >
                    {profile.phone}
                  </a>
                </Spotlight>

                <Spotlight
                  as="a"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group p-5"
                >
                  <div className="flex justify-between">
                    <GithubIcon size={16} className="text-muted group-hover:text-white" />
                    <ArrowUpRight size={14} className="text-dim group-hover:text-white" />
                  </div>
                  <p className="mt-3 font-mono text-[13px] text-fg">@{profile.username}</p>
                </Spotlight>
              </div>

              <div className="card flex items-center gap-2.5 px-4 py-3 text-xs text-muted">
                <MapPin size={14} className="shrink-0 text-sky-soft" />
                <span>
                  {profile.location} · {profile.education.school}
                </span>
              </div>

              <a
                id="download-cv"
                href={profile.cv}
                download="CV_Nguyen_Dung.pdf"
                className="btn btn-ghost mt-auto !h-12 justify-center"
              >
                <FileDown size={15} className="text-muted" /> Tải CV ({profile.cvSizeKb} KB · PDF)
              </a>
            </div>
          </Reveal>
        </div>

        <footer className="mt-24 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] py-6 text-xs text-dim sm:flex-row">
          <p className="flex items-center gap-2">
            <Mail size={12} /> © {new Date().getFullYear()} {profile.name} (@{profile.username}) · Built with React, Vite &amp; Tailwind CSS
          </p>
          <a href="#home" className="transition-colors hover:text-white">
            ↑ Về đầu trang
          </a>
        </footer>
      </div>
    </section>
  )
}
