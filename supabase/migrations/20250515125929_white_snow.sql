/*
  # Create Schnupfsprüche Table

  1. New Tables
    - `schnupfsprueche`
      - `id` (uuid, primary key)
      - `content` (text, required)
      - `author` (text, required)
      - `dialect` (text, default 'standard')
      - `region` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `schnupfsprueche` table
    - Add policies for:
      - Public read access
      - Authenticated users can create
      - Users can update their own entries
*/

CREATE TABLE IF NOT EXISTS schnupfsprueche (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  author text NOT NULL,
  dialect text DEFAULT 'standard',
  region text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE schnupfsprueche ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read schnupfsprueche"
  ON schnupfsprueche
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create schnupfsprueche"
  ON schnupfsprueche
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own schnupfsprueche"
  ON schnupfsprueche
  FOR UPDATE
  TO authenticated
  USING (author = CURRENT_USER);