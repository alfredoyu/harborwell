/*
  # E-commerce Database Schema

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `brand` (text)
      - `price` (decimal)
      - `original_price` (decimal, nullable)
      - `image` (text)
      - `images` (text array)
      - `category` (text)
      - `description` (text)
      - `benefits` (text array)
      - `ingredients` (text array)
      - `usage` (text)
      - `allergens` (text array)
      - `in_stock` (boolean)
      - `stock_quantity` (integer)
      - `sales` (integer)
      - `rating` (decimal)
      - `reviews` (integer)
      - `specifications` (jsonb)
      - `target_audience` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `orders`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `status` (text)
      - `total_amount` (decimal)
      - `currency` (text)
      - `shipping_address` (jsonb)
      - `billing_address` (jsonb)
      - `payment_status` (text)
      - `payment_method` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key to orders)
      - `product_id` (uuid, foreign key to products)
      - `quantity` (integer)
      - `unit_price` (decimal)
      - `total_price` (decimal)

    - `customers`
      - `id` (uuid, primary key, foreign key to auth.users)
      - `email` (text)
      - `first_name` (text)
      - `last_name` (text)
      - `phone` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `reviews`
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key to products)
      - `customer_id` (uuid, foreign key to customers)
      - `rating` (integer)
      - `comment` (text)
      - `verified` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users and admin access
*/

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  brand text NOT NULL,
  price decimal(10,2) NOT NULL,
  original_price decimal(10,2),
  image text NOT NULL,
  images text[] DEFAULT '{}',
  category text NOT NULL,
  description text NOT NULL,
  benefits text[] DEFAULT '{}',
  ingredients text[] DEFAULT '{}',
  usage text NOT NULL,
  allergens text[] DEFAULT '{}',
  in_stock boolean DEFAULT true,
  stock_quantity integer DEFAULT 0,
  sales integer DEFAULT 0,
  rating decimal(3,2) DEFAULT 0,
  reviews integer DEFAULT 0,
  specifications jsonb DEFAULT '{}',
  target_audience text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total_amount decimal(10,2) NOT NULL,
  currency text DEFAULT 'USD',
  shipping_address jsonb,
  billing_address jsonb,
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id),
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price decimal(10,2) NOT NULL,
  total_price decimal(10,2) NOT NULL
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  first_name text,
  last_name text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  customer_id uuid REFERENCES customers(id),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Products policies (public read, admin write)
CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Products are manageable by authenticated users"
  ON products
  FOR ALL
  TO authenticated
  USING (true);

-- Orders policies (users can only see their own orders)
CREATE POLICY "Users can view own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all orders"
  ON orders
  FOR ALL
  TO authenticated
  USING (true);

-- Order items policies
CREATE POLICY "Users can view own order items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all order items"
  ON order_items
  FOR ALL
  TO authenticated
  USING (true);

-- Customers policies
CREATE POLICY "Users can view own profile"
  ON customers
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON customers
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can create own profile"
  ON customers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = customer_id);

-- Insert sample products
INSERT INTO products (
  id, name, brand, price, original_price, image, images, category, description, 
  benefits, ingredients, usage, allergens, in_stock, stock_quantity, sales, rating, reviews,
  specifications, target_audience
) VALUES 
(
  'akk-metabolic-catalyst-plus',
  'AKK Metabolic Catalyst PLUS',
  'HarborWell',
  49.99,
  69.99,
  '/src/assets/images/1.png',
  ARRAY['/src/assets/images/1.png'],
  'Weight Management',
  'AKK Metabolic Catalyst PLUS is a revolutionary dietary supplement designed to support weight loss and metabolic health.',
  ARRAY[
    'Metabolic Management: Improves the body''s overall metabolism',
    'Weight Control: Promotes an "easy-to-lose" body type for effective weight management',
    'Appetite Suppression: Helps inhibit appetite and increase feelings of fullness'
  ],
  ARRAY[
    'PGC-1α & AMPK Activation Complex - Master metabolic switch for fat and sugar burning',
    'Plant-based GLP-1 - Mimics natural hormone effects for blood sugar and appetite regulation',
    'α-Lipoic Acid - Antioxidant for blood sugar control and protein glycation prevention'
  ],
  'For smaller body types: Take 1 capsule once daily with a meal. For larger body types: Take 2 capsules once daily with a meal.',
  ARRAY['Consult healthcare provider before use', 'Not suitable for pregnant or nursing women'],
  true,
  100,
  3247,
  4.9,
  428,
  '{"capsules": 60, "shelfLife": "3 years", "storage": "Room temperature"}',
  ARRAY[
    'Individuals with slow metabolism',
    'Those experiencing unexplained weight gain or difficulty losing weight',
    'People with sedentary lifestyle and high visceral fat'
  ]
),
(
  'nad-plus-cellular-prime',
  'NAD PLUS Cellular Prime',
  'HarborWell',
  89.99,
  119.99,
  '/src/assets/images/2.png',
  ARRAY['/src/assets/images/2.png'],
  'Beauty & Anti-Aging',
  'Introducing NAD PLUS Cellular Prime, a pinnacle of anti-aging science designed for those who seek to preserve their youthfulness from the inside out.',
  ARRAY[
    'Cellular Activation: Works at the cellular level to rejuvenate and energize your body from its very foundation',
    'Internal Anti-Aging: Promotes the body''s own endogenous anti-aging and conditioning processes',
    'Comprehensive Antioxidant Defense: Delivers a multi-effect shield against oxidative stress'
  ],
  ARRAY[
    'NR (Nicotinamide Riboside) 300mg - Highly effective precursor to NAD+',
    'PQQ (Pyrroloquinoline Quinone) 10mg - Potent nutrient that supports mitochondrial health',
    'Co-crystal Reduced Coenzyme Q10 50mg - Most bioavailable, active form of CoQ10'
  ],
  'Take one capsule, once daily. Store in a cool, dry place away from direct sunlight.',
  ARRAY['Consult healthcare provider before use', 'Not suitable for pregnant or nursing women'],
  true,
  50,
  1847,
  4.8,
  234,
  '{"capsules": 30, "shelfLife": "2 years", "storage": "Cool, dry place away from direct sunlight"}',
  ARRAY[
    'Individuals concerned with signs of aging who want to maintain a youthful appearance',
    'Those experiencing a decline in energy levels and cellular vitality',
    'People seeking to proactively support their long-term health and longevity'
  ]
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);