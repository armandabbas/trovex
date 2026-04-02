-- ============================================
-- TROVEX MVP - KOMPLETT-SETUP
-- Alles in einem Block - einfach in Supabase SQL Editor einfügen und Run klicken
-- ============================================

-- 1. UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABELLEN
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  preferred_currency TEXT DEFAULT 'EUR',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  description TEXT
);

CREATE TABLE IF NOT EXISTS collectibles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id),
  name TEXT NOT NULL,
  description TEXT,
  brand TEXT,
  series TEXT,
  year INTEGER,
  condition TEXT,
  grade TEXT,
  grading_service TEXT,
  purchase_price DECIMAL,
  purchase_date DATE,
  purchase_source TEXT,
  current_estimated_value DECIMAL,
  quantity INTEGER DEFAULT 1,
  status TEXT DEFAULT 'in_collection',
  notes TEXT,
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS collectible_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  collectible_id UUID NOT NULL REFERENCES collectibles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  sort_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS price_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  collectible_id UUID NOT NULL REFERENCES collectibles(id) ON DELETE CASCADE,
  price DECIMAL NOT NULL,
  source TEXT,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS watchlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category_id UUID REFERENCES categories(id),
  target_price DECIMAL,
  current_price DECIMAL,
  external_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS price_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  collectible_id UUID REFERENCES collectibles(id) ON DELETE CASCADE,
  watchlist_id UUID REFERENCES watchlist(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL,
  threshold_value DECIMAL NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  last_triggered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. INDEXES
CREATE INDEX IF NOT EXISTS idx_collectibles_user_id ON collectibles(user_id);
CREATE INDEX IF NOT EXISTS idx_collectibles_category_id ON collectibles(category_id);
CREATE INDEX IF NOT EXISTS idx_collectible_images_collectible_id ON collectible_images(collectible_id);
CREATE INDEX IF NOT EXISTS idx_price_history_collectible_id ON price_history(collectible_id);
CREATE INDEX IF NOT EXISTS idx_watchlist_user_id ON watchlist(user_id);
CREATE INDEX IF NOT EXISTS idx_price_alerts_user_id ON price_alerts(user_id);

-- 4. ROW LEVEL SECURITY
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE collectibles ENABLE ROW LEVEL SECURITY;
ALTER TABLE collectible_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_alerts ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can delete own profile" ON profiles FOR DELETE USING (auth.uid() = id);

-- Categories: readable by all
CREATE POLICY "Categories are viewable by all" ON categories FOR SELECT USING (true);

-- Collectibles
CREATE POLICY "Users can view own collectibles" ON collectibles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own collectibles" ON collectibles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own collectibles" ON collectibles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own collectibles" ON collectibles FOR DELETE USING (auth.uid() = user_id);

-- Collectible Images
CREATE POLICY "Users can view own collectible images" ON collectible_images FOR SELECT
  USING (EXISTS (SELECT 1 FROM collectibles WHERE collectibles.id = collectible_images.collectible_id AND collectibles.user_id = auth.uid()));
CREATE POLICY "Users can insert own collectible images" ON collectible_images FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM collectibles WHERE collectibles.id = collectible_images.collectible_id AND collectibles.user_id = auth.uid()));
CREATE POLICY "Users can update own collectible images" ON collectible_images FOR UPDATE
  USING (EXISTS (SELECT 1 FROM collectibles WHERE collectibles.id = collectible_images.collectible_id AND collectibles.user_id = auth.uid()));
CREATE POLICY "Users can delete own collectible images" ON collectible_images FOR DELETE
  USING (EXISTS (SELECT 1 FROM collectibles WHERE collectibles.id = collectible_images.collectible_id AND collectibles.user_id = auth.uid()));

-- Price History
CREATE POLICY "Users can view own price history" ON price_history FOR SELECT
  USING (EXISTS (SELECT 1 FROM collectibles WHERE collectibles.id = price_history.collectible_id AND collectibles.user_id = auth.uid()));
CREATE POLICY "Users can insert own price history" ON price_history FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM collectibles WHERE collectibles.id = price_history.collectible_id AND collectibles.user_id = auth.uid()));

-- Watchlist
CREATE POLICY "Users can view own watchlist" ON watchlist FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own watchlist" ON watchlist FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own watchlist" ON watchlist FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own watchlist" ON watchlist FOR DELETE USING (auth.uid() = user_id);

-- Price Alerts
CREATE POLICY "Users can view own alerts" ON price_alerts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own alerts" ON price_alerts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own alerts" ON price_alerts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own alerts" ON price_alerts FOR DELETE USING (auth.uid() = user_id);

-- 5. AUTO-PROFILE TRIGGER
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, username, display_name)
  VALUES (NEW.id, NEW.email, split_part(NEW.email, '@', 1));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 6. KATEGORIEN (SEED)
INSERT INTO categories (id, name, slug, icon, description) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Trading Cards', 'trading-cards', '🃏', 'Pokémon, Yu-Gi-Oh!, Magic: The Gathering und mehr'),
  ('c1000000-0000-0000-0000-000000000002', 'Sneakers', 'sneakers', '👟', 'Nike, Adidas, New Balance und limitierte Editionen'),
  ('c1000000-0000-0000-0000-000000000003', 'Uhren', 'uhren', '⌚', 'Rolex, Omega, Patek Philippe und mehr'),
  ('c1000000-0000-0000-0000-000000000004', 'Kunst', 'kunst', '🎨', 'Prints, Gemälde, Skulpturen und Street Art'),
  ('c1000000-0000-0000-0000-000000000005', 'Sport Memorabilia', 'sport-memorabilia', '⚽', 'Signierte Trikots, Bälle, Sammelstücke')
ON CONFLICT (slug) DO NOTHING;

-- 7. STORAGE BUCKET (muss separat im Dashboard erstellt werden)
-- Gehe zu Storage > New Bucket > Name: "collectibles" > Public: ON

-- FERTIG! Alles ist eingerichtet.
