-- Create storage bucket for user dish images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('user_dishes', 'user_dishes', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for user dishes
CREATE POLICY "Users can view all dish images"
ON storage.objects FOR SELECT
USING (bucket_id = 'user_dishes');

CREATE POLICY "Users can upload their own dish images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'user_dishes' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own dish images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'user_dishes' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own dish images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'user_dishes' AND
  auth.uid()::text = (storage.foldername(name))[1]
);