import { Brush, Gift, PenLine, ShieldCheck, Truck } from "lucide-react";
import Reveal from "@/components/Reveal";

const ITEMS = [
  { icon: Brush, title: "Hecho a mano", text: "Cada pieza pintada con detalle" },
  { icon: PenLine, title: "100% personalizado", text: "Nombre, fecha y temática" },
  { icon: ShieldCheck, title: "MDF de calidad", text: "Acabado seguro y duradero" },
  { icon: Truck, title: "Envíos a todo HN", text: "Gratis desde L 1,500" },
  { icon: Gift, title: "Listo para regalar", text: "Empaque especial incluido" },
];

export default function TrustStrip() {
  return (
    <section className="relative bg-sage/70">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-3 lg:grid-cols-5 lg:px-8">
        {ITEMS.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.05} className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-brand shadow-sm">
              <item.icon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-extrabold text-ink">{item.title}</span>
              <span className="block text-xs text-ink/60">{item.text}</span>
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
