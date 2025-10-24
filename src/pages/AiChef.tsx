import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Mic, Video, MessageCircle, Upload, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import FloatingChat from "@/components/FloatingChat";

const AiChef = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [chefAdvice, setChefAdvice] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const openChat = () => {
    setIsChatOpen(true);
  };

  const openVideoDialog = () => {
    setIsVideoDialogOpen(true);
    setUploadedImage(null);
    setChefAdvice(null);
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result as string;
      setUploadedImage(base64Image);
      
      setIsAnalyzing(true);
      try {
        const { data, error } = await supabase.functions.invoke('analyze-cooking-image', {
          body: { imageData: base64Image }
        });

        if (error) throw error;

        if (data?.advice) {
          setChefAdvice(data.advice);
        } else {
          throw new Error('No advice received');
        }
      } catch (error: any) {
        console.error('Error analyzing image:', error);
        toast({
          title: "Analysis failed",
          description: error.message || "Failed to analyze the image. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsAnalyzing(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-xl font-display font-bold">AI Chef Avatar</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-display font-bold">
              Your Personal
              <span className="block gradient-hero bg-clip-text text-transparent">
                Celebrity Chef Avatar
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get real-time voice and video feedback as you cook. Your AI chef sees what you're making 
              and guides you with friendly advice like "Arre, thoda oil kam karo beta!"
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card 
              className="border-2 hover:border-primary/50 transition-all cursor-pointer" 
              onClick={openChat}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Mic className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Voice Interaction</CardTitle>
                <CardDescription>
                  Ask questions and get instant answers in Hindi or English
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="border-2 hover:border-secondary/50 transition-all cursor-pointer"
              onClick={openVideoDialog}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <Video className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>Live Video Feedback</CardTitle>
                <CardDescription>
                  Show your dish and get real-time tips from your AI chef
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Regional Languages</CardTitle>
                <CardDescription>
                  Get guidance in your preferred language with cultural context
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle>Coming Soon</CardTitle>
                <CardDescription>
                  Emotional expressions, gestures, and personalized chef personalities
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card className="shadow-warm">
            <CardContent className="p-12 text-center space-y-6">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto animate-pulse-slow">
                <MessageCircle className="w-10 h-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-display font-bold">Chat with Your AI Chef</h3>
                <p className="text-muted-foreground">
                  Ask questions like "How to reduce oil consumption?" and get expert advice!
                </p>
              </div>
              <Button size="lg" onClick={openChat} className="shadow-warm">
                Start Chat
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      
      {isChatOpen && <FloatingChat initiallyOpen={true} />}

      <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload Your Dish Photo</DialogTitle>
            <DialogDescription>
              Share a photo of your dish and get expert advice from your AI chef
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            {!uploadedImage ? (
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-32"
                variant="outline"
              >
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8" />
                  <span>Click to upload a photo</span>
                </div>
              </Button>
            ) : (
              <div className="space-y-4">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded dish" 
                  className="w-full rounded-lg"
                />
                
                {isAnalyzing ? (
                  <div className="flex items-center justify-center gap-2 p-4">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing your dish...</span>
                  </div>
                ) : chefAdvice ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Chef's Advice</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-wrap">{chefAdvice}</p>
                    </CardContent>
                  </Card>
                ) : null}
                
                <Button 
                  onClick={() => {
                    setUploadedImage(null);
                    setChefAdvice(null);
                    fileInputRef.current?.click();
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Upload Another Photo
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AiChef;