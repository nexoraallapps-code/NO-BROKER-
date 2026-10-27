/**
 * Supabase Service Client for NO BROKER Real Estate Portal
 * Manages Supabase Storage Buckets for property images, public URL retrieval,
 * and seamless fallback persistence.
 */

import { supabase, PROPERTY_IMAGES_BUCKET as BUCKET_NAME } from '../utils/supabaseClient';

export { supabase, BUCKET_NAME };

/**
 * Helper to convert Data URL (base64) string to a binary File/Blob
 */
export const dataURLtoBlob = (dataUrl: string): Blob => {
  const arr = dataUrl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

/**
 * Direct file upload handler for Supabase Storage bucket 'property-images'.
 * Uploads file/blob to the 'property-images' bucket, captures the public URL from the returned path data,
 * and returns the public URL string.
 */
export const uploadToPropertyImagesBucket = async (
  fileOrBlob: File | Blob,
  customPath?: string
): Promise<string> => {
  const path = customPath || `listings/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.jpg`;

  // 1. Upload file to 'property-images' bucket
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(path, fileOrBlob, {
      cacheControl: '3600',
      upsert: true,
      contentType: fileOrBlob.type || 'image/jpeg',
    });

  if (error) {
    console.warn(`Supabase Storage upload error for bucket '${BUCKET_NAME}':`, error.message);
    throw error;
  }

  // 2. Capture public URL from returned path
  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
};

/**
 * Uploads a user-selected File or base64 Data URL to the Supabase 'property-images' storage bucket.
 * Returns the public image URL if successful, or fallback data URL if offline/unconfigured.
 */
export const uploadPropertyImageToSupabase = async (
  imageSource: File | string,
  folder = 'listings'
): Promise<{ url: string; isSupabaseUrl: boolean; path?: string }> => {
  try {
    let fileToUpload: File | Blob;
    let fileName: string;

    if (typeof imageSource === 'string') {
      if (imageSource.startsWith('http://') || imageSource.startsWith('https://')) {
        return { url: imageSource, isSupabaseUrl: imageSource.includes('supabase.co') };
      }
      fileToUpload = dataURLtoBlob(imageSource);
      fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.jpg`;
    } else {
      fileToUpload = imageSource;
      const fileExt = imageSource.name.split('.').pop() || 'jpg';
      fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    }

    const publicUrl = await uploadToPropertyImagesBucket(fileToUpload, fileName);

    return {
      url: publicUrl,
      isSupabaseUrl: true,
      path: fileName,
    };
  } catch (err) {
    console.warn('Supabase storage upload exception, falling back to compressed local persistence:', err);
    const fallbackUrl = typeof imageSource === 'string' ? imageSource : URL.createObjectURL(imageSource);
    return { url: fallbackUrl, isSupabaseUrl: false };
  }
};

/**
 * Checks if Supabase client has valid project configuration
 */
export const isSupabaseConfigured = (): boolean => {
  return (
    !!import.meta.env.VITE_SUPABASE_URL &&
    !import.meta.env.VITE_SUPABASE_URL.includes('xyzcompany') &&
    !!import.meta.env.VITE_SUPABASE_ANON_KEY
  );
};
