import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-cooking.jpg";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 gradient-hero opacity-15" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZjk5MzMiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6bS0yLTJ2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yem0tMi00djJoMnYtMmgtMnptMCA0djJoMnYtMmgtMnptLTItNHYyaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-block">
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Swasth Bharat Initiative
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight text-foreground">
              CookGPT
              <span className="block text-primary">
                Your AI Chef with an Indian Accent
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-foreground/80 max-w-xl font-medium">
              Experience the Magic of AI-Powered Cooking
            </p>
            
            <p className="text-base lg:text-lg text-muted-foreground max-w-xl">
              Learn, cook, and feel the joy of healthy Indian cooking with your favorite AI chef. 
              Experience the warmth of traditional wisdom meets cutting-edge technology.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="shadow-warm hover:shadow-glow text-lg px-8 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] hover:bg-right transition-all duration-500"
                onClick={() => navigate("/ai-chef")}
              >
                Try CookGPT
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 border-2 border-primary/30 hover:border-primary hover:bg-primary/5"
                onClick={() => navigate("/ai-chef")}
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-primary">50K+</p>
                <p className="text-sm text-muted-foreground">Happy Cooks</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <p className="text-3xl font-bold text-primary">5000+</p>
                <p className="text-sm text-muted-foreground">Healthy Recipes</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <p className="text-3xl font-bold text-primary">20+</p>
                <p className="text-sm text-muted-foreground">Celebrity Chefs</p>
              </div>
            </div>
          </div>
          
          <div className="relative animate-float">
            <div className="absolute inset-0 gradient-hero blur-3xl opacity-30 rounded-full" />
            <img 
              src={heroImage} 
              alt="AI Chef in Kitchen" 
              className="relative rounded-3xl shadow-warm w-full"
            />
            <div className="absolute bottom-8 left-8 bg-card/95 backdrop-blur-sm rounded-2xl p-4 shadow-card animate-pulse-slow">
              <p className="text-sm font-medium">
                <span className="text-primary">Chef Sanjeev:</span> "Arre beta, thoda oil kam karo!"
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;