import { useState } from 'react'
import { Download, Eye, ExternalLink, X } from 'lucide-react'
import { githubStats, lastSyncedAt, profile, skills } from '../data'
import { GithubIcon, ModalDialog, Reveal, Rows, SectionHeader } from './ui'

const LEVEL_CLASS = [
  'bg-white/[0.07]',
  'bg-emerald-900',
  'bg-emerald-700',
  'bg-emerald-500',
  'bg-emerald-400',
]

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n))
const formatDay = (iso) =>
  new Date(iso).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })

/* Real contribution heatmap (src/generated/github.json) with hover + keyboard readout. */
function Heatmap({ weeks = [] }) {
  const recent = weeks.slice(-32)
  const [sel, setSel] = useState(null) // [weekIndex, dayIndex]
  const day = sel ? recent[sel[0]]?.[sel[1]] : null

  const onKeyDown = (e) => {
    const moves = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }
    const d = moves[e.key]
    if (!d || !recent.length) return
    e.preventDefault()
    const [c, r] = sel ?? [recent.length - 1, 0]
    const nc = clamp(c + d[0], 0, recent.length - 1)
    const nr = clamp(r + d[1], 0, recent[nc].length - 1)
    setSel([nc, nr])
  }

  return (
    <div>
      <div
        role="group"
        aria-label="Biểu đồ đóng góp GitHub, dùng phím mũi tên để xem từng ngày"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onBlur={() => setSel(null)}
        onMouseLeave={() => setSel(null)}
        className="flex gap-[3px]"
      >
        {recent.map((col, ci) => (
          <div key={ci} className="flex flex-1 flex-col gap-[3px]">
            {col.map((d, ri) => {
              const on = sel && sel[0] === ci && sel[1] === ri
              return (
                <span
                  key={d.date}
                  onMouseEnter={() => setSel([ci, ri])}
                  className={`aspect-square w-full rounded-[2px] ${LEVEL_CLASS[d.level] ?? LEVEL_CLASS[0]} ${
                    on ? 'outline outline-2 outline-offset-1 outline-white' : ''
                  }`}
                />
              )
            })}
          </div>
        ))}
      </div>
      <p className="mt-3 min-h-5 text-xs text-muted" role="status" aria-live="polite">
        {day ? (
          <>
            <span className="font-mono text-fg">{formatDay(day.date)}</span> · {day.count} contributions
            {day.date === githubStats.peakDay.date && ' · ngày cao nhất'}
          </>
        ) : (
          'Di chuột hoặc dùng phím mũi tên để xem số commit từng ngày.'
        )}
      </p>
    </div>
  )
}

