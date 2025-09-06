import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  original_price?: number;
  image: string;
  images: string[];
  category: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  usage: string;
  allergens: string[];
  in_stock: boolean;
  stock_quantity: number;
  sales: number;
  rating: number;
  reviews: number;
  specifications: Record<string, any>;
  target_audience: string[];
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  currency: string;
  shipping_address: Record<string, any>;
  billing_address: Record<string, any>;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method: string;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  product?: Product;
}

export interface Customer {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  customer_id: string;
  rating: number;
  comment?: string;
  verified: boolean;
  created_at: string;
  customer?: Customer;
}