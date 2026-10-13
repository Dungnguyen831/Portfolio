import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Download,
  Eye,
  FileCheck,
  FileText,
  GraduationCap,
  Maximize2,
  X,
} from 'lucide-react'
import { profile, skills } from '../data'
import { Eyebrow, Reveal, SectionHeader, Spotlight } from './ui'

export default function ResumeSection() {
  const [showModal, setShowModal] = useState(false)

  return (
    <section id="resume" className="relative px-5 py-24 sm:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Curriculum Vitae"
          title="Hồ sơ năng lực & CV"
          desc="Tóm lược kinh nghiệm, định hướng kiến trúc và bộ kỹ năng sẵn sàng cho các dự án thực tế."
        />

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Cột trái: Card CV Action & Preview (span 5) */}
          <Reveal className="lg:col-span-5">
            <Spotlight className="flex h-full flex-col justify-between p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-sky-soft/30 bg-sky/[0.08] px-3 py-1 font-mono text-xs font-semibold text-sky-soft">
                    <FileText size={14} /> Resume / CV
                  </span>
                  <span className="font-mono text-xs text-dim">Updated 2026</span>
                </div>

                <h3 className="mt-5 text-2xl font-bold tracking-tight text-white">
                  CV — {profile.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Bản tóm tắt chi tiết về học vấn, kỹ năng lập trình (Flutter & Java Spring Boot),
                  các dự án đã hoàn thành và chứng chỉ chuyên môn.
                </p>

                {/* Document preview mock */}
                <div className="mt-6 rounded-2xl border border-white/[0.08] bg-[#0c1018] p-5 shadow-inner">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs">
                    <div className="flex items-center gap-2 text-muted">
                      <FileCheck size={16} className="text-go" />
                      <span className="font-mono text-fg">CV_Nguyen_Dung.pdf</span>
                    </div>
                    <span className="font-mono text-[11px] text-dim">PDF · 112 KB</span>
                  </div>

                  <div className="mt-4 space-y-2.5">
                    <div className="h-2.5 w-3/4 rounded bg-white/[0.08]" />
                    <div className="h-2 w-full rounded bg-white/[0.04]" />
                    <div className="h-2 w-5/6 rounded bg-white/[0.04]" />
                    <div className="h-2 w-2/3 rounded bg-white/[0.04]" />
                  </div>

                  <div className="mt-5 flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs text-muted">
                    <span>Trạng thái: Đầy đủ thông tin</span>
                    <span className="text-emerald-400 font-medium">✓ Sẵn sàng phỏng vấn</span>
                  </div>
                </div>
              </div>

              {/* Nhóm nút hành động chính */}
              <div className="mt-8 space-y-3">
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <button
                    id="btn-view-cv"
                    onClick={() => setShowModal(true)}
                    className="btn btn-primary justify-center !h-12 !text-[14px]"
                  >
                    <Eye size={16} /> Xem CV trực tiếp
                  </button>

                  <a
                    id="btn-download-cv"
                    href={profile.cv}
                    download="CV_Nguyen_Dung.pdf"
                    className="btn btn-sky justify-center !h-12 !text-[14px]"
                  >
                    <Download size={16} /> Tải CV (PDF)
                  </a>
                </div>

                <a
                  href={profile.cv}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-1 text-center text-xs text-dim hover:text-sky-soft transition-colors"
                >
                  Mở trực tiếp trên tab mới <ArrowUpRight size={13} />
                </a>
              </div>
            </Spotlight>
          </Reveal>

          {/* Cột phải: Tổng quan năng lực & Kỹ năng (span 7) */}
          <Reveal delay={0.08} className="lg:col-span-7">
            <Spotlight className="flex h-full flex-col justify-between p-6 sm:p-8">
              <div>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-signal">
                  <Briefcase size={13} /> Core Competencies
                </span>
                <h4 className="mt-2 text-xl font-bold tracking-tight text-white">
                  Năng lực cốt lõi & Thế mạnh
                </h4>

                <div className="mt-5 space-y-3">
                  {[
                    {
                      title: 'Mobile Architecture (Flutter & Dart)',
                      desc: 'Xây dựng UI responsive theo Figma, xử lý luồng State Management chặt chẽ với BLoC/GetX, tối ưu bộ nhớ và giữ FPS ổn định.',
                    },
                    {
                      title: 'Backend Integration (Java Spring Boot & REST)',
                      desc: 'Thiết kế REST API chuẩn RESTful, tương tác cơ sở dữ liệu qua JPA/Hibernate, bảo mật JWT và xử lý ngoại lệ bài bản.',
                    },
                    {
                      title: 'Real-time & Location Services',
                      desc: 'Tích hợp bản đồ OpenStreetMap (flutter_map), WebSocket / FCM nhận thông báo sự cố tức thời, định vị GPS tiết kiệm pin.',
                    },
                    {
                      title: 'Tư duy sản phẩm & Clean Code',
                      desc: 'Áp dụng nguyên lý SOLID, phân tách UI - Domain - Data rõ ràng, dễ viết Unit Test và dễ dàng chuyển giao bảo trì.',
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.015] p-3.5"
                    >
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-go" />
                      <div>
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills summary tags */}
              <div className="mt-6 border-t border-white/[0.06] pt-5">
                <p className="mb-2.5 font-mono text-xs uppercase tracking-wider text-dim">
                  Từ vựng công nghệ chính
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Flutter',
                    'Dart',
                    'Java',
                    'Spring Boot',
                    'BLoC',
                    'GetX',
                    'Clean Architecture',
                    'REST API',
                    'OpenStreetMap',
                    'Firebase FCM',
                    'Git',
                    'Figma',
                  ].map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Spotlight>
          </Reveal>
        </div>
      </div>

      {/* Modal xem trước CV */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c1018] shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-3.5 bg-[#0a0d14]">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-sky-soft" />
                  <span className="font-medium text-sm text-white">Xem trước CV: {profile.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={profile.cv}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-muted transition-colors hover:border-white/20 hover:text-white"
                    title="Mở toàn màn hình ở tab mới"
                  >
                    <Maximize2 size={14} />
                  </a>
                  <a
                    href={profile.cv}
                    download="CV_Nguyen_Dung.pdf"
                    className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-muted transition-colors hover:border-white/20 hover:text-white"
                    title="Tải về file PDF"
                  >
                    <Download size={14} />
                  </a>
                  <button
                    onClick={() => setShowModal(false)}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-muted transition-colors hover:border-white/20 hover:text-white"
                    title="Đóng"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* PDF Viewer Body */}
              <div className="flex-1 bg-[#1a1f2c]">
                <iframe
                  src={profile.cv}
                  title="CV Nguyen Dung"
                  className="h-full w-full border-0"
                />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-white/[0.08] px-5 py-3 bg-[#0a0d14] text-xs text-muted">
                <span>Nếu trình duyệt của bạn không hỗ trợ xem trực tiếp, hãy bấm tải về.</span>
                <a
                  href={profile.cv}
                  download="CV_Nguyen_Dung.pdf"
                  className="btn btn-sky !h-8 !px-3 text-xs"
                >
                  <Download size={13} /> Tải bản PDF
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
