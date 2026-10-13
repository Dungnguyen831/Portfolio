import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Code2, FileText, Server } from 'lucide-react'
import { profile, trafficHub } from '../data'
import { FlutterMark, Spotlight, StatusPill } from './ui'

const EASE = [0.16, 1, 0.3, 1]
const item = (i) => ({
  initial: { opacity: 0, y: 14, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.9, delay: 0.08 * i, ease: EASE },
})

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden px-5 pb-20 pt-32 sm:px-8 sm:pt-40">
      <div className="top-glow pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
      <div className="bg-dots pointer-events-none absolute inset-x-0 top-0 h-[620px]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div {...item(0)} className="lg:hidden">
          <StatusPill />
        </motion.div>

        <motion.p {...item(1)} className="mt-6 font-mono text-xs text-dim lg:mt-0">
          {profile.name} — {profile.role}
        </motion.p>

        <motion.h1
          {...item(2)}
          className="mt-4 max-w-4xl text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.045em] sm:text-6xl lg:text-[4.2rem]"
        >
          <span className="text-shine">Thiết kế chuẩn mực.</span>
          <br />
          <span className="text-shine">Code Mobile </span>
          <span className="text-sky-soft">Flutter 60&nbsp;FPS</span>
          <br className="hidden sm:inline" />
          <span className="text-shine">&amp; Backend </span>
          <span className="text-signal">Java Spring Boot</span>
          <span className="text-shine">.</span>
        </motion.h1>

        <motion.p {...item(3)} className="mt-6 max-w-2xl text-[16.5px] leading-relaxed text-muted">
          Tôi xây dựng các trải nghiệm di động mượt mà với Flutter và kiến trúc hệ thống backend tin cậy với Java Spring Boot.
          Dự án chủ lực bên dưới: <span className="text-fg font-medium">TrafficHub</span> — nền tảng cảnh báo giao thông cộng đồng
          thời gian thực, bạn có thể tương tác trực tiếp ngay trên trang.
        </motion.p>

        <motion.div {...item(4)} className="mt-9 flex flex-wrap items-center gap-3">
          <a id="hero-cta-case" href="#case-study" className="btn btn-primary">
            Dùng thử TrafficHub <ArrowDown size={15} />
          </a>
          <a id="hero-cta-about" href="#about-projects" className="btn btn-ghost">
            <Code2 size={15} className="text-muted" /> Về tôi &amp; Dự án
          </a>
          <a id="hero-cta-cv" href="#resume" className="btn btn-ghost">
            <FileText size={15} className="text-muted" /> Xem &amp; Tải CV
          </a>
        </motion.div>

        {/* Bento strip */}
        <motion.div {...item(5)} className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Spotlight as="a" href="#case-study" id="hero-bento-featured" className="group p-5 sm:col-span-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-signal">
                <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_8px_#F97316]" /> Featured
              </span>
              <ArrowUpRight size={16} className="text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
            </div>
            <p className="mt-6 text-lg font-medium tracking-tight text-white">TrafficHub — cảnh báo giao thông thời gian thực</p>
            <p className="mt-1.5 text-sm text-muted">Live web demo · Bản đồ OSM · Báo cáo sự cố 1 chạm</p>
            <p className="mt-4 truncate font-mono text-[11px] text-dim">{trafficHub.demo.replace('https://', '')}</p>
          </Spotlight>

          <Spotlight as="a" href="#about-projects" className="group p-5">
            <div className="flex items-center justify-between">
              <FlutterMark size={18} />
              <ArrowUpRight size={14} className="text-dim transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <p className="mt-6 text-sm font-medium text-white">Mobile: Flutter &amp; Dart</p>
            <p className="mt-1 text-sm text-muted">BLoC / GetX, Clean Architecture, 60 FPS.</p>
          </Spotlight>

          <Spotlight as="a" href="#about-projects" className="group p-5">
            <div className="flex items-center justify-between">
              <Server size={18} className="text-signal" />
              <ArrowUpRight size={14} className="text-dim transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <p className="mt-6 text-sm font-medium text-white">Backend: Java Spring Boot</p>
            <p className="mt-1 text-sm text-muted">REST API, JPA/Hibernate, bảo mật JWT.</p>
          </Spotlight>
        </motion.div>
      </div>
    </section>
  )
}
