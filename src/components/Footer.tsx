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

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand Column */}
          <div>
            <h3 className="font-serif text-2xl font-semibold mb-4">
              Soulful Reflections
            </h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              A sanctuary for healing, reflection, and personal growth. 
              Supporting your journey toward inner peace and transformation.
            </p>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Column */}
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Crisis Disclaimer */}
      <div className="bg-primary-foreground/10 border-t border-primary-foreground/20">
        <div className="container-custom px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-primary-foreground/5 rounded-xl p-4 text-center">
            <p className="text-sm text-primary-foreground/80">
              <strong>Crisis Support:</strong> If you are in crisis or experiencing thoughts of self-harm, 
              please reach out to a crisis helpline immediately. In the US, call or text 988 for the 
              Suicide and Crisis Lifeline. This website is not a substitute for professional mental health care.
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary-foreground/20">
        <div className="container-custom px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Soulful Reflections. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
