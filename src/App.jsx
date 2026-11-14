import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CaseStudy from './components/CaseStudy'
import Archive from './components/Archive'
import Profile from './components/Profile'
import Contact from './components/Contact'
import { SectionHeader } from './components/ui'

export default function App() {
  return (
    <>
      <div id="scroll-progress" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <section id="work" className="px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              index="01 — Dự án chọn lọc"
              title="Sản phẩm thực tế, chạy được ngay trên trình duyệt."
              desc="Case study trọng tâm về Flutter Mobile (TrafficHub) với bản demo tương tác trực tiếp cùng các dự án cá nhân khác. Mọi dự án đều có mã nguồn công khai để kiểm chứng."
            />
            <div className="space-y-28">
              <CaseStudy />
              <Archive />
            </div>
          </div>
        </section>
        <Profile />
        <Contact />
      </main>
    </>
  )
}
