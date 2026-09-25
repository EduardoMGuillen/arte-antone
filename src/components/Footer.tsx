import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Facebook, Instagram, TikTok } from "@/components/BrandIcons";
import { Wordmark } from "@/components/Header";
import {
  BRAND,
  BRAND_TAGLINE,
  CATEGORIES,
  CONTACT,
  CREATOR_HANDLE,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  NEXUS_URL,
} from "@/lib/constants";

const PAYMENTS = ["VISA", "Mastercard", "Transferencia", "Tigo Money", "Efectivo"];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-auto overflow-hidden bg-ink text-white/80">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-3" aria-label={BRAND}>
            <Image src="/logo.png" alt={BRAND} width={120} height={120} className="h-16 w-auto" />
            <Wordmark light />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
            {BRAND_TAGLINE}. Tableros de nacimiento, nombres decorativos y recuerditos en MDF,
            diseñados y pintados a mano en Cofradía, Cortés.
          </p>
          <p className="mt-3 text-xs text-white/45">Creado con amor por {CREATOR_HANDLE}</p>
          <div className="mt-6 flex gap-2">
            {[
              { href: INSTAGRAM_URL, label: "Instagram", icon: <Instagram className="h-4 w-4" /> },
              { href: "#", label: "Facebook", icon: <Facebook className="h-4 w-4" /> },
              { href: "#", label: "TikTok", icon: <TikTok className="h-4 w-4" /> },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-brand"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-display text-lg font-semibold text-white">Tienda</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/productos" className="hover:text-sand">Todos los productos</Link>
            </li>
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link href={`/productos?categoria=${encodeURIComponent(c.id)}`} className="hover:text-sand">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-lg font-semibold text-white">Ayuda</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/#como-funciona" className="hover:text-sand">¿Cómo hago mi pedido?</Link></li>
            <li><Link href="/preguntas-frecuentes" className="hover:text-sand">Preguntas frecuentes</Link></li>
            <li><Link href="/preguntas-frecuentes" className="hover:text-sand">Envíos y entregas</Link></li>
            <li><Link href="/contacto" className="hover:text-sand">Pedidos para eventos</Link></li>
            <li><Link href="/#nosotros" className="hover:text-sand">Nuestra historia</Link></li>
            <li><Link href="/contacto" className="hover:text-sand">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-display text-lg font-semibold text-white">Contáctanos</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {CONTACT.address}
            </li>
            <li className="flex gap-3">
              <Instagram className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-sand">
                {INSTAGRAM_HANDLE}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {CONTACT.phoneDisplay}
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {CONTACT.email}
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {CONTACT.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-white/50 sm:px-6 md:flex-row lg:px-8">
          <p>
            © {year} {BRAND}. Todos los derechos reservados. ·{" "}
            <a href={NEXUS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-sand">
              Powered by Nexus Global
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {PAYMENTS.map((p) => (
              <span key={p} className="rounded-md bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/75">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
