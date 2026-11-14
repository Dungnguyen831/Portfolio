import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Award,
  Bell,
  Hand,
  Layers,
  MousePointerClick,
  Smartphone,
} from 'lucide-react'
import { trafficHub } from '../data'
import InteractivePhone from './PhoneMockup'
import { Eyebrow, FigmaIcon, FlutterMark, GithubIcon, Reveal, useMediaQuery } from './ui'

/* ---------- DevSpecs (Real Codebase & Architecture Inspector) ---------- */
export function DevSpecs({ className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className={`w-[244px] overflow-hidden rounded-xl border border-white/10 bg-[#0d1119]/95 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur ${className}`}
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
        <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-muted">
          <FlutterMark size={12} /> Codebase Inspector
        </span>
        <span className="font-mono text-[9.5px] text-emerald-400">verified</span>
      </div>
      <div className="px-3 pb-3 pt-2.5 font-mono text-[11px] leading-[1.85]">
        <p className="text-sky-soft">
          ▾ <span className="text-fg">Traffic-Posts (lib/)</span>
        </p>
        {trafficHub.specs.map((s, i) => (
          <p key={s.k} className="flex items-center gap-1.5 pl-2.5 text-dim">
            <span>{i === trafficHub.specs.length - 1 ? '└─' : '├─'}</span>
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: s.dot, boxShadow: `0 0 6px ${s.dot}` }}
            />
            <span className="text-muted">{s.k}:</span>
            <span className="truncate text-fg">{s.v}</span>
          </p>
        ))}
        <div className="mt-2.5 flex items-center gap-2 rounded-md border border-amber-400/20 bg-amber-400/[0.06] px-2.5 py-1.5">
          <Award size={14} className="shrink-0 text-amber-300" />
          <div className="min-w-0">
            <p className="text-[9px] uppercase tracking-wider text-amber-200/80">Giải thưởng 2026</p>
            <p className="truncate text-[10.5px] font-medium text-amber-300">
              KK Innovation Challenge 4.0
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ---------- Scenario guide (Supports Click/Tap + Hover) ---------- */
const scenarios = [
  { id: 'drag', icon: Hand, text: 'Vuốt kéo bản đồ OpenStreetMap để xem các điểm ùn tắc' },
  { id: 'tap', icon: MousePointerClick, text: 'Chạm vào biển cảnh báo để xem chi tiết tọa độ sự cố' },
  { id: 'report', icon: Bell, text: 'Bấm nút báo cáo / SOS để thử luồng cảnh báo cộng đồng' },
]

