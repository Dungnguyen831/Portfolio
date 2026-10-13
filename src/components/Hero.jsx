import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, FileDown, PenTool } from 'lucide-react'
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
          className="mt-4 max-w-4xl text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.045em] sm:text-6xl lg:text-[4.4rem]"
        >
          <span className="text-shine">Thiết kế từng pixel.</span>
          <br />
          <span className="text-shine">Code Flutter chạy </span>
          <span className="text-sky-soft">60&nbsp;FPS</span>
          <span className="text-shine">.</span>
        </motion.h1>

        <motion.p {...item(3)} className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
          Tôi đứng giữa Figma và Flutter — biến luồng trải nghiệm thành sản phẩm di động mượt mà,
          dễ bảo trì. Dự án mới nhất: <span className="text-fg">TrafficHub</span>, ứng dụng cảnh báo giao
          thông cộng đồng — có thể dùng thử ngay bên dưới.
        </motion.p>

        <motion.div {...item(4)} className="mt-9 flex flex-wrap items-center gap-3">
          <a id="hero-cta-case" href="#case-study" className="btn btn-primary">
            Dùng thử TrafficHub <ArrowDown size={15} />
          </a>
          <a id="hero-cta-cv" href={profile.cv} download className="btn btn-ghost">
            <FileDown size={15} className="text-muted" /> Tải CV
          </a>
          <span className="ml-1 hidden items-center gap-1.5 text-xs text-dim sm:inline-flex">
            hoặc nhấn <kbd className="kbd">↓</kbd> để cuộn
          </span>
        </motion.div>

        {/* Bento strip */}
        <motion.div {...item(6)} className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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

          <Spotlight className="p-5">
            <FlutterMark size={18} />
            <p className="mt-6 text-sm font-medium text-white">Flutter · Dart · GetX</p>
            <p className="mt-1 text-sm text-muted">Một codebase cho Android, iOS & Web.</p>
          </Spotlight>

          <Spotlight className="p-5">
            <PenTool size={18} className="text-signal" />
            <p className="mt-6 text-sm font-medium text-white">Figma → Flutter</p>
            <p className="mt-1 text-sm text-muted">Tự thiết kế, tự hiện thực, không “lệch pixel”.</p>
          </Spotlight>
        </motion.div>
      </div>
    </section>
  )
}
