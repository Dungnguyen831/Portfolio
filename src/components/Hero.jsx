import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Award, Code2, FileText, Server } from 'lucide-react'
import { githubStats, librarySystem, profile, trafficHub } from '../data'
import { FlutterMark, Spotlight, StatusPill } from './ui'

const EASE = [0.16, 1, 0.3, 1]
const item = (i) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay: 0.07 * i, ease: EASE },
})

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden px-5 pb-20 pt-32 sm:px-8 sm:pt-40">
      <div className="top-glow pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
      <div className="bg-dots pointer-events-none absolute inset-x-0 top-0 h-[620px]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div {...item(0)} className="flex flex-wrap items-center gap-2.5">
          <StatusPill className="lg:hidden" />
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/25 bg-amber-400/[0.07] px-3 py-1 font-mono text-[11px] font-medium text-amber-300">
            <Award size={13} /> {profile.award.title}
          </span>
        </motion.div>

        <motion.p {...item(1)} className="mt-5 font-mono text-xs text-dim">
          {profile.name} (@{profile.username}) — {profile.role} · GPA {profile.education.gpa} (UTT)
        </motion.p>

        <motion.h1
          {...item(2)}
          className="mt-4 max-w-4xl text-[2.4rem] font-semibold leading-[1.06] tracking-[-0.04em] sm:text-6xl lg:text-[4.1rem]"
        >
          <span className="text-shine">Kiến trúc rõ ràng.</span>
          <br />
          <span className="text-shine">Ứng dụng </span>
          <span className="text-sky-soft">Flutter đa nền tảng</span>
          <br className="hidden sm:inline" />
          <span className="text-shine"> &amp; Backend </span>
          <span className="text-signal">Java Spring Boot</span>
          <span className="text-shine">.</span>
        </motion.h1>

        <motion.p {...item(3)} className="mt-6 max-w-2xl text-[16px] leading-relaxed text-muted">
          Sinh viên năm cuối ngành Công nghệ Thông tin tại{' '}
          <span className="text-fg font-medium">{profile.education.school}</span> với{' '}
          <span className="font-mono text-fg">{githubStats.contributions} contributions</span> trên GitHub trong năm qua.
          Tập trung phát triển ứng dụng di động Flutter (GetX, Riverpod) kết nối hệ thống RESTful API &amp; WebSocket thời gian thực:
          từ <span className="text-fg font-medium">TrafficHub</span> ({trafficHub.commits} commits, {trafficHub.dartFiles} file Dart)
          đến <span className="text-fg font-medium">Hệ thống Quản lý Thư viện</span> ({librarySystem.totalCommits} commits, {librarySystem.tablesCount} bảng MySQL).
        </motion.p>

        <motion.div {...item(4)} className="mt-9 flex flex-wrap items-center gap-3">
          <a id="hero-cta-case" href="#case-study" className="btn btn-primary">
            Tương tác thử TrafficHub <ArrowDown size={15} />
          </a>
          <a id="hero-cta-about" href="#about-projects" className="btn btn-ghost">
            <Code2 size={15} className="text-muted" /> Dự án &amp; GitHub thật
          </a>
          <a id="hero-cta-cv" href="#resume" className="btn btn-ghost">
            <FileText size={15} className="text-muted" /> Xem &amp; Tải CV ({profile.cvSizeKb} KB)
          </a>
        </motion.div>

        {/* Bento strip with real metrics */}
        <motion.div {...item(5)} className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Spotlight as="a" href="#case-study" id="hero-bento-featured" className="group p-5 sm:col-span-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-signal">
                <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_8px_#F97316]" /> Featured Live App
              </span>
              <ArrowUpRight size={16} className="text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
            </div>
            <p className="mt-5 text-lg font-medium tracking-tight text-white">
              TrafficHub — Cảnh báo giao thông &amp; SOS thời gian thực
            </p>
            <p className="mt-1.5 text-sm text-muted">
              {trafficHub.commits} commits · {trafficHub.dartFiles} file Dart · {trafficHub.moduleCount} module · Bản đồ OSM &amp; STOMP WebSocket
            </p>
            <p className="mt-3.5 truncate font-mono text-[11px] text-sky-soft">
              ★ {trafficHub.award}
            </p>
          </Spotlight>

          <Spotlight as="a" href="#about-projects" className="group p-5">
            <div className="flex items-center justify-between">
              <FlutterMark size={18} />
              <ArrowUpRight size={14} className="text-dim transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <p className="mt-5 text-sm font-medium text-white">Mobile: Flutter &amp; Dart</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              GetX &amp; Riverpod, flutter_map, STOMP Socket, Secure Storage, Audio &amp; Hive.
            </p>
            <p className="mt-3 font-mono text-[11px] text-sky-soft">40.2% tổng lượng code GitHub</p>
          </Spotlight>

          <Spotlight as="a" href="#engineering" className="group p-5">
            <div className="flex items-center justify-between">
              <Server size={18} className="text-signal" />
              <ArrowUpRight size={14} className="text-dim transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <p className="mt-5 text-sm font-medium text-white">Backend: Spring Boot 4</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              {librarySystem.controllersCount} REST Controllers, {librarySystem.tablesCount} bảng MySQL, bảo mật JWT &amp; {librarySystem.e2eSuitesCount} bộ test Cypress E2E.
            </p>
            <p className="mt-3 font-mono text-[11px] text-signal">{librarySystem.totalCommits} commits (BE + FE)</p>
          </Spotlight>
        </motion.div>
      </div>
    </section>
  )
}
