import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Video, Sparkles } from "lucide-react";

const Demo = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                See It In Action
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-display font-bold leading-tight">
              Experience the Magic of
              <span className="block gradient-hero bg-clip-text text-transparent">
                AI-Powered Cooking
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Watch how Rasoi AI transforms your cooking experience with real-time guidance, 
              personalized feedback, and traditional wisdom at your fingertips.
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mic className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Voice-Activated Assistance</h4>
                  <p className="text-muted-foreground">Just ask your chef and get instant answers in Hindi or English</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Video className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Live Video Feedback</h4>
                  <p className="text-muted-foreground">Show your dish and get real-time tips to improve</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Smart Recipe Adaptation</h4>
                  <p className="text-muted-foreground">Automatically adjust recipes for dietary preferences</p>
                </div>
              </div>
            </div>
            
            <Button size="lg" className="shadow-warm">
              Watch Full Demo
            </Button>
          </div>
          
          <Card className="p-8 shadow-card bg-gradient-to-br from-card to-muted/20">
            <div className="aspect-video bg-muted/50 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 gradient-hero opacity-10" />
              <div className="relative z-10 text-center space-y-4">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto animate-pulse-slow">
                  <Video className="w-10 h-10 text-primary" />
                </div>
                <p className="font-display text-2xl font-bold">Interactive Demo</p>
                <p className="text-muted-foreground">Click to experience Rasoi AI</p>
              </div>
              
              <div className="absolute bottom-4 left-4 right-4 bg-card/95 backdrop-blur-sm rounded-xl p-3 animate-fade-in">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <p className="text-sm font-medium">Chef Vikas is speaking...</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">4.9</p>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-secondary">98%</p>
                <p className="text-xs text-muted-foreground">Success Rate</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-accent">24/7</p>
                <p className="text-xs text-muted-foreground">Available</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Demo;