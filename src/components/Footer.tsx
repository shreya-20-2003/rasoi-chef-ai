import { Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-t-2 border-primary/20">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZjk5MzMiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6bS0yLTJ2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yem0tMi00djJoMnYtMmgtMnptMCA0djJoMnYtMmgtMnptLTItNHYyaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold gradient-hero bg-clip-text text-transparent">
              Rasoi AI
            </h3>
            <p className="text-sm text-muted-foreground">
              Bringing celebrity chefs to your kitchen through AI. Cook healthy, live happy.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center shadow-sm">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Swasth Bharat Initiative
              </span>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer transition-colors">AI Chef Avatar</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Voice Guidance</li>
              <li className="hover:text-primary cursor-pointer transition-colors">AR Cooking</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Recipe Library</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Community</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Our Chefs</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Partners</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Press Kit</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                hello@rasoiai.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Mumbai, India
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Rasoi AI. Made with <Heart className="w-4 h-4 inline text-primary" /> for Swasth Bharat
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;