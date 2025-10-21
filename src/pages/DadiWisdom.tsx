import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, ChefHat, MapPin, Flame, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

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
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsDialogOpen(true);
  };

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

                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => handleViewRecipe(recipe)}
                    >
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

      {/* Recipe Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card">
          {selectedRecipe && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-display">
                  {selectedRecipe.title}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {selectedRecipe.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                {/* Recipe Info Chart */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-primary/5 p-4 rounded-lg border-2 border-primary/20">
                    <div className="flex items-center gap-2 text-primary mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase">Time</span>
                    </div>
                    <p className="text-xl font-bold">{selectedRecipe.cooking_time} mins</p>
                  </div>

                  <div className="bg-secondary/5 p-4 rounded-lg border-2 border-secondary/20">
                    <div className="flex items-center gap-2 text-secondary mb-1">
                      <ChefHat className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase">Level</span>
                    </div>
                    <p className="text-xl font-bold capitalize">{selectedRecipe.difficulty}</p>
                  </div>

                  <div className="bg-accent/5 p-4 rounded-lg border-2 border-accent/20">
                    <div className="flex items-center gap-2 text-accent mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase">Region</span>
                    </div>
                    <p className="text-xl font-bold">{selectedRecipe.region}</p>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border-2 border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
                      <Flame className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase">Oil</span>
                    </div>
                    <p className="text-xl font-bold">
                      {selectedRecipe.is_low_oil ? "Low" : "Normal"}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Ingredients Section */}
                <div className="space-y-3">
                  <h3 className="text-xl font-display font-bold flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Ingredients
                  </h3>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <ul className="grid md:grid-cols-2 gap-2">
                      {Array.isArray(selectedRecipe.ingredients) && selectedRecipe.ingredients.map((ing: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary font-bold mt-1">•</span>
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Separator />

                {/* Instructions Section */}
                <div className="space-y-3">
                  <h3 className="text-xl font-display font-bold flex items-center gap-2">
                    <ChefHat className="w-5 h-5 text-primary" />
                    Instructions
                  </h3>
                  <div className="space-y-3">
                    {Array.isArray(selectedRecipe.instructions) && selectedRecipe.instructions.map((step: string, i: number) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                          {i + 1}
                        </div>
                        <p className="flex-1 pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Badge */}
                <div className="flex flex-wrap gap-2 pt-4">
                  <Badge variant="outline" className="text-sm">
                    {selectedRecipe.category}
                  </Badge>
                  {selectedRecipe.is_low_oil && (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                      Healthy Choice
                    </Badge>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DadiWisdom;