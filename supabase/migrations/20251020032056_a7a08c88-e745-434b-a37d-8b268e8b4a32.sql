-- Insert sample recipes with proper JSONB casting
INSERT INTO public.recipes (title, description, ingredients, instructions, region, category, cooking_time, difficulty, is_low_oil)
VALUES
  ('Moong Dal Khichdi', 'A wholesome, comforting dish perfect for digestion and health. Grandmother''s favorite!', 
   '["1 cup moong dal", "1 cup rice", "1 tsp turmeric", "1 tsp cumin seeds", "Salt to taste", "2 cups vegetables", "1 tbsp ghee"]'::jsonb,
   '["Wash dal and rice together", "Add turmeric and salt", "Pressure cook for 3 whistles", "Temper with cumin in 1 tbsp ghee", "Mix well and serve hot"]'::jsonb,
   'Pan-India', 'Main Course', 25, 'Easy', true),
 
  ('Palak Paneer (Low Oil)', 'Creamy spinach curry with cottage cheese, made the healthy way', 
   '["500g spinach", "200g paneer", "2 tomatoes", "1 onion", "Ginger-garlic paste", "Spices", "1 tbsp oil"]'::jsonb,
   '["Blanch spinach and blend", "Sauté onions in minimal oil", "Add tomatoes and spices", "Add spinach puree", "Add paneer cubes", "Simmer for 5 minutes"]'::jsonb,
   'North India', 'Main Course', 30, 'Medium', true),

  ('Sambhar', 'Traditional South Indian lentil stew with vegetables and minimal oil', 
   '["1 cup toor dal", "Mixed vegetables", "Tamarind", "Sambhar powder", "Curry leaves", "1 tsp oil"]'::jsonb,
   '["Pressure cook dal with turmeric", "Boil vegetables separately", "Add tamarind water", "Add sambhar powder", "Light tempering with mustard seeds", "Simmer together"]'::jsonb,
   'South India', 'Side Dish', 35, 'Medium', true),

  ('Gujarati Dhokla', 'Steamed, fermented gram flour cake - naturally low in oil', 
   '["2 cups gram flour", "1 cup yogurt", "Eno fruit salt", "Ginger-green chili paste", "Sugar", "Mustard seeds for tempering"]'::jsonb,
   '["Mix gram flour with yogurt", "Add all spices and sugar", "Add Eno just before steaming", "Steam for 15 minutes", "Light tempering", "Cut into pieces and serve"]'::jsonb,
   'Gujarat', 'Snack', 20, 'Easy', true)
ON CONFLICT DO NOTHING;