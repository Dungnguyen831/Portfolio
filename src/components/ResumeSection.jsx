import { useState } from 'react'
import {
  ArrowUpRight,
  Award,
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
import { librarySystem, profile, skills, trafficHub } from '../data'
import { ModalDialog, Reveal, SectionHeader, Spotlight } from './ui'

const competencies = [
  {
    title: 'Phát triển Mobile đa nền tảng (Flutter & Dart)',
    desc: `Xây dựng giao diện chuẩn Figma với flutter_screenutil, quản lý trạng thái bằng GetX (${trafficHub.dartFiles} file Dart ở TrafficHub) và Riverpod (MusicAPP), tối ưu infinite-scroll & cached_network_image.`,
  },
  {
    title: 'Phát triển Backend & Thiết kế CSDL (Java Spring Boot & MySQL)',
    desc: `Xây dựng ${librarySystem.controllersCount} REST Controllers trên Spring Boot 4 (Java 25), thiết kế ${librarySystem.tablesCount} bảng MySQL chuẩn hóa, bảo mật JWT (jjwt) 3 tầng phân quyền và tài liệu hóa OpenAPI/Swagger.`,
  },
  {
    title: 'Hệ thống Thời gian thực, Bản đồ & AI',
    desc: 'Tích hợp bản đồ OpenStreetMap (flutter_map), luồng phát tín hiệu cứu hộ SOS qua STOMP WebSocket & Firebase FCM, cùng trợ lý ảo Gemini API kết hợp nhận diện giọng nói.',
  },
  {
    title: 'Kiểm thử Tự động & Quy trình Kỹ thuật (Cypress E2E & Git)',
    desc: `Thiết kế ${librarySystem.e2eSuitesCount} bộ kịch bản kiểm thử tự động Cypress áp dụng Phân tích giá trị biên (BVA) & Phân vùng tương đương (EP); quản lý mã nguồn qua Git và theo dõi tiến độ Sprint bằng ClickUp.`,
  },
]

export default function ResumeSection() {
  const [showModal, setShowModal] = useState(false)

  return (
    <section id="resume" className="relative px-5 py-24 sm:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Curriculum Vitae & Skills"
          title="Hồ sơ năng lực, Học vấn & Bộ kỹ năng"
          desc="Thông tin trích xuất chính xác từ CV chính thức: học vấn tại ĐH Công nghệ GTVT (UTT), giải thưởng năm 2026 và bộ công cụ kỹ thuật hằng ngày."
        />

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Cột trái: Card CV Action, Học vấn & Giải thưởng (span 5) */}
          <Reveal className="lg:col-span-5">
            <Spotlight className="flex h-full flex-col justify-between p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-sky-soft/30 bg-sky/[0.08] px-3 py-1 font-mono text-xs font-semibold text-sky-soft">
                    <FileText size={14} /> Official Resume / CV
                  </span>
                  <span className="font-mono text-xs text-dim">Cập nhật 2026</span>
                </div>

                <h3 className="mt-5 text-2xl font-bold tracking-tight text-white">
                  CV — {profile.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Bản CV tiếng Anh chuẩn ATS trình bày chi tiết mục tiêu nghề nghiệp, dự án kỹ thuật,
                  học vấn và giải thưởng tại Trường Đại học Công nghệ Giao thông Vận tải.
                </p>

                {/* Education & Award Summary inside CV card */}
                <div className="mt-5 space-y-3 rounded-2xl border border-white/[0.08] bg-[#0c1018] p-4">
                  <div className="flex items-start gap-3">
                    <GraduationCap size={18} className="mt-0.5 shrink-0 text-sky-soft" />
                    <div>
                      <p className="text-xs font-semibold text-white">{profile.education.school}</p>
                      <p className="mt-0.5 text-xs text-muted">{profile.education.degree}</p>
                      <p className="mt-1 font-mono text-[11px] text-sky-soft">
                        GPA hiện tại: {profile.education.gpa} · {profile.education.period}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/[0.06] pt-3">
                    <div className="flex items-start gap-3">
                      <Award size={18} className="mt-0.5 shrink-0 text-amber-300" />
                      <div>
                        <p className="text-xs font-semibold text-amber-200">
                          {profile.award.title}
                        </p>
                        <p className="mt-0.5 text-xs text-muted">{profile.award.project}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Document file info */}
                <div className="mt-4 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-xs">
                  <div className="flex items-center gap-2 text-muted">
                    <FileCheck size={16} className="text-go" />
                    <span className="font-mono text-fg">CV_Nguyen_Dung.pdf</span>
                  </div>
                  <span className="font-mono text-[11px] text-dim">
                    PDF · {profile.cvSizeKb} KB
                  </span>
                </div>
              </div>

              {/* Nhóm nút hành động chính */}
              <div className="mt-7 space-y-3">
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <button
                    id="btn-view-cv"
                    type="button"
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
                    <Download size={16} /> Tải CV ({profile.cvSizeKb} KB)
                  </a>
                </div>

                <a
                  href={profile.cv}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-1 text-center text-xs text-dim transition-colors hover:text-sky-soft"
                >
                  Mở file PDF trên tab mới <ArrowUpRight size={13} />
                </a>
              </div>
            </Spotlight>
          </Reveal>

          {/* Cột phải: Tổng quan năng lực cốt lõi (span 7) */}
          <Reveal delay={0.08} className="lg:col-span-7">
            <Spotlight className="flex h-full flex-col justify-between p-6 sm:p-8">
              <div>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-signal">
                  <Briefcase size={13} /> Core Competencies
                </span>
                <h4 className="mt-2 text-xl font-bold tracking-tight text-white">
                  Năng lực kỹ thuật đã kiểm chứng qua dự án
                </h4>

                <div className="mt-5 space-y-3">
                  {competencies.map((item) => (
                    <div
                      key={item.title}
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

              <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-4 text-xs text-muted">
                <span>Ngôn ngữ làm việc: Tiếng Việt (Bản ngữ) · Tiếng Anh (Đọc hiểu tài liệu kỹ thuật)</span>
                <span className="font-mono text-emerald-400">✓ Sẵn sàng phỏng vấn</span>
              </div>
            </Spotlight>
          </Reveal>
        </div>

        {/* Bảng phân nhóm Kỹ năng & Công cụ (Gộp từ Skills section để tránh trùng lặp) */}
        <div id="skills" className="mt-8 overflow-hidden rounded-2xl border border-white/[0.07]">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.04} y={10}>
              <div
                className={`group grid gap-3 px-5 py-4 transition-colors hover:bg-white/[0.02] sm:grid-cols-[230px_1fr] sm:items-center sm:px-6 ${
                  i ? 'border-t border-white/[0.06]' : ''
                }`}
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim transition-colors group-hover:text-sky-soft">
                  {g.group}
                </p>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-[13px] text-fg/90 transition-colors hover:border-white/20 hover:text-white"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Native <dialog> Modal xem trước CV */}
      <ModalDialog
        open={showModal}
        onClose={() => setShowModal(false)}
        titleId="cv-modal-title"
        className="h-[90vh] w-[95vw] max-w-4xl"
      >
        {showModal && (
          <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c1018] shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#0a0d14] px-5 py-3.5">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-sky-soft" />
                <h2 id="cv-modal-title" className="text-sm font-medium text-white">
                  Xem trước CV: {profile.name} ({profile.cvSizeKb} KB)
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={profile.cv}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-muted transition-colors hover:border-white/20 hover:text-white"
                  title="Mở toàn màn hình ở tab mới"
                  aria-label="Mở toàn màn hình ở tab mới"
                >
                  <Maximize2 size={14} />
                </a>
                <a
                  href={profile.cv}
                  download="CV_Nguyen_Dung.pdf"
                  className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-muted transition-colors hover:border-white/20 hover:text-white"
                  title="Tải về file PDF"
                  aria-label="Tải về file PDF"
                >
                  <Download size={14} />
                </a>
                <button
                  type="button"
                  autofocus
                  onClick={() => setShowModal(false)}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-muted transition-colors hover:border-white/20 hover:text-white"
                  title="Đóng (Esc)"
                  aria-label="Đóng cửa sổ xem CV"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* PDF Viewer Body */}
            <div className="flex-1 bg-[#1a1f2c]">
              <iframe
                src={profile.cv}
                title="CV Nguyen Anh Dung"
                className="h-full w-full border-0"
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-white/[0.08] bg-[#0a0d14] px-5 py-3 text-xs text-muted">
              <span>Nhấn phím Esc hoặc bấm ra ngoài vùng tối để đóng.</span>
              <a
                href={profile.cv}
                download="CV_Nguyen_Dung.pdf"
                className="btn btn-sky !h-8 !px-3 text-xs"
              >
                <Download size={13} /> Tải bản PDF ({profile.cvSizeKb} KB)
              </a>
            </div>
          </div>
        )}
      </ModalDialog>
    </section>
  )
}
