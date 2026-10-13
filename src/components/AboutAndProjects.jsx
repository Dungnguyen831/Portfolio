import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Code2,
  Cpu,
  Flame,
  GitBranch,
  GitCommit,
  GitFork,
  Globe2,
  Layers,
  Mail,
  Quote,
  Sparkles,
  Star,
  Terminal,
} from 'lucide-react'
import { featuredRepositories, githubStats, profile } from '../data'
import { Eyebrow, GithubIcon, Reveal, SectionHeader, Spotlight } from './ui'

/* Mini GitHub activity heatmap simulation */
function HeatmapSim() {
  const weeks = 20
  const days = 7
  // Generate consistent deterministic activity pattern
  const cells = []
  for (let w = 0; w < weeks; w++) {
    const col = []
    for (let d = 0; d < days; d++) {
      const val = (w * 3 + d * 5) % 5
      col.push(val)
    }
    cells.push(col)
  }

  const getColor = (v) => {
    switch (v) {
      case 4: return 'bg-emerald-400'
      case 3: return 'bg-emerald-500/80'
      case 2: return 'bg-emerald-600/50'
      case 1: return 'bg-emerald-700/30'
      default: return 'bg-white/[0.04]'
    }
  }

  return (
    <div className="flex gap-[3px] overflow-x-auto py-1">
      {cells.map((col, ci) => (
        <div key={ci} className="flex flex-col gap-[3px]">
          {col.map((val, ri) => (
            <span
              key={ri}
              className={`h-[9px] w-[9px] rounded-[2px] transition-transform hover:scale-125 ${getColor(val)}`}
              title={`${val ? val * 2 + 1 : 0} commits`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default function AboutAndProjects() {
  return (
    <section id="about-projects" className="relative px-5 py-24 sm:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl">
        {/* Section 1: Về bản thân (Bento Grid) */}
        <SectionHeader
          eyebrow="Giới thiệu & Định danh"
          title="Về bản thân & Triết lý kỹ thuật"
          desc="Kết hợp chuyên sâu giữa kỹ nghệ Mobile (Flutter) và nền tảng Backend vững chắc (Java Spring Boot)."
        />

        <div className="grid auto-rows-[minmax(190px,auto)] gap-3.5 md:grid-cols-12">
          {/* Card 1: Thông tin định danh (span 7) */}
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

                <p className="mt-4 text-[15px] font-medium text-slate-200">
                  {profile.role}
                </p>

                <p className="mt-2 text-[14px] leading-relaxed text-muted">
                  Đam mê xây dựng các sản phẩm phần mềm hoàn thiện từ giao diện người dùng mượt mà
                  đến hệ thống API backend an toàn, chuẩn chỉ và có khả năng mở rộng.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/[0.06] pt-4 text-xs text-muted">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-slate-300 transition-colors hover:border-sky-soft/40 hover:text-sky-soft"
                >
                  <Mail size={13} /> {profile.email}
                </a>
                <span className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-slate-300">
                  <span className="h-2 w-2 rounded-full bg-go shadow-[0_0_8px_#22c55e]" /> Sẵn sàng nhận việc
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
                  <Sparkles size={12} /> Code Philosophy
                </span>
                <h4 className="mt-3 text-xs uppercase tracking-wider text-dim">
                  Phương châm viết code
                </h4>

                <blockquote className="mt-4 text-[17px] font-medium italic leading-relaxed text-white">
                  "{profile.motto}"
                </blockquote>
              </div>

              <div className="mt-6 border-t border-white/[0.06] pt-4">
                <p className="text-xs text-muted">
                  Ưu tiên tính rõ ràng (readability), tính module hóa cao và tài liệu mã nguồn chặt chẽ.
                </p>
              </div>
            </Spotlight>
          </Reveal>

          {/* Card 3: Thẻ thống kê GitHub (span 7) */}
          <Reveal delay={0.1} className="md:col-span-7">
            <Spotlight className="flex h-full flex-col justify-between p-6 sm:p-7">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GithubIcon size={18} className="text-white" />
                    <span className="font-mono text-sm font-semibold text-white">
                      GitHub Activity
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
                    <Flame size={12} /> {githubStats.streak}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                    <span className="font-mono text-2xl font-bold text-white sm:text-3xl">
                      {githubStats.contributions}
                    </span>
                    <p className="mt-1 text-xs text-muted">Contributions ({githubStats.period})</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                    <span className="font-mono text-2xl font-bold text-sky-soft sm:text-3xl">
                      3+
                    </span>
                    <p className="mt-1 text-xs text-muted">Dự án công khai chính</p>
                  </div>
                  <div className="col-span-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 sm:col-span-1">
                    <span className="font-mono text-2xl font-bold text-signal sm:text-3xl">
                      100%
                    </span>
                    <p className="mt-1 text-xs text-muted">Clean Code Commitment</p>
                  </div>
                </div>

                {/* Heatmap graph visualization */}
                <div className="mt-5 rounded-xl border border-white/[0.06] bg-[#0c1018] p-3">
                  <div className="mb-2 flex items-center justify-between text-[11px] text-dim">
                    <span>Hoạt động đóng góp</span>
                    <span className="flex items-center gap-1 font-mono">
                      Ít <span className="h-2 w-2 rounded-sm bg-white/[0.04]" />
                      <span className="h-2 w-2 rounded-sm bg-emerald-700/40" />
                      <span className="h-2 w-2 rounded-sm bg-emerald-500" /> Nhiều
                    </span>
                  </div>
                  <HeatmapSim />
                </div>
              </div>

              {/* Languages share */}
              <div className="mt-5 border-t border-white/[0.06] pt-4">
                <p className="mb-2 text-xs font-medium text-muted">Ngôn ngữ trọng tâm:</p>
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
                      <span className="font-mono text-[11px] text-dim">{l.share}</span>
                    </span>
                  ))}
                </div>
              </div>
            </Spotlight>
          </Reveal>

          {/* Card 4: Định hướng kiến trúc (span 5) */}
          <Reveal delay={0.14} className="md:col-span-5">
            <Spotlight className="flex h-full flex-col justify-between p-6 sm:p-7">
              <div>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-sky-soft">
                  <Layers size={13} /> Architecture Focus
                </span>
                <h4 className="mt-2 text-lg font-semibold tracking-tight text-white">
                  Định hướng kiến trúc
                </h4>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                  {profile.architecture}
                </p>

                <div className="mt-5 space-y-2">
                  <div className="rounded-lg border border-sky-soft/25 bg-sky/[0.05] p-3">
                    <p className="font-mono text-[11px] font-semibold text-sky-soft uppercase">
                      Mobile: Flutter + BLoC / GetX
                    </p>
                    <p className="mt-0.5 text-xs text-muted">
                      State management rõ ràng, reactive stream, tối ưu rendering 60 FPS.
                    </p>
                  </div>

                  <div className="rounded-lg border border-violet-500/25 bg-violet-500/[0.05] p-3">
                    <p className="font-mono text-[11px] font-semibold text-violet-300 uppercase">
                      Backend: Java Spring Boot
                    </p>
                    <p className="mt-0.5 text-xs text-muted">
                      Microservices / Monolith sạch, JPA/Hibernate, Spring Security, REST API.
                    </p>
                  </div>

                  <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/[0.05] p-3">
                    <p className="font-mono text-[11px] font-semibold text-emerald-300 uppercase">
                      Clean Code & Performance
                    </p>
                    <p className="mt-0.5 text-xs text-muted">
                      Tách biệt tầng UI - Domain - Data, kiểm thử unit test và dễ dàng maintain.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs text-dim">
                <Cpu size={14} /> Tuân thủ nguyên lý SOLID & Clean Code
              </div>
            </Spotlight>
          </Reveal>
        </div>

        {/* Section 2: Dự án nổi bật trên GitHub (Featured Repositories) */}
        <div className="mt-24">
          <SectionHeader
            eyebrow="GitHub Repositories"
            title="Dự án nổi bật trên GitHub"
            desc="Các mã nguồn mở được phát triển chỉn chu, áp dụng Clean Architecture và công nghệ hiện đại."
            right={
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost group !h-10 text-xs"
              >
                <GithubIcon size={15} /> Xem tất cả trên GitHub{' '}
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            }
          />

          <div className="grid gap-4 md:grid-cols-3">
            {featuredRepositories.map((repo, idx) => (
              <Reveal key={repo.name} delay={idx * 0.08}>
                <Spotlight className="group flex h-full flex-col justify-between p-6">
                  <div>
                    {/* Header: badge + stars */}
                    <div className="flex items-center justify-between">
                      <span className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-sky-soft">
                        {repo.badge}
                      </span>
                      <div className="flex items-center gap-3 font-mono text-xs text-dim">
                        <span className="flex items-center gap-1 transition-colors group-hover:text-amber-300">
                          <Star size={12} fill="currentColor" /> {repo.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork size={12} /> {repo.forks}
                        </span>
                      </div>
                    </div>

                    {/* Repo Title */}
                    <h4 className="mt-4 flex items-center gap-2 text-lg font-semibold text-white transition-colors group-hover:text-sky-soft">
                      <Code2 size={18} className="text-muted group-hover:text-sky-soft" />
                      {repo.name}
                    </h4>

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
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted font-mono">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: repo.languageColor }}
                        />
                        {repo.language}
                      </span>

                      <div className="flex items-center gap-2">
                        {repo.demo && (
                          <a
                            href={repo.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-sky-soft transition-colors hover:bg-sky/[0.1]"
                          >
                            Demo <ArrowUpRight size={12} />
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
                      </div>
                    </div>
                  </div>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
