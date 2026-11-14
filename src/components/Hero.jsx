import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { githubStats, librarySystem, profile, trafficHub } from '../data'
import { StatusPill } from './ui'

const EASE = [0.16, 1, 0.3, 1]
const item = (i) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: 0.07 * i, ease: EASE },
})

const metrics = [
  [githubStats.contributions, 'GitHub contributions trong 12 tháng'],
  [trafficHub.commits, 'Commits · TrafficHub (Flutter, Team 5)'],
  [`${librarySystem.tablesCount} · ${librarySystem.controllersCount}`, 'Bảng MySQL · REST Controller'],
  [profile.education.gpa.split(' ')[0], 'GPA thang 4.0 · UTT'],
]

export default function Hero() {
  return (
    <section id="home" className="px-5 pb-20 pt-32 sm:px-8 sm:pt-44">
      <div className="mx-auto max-w-6xl">
        <motion.div {...item(0)}>
          <StatusPill />
        </motion.div>

        <motion.h1
          {...item(1)}
          className="mt-8 max-w-4xl text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-6xl lg:text-[4.25rem]"
        >
          <span className="text-fg">Xây dựng ứng dụng Flutter mượt mà</span>{' '}
          <span className="text-dim">và hệ thống Spring Boot có kiểm thử tự động.</span>
        </motion.h1>

        <motion.p {...item(2)} className="mt-8 max-w-2xl text-[17px] leading-relaxed text-muted">
          {profile.name} — sinh viên năm cuối CNTT tại {profile.education.school}. Phát triển ứng dụng
          Flutter (GetX, Riverpod), xây dựng REST API Spring Boot và kiểm thử E2E bằng Cypress. Đạt
          Giải Khuyến khích Innovation Challenge 4.0 (2026) với TrafficHub.
        </motion.p>

        <motion.div {...item(3)} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a id="hero-cta-work" href="#work" className="btn btn-primary">
            Trải nghiệm TrafficHub <ArrowDown size={15} />
          </a>
          <a id="hero-cta-cv" href={profile.cv} download="CV_Nguyen_Dung.pdf" className="btn btn-ghost">
            Tải CV (PDF · {profile.cvSizeKb} KB)
          </a>
          <a
            id="hero-cta-github"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="link inline-flex items-center gap-1 text-sm"
          >
            GitHub <ArrowUpRight size={14} />
          </a>
        </motion.div>

        <motion.dl
          {...item(4)}
          className="mt-20 grid grid-cols-2 border-y border-line lg:grid-cols-4 lg:divide-x lg:divide-line"
        >
          {metrics.map(([value, label], i) => (
            <div
              key={label}
              className={`py-6 lg:px-6 lg:first:pl-0 ${i % 2 === 1 ? 'pl-6 lg:pl-6' : ''} ${i > 1 ? 'border-t border-line lg:border-t-0' : ''}`}
            >
              <dd className="order-1 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{value}</dd>
              <dt className="mt-2 text-xs leading-snug text-dim">{label}</dt>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
