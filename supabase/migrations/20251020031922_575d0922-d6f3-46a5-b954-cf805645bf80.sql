-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  preferred_language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', '')
  );
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create recipes table for Dadi's Wisdom
CREATE TABLE public.recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  ingredients JSONB NOT NULL,
  instructions JSONB NOT NULL,
  region TEXT NOT NULL,
  category TEXT NOT NULL,
  cooking_time INTEGER,
  difficulty TEXT,
  image_url TEXT,
  is_low_oil BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;

-- Anyone can view recipes
CREATE POLICY "Anyone can view recipes"
  ON public.recipes FOR SELECT
  TO authenticated
  USING (true);

-- Create user dishes table for Oil Shame Recipe Fame
CREATE TABLE public.user_dishes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  original_image_url TEXT NOT NULL,
  healthier_image_url TEXT,
  title TEXT NOT NULL,
  description TEXT,
  votes_original INTEGER DEFAULT 0,
  votes_healthier INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_dishes ENABLE ROW LEVEL SECURITY;

-- Users can view all dishes
CREATE POLICY "Users can view all dishes"
  ON public.user_dishes FOR SELECT
  TO authenticated
  USING (true);

-- Users can insert their own dishes
CREATE POLICY "Users can insert their own dishes"
  ON public.user_dishes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own dishes
CREATE POLICY "Users can update their own dishes"
  ON public.user_dishes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample recipes
INSERT INTO public.recipes (title, description, ingredients, instructions, region, category, cooking_time, difficulty, is_low_oil) VALUES
('Moong Dal Khichdi', 'A wholesome, comforting dish perfect for digestion and health. Grandmother''s favorite!', 
 '["1 cup moong dal", "1 cup rice", "1 tsp turmeric", "1 tsp cumin seeds", "Salt to taste", "2 cups vegetables", "1 tbsp ghee"]',
 '["Wash dal and rice together", "Add turmeric and salt", "Pressure cook for 3 whistles", "Temper with cumin in 1 tbsp ghee", "Mix well and serve hot"]',
 'Pan-India', 'Main Course', 25, 'Easy', true),
 
('Palak Paneer (Low Oil)', 'Creamy spinach curry with cottage cheese, made the healthy way', 
 '["500g spinach", "200g paneer", "2 tomatoes", "1 onion", "Ginger-garlic paste", "Spices", "1 tbsp oil"]',
 '["Blanch spinach and blend", "Sauté onions in minimal oil", "Add tomatoes and spices", "Add spinach puree", "Add paneer cubes", "Simmer for 5 minutes"]',
 'North India', 'Main Course', 30, 'Medium', true),

('Sambhar', 'Traditional South Indian lentil stew with vegetables and minimal oil', 
 '["1 cup toor dal", "Mixed vegetables", "Tamarind", "Sambhar powder", "Curry leaves", "1 tsp oil"]',
 '["Pressure cook dal with turmeric", "Boil vegetables separately", "Add tamarind water", "Add sambhar powder", "Light tempering with mustard seeds", "Simmer together"]',
 'South India', 'Side Dish', 35, 'Medium', true),

('Gujarati Dhokla', 'Steamed, fermented gram flour cake - naturally low in oil', 
 '["2 cups gram flour", "1 cup yogurt", "Eno fruit salt", "Ginger-green chili paste", "Sugar", "Mustard seeds for tempering"]',
 '["Mix gram flour with yogurt", "Add all spices and sugar", "Add Eno just before steaming", "Steam for 15 minutes", "Light tempering", "Cut into pieces and serve"]',
 'Gujarat', 'Snack', 20, 'Easy', true);