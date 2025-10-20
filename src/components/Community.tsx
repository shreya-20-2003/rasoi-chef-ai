import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Star, TrendingUp } from "lucide-react";

const topChefs = [
  { name: "Priya Sharma", location: "Mumbai", dishes: 234, rank: 1 },
  { name: "Rajesh Kumar", location: "Delhi", dishes: 198, rank: 2 },
  { name: "Anjali Patel", location: "Gujarat", dishes: 176, rank: 3 }
];

const Community = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-display font-bold">
            Join the
            <span className="block gradient-hero bg-clip-text text-transparent">
              Healthy Cooking Revolution
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Thousands of home cooks are already transforming their kitchens
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <Card className="border-2 hover:border-primary/50 transition-all duration-300">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-bold">MDM Integration</h3>
              <p className="text-muted-foreground">
                Bringing healthy cooking education to 12 crore school children across India
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-2 hover:border-secondary/50 transition-all duration-300">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Star className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-display font-bold">Restaurant Partners</h3>
              <p className="text-muted-foreground">
                Shadow menu programs helping restaurants offer healthier alternatives
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-2 hover:border-accent/50 transition-all duration-300">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-display font-bold">Growing Community</h3>
              <p className="text-muted-foreground">
                50,000+ active users cooking healthier meals every day
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="shadow-card">
          <CardContent className="p-8">
            <h3 className="text-2xl font-display font-bold mb-6 text-center">
              Top Healthy Chefs This Month 🏆
            </h3>
            <div className="space-y-4">
              {topChefs.map((chef, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                      chef.rank === 1 ? 'bg-primary text-primary-foreground' :
                      chef.rank === 2 ? 'bg-secondary text-secondary-foreground' :
                      'bg-accent text-accent-foreground'
                    }`}>
                      {chef.rank}
                    </div>
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {chef.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{chef.name}</p>
                      <p className="text-sm text-muted-foreground">{chef.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary text-lg">{chef.dishes}</p>
                    <p className="text-xs text-muted-foreground">Healthy Dishes</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Community;