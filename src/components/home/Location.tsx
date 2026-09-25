import { Clock, MapPin, Navigation, Truck } from "lucide-react";
import { Instagram } from "@/components/BrandIcons";
import Reveal, { SectionTitle } from "@/components/Reveal";
import { CONTACT, INSTAGRAM_HANDLE, INSTAGRAM_URL, MAP_COORDS } from "@/lib/constants";

export default function Location() {
  const query = encodeURIComponent("Cofradía, Cortés, Honduras");
  const mapSrc = `https://maps.google.com/maps?q=${query}&ll=${MAP_COORDS.lat},${MAP_COORDS.lng}&z=14&output=embed`;
  const directions = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <section id="ubicacion" className="scroll-mt-28 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Dónde estamos"
          title="Hecho con amor en"
          accent="Cofradía"
          subtitle="Nuestro taller está en Cofradía, Cortés. Coordinamos entregas en la zona y enviamos a cualquier ciudad del país."
        />

        <Reveal className="mt-12 grid overflow-hidden rounded-[2.5rem] border border-line bg-white card-shadow lg:grid-cols-[1fr_1.6fr]">
          <div className="flex flex-col justify-between gap-8 p-8 sm:p-10">
            <div className="space-y-6">
              {[
                { icon: MapPin, title: "Ubicación", text: CONTACT.address },
                { icon: Clock, title: "Horario de atención", text: CONTACT.hours },
                { icon: Truck, title: "Entregas", text: "Personales en Cofradía y San Pedro Sula · Encomienda a todo el país" },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-soft text-brand">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold text-ink">{item.title}</p>
                    <p className="mt-0.5 text-sm text-muted">{item.text}</p>
                  </div>
                </div>
              ))}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-soft text-brand">
                  <Instagram className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-ink">Escríbenos</p>
                  <p className="mt-0.5 text-sm text-brand-deep hover:underline">{INSTAGRAM_HANDLE}</p>
                </div>
              </a>
            </div>
            <a href={directions} target="_blank" rel="noopener noreferrer" className="btn-primary self-start">
              <Navigation className="h-4 w-4" /> Cómo llegar
            </a>
          </div>
          <div className="relative min-h-[360px] bg-soft lg:min-h-[480px]">
            <iframe
              title="Mapa de Cofradía, Cortés"
              src={mapSrc}
              className="absolute inset-0 h-full w-full border-0 [filter:sepia(0.25)_saturate(0.9)]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
