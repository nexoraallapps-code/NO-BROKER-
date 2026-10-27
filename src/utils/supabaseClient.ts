/**
 * Supabase Client Initialization Utility for NO BROKER Application
 * Initializes the Supabase client using environment variables VITE_SUPABASE_URL
 * and VITE_SUPABASE_ANON_KEY to enable database, auth, and storage operations across the app.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Retrieve credentials from Vite environment variables
const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL || 'https://xyzcompany.supabase.co';
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWYiOiJzeW1wb255Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2MDA0MDAwMDAsImV4cCI6MTkwMDIxNjAwMH0.dummy_anon_key';

/**
 * Global Supabase Client Instance
 * Used across the application for Supabase Storage, Auth, and Database operations.
 */
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/**
 * Storage bucket name for property listings
 */
export const PROPERTY_IMAGES_BUCKET = 'property-images';

/**
 * Utility function to verify if Supabase has been configured with real user credentials
 */
export const isSupabaseReady = (): boolean => {
  return (
    !!import.meta.env.VITE_SUPABASE_URL &&
    !import.meta.env.VITE_SUPABASE_URL.includes('xyzcompany') &&
    !!import.meta.env.VITE_SUPABASE_ANON_KEY
  );
};

export default supabase;