function ScenarioGuide({ hint, setHint, onActivate }) {
  return (
    <div>
      <p className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
        Kịch bản dùng thử <span className="kbd normal-case tracking-normal">bấm hoặc di chuột để định vị trên màn hình</span>
      </p>
      <ol className="space-y-2">
        {scenarios.map(({ id, icon: I, text }, i) => {
          const on = hint === id
          return (
            <li key={id}>
              <button
                id={`scenario-${id}`}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  onActivate?.()
                  setHint((prev) => (prev === id ? null : id))
                }}
                onMouseEnter={() => setHint(id)}
                onMouseLeave={() => setHint(null)}
                className={`group flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-all duration-300 ${
                  on
                    ? 'border-sky-soft/40 bg-sky/[0.09]'
                    : 'border-white/[0.07] bg-white/[0.015] hover:border-white/15'
                }`}
              >
                <span className="font-mono text-[11px] text-dim">0{i + 1}</span>
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border transition-colors ${
                    on ? 'border-sky-soft/40 text-sky-soft' : 'border-white/10 text-muted'
                  }`}
                >
                  <I size={15} />
                </span>
                <span className={`text-sm transition-colors ${on ? 'text-white' : 'text-fg/85'}`}>
                  {text}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/* ---------- CTAs (All verified & active links) ---------- */
const ctas = [
  {
    id: 'cta-demo',
    label: 'Mở Web Demo toàn màn hình',
    href: trafficHub.demo,
    icon: ArrowUpRight,
    cls: 'btn-sky',
    trailing: true,
    external: true,
  },
  {
    id: 'cta-github',
    label: `Mã nguồn (${trafficHub.commits} commits)`,
    href: trafficHub.source,
    icon: GithubIcon,
    cls: 'btn-ghost',
    external: true,
  },
  {
    id: 'cta-figma',
    label: 'Thiết kế Figma',
    href: trafficHub.figma,
    icon: FigmaIcon,
    cls: 'btn-ghost',
    external: true,
  },
  {
    id: 'cta-arch',
    label: `Kiến trúc ${trafficHub.moduleCount} Modules`,
    href: '#engineering',
    icon: Layers,
    cls: 'btn-ghost',
    external: false,
  },
]

function CTAGroup() {
  return (
    <div className="flex flex-wrap gap-2.5">
      {ctas.map(({ id, label, href, icon: I, cls, trailing, external }) => (
        <a
          key={id}
          id={id}
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer' : undefined}
          className={`btn group ${cls}`}
        >
          {!trailing && <I size={15} className="text-muted transition-colors group-hover:text-white" />}
          {label}
          {trailing && (
            <I
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          )}
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
        <svg
          viewBox="0 0 400 220"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {[...Array(8)].map((_, i) => (
            <line
              key={'h' + i}
              x1="0"
              x2="400"
              y1={18 + i * 28}
              y2={10 + i * 30}
              stroke="#182033"
              strokeWidth={i % 3 ? 2 : 6}
            />
          ))}
          {[...Array(9)].map((_, i) => (
            <line
              key={'v' + i}
              y1="0"
              y2="220"
              x1={20 + i * 48}
              x2={36 + i * 46}
              stroke="#182033"
              strokeWidth={i % 2 ? 2 : 5}
            />
          ))}
          <path
            d="M20 190 C110 150 140 120 200 110 S320 60 390 30"
            fill="none"
            stroke="#0284C7"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
        {[
          [28, 42, '#F97316'],
          [56, 30, '#F97316'],
          [70, 62, '#ef4444'],
          [40, 70, '#38BDF8'],
        ].map(([x, y, c], i) => (
          <span key={i} className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
            <span
              className="ghost-ring absolute -left-3 -top-3 h-6 w-6 rounded-full"
              style={{ background: `${c}55`, animationDelay: `${i * 0.3}s` }}
            />
            <span
              className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full ring-2 ring-[#0c1018]"
              style={{ background: c }}
            />
          </span>
        ))}
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-base/80 px-2.5 py-1 font-mono text-[10px] text-muted backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-go" /> Live · {trafficHub.commits} commits
        </span>
      </div>
      <div className="p-5">
        <p className="flex items-center gap-2 text-sm text-muted">
          <Smartphone size={15} /> Bản demo Flutter chạy mượt nhất ở chế độ toàn màn hình trên điện thoại.
        </p>
        <a
          id="cta-demo-mobile"
          href={trafficHub.demo}
          target="_blank"
          rel="noreferrer"
          className="btn btn-sky mt-4 !h-14 w-full justify-center !text-[15px]"
        >
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
  const [booted, setBooted] = useState(false)

  return (
    <section id="case-study" className="relative px-5 py-24 sm:px-8 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-16">
        {/* Device column */}
        {isDesktop ? (
          <div className="relative flex flex-col items-center xl:flex-row xl:items-start xl:gap-0">
            <div className="relative xl:order-2">
              <InteractivePhone
                src={trafficHub.demo}
                hint={hint}
                booted={booted}
                onBoot={() => setBooted(true)}
              />
            </div>
            <DevSpecs className="mt-8 xl:order-1 xl:-mr-6 xl:mt-44 xl:relative xl:z-10" />
          </div>
        ) : null}

        {/* Content column */}
        <div className={isDesktop ? 'pr-14 xl:pr-0' : ''}>
          <Reveal>
            <Eyebrow color="text-signal">Featured Case Study · {trafficHub.period}</Eyebrow>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              TrafficHub
            </h2>
            <p className="mt-2 font-mono text-xs text-amber-300">
              ★ {trafficHub.award}
            </p>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
              Nền tảng cảnh báo giao thông cộng đồng và phát tín hiệu cứu hộ khẩn cấp (SOS) thời gian thực,
              phát triển trong nhóm {trafficHub.teamSize} thành viên. Đóng góp toàn bộ tầng{' '}
              <span className="text-fg font-medium">Mobile Frontend với Flutter &amp; GetX</span>: bản đồ OpenStreetMap,
              kết nối WebSocket (STOMP) phát tọa độ GPS tức thì, lưu trữ phiên đăng nhập bằng{' '}
              <span className="font-mono text-xs text-fg">flutter_secure_storage</span> và tích hợp trợ lý AI Gemini.
            </p>

            <dl className="mt-7 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.06]">
              {[
                ['Vai trò', 'Flutter FE (Team 5)'],
                ['Quy mô code', `${trafficHub.commits} commits · ${trafficHub.dartFiles} files`],
                ['Kiến trúc', `${trafficHub.moduleCount} modules · GetX`],
              ].map(([k, v]) => (
                <div key={k} className="bg-base px-3.5 py-3">
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-dim">{k}</dt>
                  <dd className="mt-1 text-[12.5px] font-medium text-fg">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {isDesktop ? (
            <>
              <Reveal delay={0.1} className="mt-9">
                <ScenarioGuide
                  hint={hint}
                  setHint={setHint}
                  onActivate={() => setBooted(true)}
                />
              </Reveal>
              <Reveal delay={0.18} className="mt-9">
                <CTAGroup />
              </Reveal>
            </>
          ) : (
            <>
              <Reveal delay={0.1} className="mt-8">
                <MobilePreview />
              </Reveal>
              <Reveal delay={0.15} className="mt-6">
                <DevSpecs className="!w-full" />
              </Reveal>
              <Reveal delay={0.2} className="mt-6">
                <CTAGroup />
              </Reveal>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