function Languages() {
  const [mode, setMode] = useState('bytes')
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-dim">Tỷ lệ ngôn ngữ</p>
        <div className="inline-flex gap-4 text-xs">
          {[
            ['bytes', 'Theo dung lượng'],
            ['repos', 'Theo số repo'],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={mode === id}
              onClick={() => setMode(id)}
              className={`border-b pb-0.5 transition-colors ${
                mode === id ? 'border-fg text-fg' : 'border-transparent text-dim hover:text-fg'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-3 flex h-1.5 w-full gap-px overflow-hidden rounded-full" aria-hidden="true">
        {githubStats.languages.map((l) => (
          <span key={l.name} style={{ width: `${l.percent}%`, backgroundColor: l.color }} />
        ))}
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-fg">
        {githubStats.languages.map((l) => (
          <li key={l.name} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: l.color }} aria-hidden="true" />
            {l.name}
            <span className="font-mono text-xs text-dim">{mode === 'bytes' ? l.share : `${l.repos} repo`}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Profile() {
  const [cvOpen, setCvOpen] = useState(false)
  const [cvLoaded, setCvLoaded] = useState(false)

  const openCv = () => {
    setCvLoaded(true)
    setCvOpen(true)
  }
  const syncDate = formatDay(lastSyncedAt)

  return (
    <>
      <section id="profile" className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            index="02 — Hồ sơ"
            title="Học vấn, giải thưởng và hoạt động GitHub thực tế."
            desc={`Số liệu GitHub được đồng bộ tự động từ GitHub (lần gần nhất: ${syncDate}).`}
          />

          <div className="grid gap-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <h3 className="text-2xl font-semibold tracking-tight text-fg">{profile.name}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{profile.role}</p>
              <div className="mt-8">
                <Rows
                  labelWidth="110px"
                  items={[
                    { k: 'Trường', v: profile.education.school },
                    { k: 'Chuyên ngành', v: profile.education.degree },
                    { k: 'GPA', v: `${profile.education.gpa} · ${profile.education.period}` },
                    { k: 'Giải thưởng', v: `${profile.award.title}. Dự án: TrafficHub.` },
                    { k: 'Quy trình', v: 'Figma → API Contract → Clean Code → Cypress E2E (Git, ClickUp / Sprint)' },
                  ]}
                />
              </div>
            </Reveal>

            <Reveal delay={0.06} className="lg:col-span-7">
              <div className="flex items-center justify-between gap-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="link inline-flex items-center gap-2 text-sm"
                >
                  <GithubIcon size={16} /> @{profile.username}
                </a>
                <span className="text-xs text-dim">Streak dài nhất: {githubStats.longestStreak} ngày</span>
              </div>

              <dl className="mt-6 grid grid-cols-3 divide-x divide-line border-y border-line">
                {[
                  [githubStats.contributions, `Contributions · ${githubStats.activeDays} ngày active`],
                  [githubStats.publicRepos, `Public repo (từ ${githubStats.memberSince})`],
                  [githubStats.totalTrackedCommits, 'Commits ở 8 repo chính'],
                ].map(([v, label], i) => (
                  <div key={label} className={`py-5 ${i ? 'pl-4 sm:pl-6' : ''}`}>
                    <dd className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{v}</dd>
                    <dt className="mt-1.5 text-xs leading-snug text-dim">{label}</dt>
                  </div>
                ))}
              </dl>

              <div className="mt-8">
                <Heatmap weeks={githubStats.weeks} />
              </div>
              <div className="mt-8 border-t border-line pt-6">
                <Languages />
              </div>
            </Reveal>
          </div>

          {/* CV action bar */}
          <Reveal className="mt-20">
            <div className="flex flex-col gap-4 border-y border-line py-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-mono text-sm text-fg">CV_Nguyen_Dung.pdf</p>
                <p className="mt-1 text-xs text-dim">PDF · {profile.cvSizeKb} KB · Tiếng Anh, chuẩn ATS · Cập nhật 2026</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button id="btn-view-cv" type="button" onClick={openCv} className="btn btn-ghost">
                  <Eye size={16} /> Xem trước
                </button>
                <a id="btn-download-cv" href={profile.cv} download="CV_Nguyen_Dung.pdf" className="btn btn-primary">
                  <Download size={16} /> Tải xuống
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="skills" className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            index="03 — Kỹ năng"
            title="Công cụ sử dụng hằng ngày."
            desc="Mỗi mục đều gắn với ít nhất một dự án đã triển khai ở trên."
          />
          <div className="divide-y divide-line border-y border-line">
            {skills.map((g) => (
              <div key={g.group} className="grid gap-3 py-5 sm:grid-cols-[240px_1fr]">
                <h3 className="text-sm text-dim">{g.group}</h3>
                <ul className="flex flex-wrap gap-x-3 gap-y-1.5 text-[14px] text-fg">
                  {g.items.map((s) => (
                    <li key={s} className="after:ml-3 after:text-dim after:content-['·'] last:after:hidden">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ModalDialog
        open={cvOpen}
        onClose={() => setCvOpen(false)}
        titleId="cv-modal-title"
        className="h-[90vh] w-[95vw] max-w-4xl"
      >
        <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-line bg-surface">
          <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
            <h2 id="cv-modal-title" className="text-sm font-medium text-fg">
              CV · {profile.name}
            </h2>
            <div className="flex items-center gap-2">
              <a
                href={profile.cv}
                target="_blank"
                rel="noreferrer"
                aria-label="Mở CV ở tab mới"
                title="Mở ở tab mới"
                className="grid h-8 w-8 place-items-center rounded-lg border border-line text-muted transition-colors hover:text-fg"
              >
                <ExternalLink size={14} />
              </a>
              <button
                type="button"
                onClick={() => setCvOpen(false)}
                aria-label="Đóng cửa sổ xem CV"
                title="Đóng (Esc)"
                className="grid h-8 w-8 place-items-center rounded-lg border border-line text-muted transition-colors hover:text-fg"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          <div className="flex-1 bg-[#1a1c22]">
            {cvLoaded && <iframe src={profile.cv} title="CV Nguyễn Anh Dũng" className="h-full w-full border-0" />}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-5 py-3 text-xs text-muted">
            <span>
              Không thấy bản xem trước?{' '}
              <a href={profile.cv} target="_blank" rel="noreferrer" className="link">
                Mở PDF ở tab mới
              </a>
              .
            </span>
            <a href={profile.cv} download="CV_Nguyen_Dung.pdf" className="btn btn-primary !h-8 !px-3 text-xs">
              <Download size={13} /> Tải PDF ({profile.cvSizeKb} KB)
            </a>
          </div>
        </div>
      </ModalDialog>
    </>
  )
}
