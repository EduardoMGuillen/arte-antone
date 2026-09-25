export const BRAND = "Arte Antone";
export const BRAND_TAGLINE = "Creamos recuerdos que decoran tu historia";

function toOrigin(url: string) {
  try {
    return new URL(url.includes("://") ? url : `https://${url}`).origin;
  } catch {
    return url.replace(/\/$/, "");
  }
}

function resolveSiteUrl() {
  const explicit = (process.env.NEXT_PUBLIC_SITE_URL || "").trim().replace(/\/$/, "");
  const onVercel = process.env.VERCEL === "1";
  const isLocalhost = !explicit || /localhost|127\.0\.0\.1/i.test(explicit);

  if (explicit && !(onVercel && isLocalhost)) {
    return toOrigin(explicit);
  }

  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProd) {
    return toOrigin(`https://${vercelProd.replace(/^https?:\/\//, "")}`);
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    return toOrigin(`https://${vercelUrl.replace(/^https?:\/\//, "")}`);
  }

  return toOrigin(explicit || "http://localhost:3000");
}

export const SITE_URL = resolveSiteUrl();
export const NEXUS_URL = "https://www.nexusglobalsuministros.com/";
export const AUTH_COOKIE = "arteantone_session";

export const INSTAGRAM_URL = "https://www.instagram.com/arte_antone/";
export const INSTAGRAM_HANDLE = "@arte_antone";
export const CREATOR_HANDLE = "@elizabeth_villanueva_13";

export const CONTACT = {
  phoneDisplay: "+504 9000-0000",
  email: "hola@arteantone.com",
  address: "Cofradía, Cortés, Honduras",
  hours: "Lun – Sáb · 8:00 a.m. – 6:00 p.m.",
};

/** Cofradía, San Pedro Sula, Cortés */
export const MAP_COORDS = { lat: 15.4167, lng: -88.1667 };

export const PROMO_CODE = "ANTONE10";

export const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Tienda" },
  { href: "/#categorias", label: "Categorías" },
  { href: "/productos?orden=nuevos", label: "Novedades" },
  { href: "/productos?promo=1", label: "Ofertas" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/preguntas-frecuentes", label: "Preguntas" },
  { href: "/contacto", label: "Contacto" },
] as const;

export const CATEGORIES = [
  {
    id: "Tableros",
    label: "Tableros de nacimiento",
    short: "Tableros",
    tone: "bg-sand",
    image: "/images/catalogo/tablero-hola-mundo.jpg",
  },
  {
    id: "Recuerditos",
    label: "Recuerditos",
    short: "Recuerditos",
    tone: "bg-blush",
    image: "/images/catalogo/recuerditos-mi-primer-anito.jpg",
  },
  {
    id: "Nombres",
    label: "Nombres decorativos",
    short: "Nombres",
    tone: "bg-lilac",
    image: "/images/catalogo/nombre-flores-mariposas.jpg",
  },
  {
    id: "Cuadros",
    label: "Cuadros con foto",
    short: "Cuadros",
    tone: "bg-peach",
    image: "/images/catalogo/cuadro-mejor-abuelo.jpg",
  },
  {
    id: "Kits para pintar",
    label: "Kits para pintar",
    short: "Kits",
    tone: "bg-sky",
    image: "/images/catalogo/kit-dinosaurios.jpg",
  },
  {
    id: "Mascotas",
    label: "Para mascotas",
    short: "Mascotas",
    tone: "bg-sage",
    image: "/images/catalogo/placa-mascota.jpg",
  },
] as const;

export const CATEGORY_IDS = CATEGORIES.map((c) => c.id) as string[];
