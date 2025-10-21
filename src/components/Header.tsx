import { useState } from "react";
import { Menu, X, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AccessibilitySettings from "./AccessibilitySettings";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "AI Chef", href: "/ai-chef" },
    { name: "Dadi's Wisdom", href: "/dadi-wisdom" },
    { name: "Oil Shame", href: "/oil-shame" },
    { name: "Community", href: "#community" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-warm transition-all group-hover:scale-105">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-display font-bold gradient-hero bg-clip-text text-transparent">
              Rasoi AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <AccessibilitySettings />
            
            <Link to="/auth">
              <Button 
                variant="default" 
                className="hidden md:inline-flex shadow-warm hover:shadow-lg transition-all"
              >
                Get Started
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full mt-2 shadow-warm">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
