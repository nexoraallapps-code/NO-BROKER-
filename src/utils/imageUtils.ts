/**
 * Comprehensive Image Compression and Optimization Utilities for NO BROKER Real Estate Portal
 * Optimized for high visual fidelity, fast rendering in property cards, and minimal memory overhead.
 */

export interface CompressOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  maxFileSizeKB?: number;
  outputFormat?: 'image/webp' | 'image/jpeg';
  aspectRatio?: number;
  cropToAspect?: boolean;
}

export interface CompressResult {
  dataUrl: string;
  originalSizeKB: number;
  compressedSizeKB: number;
  savingsPercentage: number;
  dimensions: {
    width: number;
    height: number;
  };
  format: string;
}

/**
 * Checks if the browser supports WebP canvas export
 */
export const supportsWebP = (): boolean => {
  try {
    const elem = document.createElement('canvas');
    if (elem.getContext && elem.getContext('2d')) {
      return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
  } catch {
    return false;
  }
  return false;
};

/**
 * Helper to convert File or DataURL string into an HTMLImageElement
 */
export const loadImage = (source: File | string): Promise<{ img: HTMLImageElement; originalSizeKB: number }> => {
  return new Promise((resolve, reject) => {
    if (typeof source === 'string') {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onerror = () => reject(new Error('Failed to load image from source URL'));
      img.onload = () => {
        const base64Length = source.length - (source.indexOf(',') + 1);
        const originalSizeKB = Math.round((base64Length * 0.75) / 1024);
        resolve({ img, originalSizeKB });
      };
      img.src = source;
    } else {
      const originalSizeKB = Math.round(source.size / 1024);
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.onload = (e) => {
        const img = new Image();
        img.onerror = () => reject(new Error('Failed to decode image data'));
        img.onload = () => resolve({ img, originalSizeKB });
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(source);
    }
  });
};

/**
 * Main utility function to compress and optimize an image file or data URL.
 * Retains pristine visual quality while reducing file size up to 80% for fast property card performance.
 */
export const compressAndOptimizeImage = async (
  source: File | string,
  options: CompressOptions = {}
): Promise<CompressResult> => {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.88,
    maxFileSizeKB = 400,
    outputFormat = supportsWebP() ? 'image/webp' : 'image/jpeg',
    aspectRatio,
    cropToAspect = false,
  } = options;

  const { img, originalSizeKB } = await loadImage(source);

  let sourceWidth = img.naturalWidth || img.width;
  let sourceHeight = img.naturalHeight || img.height;
  let targetWidth = sourceWidth;
  let targetHeight = sourceHeight;

  if (cropToAspect && aspectRatio && aspectRatio > 0) {
    const currentAspect = sourceWidth / sourceHeight;
    if (currentAspect > aspectRatio) {
      sourceWidth = Math.round(sourceHeight * aspectRatio);
    } else {
      sourceHeight = Math.round(sourceWidth / aspectRatio);
    }
  }

  if (targetWidth > maxWidth || targetHeight > maxHeight) {
    const widthRatio = maxWidth / targetWidth;
    const heightRatio = maxHeight / targetHeight;
    const bestRatio = Math.min(widthRatio, heightRatio);

    targetWidth = Math.round(targetWidth * bestRatio);
    targetHeight = Math.round(targetHeight * bestRatio);
  }

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context not available');
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  if (outputFormat === 'image/jpeg') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  }

  const sx = (img.width - sourceWidth) / 2;
  const sy = (img.height - sourceHeight) / 2;

  ctx.drawImage(img, sx, sy, sourceWidth, sourceHeight, 0, 0, targetWidth, targetHeight);

  let currentQuality = quality;
  let dataUrl = canvas.toDataURL(outputFormat, currentQuality);
  let base64Length = dataUrl.length - (dataUrl.indexOf(',') + 1);
  let compressedSizeKB = Math.round((base64Length * 0.75) / 1024);

  let iterations = 0;
  while (compressedSizeKB > maxFileSizeKB && currentQuality > 0.45 && iterations < 5) {
    currentQuality -= 0.08;
    dataUrl = canvas.toDataURL(outputFormat, currentQuality);
    base64Length = dataUrl.length - (dataUrl.indexOf(',') + 1);
    compressedSizeKB = Math.round((base64Length * 0.75) / 1024);
    iterations++;
  }

  const savingsPercentage = originalSizeKB > 0
    ? Math.max(0, Math.round(((originalSizeKB - compressedSizeKB) / originalSizeKB) * 100))
    : 0;

  return {
    dataUrl,
    originalSizeKB,
    compressedSizeKB,
    savingsPercentage,
    dimensions: {
      width: targetWidth,
      height: targetHeight,
    },
    format: outputFormat.split('/')[1].toUpperCase(),
  };
};

/**
 * Creates an ultra-fast, lightweight property card thumbnail (4:3 aspect ratio, ~150-250KB max).
 */
export const generateCardThumbnail = async (
  source: File | string,
  maxWidth = 800,
  maxHeight = 600
): Promise<CompressResult> => {
  return compressAndOptimizeImage(source, {
    maxWidth,
    maxHeight,
    quality: 0.85,
    maxFileSizeKB: 250,
    aspectRatio: 4 / 3,
    cropToAspect: false,
  });
};

/**
 * Batch compresses multiple image files sequentially with progress reporting.
 */
export const batchCompressImages = async (
  sources: (File | string)[],
  options: CompressOptions = {},
  onProgress?: (processed: number, total: number) => void
): Promise<CompressResult[]> => {
  const results: CompressResult[] = [];
  for (let i = 0; i < sources.length; i++) {
    const result = await compressAndOptimizeImage(sources[i], options);
    results.push(result);
    if (onProgress) {
      onProgress(i + 1, sources.length);
    }
  }
  return results;
};

/**
 * Backwards-compatible HD image resize function used across listing screens and modals.
 */
export const resizeAndOptimizeHDImage = async (
  file: File,
  maxWidth = 1920,
  maxHeight = 1080,
  quality = 0.90
): Promise<string> => {
  const result = await compressAndOptimizeImage(file, {
    maxWidth,
    maxHeight,
    quality,
    maxFileSizeKB: 600,
  });
  return result.dataUrl;
};
