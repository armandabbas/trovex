-- Seed Data: Categories
INSERT INTO categories (id, name, slug, icon, description) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Trading Cards', 'trading-cards', '🃏', 'Pokémon, Yu-Gi-Oh!, Magic: The Gathering und mehr'),
  ('c1000000-0000-0000-0000-000000000002', 'Sneakers', 'sneakers', '👟', 'Nike, Adidas, New Balance und limitierte Editionen'),
  ('c1000000-0000-0000-0000-000000000003', 'Uhren', 'uhren', '⌚', 'Rolex, Omega, Patek Philippe und mehr'),
  ('c1000000-0000-0000-0000-000000000004', 'Kunst', 'kunst', '🎨', 'Prints, Gemälde, Skulpturen und Street Art'),
  ('c1000000-0000-0000-0000-000000000005', 'Sport Memorabilia', 'sport-memorabilia', '⚽', 'Signierte Trikots, Bälle, Sammelstücke');

-- Note: Collectible seed data requires a user_id from auth.users.
-- After registering your first user, you can insert demo items manually
-- or run the following with your user's UUID:
--
-- Replace 'YOUR_USER_ID' with your actual user UUID from Supabase Auth.
--
-- INSERT INTO collectibles (user_id, category_id, name, brand, series, year, condition, grade, grading_service, purchase_price, current_estimated_value, status) VALUES
-- ('YOUR_USER_ID', 'c1000000-0000-0000-0000-000000000001', 'Charizard Base Set', 'Pokémon', 'Base Set', 1999, 'Near Mint', '9', 'PSA', 350, 850, 'in_collection'),
-- ('YOUR_USER_ID', 'c1000000-0000-0000-0000-000000000001', 'Pikachu Illustrator', 'Pokémon', 'Promo', 1998, 'Mint', '10', 'PSA', 120000, 250000, 'in_vault'),
-- ('YOUR_USER_ID', 'c1000000-0000-0000-0000-000000000001', 'Black Lotus Beta', 'Magic: The Gathering', 'Beta', 1993, 'Good', '6', 'BGS', 15000, 45000, 'in_collection'),
-- ('YOUR_USER_ID', 'c1000000-0000-0000-0000-000000000001', 'Blue-Eyes White Dragon 1st Edition', 'Yu-Gi-Oh!', 'Legend of Blue Eyes', 2002, 'Near Mint', '8.5', 'BGS', 800, 2200, 'in_collection'),
-- ('YOUR_USER_ID', 'c1000000-0000-0000-0000-000000000002', 'Air Jordan 1 Retro High OG Chicago', 'Nike', 'Air Jordan 1', 2015, 'Near Mint', NULL, NULL, 180, 420, 'in_collection'),
-- ('YOUR_USER_ID', 'c1000000-0000-0000-0000-000000000002', 'Yeezy Boost 350 V2 Zebra', 'Adidas', 'Yeezy', 2017, 'Good', NULL, NULL, 220, 280, 'in_collection'),
-- ('YOUR_USER_ID', 'c1000000-0000-0000-0000-000000000002', 'Nike Dunk Low Panda', 'Nike', 'Dunk Low', 2021, 'Mint', NULL, NULL, 110, 150, 'for_sale'),
-- ('YOUR_USER_ID', 'c1000000-0000-0000-0000-000000000002', 'New Balance 550 White Green', 'New Balance', '550', 2021, 'Near Mint', NULL, NULL, 130, 190, 'in_collection'),
-- ('YOUR_USER_ID', 'c1000000-0000-0000-0000-000000000003', 'Omega Speedmaster Professional Moonwatch', 'Omega', 'Speedmaster', 2019, 'Excellent', NULL, NULL, 4200, 5200, 'in_collection'),
-- ('YOUR_USER_ID', 'c1000000-0000-0000-0000-000000000003', 'Rolex Submariner Date', 'Rolex', 'Submariner', 2020, 'Mint', NULL, NULL, 8500, 12000, 'in_vault'),
-- ('YOUR_USER_ID', 'c1000000-0000-0000-0000-000000000003', 'Casio G-Shock DW-5600E', 'Casio', 'G-Shock', 2018, 'Good', NULL, NULL, 45, 80, 'in_collection'),
-- ('YOUR_USER_ID', 'c1000000-0000-0000-0000-000000000004', 'Banksy "Girl with Balloon" Print', 'Banksy', 'Screen Prints', 2004, 'Excellent', NULL, NULL, 5000, 12000, 'in_vault'),
-- ('YOUR_USER_ID', 'c1000000-0000-0000-0000-000000000004', 'KAWS Companion Open Edition', 'KAWS', 'Companion', 2020, 'Mint', NULL, NULL, 350, 600, 'in_collection'),
-- ('YOUR_USER_ID', 'c1000000-0000-0000-0000-000000000004', 'Shepard Fairey "Hope" Print', 'Obey', 'Political', 2008, 'Near Mint', NULL, NULL, 200, 450, 'in_collection'),
-- ('YOUR_USER_ID', 'c1000000-0000-0000-0000-000000000005', 'Lionel Messi signiertes Trikot WM 2022', 'Adidas', 'Argentinien WM 2022', 2022, 'Mint', NULL, NULL, 1500, 3500, 'in_vault'),
-- ('YOUR_USER_ID', 'c1000000-0000-0000-0000-000000000005', 'Michael Jordan signierter Basketball', 'Spalding', 'NBA', 1996, 'Good', NULL, NULL, 2000, 4500, 'in_collection'),
-- ('YOUR_USER_ID', 'c1000000-0000-0000-0000-000000000005', 'Formel 1 Helm Lewis Hamilton Miniatur', 'Bell', 'F1 2020', 2020, 'Mint', NULL, NULL, 180, 350, 'in_collection'),
-- ('YOUR_USER_ID', 'c1000000-0000-0000-0000-000000000005', 'FC Bayern München signiertes Trikot 2023', 'Adidas', 'Bundesliga', 2023, 'Mint', NULL, NULL, 250, 400, 'for_sale');
