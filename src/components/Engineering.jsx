import { BellRing, Bot, Globe2, Map, Mic, ShieldAlert, Siren, Waves, Construction, Car } from 'lucide-react'
import { Reveal, SectionHeader, Spotlight } from './ui'

const Tag = ({ children }) => (
  <span className="rounded-md border border-white/[0.07] bg-white/[0.02] px-1.5 py-0.5 font-mono text-[10.5px] text-muted">{children}</span>
)

const CardTitle = ({ icon: I, color = 'text-sky-soft', children }) => (
  <div className="flex items-center gap-2.5">
    <span className={`grid h-7 w-7 place-items-center rounded-md border border-white/[0.08] bg-white/[0.03] ${color}`}><I size={14} /></span>
    <h3 className="text-[15px] font-medium tracking-tight text-white">{children}</h3>
  </div>
)

const layers = [
  { name: 'Presentation', desc: 'Views · GetX Controllers · Bindings', tone: 'border-sky-soft/30 text-sky-soft' },
  { name: 'Domain', desc: 'Models · Repository contracts', tone: 'border-violet-400/30 text-violet-300' },
  { name: 'Data', desc: 'Dio REST · Secure Storage · FCM', tone: 'border-signal/30 text-signal' },
]

const modules = ['map', 'dashboard', 'emergency', 'camera', 'discovery', 'chatbot', 'profile', 'login']

export default function Engineering() {
  return (
    <section id="engineering" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Phân tích kỹ thuật"
          title="Bài toán & cách tôi giải quyết"
          desc="Từ vấn đề thực tế trên đường phố đến kiến trúc mã nguồn có thể mở rộng."
        />

        <div className="grid auto-rows-[minmax(180px,auto)] gap-3 md:grid-cols-3">
          {/* Problem */}
          <Reveal className="md:col-span-2">
            <Spotlight className="h-full p-6">
              <CardTitle icon={ShieldAlert} color="text-signal">Vấn đề</CardTitle>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
                Ứng dụng bản đồ phổ biến phản ứng chậm với sự cố vừa xảy ra. Người đi đường lại là nguồn tin nhanh nhất —
                nhưng thiếu một kênh báo cáo <span className="text-fg">nhanh, tin cậy và dùng được bằng một tay.</span>
              </p>
              <div className="mt-6 grid gap-2 sm:grid-cols-3">
                {[[Car, 'Ùn tắc bất ngờ'], [Waves, 'Ngập cục bộ'], [Construction, 'Tai nạn & công trình']].map(([I, t]) => (
                  <div key={t} className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.015] px-3 py-2.5 text-sm text-fg/90">
                    <I size={15} className="text-signal" /> {t}
                  </div>
                ))}
              </div>
            </Spotlight>
          </Reveal>

          {/* Architecture */}
          <Reveal delay={0.06} className="md:row-span-2">
            <Spotlight className="flex h-full flex-col p-6">
              <CardTitle icon={Globe2}>Clean Architecture</CardTitle>
              <p className="mt-3 text-sm leading-relaxed text-muted">Tách module theo tính năng, mỗi tầng một trách nhiệm.</p>
              <div className="mt-5 flex flex-1 flex-col gap-2">
                {layers.map((l, i) => (
                  <div key={l.name}>
                    <div className={`rounded-lg border bg-white/[0.015] px-3.5 py-3 ${l.tone}`}>
                      <p className="font-mono text-[11px] uppercase tracking-wider">{l.name}</p>
                      <p className="mt-1 text-[13px] text-fg/85">{l.desc}</p>
                    </div>
                    {i < layers.length - 1 && <div className="mx-auto h-3 w-px bg-white/15" />}
                  </div>
                ))}
              </div>
              <div className="mt-5 border-t border-white/[0.06] pt-4">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-dim">lib/modules/</p>
                <div className="flex flex-wrap gap-1.5">{modules.map((m) => <Tag key={m}>{m}</Tag>)}</div>
              </div>
            </Spotlight>
          </Reveal>

          {/* Map */}
          <Reveal delay={0.1}>
            <Spotlight className="h-full p-6">
              <CardTitle icon={Map}>Bản đồ mã nguồn mở</CardTitle>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                OpenStreetMap qua <span className="text-fg">flutter_map</span>, định vị bằng geolocator, không phụ thuộc API key trả phí.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5"><Tag>flutter_map</Tag><Tag>latlong2</Tag><Tag>geolocator</Tag><Tag>geocoding</Tag></div>
            </Spotlight>
          </Reveal>

          {/* Alerts */}
          <Reveal delay={0.14}>
            <Spotlight className="h-full p-6">
              <CardTitle icon={BellRing} color="text-signal">Cảnh báo thời gian thực</CardTitle>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Push notification qua Firebase Cloud Messaging; luồng <span className="text-fg">SOS khẩn cấp</span> tách riêng để phản hồi tức thì.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5"><Tag>firebase_messaging</Tag><Tag>dio</Tag><Tag>connectivity_plus</Tag></div>
            </Spotlight>
          </Reveal>

          {/* Cross-platform */}
          <Reveal delay={0.08} className="md:col-span-2">
            <Spotlight className="h-full p-6">
              <CardTitle icon={Siren}>Thử thách: một codebase, chạy cả trên Web</CardTitle>
              <div className="mt-4 grid gap-6 md:grid-cols-[1fr_auto]">
                <ul className="space-y-2.5 text-sm text-muted">
                  {[
                    ['Responsive', 'flutter_screenutil để giữ tỉ lệ thiết kế Figma trên mọi kích thước màn hình.'],
                    ['Quyền thiết bị', 'Xử lý fallback khi trình duyệt từ chối định vị / camera.'],
                    ['Render', 'Build web với CanvasKit, deploy tĩnh lên GitHub Pages.'],
                  ].map(([t, d], i) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-0.5 font-mono text-[11px] text-dim">0{i + 1}</span>
                      <span><span className="text-fg">{t}.</span> {d}</span>
                    </li>
                  ))}
                </ul>
                <pre className="overflow-x-auto rounded-lg border border-white/[0.06] bg-[#0b0e15] p-4 font-mono text-[11.5px] leading-relaxed text-muted">
{`$ flutter build web \\
    --release \\
    --base-href /Traffic-Posts/
`}<span className="text-go">✓ Built build/web</span>{`
$ git push → GitHub Pages`}
                </pre>
              </div>
            </Spotlight>
          </Reveal>

          {/* AI + Voice */}
          <Reveal delay={0.12}>
            <Spotlight className="h-full p-6">
              <CardTitle icon={Bot}>Trợ lý AI & giọng nói</CardTitle>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Chatbot dùng Gemini API trả lời bằng Markdown; nhập liệu bằng giọng nói để báo cáo khi đang lái xe.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5"><Tag>gemini</Tag><Tag><Mic size={10} className="mr-1 inline" />speech_to_text</Tag></div>
            </Spotlight>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
