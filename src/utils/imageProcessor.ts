/**
 * Image Processor Utility for NO BROKER Real Estate Application
 * Provides canvas-based high-quality resizing and JPEG compression for uploaded property photos.
 */

/**
 * Resizes an image file to a maximum width (default 1200px) while maintaining aspect ratio,
 * and compresses it into a high-quality JPEG Data URL.
 *
 * @param file - The input image file selected from the user's device.
 * @param maxWidth - The maximum allowable width in pixels (default: 1200).
 * @returns A promise that resolves to a JPEG Data URL string ready for property cards and preview rendering.
 */
export const compressAndResizeImage = (
  file: File,
  maxWidth: number = 1200
): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      reject(new Error('Selected file is not an image'));
      return;
    }

    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error('Failed to read image file from device'));
    };

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) {
        reject(new Error('FileReader produced an empty result'));
        return;
      }

      const img = new Image();

      img.onerror = () => {
        reject(new Error('Failed to decode image contents'));
      };

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate proportional dimensions if width exceeds maxWidth
        if (width > maxWidth) {
          const scaleRatio = maxWidth / width;
          width = maxWidth;
          height = Math.round(height * scaleRatio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback to raw data URL if canvas context fails
          resolve(dataUrl);
          return;
        }

        // Apply high-quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Fill background with white (prevents transparent PNGs from becoming black in JPEG)
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);

        // Draw resized image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Compress and convert to high-quality JPEG (quality = 0.88)
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
        resolve(compressedDataUrl);
      };

      img.src = dataUrl;
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Helper to process multiple files through compressAndResizeImage.
 */
export const compressAndResizeMultipleImages = async (
  files: File[],
  maxWidth: number = 1200
): Promise<string[]> => {
  const processed: string[] = [];
  for (const file of files) {
    try {
      const compressed = await compressAndResizeImage(file, maxWidth);
      processed.push(compressed);
    } catch (err) {
      console.error(`Failed to process image ${file.name}:`, err);
    }
  }
  return processed;
};
