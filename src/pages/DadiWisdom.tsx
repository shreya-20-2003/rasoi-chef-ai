import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, ChefHat, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: any; // JSONB from database
  instructions: any; // JSONB from database
  region: string;
  category: string;
  cooking_time: number;
  difficulty: string;
  is_low_oil: boolean;
}

const DadiWisdom = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string>("all");

  const regions = ["all", "Pan-India", "North India", "South India", "Gujarat"];

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchRecipes();
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

  const fetchRecipes = async () => {
    try {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRecipes(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load recipes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredRecipes = selectedRegion === "all" 
    ? recipes 
    : recipes.filter(r => r.region === selectedRegion);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-xl font-display font-bold">Dadi's Wisdom</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-display font-bold">
              Traditional Recipes
              <span className="block gradient-hero bg-clip-text text-transparent">
                From Every Corner of India
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover authentic low-oil recipes passed down through generations. 
              Every dish tells a story of health and tradition.
            </p>
          </div>

          {/* Region Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {regions.map((region) => (
              <Button
                key={region}
                variant={selectedRegion === region ? "default" : "outline"}
                onClick={() => setSelectedRegion(region)}
                className="capitalize"
              >
                {region}
              </Button>
            ))}
          </div>

          {/* Recipes Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading recipes...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredRecipes.map((recipe) => (
                <Card key={recipe.id} className="border-2 hover:border-primary/50 transition-all shadow-card">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{recipe.title}</CardTitle>
                        <CardDescription>{recipe.description}</CardDescription>
                      </div>
                      {recipe.is_low_oil && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Low Oil
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {recipe.region}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {recipe.cooking_time} mins
                      </div>
                      <div className="flex items-center gap-1">
                        <ChefHat className="w-4 h-4" />
                        {recipe.difficulty}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Ingredients:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {Array.isArray(recipe.ingredients) && recipe.ingredients.slice(0, 3).map((ing: string, i: number) => (
                          <li key={i}>• {ing}</li>
                        ))}
                        {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 3 && (
                          <li className="text-primary">+ {recipe.ingredients.length - 3} more</li>
                        )}
                      </ul>
                    </div>

                    <Button className="w-full" variant="outline">
                      View Full Recipe
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && filteredRecipes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No recipes found for this region.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DadiWisdom;