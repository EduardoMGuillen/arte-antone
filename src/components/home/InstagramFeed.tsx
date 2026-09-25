import Image from "next/image";
import { Heart } from "lucide-react";
import { Instagram } from "@/components/BrandIcons";
import Reveal from "@/components/Reveal";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/constants";

const POSTS = ["post-02", "post-07", "post-11", "post-03", "post-12", "post-09"];

export default function InstagramFeed() {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col items-center text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-lg">
            <Instagram className="h-6 w-6" />
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Síguenos en <span className="font-script text-[1.2em] font-normal text-brand">Instagram</span>
          </h2>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-sm font-bold text-brand-deep hover:underline"
          >
            {INSTAGRAM_HANDLE}
          </a>
        </Reveal>

        <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-6">
          {POSTS.map((p, i) => (
            <Reveal key={p} delay={i * 0.05}>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-2xl sm:rounded-3xl"
              >
                <Image
                  src={`/images/productos/${p}.jpg`}
                  alt="Publicación de Arte Antone en Instagram"
                  fill
                  sizes="(max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-0 grid place-items-center bg-ink/0 text-white opacity-0 transition group-hover:bg-ink/40 group-hover:opacity-100">
                  <Heart className="h-6 w-6" fill="currentColor" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
