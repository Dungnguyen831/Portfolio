import {
  ArrowUpRight,
  BellRing,
  Bot,
  Car,
  CheckCircle2,
  Construction,
  Database,
  Globe2,
  Lock,
  Map,
  Mic,
  Server,
  ShieldAlert,
  Siren,
  TestTube2,
  Waves,
} from 'lucide-react'
import { librarySystem, trafficHub } from '../data'
import { GithubIcon, Reveal, SectionHeader, Spotlight } from './ui'

const Tag = ({ children, highlight = false }) => (
  <span
    className={`rounded-md border px-2 py-0.5 font-mono text-[10.5px] ${
      highlight
        ? 'border-sky-soft/30 bg-sky/[0.08] text-sky-soft'
        : 'border-white/[0.07] bg-white/[0.02] text-muted'
    }`}
  >
    {children}
  </span>
)

const CardTitle = ({ icon: I, color = 'text-sky-soft', children, right }) => (
  <div className="flex items-center justify-between gap-2">
    <div className="flex items-center gap-2.5">
      <span
        className={`grid h-7 w-7 place-items-center rounded-md border border-white/[0.08] bg-white/[0.03] ${color}`}
      >
        <I size={14} />
      </span>
      <h3 className="text-[15px] font-medium tracking-tight text-white">{children}</h3>
    </div>
    {right}
  </div>
)

const layers = [
  {
    name: 'Presentation Layer',
    desc: 'Views · GetX Controllers · Bindings · flutter_screenutil',
    tone: 'border-sky-soft/30 text-sky-soft',
  },
  {
    name: 'Domain & State Layer',
    desc: 'Models · Reactive State · Infinite-scroll Pagination',
    tone: 'border-violet-400/30 text-violet-300',
  },
  {
    name: 'Data & Realtime Layer',
    desc: 'Dio REST · STOMP WebSocket · flutter_secure_storage · FCM',
    tone: 'border-signal/30 text-signal',
  },
]

