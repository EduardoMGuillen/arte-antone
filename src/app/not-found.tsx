import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Cloud } from "@/components/Decor";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center bg-cream px-4 py-28 text-center">
        <Cloud face className="h-20 w-36 animate-floaty" />
        <p className="mt-6 font-display text-6xl font-semibold text-brand">404</p>
        <h1 className="mt-2 font-display text-3xl text-ink">No encontramos esta página</h1>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Puede que el producto ya no esté disponible. ¡Descubre otros diseños en la tienda!
        </p>
        <Link href="/productos" className="btn-primary mt-8">
          Ir a la tienda
        </Link>
      </main>
      <Footer />
    </>
  );
}
