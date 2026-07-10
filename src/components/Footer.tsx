import { Instagram, Twitter, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Articles", href: "/articles" },
  { label: "Media Library", href: "/media" },
  { label: "Resources", href: "/resources" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Crisis Resources", href: "/crisis" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
];

/** A floating translucent slab — the scene (or page tint) shows through it. */
const Footer = () => {
  return (
    <footer className="px-4 pb-6 pt-10 sm:px-6 lg:px-8">
      <div className="glass-panel mx-auto max-w-6xl px-6 py-10 sm:px-10">
        <div className="grid gap-10 md:grid-cols-3 lg:gap-14">
          {/* Brand Column */}
          <div>
            <h3 className="mb-3 font-serif text-2xl font-semibold text-foreground">
              The Velvet Mind
            </h3>
            <p className="text-sm leading-relaxed text-foreground/75">
              A sanctuary for healing, reflection, and personal growth.
              Supporting your journey toward inner peace and transformation.
            </p>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="mb-3 font-serif text-base font-semibold text-foreground">
              Quick Links
            </h4>
            <nav className="grid grid-cols-2 gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm text-foreground/75 transition-colors duration-200 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Column */}
          <div>
            <h4 className="mb-3 font-serif text-base font-semibold text-foreground">
              Connect With Us
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 text-primary transition-colors duration-200 hover:bg-card/60"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Crisis Disclaimer */}
        <div className="mt-10 border-t border-foreground/10 pt-6">
          <p className="text-center text-xs leading-relaxed text-foreground/70">
            <strong className="text-foreground/90">Crisis Support:</strong> If
            you are in crisis or experiencing thoughts of self-harm, please
            reach out to a crisis helpline immediately. In the US, call or text
            988 for the Suicide and Crisis Lifeline. This website is not a
            substitute for professional mental health care.
          </p>
        </div>

        {/* Copyright */}
        <p className="mt-6 text-center text-xs text-foreground/50">
          © {new Date().getFullYear()} The Velvet Mind. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
