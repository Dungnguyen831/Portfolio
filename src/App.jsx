import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CaseStudy from './components/CaseStudy'
import Library from './components/Library'
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
              desc="Hai case study chính (Flutter mobile và Spring Boot backend) cùng các dự án phụ. Mọi dự án đều có mã nguồn công khai để kiểm chứng."
            />
            <div className="space-y-28">
              <CaseStudy />
              <Library />
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
