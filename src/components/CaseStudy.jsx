import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Bell, Download, Hand, MousePointerClick, Smartphone } from 'lucide-react'
import { trafficHub } from '../data'
import InteractivePhone from './PhoneMockup'
import { Eyebrow, FigmaIcon, FlutterMark, GithubIcon, Reveal, useMediaQuery } from './ui'

/* ---------- DevSpecs (Flutter Inspector style) ---------- */
const specs = [
  { k: 'performance', v: '60 FPS', dot: '#22C55E' },
  { k: 'engine', v: 'CanvasKit / WASM', dot: '#38BDF8' },
  { k: 'architecture', v: 'Clean Architecture', dot: '#A78BFA' },
  { k: 'map', v: 'OpenStreetMap', dot: '#F97316' },
  { k: 'alerts', v: 'Real-time', dot: '#F97316' },
]

function FpsMeter() {
  const [bars, setBars] = useState(() => Array.from({ length: 22 }, () => 0.9))
  useEffect(() => {
    const id = setInterval(() => setBars((b) => [...b.slice(1), 0.86 + Math.random() * 0.14]), 220)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="flex h-6 items-end gap-[2px]" aria-hidden="true">
      {bars.map((h, i) => (
        <span key={i} className="w-[3px] rounded-sm bg-go/70" style={{ height: `${h * 100}%` }} />
      ))}
    </div>
  )
}

export function DevSpecs({ className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`w-[228px] overflow-hidden rounded-xl border border-white/10 bg-[#0d1119]/95 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur ${className}`}
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
        <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-muted">
          <FlutterMark size={12} /> Flutter Inspector
        </span>
        <span className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-white/15" /><span className="h-1.5 w-1.5 rounded-full bg-white/15" />
        </span>
      </div>
      <div className="px-3 pb-3 pt-2.5 font-mono text-[11px] leading-[1.9]">
        <p className="text-sky-soft">▾ <span className="text-fg">TrafficHubApp</span></p>
        {specs.map((s, i) => (
          <p key={s.k} className="flex items-center gap-1.5 pl-3 text-dim">
            <span>{i === specs.length - 1 ? '└─' : '├─'}</span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: s.dot, boxShadow: `0 0 6px ${s.dot}` }} />
            <span className="text-muted">{s.k}:</span>
            <span className="truncate text-fg">{s.v}</span>
          </p>
        ))}
        <div className="mt-2.5 flex items-end justify-between rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-1.5">
          <div>
            <p className="text-[9.5px] uppercase tracking-wider text-dim">UI thread</p>
            <p className="text-[13px] font-medium text-go">60<span className="text-[10px] text-dim"> fps</span></p>
          </div>
          <FpsMeter />
        </div>
      </div>
    </motion.div>
  )
}

/* ---------- Scenario guide ---------- */
const scenarios = [
  { id: 'drag', icon: Hand, text: 'Vuốt kéo bản đồ để khám phá các điểm ùn tắc' },
  { id: 'tap', icon: MousePointerClick, text: 'Chạm vào biển cảnh báo để xem chi tiết sự cố' },
  { id: 'report', icon: Bell, text: 'Bấm nút báo cáo ở thanh điều hướng để thử gửi tin' },
]

