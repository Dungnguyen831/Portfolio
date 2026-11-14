import { useState } from 'react'
import { ArrowUpRight, Bell, Hand, MousePointerClick, Smartphone } from 'lucide-react'
import { trafficHub } from '../data'
import InteractivePhone from './PhoneMockup'
import { FigmaIcon, GithubIcon, Rows, Tabs, useMediaQuery } from './ui'

const scenarios = [
  { id: 'drag', icon: Hand, text: 'Vuốt kéo bản đồ OpenStreetMap để xem các điểm ùn tắc' },
  { id: 'tap', icon: MousePointerClick, text: 'Chạm vào biển cảnh báo để xem chi tiết tọa độ sự cố' },
  { id: 'report', icon: Bell, text: 'Bấm nút báo cáo / SOS để thử luồng cảnh báo cộng đồng' },
]

function ScenarioGuide({ hint, setHint, onActivate }) {
  return (
    <div>
      <p className="mb-3 text-xs text-dim">Kịch bản dùng thử — bấm hoặc di chuột để chỉ vị trí trên màn hình</p>
      <ol className="divide-y divide-line border-y border-line">
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
                className={`flex w-full items-center gap-4 py-3 text-left text-sm transition-colors ${
                  on ? 'text-fg' : 'text-muted hover:text-fg'
                }`}
              >
                <span className="font-mono text-xs text-dim">0{i + 1}</span>
                <I size={15} className={on ? 'text-accent' : ''} aria-hidden="true" />
                <span>{text}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

const layers = [
  { k: 'Presentation', v: 'Views · GetX Controllers · Bindings · flutter_screenutil' },
  { k: 'Domain & State', v: 'Models · Reactive State · Infinite-scroll Pagination' },
  { k: 'Data & Realtime', v: 'Dio REST · STOMP WebSocket · flutter_secure_storage · FCM' },
]

const deepDive = [
  {
    k: 'Bản đồ',
    v: 'flutter_map 8.3 (OpenStreetMap) tự vẽ marker cảnh báo từ tọa độ GPS của bài đăng cộng đồng — geolocator, geocoding.',
  },
  {
    k: 'SOS thời gian thực',
    v: 'Tín hiệu khẩn cấp độ trễ thấp qua WebSocket (stomp_dart_client) kết hợp Firebase Cloud Messaging.',
  },
  {
    k: 'AI & giọng nói',
    v: 'Trợ lý Gemini (googleai_dart) hiển thị phản hồi Markdown; speech_to_text giúp tài xế báo cáo rảnh tay.',
  },
  {
    k: 'Bảo mật phiên',
    v: 'Token lưu bằng flutter_secure_storage, tự khôi phục phiên đăng nhập qua Dio Interceptor.',
  },
  {
    k: 'Một codebase, hai nền tảng',
    v: 'Android và Flutter Web (flutter_screenutil giữ tỷ lệ Figma), triển khai bản Web Release lên GitHub Pages.',
  },
]

const ctas = [
  { id: 'cta-demo', label: 'Mở Web Demo toàn màn hình', href: trafficHub.demo, icon: ArrowUpRight, primary: true },
  { id: 'cta-github', label: `Mã nguồn (${trafficHub.commits} commits)`, href: trafficHub.source, icon: GithubIcon },
  { id: 'cta-figma', label: 'Thiết kế Figma', href: trafficHub.figma, icon: FigmaIcon },
]

function CTAGroup() {
  return (
    <div className="flex flex-wrap gap-3">
      {ctas.map(({ id, label, href, icon: I, primary }) => (
        <a
          key={id}
          id={id}
          href={href}
          target="_blank"
          rel="noreferrer"
          className={`btn ${primary ? 'btn-primary' : 'btn-ghost'}`}
        >
          {!primary && <I size={15} />}
          {label}
          {primary && <I size={15} />}
        </a>
      ))}
    </div>
  )
}

function MobilePreview() {
  return (
    <div className="border border-line p-5">
      <p className="flex items-start gap-2 text-sm text-muted">
        <Smartphone size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
        Bản demo Flutter chạy mượt nhất ở chế độ toàn màn hình trên điện thoại.
      </p>
      <a
        id="cta-demo-mobile"
        href={trafficHub.demo}
        target="_blank"
        rel="noreferrer"
        className="btn btn-primary mt-4 w-full"
      >
        Trải nghiệm Web Demo <ArrowUpRight size={16} />
      </a>
    </div>
  )
}

export default function CaseStudy() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [hint, setHint] = useState(null)
  const [booted, setBooted] = useState(false)

  const tabs = [
    {
      id: 'overview',
      label: 'Tổng quan',
      content: (
        <div className="space-y-6">
          <Rows
            items={[
              { k: 'Vai trò', v: trafficHub.role },
              { k: 'Quy mô', v: `${trafficHub.commits} commits · ${trafficHub.dartFiles} file Dart · ${trafficHub.moduleCount} module` },
              { k: 'Thời gian', v: `${trafficHub.period} · nhóm ${trafficHub.teamSize} thành viên` },
            ]}
          />
          <ul className="space-y-2.5 text-[14px] leading-relaxed text-muted">
            {trafficHub.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-dim" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: 'architecture',
      label: `Kiến trúc · ${trafficHub.moduleCount} modules`,
      content: (
        <div className="space-y-6">
          <p className="text-[14px] leading-relaxed text-muted">
            Tách biệt theo từng tính năng trong <span className="font-mono text-xs text-fg">lib/modules/</span>, mỗi
            module quản lý vòng đời bằng GetX Binding riêng.
          </p>
          <Rows items={layers} mono />
          <p className="font-mono text-xs leading-loose text-muted">
            {trafficHub.modules.join(' · ')}
          </p>
        </div>
      ),
    },
    {
      id: 'realtime',
      label: 'Realtime & AI',
      content: <Rows items={deepDive} labelWidth="190px" />,
    },
  ]

  return (
    <article className="grid gap-12 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-20">
      {isDesktop && (
        <div className="lg:sticky lg:top-24 lg:self-start">
          <InteractivePhone src={trafficHub.demo} hint={hint} booted={booted} onBoot={() => setBooted(true)} />
        </div>
      )}

      <div>
        <p className="font-mono text-xs text-dim">01 — Mobile · {trafficHub.period}</p>
        <h3 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-fg sm:text-5xl">TrafficHub</h3>
        <p className="mt-3 text-sm text-accent">★ {trafficHub.award}</p>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
          Nền tảng cảnh báo giao thông cộng đồng và phát tín hiệu cứu hộ khẩn cấp (SOS) thời gian thực. Phụ
          trách toàn bộ tầng <span className="text-fg">Mobile Frontend (Flutter &amp; GetX)</span>: bản đồ
          OpenStreetMap, WebSocket phát tọa độ GPS tức thì và trợ lý AI Gemini.
        </p>

        {!isDesktop && (
          <div className="mt-8">
            <MobilePreview />
          </div>
        )}

        <div className="mt-10">
          <Tabs label="Chi tiết kỹ thuật TrafficHub" tabs={tabs} />
        </div>

        {isDesktop && (
          <div className="mt-10">
            <ScenarioGuide hint={hint} setHint={setHint} onActivate={() => setBooted(true)} />
          </div>
        )}

        <div className="mt-10">
          <CTAGroup />
        </div>
      </div>
    </article>
  )
}
