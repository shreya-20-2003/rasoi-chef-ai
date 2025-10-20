import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, Image as ImageIcon, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

const OilShame = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile || !user) return;

    setLoading(true);

    try {
      // This is a simplified version - actual implementation would:
      // 1. Upload image to storage
      // 2. Call AI to generate healthier version
      // 3. Save to database

      toast({
        title: "Coming Soon!",
        description: "AI image recreation feature is being integrated. Your dish will be transformed into a healthier version soon!",
      });

      // Demo: Insert placeholder entry
      const { error } = await supabase.from("user_dishes").insert({
        user_id: user.id,
        title,
        description,
        original_image_url: "placeholder",
        healthier_image_url: null,
        status: "pending",
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your dish has been submitted for healthy recreation.",
      });

      // Reset form
      setTitle("");
      setDescription("");
      setImageFile(null);
      setImagePreview("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-xl font-display font-bold">Oil Shame, Recipe Fame</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-display font-bold">
              Transform Your Dish
              <span className="block gradient-hero bg-clip-text text-transparent">
                Into a Healthier Masterpiece
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload a photo of your dish and watch AI recreate it with less oil, 
              but all the flavor. Let the community vote on which looks better!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">1. Upload</CardTitle>
                <CardDescription>Share your oily dish photo</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <ImageIcon className="w-8 h-8 text-secondary mx-auto mb-2" />
                <CardTitle className="text-lg">2. AI Magic</CardTitle>
                <CardDescription>We recreate it healthier</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Trophy className="w-8 h-8 text-accent mx-auto mb-2" />
                <CardTitle className="text-lg">3. Win Fame</CardTitle>
                <CardDescription>Community votes & shares</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle>Upload Your Dish</CardTitle>
              <CardDescription>
                Share your creation and let AI work its magic
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Dish Name</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Butter Chicken"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us about your dish..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Upload Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                </div>

                {imagePreview && (
                  <div className="border-2 border-dashed rounded-lg p-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded-lg"
                    />
                  </div>
                )}

                <Button type="submit" className="w-full shadow-warm" disabled={loading}>
                  {loading ? "Processing..." : "Transform My Dish"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-8 text-center space-y-4">
              <Trophy className="w-12 h-12 text-primary mx-auto" />
              <h3 className="text-xl font-display font-bold">Community Voting</h3>
              <p className="text-muted-foreground">
                Once your healthier version is ready, it will appear in the community gallery 
                where others can vote and celebrate your transformation!
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default OilShame;