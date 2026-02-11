import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Palette,
  Truck,
  Shield,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  categorias: [
    { name: "Realismo", href: "/products?category=realismo" },
    { name: "Abstracto", href: "/products?category=abstracto" },
    { name: "Impresionismo", href: "/products?category=impresionismo" },
    { name: "Surrealismo", href: "/products?category=surrealismo" },
    { name: "Minimalismo", href: "/products?category=minimalismo" },
    { name: "Paisajes", href: "/products?category=paisajes" },
    { name: "Retratos", href: "/products?category=retratos" },
  ],
  artistas: [
    { name: "Pablo Picasso", href: "/products?artist=pablo-picasso" },
    { name: "Vincent van Gogh", href: "/products?artist=vincent-van-gogh" },
    { name: "Leonardo da Vinci", href: "/products?artist=leonardo-da-vinci" },
    { name: "Claude Monet", href: "/products?artist=claude-monet" },
    { name: "Salvador Dalí", href: "/products?artist=salvador-dali" },
    { name: "Frida Kahlo", href: "/products?artist=frida-kahlo" },
  ],
  galeria: [
    { name: "Sobre Nosotros", href: "/about" },
    { name: "Nuestra Colección", href: "/products" },
    { name: "Artistas", href: "/artists" },
    { name: "Exposiciones", href: "/exhibitions" },
    { name: "Blog de Arte", href: "/blog" },
  ],
  ayuda: [
    { name: "Guía de Compra", href: "/help" },
    { name: "Envíos y Entregas", href: "/shipping" },
    { name: "Devoluciones", href: "/returns" },
    { name: "Certificado de Autenticidad", href: "/authenticity" },
    { name: "Preguntas Frecuentes", href: "/faq" },
  ],
  legal: [
    { name: "Términos y Condiciones", href: "/terms" },
    { name: "Política de Privacidad", href: "/privacy" },
    { name: "Cookies", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Palette className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Galería de Arte</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Tu fuente de confianza para cuadros de artistas masterpieces.
              Descubre obras de maestros del arte y lleva la belleza a tu hogar.
            </p>
            <div className="mt-4 flex gap-3">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold">Cuadros por Estilo</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.categorias.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Artists */}
          <div>
            <h3 className="font-semibold">Artistas Famosos</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.artistas.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Gallery */}
          <div>
            <h3 className="font-semibold">Galería</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.galeria.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help & Contact */}
          <div>
            <h3 className="font-semibold">Atención al Cliente</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.ayuda.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="flex items-start gap-2 text-sm text-muted-foreground pt-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Av. Arte 456, Ciudad Creativa</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@galeriadearte.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
            <Truck className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm font-medium">Envío Seguro</p>
              <p className="text-xs text-muted-foreground">A todo el mundo</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm font-medium">Certificado de Autenticidad</p>
              <p className="text-xs text-muted-foreground">
                Garantía de originalidad
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
            <Palette className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm font-medium">Arte de Calidad</p>
              <p className="text-xs text-muted-foreground">
                Obras maestras exclusivas
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Galería de Arte. Todos los
            derechos reservados.
          </p>
          <div className="flex gap-4">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
