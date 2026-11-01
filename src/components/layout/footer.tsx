import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig, navLinks } from "@/lib/site";
import { FacebookIcon, GithubIcon, XIcon } from "@/components/icons";
import { Logo } from "./logo";

const socials = [
  { label: "X", href: siteConfig.social.x, Icon: XIcon },
  { label: "Facebook", href: siteConfig.social.facebook, Icon: FacebookIcon },
  { label: "GitHub", href: siteConfig.social.github, Icon: GithubIcon },
];

export function Footer() {
  const publicLinks = navLinks.filter((link) => !link.private);

  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo inverted />
          <p className="mt-4 max-w-sm text-sm leading-6 opacity-80">{siteConfig.tagline}</p>
          <ul className="mt-6 flex items-center gap-3">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-footer-foreground/25 transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg font-semibold">Explore</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {publicLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="opacity-80 transition-opacity hover:opacity-100">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg font-semibold">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm opacity-80">
            <li className="flex items-center gap-3">
              <Mail className="size-4 shrink-0" />
              {siteConfig.contact.email}
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-4 shrink-0" />
              {siteConfig.contact.phone}
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-4 shrink-0" />
              {siteConfig.contact.address}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-footer-foreground/15">
        <p className="container-page py-5 text-center text-sm opacity-70">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
