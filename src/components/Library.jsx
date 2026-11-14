import { ArrowUpRight } from 'lucide-react'
import { librarySystem, libraryControllerGroups, libraryTableGroups } from '../data'
import { GithubIcon, Rows, Tabs } from './ui'

const schemaPanel = (
  <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
    {libraryTableGroups.map((g) => (
      <div key={g.name} className="border-t border-line pt-4">
        <h4 className="text-[15px] font-medium text-fg">
          {g.name} <span className="font-mono text-xs font-normal text-dim">· {g.tables.length} bảng</span>
        </h4>
        <p className="mt-1 text-[13px] leading-relaxed text-muted">{g.desc}</p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[13px] text-fg">
          {g.tables.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
)

const apiPanel = (
  <div className="space-y-8">
    <p className="overflow-x-auto whitespace-nowrap border border-line bg-surface px-4 py-3 font-mono text-[13px] text-muted">
      Request <span className="text-dim">→</span> Spring Security (JWT) <span className="text-dim">→</span>{' '}
      Controller <span className="text-dim">→</span> Service <span className="text-dim">→</span> JPA Repository{' '}
      <span className="text-dim">→</span> MySQL
    </p>
    <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
      {libraryControllerGroups.map((g) => (
        <div key={g.name} className="border-t border-line pt-4">
          <h4 className="text-[15px] font-medium text-fg">
            {g.name} <span className="font-mono text-xs font-normal text-dim">· {g.items.length}</span>
          </h4>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[13px] text-fg">
            {g.items.map((c) => (
              <li key={c}>{c.replace('Controller', '')}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <p className="text-[13px] text-muted">
      Phân quyền 3 vai trò: {librarySystem.roles.join(' · ')}. Tài liệu API tự sinh bằng springdoc-openapi (Swagger UI).
    </p>
  </div>
)

const qaPanel = (
  <div className="space-y-5">
    <p className="max-w-2xl text-[14px] leading-relaxed text-muted">
      Ca kiểm thử thiết kế theo Phân tích giá trị biên (BVA) và Phân vùng tương đương (EP), tự động hóa bằng Cypress
      trong <span className="font-mono text-xs text-fg">QuanLyThuVien_FE/cypress/e2e/</span>.
    </p>
    <Rows
      items={librarySystem.cypressSuites.map((s) => ({ k: s.file, v: s.desc }))}
      labelWidth="220px"
    />
  </div>
)

const tabs = [
  { id: 'schema', label: `Database · ${librarySystem.tablesCount} bảng MySQL`, content: schemaPanel },
  { id: 'api', label: `REST API & JWT · ${librarySystem.controllersCount} controllers`, content: apiPanel },
  { id: 'qa', label: `Kiểm thử Cypress · ${librarySystem.e2eSuitesCount} suites`, content: qaPanel },
]

export default function Library() {
  return (
    <article>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="font-mono text-xs text-dim">02 — Backend &amp; QA · 02/2026 – 07/2026</p>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl">
            {librarySystem.title}
          </h3>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">{librarySystem.summary}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={librarySystem.demoUrl} target="_blank" rel="noreferrer" className="btn btn-primary !h-10">
            Live Demo <ArrowUpRight size={14} />
          </a>
          <a href={librarySystem.beUrl} target="_blank" rel="noreferrer" className="btn btn-ghost !h-10">
            <GithubIcon size={14} /> BE · {librarySystem.beCommits}
          </a>
          <a href={librarySystem.feUrl} target="_blank" rel="noreferrer" className="btn btn-ghost !h-10">
            <GithubIcon size={14} /> FE · {librarySystem.feCommits}
          </a>
        </div>
      </div>

      <p className="mt-6 font-mono text-xs leading-loose text-muted">{librarySystem.stack.join(' · ')}</p>

      <div className="mt-8">
        <Tabs label="Chi tiết hệ thống quản lý thư viện" tabs={tabs} />
      </div>
    </article>
  )
}
