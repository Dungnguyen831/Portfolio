import { useState } from 'react'
import { ArrowUpRight, Check, X } from 'lucide-react'
import { featuredRepositories, githubStats, profile } from '../data'
import { GithubIcon, ModalDialog } from './ui'

const archive = featuredRepositories.filter((r) => r.id !== 'traffic-posts')

export default function Archive() {
  const [repo, setRepo] = useState(null) // keep data while the dialog animates out
  const [open, setOpen] = useState(false)

  const show = (r) => {
    setRepo(r)
    setOpen(true)
  }

  return (
    <article>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-dim">02 — Dự án cá nhân khác</p>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-fg">Dự án cá nhân khác</h3>
        </div>
        <a href={profile.github} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-1 text-sm">
          Xem toàn bộ {githubStats.publicRepos} repo <ArrowUpRight size={14} />
        </a>
      </div>

      <ul className="mt-8 border-b border-line">
        {archive.map((r) => (
          <li
            key={r.id}
            className="grid gap-4 border-t border-line py-7 md:grid-cols-[130px_minmax(0,1fr)_auto] md:gap-8"
          >
            <p className="font-mono text-xs text-dim">{r.period}</p>
            <div>
              <h4 className="text-lg font-medium text-fg">{r.displayName}</h4>
              <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-muted">{r.description}</p>
              <p className="mt-3 font-mono text-xs leading-loose text-dim">
                {r.tags.join(' · ')} · {r.commitsBreakdown || `${r.commits} commits`}
              </p>
            </div>
            <div className="flex flex-wrap items-start gap-x-5 gap-y-2 text-sm md:justify-end">
              <button type="button" onClick={() => show(r)} className="link">
                Chi tiết
              </button>
              {r.demo && (
                <a href={r.demo} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-1">
                  Demo <ArrowUpRight size={13} />
                </a>
              )}
              <a href={r.url} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-1.5">
                <GithubIcon size={13} /> {r.secondaryUrl ? 'FE' : 'Code'}
              </a>
              {r.secondaryUrl && (
                <a href={r.secondaryUrl} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-1.5">
                  <GithubIcon size={13} /> {r.secondaryLabel.replace(' Repo', '')}
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>

      <ModalDialog
        open={open}
        onClose={() => setOpen(false)}
        titleId="project-modal-title"
        className="w-[94vw] max-w-2xl"
      >
        {repo && (
          <div className="flex w-full flex-col overflow-hidden rounded-xl border border-line bg-surface">
            <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-4">
              <div>
                <p className="font-mono text-xs text-dim">
                  {repo.badge} · {repo.commitsBreakdown || `${repo.commits} commits`}
                </p>
                <h2 id="project-modal-title" className="mt-1 text-lg font-semibold text-fg">
                  {repo.displayName}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Đóng cửa sổ"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line text-muted transition-colors hover:text-fg"
              >
                <X size={15} />
              </button>
            </div>

            <div className="max-h-[70vh] space-y-6 overflow-y-auto p-6 text-sm">
              <div>
                <p className="text-xs text-dim">Vai trò</p>
                <p className="mt-1 text-fg">{repo.details.role}</p>
              </div>
              <div>
                <p className="text-xs text-dim">Kết quả</p>
                <p className="mt-1 leading-relaxed text-muted">{repo.details.achievement}</p>
              </div>
              <div>
                <p className="text-xs text-dim">Kiến trúc</p>
                <p className="mt-1 leading-relaxed text-muted">{repo.details.architecture}</p>
              </div>
              <div>
                <p className="text-xs text-dim">Đóng góp kỹ thuật</p>
                <ul className="mt-2 space-y-2.5 text-muted">
                  {repo.details.bullets.map((b) => (
                    <li key={b} className="flex gap-3 leading-relaxed">
                      <Check size={15} className="mt-0.5 shrink-0 text-go" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-6 py-4">
              <div className="flex flex-wrap gap-2">
                <a href={repo.url} target="_blank" rel="noreferrer" className="btn btn-ghost !h-9 !px-3 text-xs">
                  <GithubIcon size={14} /> GitHub
                </a>
                {repo.secondaryUrl && (
                  <a href={repo.secondaryUrl} target="_blank" rel="noreferrer" className="btn btn-ghost !h-9 !px-3 text-xs">
                    <GithubIcon size={14} /> {repo.secondaryLabel}
                  </a>
                )}
              </div>
              {repo.demo && (
                <a href={repo.demo} target="_blank" rel="noreferrer" className="btn btn-primary !h-9 !px-3.5 text-xs">
                  Live Demo <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>
        )}
      </ModalDialog>
    </article>
  )
}
