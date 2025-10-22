import { MessageCircle, Sparkles, Camera, Globe, Trophy, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: MessageCircle,
    title: "Conversational AI Chef",
    description: "Get real-time voice and video feedback from your AI chef. 'Arre, thoda oil kam karo beta!'",
    color: "text-primary",
    link: "/ai-chef"
  },
  {
    icon: Sparkles,
    title: "Dadi's Wisdom",
    description: "Access traditional, regional healthy recipes passed down through generations. Authentic taste, healthier ingredients.",
    color: "text-secondary",
    link: "/dadi-wisdom"
  },
  {
    icon: Camera,
    title: "Oil Shame, Recipe Fame",
    description: "Upload your dish and watch as AI recreates it with healthier alternatives. Same taste, better health.",
    color: "text-accent",
    link: "/oil-shame"
  }
];

const Features = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 gradient-feature" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-display font-bold">
            Everything You Need to Cook
            <span className="block gradient-hero bg-clip-text text-transparent">
              Healthy & Happy
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Powered by AI, inspired by tradition, designed for your wellness
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="border-2 border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-warm hover:-translate-y-2 group cursor-pointer bg-gradient-to-br from-card via-card to-primary/5"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => feature.link && navigate(feature.link)}
            >
              <CardContent className="p-8 space-y-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 group-hover:shadow-glow transition-all duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-display font-bold">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;