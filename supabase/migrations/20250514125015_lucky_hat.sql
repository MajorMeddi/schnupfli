/*
  # Create Schnupfsprüche Table

  1. New Tables
    - `schnupfsprueche`
      - `id` (uuid, primary key)
      - `content` (text, not null) - The actual saying
      - `author` (text, not null) - Who contributed the saying
      - `dialect` (text) - The dialect the saying is in
      - `region` (text) - Geographic region the saying is from
      - `created_at` (timestamp) - When the saying was added
      - `updated_at` (timestamp) - When the saying was last modified

  2. Security
    - Enable RLS on `schnupfsprueche` table
    - Add policies for authenticated users to read all sayings
    - Add policies for authenticated users to create new sayings
    - Add policies for users to update their own sayings
*/

CREATE TABLE IF NOT EXISTS schnupfsprueche (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  author text NOT NULL,
  dialect text DEFAULT 'standard',
  region text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE schnupfsprueche ENABLE ROW LEVEL SECURITY;

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
  USING (author = current_user);