export default function Engineering() {
  return (
    <section id="engineering" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Part 1: Mobile Engineering (TrafficHub) */}
        <SectionHeader
          eyebrow="Phân tích kỹ thuật · Mobile (Flutter)"
          title="Kiến trúc TrafficHub: 121 file Dart & 13 modules"
          desc="Từ bài toán cảnh báo sự cố giao thông thời gian thực đến kiến trúc phân tầng tách biệt rõ ràng."
        />

        <div className="grid auto-rows-[minmax(180px,auto)] gap-3 md:grid-cols-3">
          {/* Problem & Optimization */}
          <Reveal className="md:col-span-2">
            <Spotlight className="h-full p-6">
              <CardTitle
                icon={ShieldAlert}
                color="text-signal"
                right={
                  <span className="font-mono text-[11px] text-dim">
                    {trafficHub.commits} commits · Team {trafficHub.teamSize}
                  </span>
                }
              >
                Bài toán thực tế &amp; Tối ưu hóa trên Mobile
              </CardTitle>
              <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-muted">
                Ứng dụng bản đồ phổ thông phản ứng chậm với sự cố vừa phát sinh. TrafficHub cho phép người đi đường
                báo cáo nhanh bằng 1–2 chạm hoặc bằng giọng nói, đồng thời tối ưu bảng tin cộng đồng bằng{' '}
                <span className="text-fg">phân trang infinite-scroll, bộ nhớ đệm ảnh mạng (cached_network_image)</span>{' '}
                và giảm thiểu widget rebuild để loại bỏ hiện tượng giật khung hình.
              </p>
              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                {[
                  [Car, 'Cảnh báo ùn tắc tức thì'],
                  [Waves, 'Điểm ngập úng cục bộ'],
                  [Construction, 'SOS tai nạn & cứu hộ'],
                ].map(([I, t]) => (
                  <div
                    key={t}
                    className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.015] px-3 py-2.5 text-sm text-fg/90"
                  >
                    <I size={15} className="text-signal" /> {t}
                  </div>
                ))}
              </div>
            </Spotlight>
          </Reveal>

          {/* Architecture + 13 Real Modules */}
          <Reveal delay={0.06} className="md:row-span-2">
            <Spotlight className="flex h-full flex-col p-6">
              <CardTitle
                icon={Globe2}
                right={
                  <span className="font-mono text-[10.5px] text-sky-soft">
                    {trafficHub.moduleCount} modules
                  </span>
                }
              >
                Kiến trúc Module hóa
              </CardTitle>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Tách biệt theo từng tính năng độc lập trong <span className="font-mono text-xs text-fg">lib/modules/</span>,
                mỗi module quản lý vòng đời qua GetX Binding riêng.
              </p>
              <div className="mt-4 flex flex-1 flex-col gap-2">
                {layers.map((l, i) => (
                  <div key={l.name}>
                    <div className={`rounded-lg border bg-white/[0.015] px-3.5 py-2.5 ${l.tone}`}>
                      <p className="font-mono text-[10.5px] uppercase tracking-wider">{l.name}</p>
                      <p className="mt-1 text-[12.5px] text-fg/85">{l.desc}</p>
                    </div>
                    {i < layers.length - 1 && <div className="mx-auto h-2.5 w-px bg-white/15" />}
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-white/[0.06] pt-3.5">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-dim">
                  lib/modules/ ({trafficHub.moduleCount} thư mục thực tế)
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {trafficHub.modules.map((m) => (
                    <Tag key={m}>{m}</Tag>
                  ))}
                </div>
              </div>
            </Spotlight>
          </Reveal>

          {/* Map */}
          <Reveal delay={0.1}>
            <Spotlight className="h-full p-6">
              <CardTitle icon={Map}>Bản đồ OpenStreetMap</CardTitle>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Render các lớp bản đồ tương tác qua <span className="text-fg">flutter_map 8.3</span> và tự động vẽ
                marker cảnh báo động từ tọa độ GPS của bài đăng cộng đồng.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                <Tag highlight>flutter_map ^8.3.2</Tag>
                <Tag>geolocator ^14.0.2</Tag>
                <Tag>geocoding ^4.0.0</Tag>
              </div>
            </Spotlight>
          </Reveal>

          {/* Realtime SOS WebSocket + FCM */}
          <Reveal delay={0.14}>
            <Spotlight className="h-full p-6">
              <CardTitle icon={BellRing} color="text-signal">
                STOMP WebSocket &amp; FCM
              </CardTitle>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Xây dựng hệ thống phát tín hiệu <span className="text-fg">Emergency SOS</span> độ trễ thấp qua kết nối
                WebSocket bền vững (<span className="font-mono text-xs text-fg">stomp_dart_client</span>) kết hợp Firebase Cloud Messaging.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                <Tag highlight>stomp_dart_client ^3.0.1</Tag>
                <Tag>firebase_messaging</Tag>
                <Tag>flutter_secure_storage</Tag>
              </div>
            </Spotlight>
          </Reveal>

          {/* Cross-platform Web Build */}
          <Reveal delay={0.08} className="md:col-span-2">
            <Spotlight className="h-full p-6">
              <CardTitle icon={Siren}>Một Codebase: Android &amp; Flutter Web</CardTitle>
              <div className="mt-4 grid gap-6 md:grid-cols-[1fr_auto]">
                <ul className="space-y-2.5 text-sm text-muted">
                  {[
                    [
                      'Bảo mật phiên (Session)',
                      'Lưu trữ token mã hóa bằng flutter_secure_storage, tự động khôi phục phiên đăng nhập qua Dio Interceptor.',
                    ],
                    [
                      'Tương thích đa màn hình',
                      'Sử dụng flutter_screenutil ^5.9.3 giữ chuẩn tỷ lệ Figma và xử lý fallback quyền GPS/Camera trên trình duyệt.',
                    ],
                    [
                      'Triển khai thực tế',
                      'Đóng gói bản Web Release và triển khai trực tiếp lên GitHub Pages để người dùng trải nghiệm không cần cài đặt.',
                    ],
                  ].map(([t, d], i) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-0.5 font-mono text-[11px] text-dim">0{i + 1}</span>
                      <span>
                        <span className="text-fg font-medium">{t}.</span> {d}
                      </span>
                    </li>
                  ))}
                </ul>
                <pre className="overflow-x-auto rounded-lg border border-white/[0.06] bg-[#0b0e15] p-4 font-mono text-[11.5px] leading-relaxed text-muted">
                  {`$ flutter build web \\
    --release \\
    --base-href /Traffic-Posts/
`}
                  <span className="text-go">✓ 121 Dart files compiled</span>
                  {`
$ git push → GitHub Pages`}
                </pre>
              </div>
            </Spotlight>
          </Reveal>

          {/* AI + Voice */}
          <Reveal delay={0.12}>
            <Spotlight className="h-full p-6">
              <CardTitle icon={Bot}>Gemini AI &amp; Giọng nói</CardTitle>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Trợ lý ảo tích hợp <span className="text-fg">googleai_dart (Gemini)</span> hiển thị phản hồi Markdown;
                kết hợp nhận diện giọng nói giúp tài xế gửi cảnh báo an toàn khi đang di chuyển.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                <Tag highlight>googleai_dart ^3.3.0</Tag>
                <Tag>flutter_markdown_plus</Tag>
                <Tag>
                  <Mic size={10} className="mr-1 inline" />
                  speech_to_text ^7.0.0
                </Tag>
              </div>
            </Spotlight>
          </Reveal>
        </div>

        {/* Part 2: Backend & Automated Testing Case Study (QuanLyThuVien) */}
        <div className="mt-24">
          <SectionHeader
            eyebrow="Phân tích kỹ thuật · Backend & QA (Spring Boot 4 + Cypress)"
            title={librarySystem.title}
            desc={librarySystem.summary}
            right={
              <div className="flex flex-wrap gap-2">
                <a
                  href={librarySystem.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sky !h-10 text-xs"
                >
                  Live Web Demo <ArrowUpRight size={14} />
                </a>
                <a
                  href={librarySystem.beUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost !h-10 text-xs"
                >
                  <GithubIcon size={14} /> BE ({librarySystem.beCommits} commits)
                </a>
                <a
                  href={librarySystem.feUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost !h-10 text-xs"
                >
                  <GithubIcon size={14} /> FE ({librarySystem.feCommits} commits)
                </a>
              </div>
            }
          />

          <div className="grid gap-3.5 md:grid-cols-12">
            {/* Database Schema Card (14 MySQL tables) */}
            <Reveal className="md:col-span-7">
              <Spotlight className="flex h-full flex-col justify-between p-6">
                <div>
                  <CardTitle
                    icon={Database}
                    color="text-signal"
                    right={
                      <span className="font-mono text-xs text-signal">
                        MySQL · {librarySystem.tablesCount} bảng thực tế
                      </span>
                    }
                  >
                    Thiết kế Cơ sở dữ liệu Quan hệ (14 Bảng MySQL)
                  </CardTitle>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Mô hình hóa đầy đủ vòng đời tài nguyên thư viện: từ quản lý đầu sách (
                    <span className="font-mono text-xs text-fg">books</span>) tách biệt với từng bản sao vật lý (
                    <span className="font-mono text-xs text-fg">book_copies</span>) và vị trí kệ (
                    <span className="font-mono text-xs text-fg">shelves</span>), đến nghiệp vụ phiếu mượn (
                    <span className="font-mono text-xs text-fg">loans</span>,{' '}
                    <span className="font-mono text-xs text-fg">loan_details</span>), đặt trước (
                    <span className="font-mono text-xs text-fg">reservations</span>) và phạt quá hạn (
                    <span className="font-mono text-xs text-fg">fines</span>).
                  </p>

                  <div className="mt-4 rounded-xl border border-white/[0.06] bg-[#0b0e15] p-4">
                    <p className="mb-2.5 font-mono text-[10.5px] uppercase tracking-wider text-dim">
                      Danh sách 14 bảng trong schema (library_db.sql &amp; JPA Entities):
                    </p>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {librarySystem.tables.map((tbl) => (
                        <div
                          key={tbl}
                          className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-1.5 font-mono text-xs text-sky-soft"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-sky-soft" />
                          {tbl}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-4">
                  {librarySystem.stack.map((s) => (
                    <Tag key={s} highlight={s.includes('Spring') || s.includes('MySQL')}>
                      {s}
                    </Tag>
                  ))}
                </div>
              </Spotlight>
            </Reveal>

            {/* 15 REST Controllers & JWT Security */}
            <Reveal delay={0.06} className="md:col-span-5">
              <Spotlight className="flex h-full flex-col justify-between p-6">
                <div>
                  <CardTitle
                    icon={Server}
                    color="text-sky-soft"
                    right={
                      <span className="font-mono text-xs text-sky-soft">
                        {librarySystem.javaFiles} Java files
                      </span>
                    }
                  >
                    15 REST Controllers &amp; Bảo mật JWT
                  </CardTitle>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Xây dựng trên <span className="text-fg">Java 25 &amp; Spring Boot 4.0.2</span>, tài liệu hóa tự động
                    với <span className="font-mono text-xs text-fg">springdoc-openapi</span> (Swagger UI) và xác thực
                    không trạng thái bằng <span className="font-mono text-xs text-fg">jjwt</span>.
                  </p>

                  {/* Roles */}
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {librarySystem.roles.map((r) => (
                      <div
                        key={r}
                        className="rounded-lg border border-violet-400/25 bg-violet-500/[0.05] px-2.5 py-2 text-center"
                      >
                        <Lock size={12} className="mx-auto mb-1 text-violet-300" />
                        <p className="font-mono text-[10.5px] font-medium text-violet-200">{r}</p>
                      </div>
                    ))}
                  </div>

                  {/* Controllers list */}
                  <div className="mt-4">
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-dim">
                      15 REST Controllers trong src/main/java:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {librarySystem.controllers.map((ctrl) => (
                        <Tag key={ctrl}>{ctrl.replace('Controller', '')}</Tag>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 border-t border-white/[0.06] pt-3.5 font-mono text-[11px] text-dim">
                  Kiến trúc: Controller → Service → JPA Repository → MySQL
                </div>
              </Spotlight>
            </Reveal>

            {/* Automated Testing with Cypress E2E */}
            <Reveal delay={0.1} className="md:col-span-12">
              <Spotlight className="p-6">
                <CardTitle
                  icon={TestTube2}
                  color="text-go"
                  right={
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] text-emerald-300">
                      Cypress 15.16 · {librarySystem.e2eSuitesCount} Test Suites
                    </span>
                  }
                >
                  Kiểm thử Tự động E2E (Boundary Value Analysis &amp; Equivalence Partitioning)
                </CardTitle>
                <p className="mt-2.5 text-sm text-muted">
                  Áp dụng các kỹ thuật thiết kế ca kiểm thử chuẩn mực (Phân tích giá trị biên BVA &amp; Phân vùng tương đương EP)
                  được tự động hóa bằng Cypress trong repository <span className="font-mono text-xs text-fg">QuanLyThuVien_FE/cypress/e2e/</span>:
                </p>
                <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {librarySystem.cypressSuites.map((suite) => (
                    <div
                      key={suite.file}
                      className="flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.015] p-3"
                    >
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-go" />
                      <div>
                        <p className="font-mono text-xs font-semibold text-white">{suite.file}</p>
                        <p className="mt-0.5 text-xs text-muted">{suite.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Spotlight>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
