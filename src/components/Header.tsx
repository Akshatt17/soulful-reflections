import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { NavLink } from "./NavLink";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Articles", href: "/articles" },
  { label: "Tools", href: "/tools" },
  { label: "Micro Reflections", href: "/media" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary border-b border-primary/80">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="font-serif text-xl lg:text-2xl font-semibold text-primary-foreground">
            Soulful Reflections
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink key={item.label} to={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link to="/tools">
              <Button variant="outline" size="default" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-primary-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-primary border-t border-primary-foreground/20 animate-fade-in">
          <nav className="container-custom px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                className="block text-base py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/tools" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="hero" size="lg" className="w-full mt-4">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
