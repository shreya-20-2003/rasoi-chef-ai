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
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedRecipe, setGeneratedRecipe] = useState<string | null>(null);

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
      // Upload image to storage first
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${user.id}_${Date.now()}.${fileExt}`;
      const filePath = `dishes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('user_dishes')
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('user_dishes')
        .getPublicUrl(filePath);

      // Call AI to generate healthier version
      const { data: aiData, error: aiError } = await supabase.functions.invoke(
        'generate-healthy-dish',
        {
          body: {
            dishDescription: `${title}. ${description}`,
            originalImageUrl: publicUrl
          }
        }
      );

      if (aiError) throw aiError;

      // Save to database
      const { error: dbError } = await supabase.from("user_dishes").insert({
        user_id: user.id,
        title,
        description,
        original_image_url: publicUrl,
        healthier_image_url: aiData.imageUrl,
        status: "completed",
      });

      if (dbError) throw dbError;

      // Set the generated results for display
      setGeneratedImage(aiData.imageUrl);
      setGeneratedRecipe(aiData.recipe);

      toast({
        title: "Success!",
        description: "Your dish has been transformed into a healthier version!",
      });
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to transform your dish. Please try again.",
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

          {generatedImage && generatedRecipe && (
            <Card className="shadow-warm">
              <CardHeader>
                <CardTitle>Your Healthy Transformation</CardTitle>
                <CardDescription>
                  AI-generated oil-free version of your dish
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-muted-foreground">Original Dish</h4>
                    <img
                      src={imagePreview}
                      alt="Original dish"
                      className="w-full rounded-lg border-2 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-muted-foreground">Healthy Version</h4>
                    <img
                      src={generatedImage}
                      alt="Healthy dish"
                      className="w-full rounded-lg border-2 border-primary"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg">Oil-Free Recipe</h4>
                  <div className="prose prose-sm max-w-none bg-muted/30 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap font-sans text-sm">{generatedRecipe}</pre>
                  </div>
                </div>

                <Button 
                  onClick={() => {
                    setGeneratedImage(null);
                    setGeneratedRecipe(null);
                    setTitle("");
                    setDescription("");
                    setImageFile(null);
                    setImagePreview("");
                  }}
                  className="w-full"
                  variant="outline"
                >
                  Transform Another Dish
                </Button>
              </CardContent>
            </Card>
          )}

          {!generatedImage && (
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
          )}
        </div>
      </main>
    </div>
  );
};

export default OilShame;