function ScenarioGuide({ hint, setHint }) {
  return (
    <div>
      <p className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
        Kịch bản dùng thử <span className="kbd normal-case tracking-normal">hover để xem gợi ý</span>
      </p>
      <ol className="space-y-2">
        {scenarios.map(({ id, icon: I, text }, i) => {
          const on = hint === id
          return (
            <li key={id}>
              <button
                id={`scenario-${id}`}
                onMouseEnter={() => setHint(id)}
                onMouseLeave={() => setHint(null)}
                onFocus={() => setHint(id)}
                onBlur={() => setHint(null)}
                className={`group flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-all duration-300 ${
                  on ? 'border-sky-soft/35 bg-sky/[0.08]' : 'border-white/[0.07] bg-white/[0.015] hover:border-white/15'
                }`}
              >
                <span className="font-mono text-[11px] text-dim">0{i + 1}</span>
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border transition-colors ${on ? 'border-sky-soft/40 text-sky-soft' : 'border-white/10 text-muted'}`}>
                  <I size={15} />
                </span>
                <span className={`text-sm transition-colors ${on ? 'text-white' : 'text-fg/85'}`}>👉 {text}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/* ---------- CTAs ---------- */
const ctas = [
  { id: 'cta-demo', label: 'Trải nghiệm Web Demo', href: trafficHub.demo, icon: ArrowUpRight, cls: 'btn-sky', trailing: true },
  { id: 'cta-apk', label: 'Tải file APK (Android)', href: trafficHub.apk, icon: Download, cls: 'btn-ghost' },
  { id: 'cta-github', label: 'Mã nguồn GitHub', href: trafficHub.source, icon: GithubIcon, cls: 'btn-ghost' },
  { id: 'cta-figma', label: 'Thiết kế Figma', href: trafficHub.figma, icon: FigmaIcon, cls: 'btn-ghost' },
]

function CTAGroup() {
  return (
    <div className="flex flex-wrap gap-2.5">
      {ctas.map(({ id, label, href, icon: I, cls, trailing }) => (
        <a key={id} id={id} href={href} target="_blank" rel="noreferrer" className={`btn group ${cls}`}>
          {!trailing && <I size={15} className="text-muted transition-colors group-hover:text-white" />}
          {label}
          {trailing && <I size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
        </a>
      ))}
    </div>
  )
}

/* ---------- Mobile preview ---------- */
function MobilePreview() {
  return (
    <div className="card overflow-hidden">
      <div className="relative h-56 overflow-hidden border-b border-white/[0.06] bg-[#0c1018]">
        <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {[...Array(8)].map((_, i) => <line key={'h' + i} x1="0" x2="400" y1={18 + i * 28} y2={10 + i * 30} stroke="#182033" strokeWidth={i % 3 ? 2 : 6} />)}
          {[...Array(9)].map((_, i) => <line key={'v' + i} y1="0" y2="220" x1={20 + i * 48} x2={36 + i * 46} stroke="#182033" strokeWidth={i % 2 ? 2 : 5} />)}
          <path d="M20 190 C110 150 140 120 200 110 S320 60 390 30" fill="none" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
        </svg>
        {[[28, 42, '#F97316'], [56, 30, '#F97316'], [70, 62, '#ef4444'], [40, 70, '#38BDF8']].map(([x, y, c], i) => (
          <span key={i} className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
            <span className="ghost-ring absolute -left-3 -top-3 h-6 w-6 rounded-full" style={{ background: `${c}55`, animationDelay: `${i * 0.3}s` }} />
            <span className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full ring-2 ring-[#0c1018]" style={{ background: c }} />
          </span>
        ))}
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-base/80 px-2.5 py-1 font-mono text-[10px] text-muted backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-go" /> Live · GitHub Pages
        </span>
      </div>
      <div className="p-5">
        <p className="flex items-center gap-2 text-sm text-muted"><Smartphone size={15} /> Bản demo chạy tốt nhất ở chế độ toàn màn hình trên điện thoại.</p>
        <a id="cta-demo-mobile" href={trafficHub.demo} target="_blank" rel="noreferrer" className="btn btn-sky mt-4 !h-14 w-full justify-center !text-[15px]">
          Trải nghiệm bản Web Demo (Toàn màn hình) <ArrowUpRight size={17} />
        </a>
      </div>
    </div>
  )
}

/* ---------- Section ---------- */
export default function CaseStudy() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [hint, setHint] = useState(null)

  return (
    <section id="case-study" className="relative px-5 py-24 sm:px-8 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-16">
        {/* Device column */}
        {isDesktop ? (
          <div className="relative flex flex-col items-center xl:flex-row xl:items-start xl:gap-0">
            <div className="relative xl:order-2">
              <InteractivePhone src={trafficHub.demo} hint={hint} />
            </div>
            <DevSpecs className="mt-8 xl:order-1 xl:-mr-6 xl:mt-44 xl:relative xl:z-10" />
          </div>
        ) : null}

        {/* Content column */}
        <div className={isDesktop ? 'pr-14 xl:pr-0' : ''}>
          <Reveal>
            <Eyebrow color="text-signal">Featured Case Study</Eyebrow>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">TrafficHub</h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
              Ứng dụng cảnh báo & chia sẻ tình trạng giao thông theo thời gian thực. Người đi đường báo sự cố bằng 1–2 chạm,
              cộng đồng xác nhận, và bản đồ cập nhật ngay — <span className="text-fg">bản demo bên cạnh là app Flutter thật, không phải ảnh chụp.</span>
            </p>

            <dl className="mt-7 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.06]">
              {[['Vai trò', 'UI/UX + Flutter'], ['Nền tảng', 'Android · Web'], ['Bản đồ', 'flutter_map']].map(([k, v]) => (
                <div key={k} className="bg-base px-3.5 py-3">
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-dim">{k}</dt>
                  <dd className="mt-1 text-[13px] text-fg">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {isDesktop ? (
            <>
              <Reveal delay={0.1} className="mt-9">
                <ScenarioGuide hint={hint} setHint={setHint} />
              </Reveal>
              <Reveal delay={0.18} className="mt-9">
                <CTAGroup />
              </Reveal>
            </>
          ) : (
            <>
              <Reveal delay={0.1} className="mt-8"><MobilePreview /></Reveal>
              <Reveal delay={0.15} className="mt-6"><DevSpecs className="!w-full" /></Reveal>
              <Reveal delay={0.2} className="mt-6"><CTAGroup /></Reveal>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
