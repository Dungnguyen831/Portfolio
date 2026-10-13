import { skills } from '../data'
import { Reveal, SectionHeader } from './ui'

export default function Skills() {
  return (
    <section id="skills" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Kỹ năng"
          title="Bộ công cụ hằng ngày"
          desc="Từ wireframe trên Figma đến bản build chạy trên thiết bị thật."
        />
        <div className="overflow-hidden rounded-2xl border border-white/[0.07]">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.05} y={10}>
              <div className={`group grid gap-3 px-5 py-4 transition-colors hover:bg-white/[0.02] sm:grid-cols-[200px_1fr] sm:items-center sm:px-6 ${i ? 'border-t border-white/[0.06]' : ''}`}>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim transition-colors group-hover:text-sky-soft">{g.group}</p>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span key={s} className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-[13px] text-fg/90 transition-colors hover:border-white/20 hover:text-white">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
