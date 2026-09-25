import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal, { SectionTitle } from "@/components/Reveal";
import { Branch, Sparkle } from "@/components/Decor";
import { CATEGORIES } from "@/lib/constants";

export default function Categories({ counts }: { counts: Record<string, number> }) {
  return (
    <section id="categorias" className="relative scroll-mt-28 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3">
          <Branch className="h-9 w-9 -scale-x-100" />
          <SectionTitle eyebrow="Explora" title="Compra por" accent="categoría" />
          <Sparkle className="h-6 w-6" />
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.06}>
              <Link
                href={`/productos?categoria=${encodeURIComponent(c.id)}`}
                className={`group flex h-full flex-col items-center rounded-[1.75rem] ${c.tone} px-3 pb-5 pt-4 text-center transition duration-300 hover:-translate-y-1.5 hover:shadow-xl`}
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-[1.4rem] border-4 border-white/80 shadow-sm">
                  <Image
                    src={c.image}
                    alt={c.label}
                    fill
                    sizes="(max-width: 640px) 45vw, 16vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
                <p className="mt-4 font-display text-[1.05rem] font-semibold leading-tight text-ink">
                  {c.label}
                </p>
                <p className="mt-1 text-[11px] text-muted">
                  {counts[c.id] ?? 0} producto{counts[c.id] === 1 ? "" : "s"}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand-deep">
                  Ver más <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
