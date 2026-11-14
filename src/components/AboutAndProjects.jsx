import { useState } from 'react'
import {
  ArrowUpRight,
  Award,
  CheckCircle2,
  Code2,
  Cpu,
  Flame,
  GitCommit,
  GraduationCap,
  Layers,
  Mail,
  Quote,
  Sparkles,
  Star,
  Terminal,
  X,
} from 'lucide-react'
import { featuredRepositories, githubStats, lastSyncedAt, profile } from '../data'
import { GithubIcon, ModalDialog, Reveal, SectionHeader, Spotlight } from './ui'

/* Real GitHub contribution heatmap from src/generated/github.json */
function RealContributionHeatmap({ weeks = [] }) {
  // Show the most recent 32 weeks so cells fit cleanly without horizontal overflow on desktop
  const recentWeeks = weeks.slice(-32)

  const getColor = (level) => {
    switch (level) {
      case 4:
        return 'bg-emerald-400'
      case 3:
        return 'bg-emerald-500/85'
      case 2:
        return 'bg-emerald-600/60'
      case 1:
        return 'bg-emerald-700/40'
      default:
        return 'bg-white/[0.04]'
    }
  }

  return (
    <div className="flex justify-between gap-[3px] overflow-x-auto py-1">
      {recentWeeks.map((col, ci) => (
        <div key={ci} className="flex flex-col gap-[3px]">
          {col.map((day) => (
            <span
              key={day.date}
              className={`h-[9px] w-[9px] shrink-0 rounded-[2px] transition-transform hover:scale-125 ${getColor(day.level)}`}
              title={`${day.date}: ${day.count} contributions`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default function AboutAndProjects() {
  const [langMode, setLangMode] = useState('bytes') // 'bytes' | 'repos'
  const [selectedRepo, setSelectedRepo] = useState(null)

  const syncDateLabel = new Date(lastSyncedAt).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  return (
    <section id="about-projects" className="relative px-5 py-24 sm:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl">
        {/* Section 1: Về bản thân & Số liệu GitHub thực tế (Bento Grid) */}
        <SectionHeader
          eyebrow="Giới thiệu & Dữ liệu kiểm chứng"
          title="Về bản thân & Hoạt động GitHub thực tế"
          desc="Toàn bộ số liệu bên dưới được đồng bộ tự động từ GitHub API và hồ sơ học thuật thực tế tại Trường Đại học Công nghệ Giao thông Vận tải (UTT)."
        />

        <div className="grid auto-rows-[minmax(190px,auto)] gap-3.5 md:grid-cols-12">
          {/* Card 1: Thông tin định danh & Học vấn (span 7) */}
          <Reveal className="md:col-span-7">
            <Spotlight className="flex h-full flex-col justify-between p-6 sm:p-7">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-sky-soft">
                      <Terminal size={13} /> Software Developer
                    </span>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      {profile.name}{' '}
                      <span className="font-mono text-sm font-normal text-muted">
                        (@{profile.username})
                      </span>
                    </h3>
                  </div>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-muted transition-colors hover:border-white/20 hover:text-white"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon size={20} />
                  </a>
                </div>

                <p className="mt-3 text-[15px] font-medium text-slate-200">{profile.role}</p>

                <p className="mt-2 text-[14px] leading-relaxed text-muted">
                  Sinh viên năm cuối chuyên ngành Phát triển Ứng dụng Di động tại{' '}
                  <span className="text-fg">{profile.education.school}</span>. Có kinh nghiệm làm việc nhóm
                  theo quy trình Agile/Sprint (Git, ClickUp), phát triển giao diện Flutter hiệu năng cao (GetX, Riverpod)
                  và xây dựng hệ thống RESTful API bảo mật với Java Spring Boot &amp; MySQL.
                </p>

                {/* Education & Award badges */}
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <div className="flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                    <GraduationCap size={16} className="mt-0.5 shrink-0 text-sky-soft" />
                    <div>
                      <p className="text-xs font-semibold text-white">ĐH Công nghệ GTVT (UTT)</p>
                      <p className="mt-0.5 font-mono text-[11px] text-muted">
                        CNTT · GPA hiện tại: <span className="text-sky-soft">{profile.education.gpa}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-3">
                    <Award size={16} className="mt-0.5 shrink-0 text-amber-300" />
                    <div>
                      <p className="text-xs font-semibold text-amber-200">Innovation Challenge 4.0</p>
                      <p className="mt-0.5 font-mono text-[11px] text-amber-300/80">
                        Giải Khuyến khích (2026 · TrafficHub)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/[0.06] pt-4 text-xs text-muted">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-slate-300 transition-colors hover:border-sky-soft/40 hover:text-sky-soft"
                >
                  <Mail size={13} /> {profile.email}
                </a>
                <span className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-slate-300">
                  <span className="h-2 w-2 rounded-full bg-go shadow-[0_0_8px_#22c55e]" /> Sẵn sàng nhận việc tại {profile.location}
                </span>
              </div>
            </Spotlight>
          </Reveal>

          {/* Card 2: Phương châm viết code (span 5) */}
          <Reveal delay={0.06} className="md:col-span-5">
            <Spotlight className="relative flex h-full flex-col justify-between overflow-hidden p-6 sm:p-7">
              <Quote
                size={70}
                className="pointer-events-none absolute -bottom-4 -right-4 text-white/[0.03]"
                aria-hidden="true"
              />

              <div>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-signal">
                  <Sparkles size={12} /> Engineering Mindset
                </span>
                <h4 className="mt-3 text-xs uppercase tracking-wider text-dim">
                  Phương châm phát triển phần mềm
                </h4>

                <blockquote className="mt-4 text-[17px] font-medium italic leading-relaxed text-white">
                  &ldquo;{profile.motto}&rdquo;
                </blockquote>

                <ul className="mt-4 space-y-2 text-xs text-muted">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="shrink-0 text-go" />
                    Phân tách trách nhiệm rõ ràng giữa UI, State và Data.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="shrink-0 text-go" />
                    Tài liệu hóa API bằng OpenAPI/Swagger &amp; đặc tả hợp đồng dữ liệu.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="shrink-0 text-go" />
                    Kiểm thử tự động với Cypress E2E (BVA &amp; EP) trước khi phát hành.
                  </li>
                </ul>
              </div>

              <div className="mt-6 border-t border-white/[0.06] pt-4">
                <p className="font-mono text-[11px] text-dim">
                  Quy trình: Figma → API Contract → Clean Code → Cypress E2E
                </p>
              </div>
            </Spotlight>
          </Reveal>

          {/* Card 3: Thẻ thống kê GitHub thực tế (span 7) */}
          <Reveal delay={0.1} className="md:col-span-7">
            <Spotlight className="flex h-full flex-col justify-between p-6 sm:p-7">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <GithubIcon size={18} className="text-white" />
                    <span className="font-mono text-sm font-semibold text-white">
                      GitHub Activity (@{profile.username})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-emerald-300">
                      <Flame size={12} /> Streak dài nhất: {githubStats.longestStreak} ngày
                    </span>
                    <span className="font-mono text-[10.5px] text-dim">
                      Đồng bộ: {syncDateLabel}
                    </span>
                  </div>
                </div>

                {/* 3 Real KPI Boxes */}
                <div className="mt-5 grid grid-cols-2 gap-3.5 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                    <span className="font-mono text-2xl font-bold text-white sm:text-3xl">
                      {githubStats.contributions}
                    </span>
                    <p className="mt-1 text-xs text-muted">
                      Contributions (12 tháng · {githubStats.activeDays} ngày active)
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                    <span className="font-mono text-2xl font-bold text-sky-soft sm:text-3xl">
                      {githubStats.publicRepos}
                    </span>
                    <p className="mt-1 text-xs text-muted">
                      Public Repos (từ {githubStats.memberSince})
                    </p>
                  </div>
                  <div className="col-span-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 sm:col-span-1">
                    <span className="font-mono text-2xl font-bold text-signal sm:text-3xl">
                      {githubStats.totalTrackedCommits}
                    </span>
                    <p className="mt-1 text-xs text-muted">
                      Commits ở 8 repo chính (Peak: {githubStats.peakDay.count}/ngày)
                    </p>
                  </div>
                </div>

                {/* Real Heatmap graph visualization */}
                <div className="mt-5 rounded-xl border border-white/[0.06] bg-[#0c1018] p-3.5">
                  <div className="mb-2 flex items-center justify-between text-[11px] text-dim">
                    <span>Biểu đồ đóng góp thực tế (di chuột xem số commit từng ngày)</span>
                    <span className="flex items-center gap-1 font-mono">
                      0 <span className="h-2 w-2 rounded-sm bg-white/[0.04]" />
                      <span className="h-2 w-2 rounded-sm bg-emerald-700/40" />
                      <span className="h-2 w-2 rounded-sm bg-emerald-500/85" />
                      <span className="h-2 w-2 rounded-sm bg-emerald-400" /> {githubStats.peakDay.count}
                    </span>
                  </div>
                  <RealContributionHeatmap weeks={githubStats.weeks} />
                </div>
              </div>

              {/* Real Languages share with mode switch */}
              <div className="mt-5 border-t border-white/[0.06] pt-4">
                <div className="mb-2.5 flex items-center justify-between">
                  <p className="text-xs font-medium text-muted">
                    Tỷ lệ ngôn ngữ lập trình thực tế:
                  </p>
                  <div className="inline-flex rounded-lg border border-white/[0.08] bg-white/[0.02] p-0.5 font-mono text-[10.5px]">
                    <button
                      type="button"
                      onClick={() => setLangMode('bytes')}
                      className={`rounded-md px-2 py-0.5 transition-colors ${
                        langMode === 'bytes' ? 'bg-white/10 text-white' : 'text-dim hover:text-muted'
                      }`}
                    >
                      Theo Bytes
                    </button>
                    <button
                      type="button"
                      onClick={() => setLangMode('repos')}
                      className={`rounded-md px-2 py-0.5 transition-colors ${
                        langMode === 'repos' ? 'bg-white/10 text-white' : 'text-dim hover:text-muted'
                      }`}
                    >
                      Theo Số Repo
                    </button>
                  </div>
                </div>

                {/* Proportional stacked progress bar */}
                <div className="mb-3 flex h-2 w-full overflow-hidden rounded-full bg-white/[0.04]">
                  {githubStats.languages.map((l) => (
                    <span
                      key={l.name}
                      style={{
                        width: `${l.percent}%`,
                        backgroundColor: l.color,
                      }}
                      title={`${l.name}: ${l.share}`}
                    />
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {githubStats.languages.map((l) => (
                    <span
                      key={l.name}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-xs text-fg"
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: l.color }}
                      />
                      {l.name}{' '}
                      <span className="font-mono text-[11px] text-dim">
                        {langMode === 'bytes' ? l.share : `${l.repos} repos`}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </Spotlight>
          </Reveal>

          {/* Card 4: Định hướng kiến trúc thực tế (span 5) */}
          <Reveal delay={0.14} className="md:col-span-5">
            <Spotlight className="flex h-full flex-col justify-between p-6 sm:p-7">
              <div>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-sky-soft">
                  <Layers size={13} /> Technical Stack in Production
                </span>
                <h4 className="mt-2 text-lg font-semibold tracking-tight text-white">
                  Ngăn xếp công nghệ đã triển khai
                </h4>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                  {profile.architecture}
                </p>

                <div className="mt-5 space-y-2.5">
                  <div className="rounded-lg border border-sky-soft/25 bg-sky/[0.05] p-3">
                    <p className="font-mono text-[11px] font-semibold uppercase text-sky-soft">
                      Mobile: Flutter + GetX / Riverpod
                    </p>
                    <p className="mt-0.5 text-xs text-muted">
                      Quản lý trạng thái với GetX (TrafficHub — 121 file Dart) &amp; Riverpod (MusicAPP — 36 file Dart),
                      kết hợp Hive, flutter_secure_storage và just_audio.
                    </p>
                  </div>

                  <div className="rounded-lg border border-violet-500/25 bg-violet-500/[0.05] p-3">
                    <p className="font-mono text-[11px] font-semibold uppercase text-violet-300">
                      Backend: Java 21/25 &amp; Spring Boot 3/4
                    </p>
                    <p className="mt-0.5 text-xs text-muted">
                      Kiến trúc Monolith phân tầng sạch (QuanLyThuVien_BE — 101 file Java, MusicAPP_BE — 97 file Java),
                      Spring Data JPA, MySQL, JWT Security và Swagger OpenAPI.
                    </p>
                  </div>

                  <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/[0.05] p-3">
                    <p className="font-mono text-[11px] font-semibold uppercase text-emerald-300">
                      Realtime &amp; Automated E2E Testing
                    </p>
                    <p className="mt-0.5 text-xs text-muted">
                      Giao tiếp STOMP over WebSocket + Firebase FCM; kiểm thử tự động 6 bộ kịch bản Cypress E2E (BVA &amp; EP).
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs text-dim">
                <Cpu size={14} /> Mọi dự án đều có mã nguồn mở để kiểm chứng trực tiếp
              </div>
            </Spotlight>
          </Reveal>
        </div>

        {/* Section 2: Dự án nổi bật trên GitHub (Featured Repositories) */}
        <div className="mt-24">
          <SectionHeader
            eyebrow="GitHub Repositories"
            title="Dự án tiêu biểu & Số liệu mã nguồn thực tế"
            desc="Bấm vào 'Chi tiết kiến trúc' trên từng dự án để xem phân tích kỹ thuật, thiết kế cơ sở dữ liệu và vai trò cụ thể."
            right={
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost group !h-10 text-xs"
              >
                <GithubIcon size={15} /> Xem toàn bộ {githubStats.publicRepos} repos{' '}
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            }
          />

          <div className="grid gap-4 md:grid-cols-2">
            {featuredRepositories.map((repo, idx) => (
              <Reveal key={repo.id} delay={idx * 0.06}>
                <Spotlight className="group flex h-full flex-col justify-between p-6">
                  <div>
                    {/* Header: badge + real commit count + stars (if > 0) */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-wider text-sky-soft">
                        {repo.badge}
                      </span>
                      <div className="flex items-center gap-3 font-mono text-xs text-dim">
                        <span
                          className="flex items-center gap-1 text-emerald-300"
                          title={repo.commitsBreakdown || `${repo.commits} commits`}
                        >
                          <GitCommit size={13} /> {repo.commits} commits
                        </span>
                        {repo.stars > 0 && (
                          <span className="flex items-center gap-1 text-amber-300">
                            <Star size={12} fill="currentColor" /> {repo.stars}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Repo Title & Period */}
                    <div className="mt-4 flex items-baseline justify-between gap-2">
                      <h4 className="flex items-center gap-2 text-lg font-semibold text-white transition-colors group-hover:text-sky-soft">
                        <Code2 size={18} className="shrink-0 text-muted group-hover:text-sky-soft" />
                        {repo.displayName}
                      </h4>
                      <span className="shrink-0 font-mono text-[11px] text-dim">{repo.period}</span>
                    </div>

                    <p className="mt-1 font-mono text-xs text-sky-soft/90">{repo.filesLabel}</p>

                    {/* Description */}
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
                      {repo.description}
                    </p>

                    {/* Tech tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {repo.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-white/[0.06] bg-white/[0.015] px-2 py-0.5 font-mono text-[10.5px] text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer actions */}
                  <div className="mt-6 border-t border-white/[0.06] pt-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: repo.languageColor }}
                        />
                        {repo.language}
                      </span>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedRepo(repo)}
                          className="inline-flex items-center gap-1 rounded-md border border-sky-soft/30 bg-sky/[0.08] px-2.5 py-1 text-xs font-medium text-sky-soft transition-colors hover:bg-sky/[0.16]"
                        >
                          Chi tiết kiến trúc
                        </button>
                        {repo.demo && (
                          <a
                            href={repo.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-white/[0.08]"
                          >
                            Live Demo <ArrowUpRight size={12} />
                          </a>
                        )}
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs font-medium text-white transition-colors hover:border-white/20 hover:bg-white/[0.08]"
                        >
                          <GithubIcon size={12} /> Code
                        </a>
                        {repo.secondaryUrl && (
                          <a
                            href={repo.secondaryUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:border-white/20 hover:text-white"
                          >
                            <GithubIcon size={12} /> {repo.secondaryLabel}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Native <dialog> Modal for Project Architecture Details */}
      <ModalDialog
        open={Boolean(selectedRepo)}
        onClose={() => setSelectedRepo(null)}
        titleId="project-modal-title"
        className="w-[94vw] max-w-2xl"
      >
        {selectedRepo && (
          <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c1018] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#0a0d14] px-6 py-4">
              <div>
                <span className="font-mono text-[10.5px] uppercase tracking-wider text-sky-soft">
                  {selectedRepo.badge} · {selectedRepo.commits} commits
                </span>
                <h2 id="project-modal-title" className="mt-1 text-lg font-bold text-white">
                  {selectedRepo.displayName}
                </h2>
              </div>
              <button
                type="button"
                autofocus
                onClick={() => setSelectedRepo(null)}
                aria-label="Đóng cửa sổ"
                className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-muted transition-colors hover:border-white/20 hover:text-white"
              >
                <X size={15} />
              </button>
            </div>

            <div className="max-h-[75vh] space-y-4 overflow-y-auto p-6 text-sm">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-dim">
                    Vai trò &amp; Quy mô
                  </p>
                  <p className="mt-1 font-medium text-white">{selectedRepo.details.role}</p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-dim">
                    Thống kê mã nguồn
                  </p>
                  <p className="mt-1 font-mono text-xs text-sky-soft">
                    {selectedRepo.filesLabel} ({selectedRepo.commitsBreakdown || `${selectedRepo.commits} commits`})
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.05] p-3.5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-amber-300">
                  Kết quả nổi bật
                </p>
                <p className="mt-1 text-xs leading-relaxed text-amber-100">
                  {selectedRepo.details.achievement}
                </p>
              </div>

              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-dim">
                  Kiến trúc hệ thống
                </p>
                <p className="mt-1.5 leading-relaxed text-muted">
                  {selectedRepo.details.architecture}
                </p>
              </div>

              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-dim">
                  Đóng góp kỹ thuật chi tiết
                </p>
                <ul className="mt-2 space-y-2">
                  {selectedRepo.details.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-muted">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-go" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] bg-[#0a0d14] px-6 py-3.5">
              <div className="flex flex-wrap gap-2">
                <a
                  href={selectedRepo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost !h-9 !px-3 text-xs"
                >
                  <GithubIcon size={14} /> Mở GitHub Repo
                </a>
                {selectedRepo.secondaryUrl && (
                  <a
                    href={selectedRepo.secondaryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-ghost !h-9 !px-3 text-xs"
                  >
                    <GithubIcon size={14} /> Mở {selectedRepo.secondaryLabel}
                  </a>
                )}
              </div>
              {selectedRepo.demo && (
                <a
                  href={selectedRepo.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sky !h-9 !px-3.5 text-xs"
                >
                  Trải nghiệm Live Demo <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>
        )}
      </ModalDialog>
    </section>
  )
}
