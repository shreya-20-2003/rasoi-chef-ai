import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { dishDescription, originalImageUrl } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const prompt = `Create a beautiful, appetizing image of a healthy, oil-free version of this Indian dish: ${dishDescription}. 
    The dish should look delicious and authentic, but prepared using healthy cooking methods with minimal oil. 
    Show the dish plated attractively with vibrant colors and fresh ingredients.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const generatedImageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!generatedImageUrl) {
      throw new Error("No image generated");
    }

    // Now generate the recipe using AI
    const recipePrompt = `Create a detailed, healthy oil-free recipe for this Indian dish: ${dishDescription}.
    Include:
    - List of ingredients with quantities
    - Step-by-step cooking instructions
    - Cooking time and servings
    - Tips for making it healthier without oil
    Keep it authentic to Indian cuisine but focus on healthy cooking methods.`;

    const recipeResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "user",
            content: recipePrompt,
          },
        ],
      }),
    });

    if (!recipeResponse.ok) {
      console.error("Failed to generate recipe:", await recipeResponse.text());
      // Return image without recipe if recipe generation fails
      return new Response(
        JSON.stringify({ imageUrl: generatedImageUrl, recipe: null }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const recipeData = await recipeResponse.json();
    const recipe = recipeData.choices?.[0]?.message?.content;

    return new Response(
      JSON.stringify({ imageUrl: generatedImageUrl, recipe }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Generate healthy dish error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
