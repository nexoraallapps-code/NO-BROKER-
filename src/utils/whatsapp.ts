import { Property } from '../types';

/**
 * Dynamically generates a pre-filled WhatsApp conversation URL
 * using property specifications and owner details.
 */
export function generateOwnerWhatsAppUrl(property: Property): string {
  // Extract digits from the owner's phone number
  const digits = property.owner.phone.replace(/[^0-9]/g, '');
  // Format with country code 91 if standard 10-digit Indian mobile
  const targetPhone = digits.length === 10 ? `91${digits}` : digits || '919820048291';

  const lines = [
    `Hello ${property.owner.name},`,
    ``,
    `I found your verified listing on NO BROKER (0% Brokerage):`,
    `🏡 *${property.title}* (ID: #${property.id})`,
    `📍 *Location:* ${property.location}, ${property.city}`,
    `💰 *Price:* ${property.priceFormatted}`,
    `📐 *Configuration:* ${property.bhk} (${property.carpetArea})`,
    `🛋️ *Furnishing:* ${property.furnishing}`,
    `🔑 *Possession:* ${property.status}`,
    ...(property.facing ? [`🧭 *Facing:* ${property.facing}`] : []),
    ``,
    `I am interested in scheduling an in-person walkthrough and discussing direct agreement terms with 0% brokerage. When would be a convenient time to connect?`,
    ``,
    `Thank you!`
  ];

  const fullMessage = lines.join('\n');
  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(fullMessage)}`;
}

/**
 * Dynamically generates a pre-filled WhatsApp share URL for a property listing
 * that can be shared with friends/family.
 */
export function generatePropertyShareWhatsAppUrl(property: Property, shareUrl?: string): string {
  const url = shareUrl || (typeof window !== 'undefined' ? window.location.href : '');
  const lines = [
    `Check out this verified property on *NO BROKER* (0% Brokerage):`,
    ``,
    `🏡 *${property.title}*`,
    `💰 *Price:* ${property.priceFormatted}`,
    `📍 *Location:* ${property.location}, ${property.city}`,
    `📐 *Configuration:* ${property.bhk} • ${property.carpetArea}`,
    `🛋️ *Furnishing:* ${property.furnishing}`,
    `✨ *Key Benefit:* Direct Owner Handshake • Zero Brokerage`,
    ``,
    `🔗 *View property listing:* ${url}`
  ];

  const fullMessage = lines.join('\n');
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(fullMessage)}`;
}

/**
 * Directly copies the property listing URL to the clipboard with robust fallback
 */
export async function copyListingLinkToClipboard(property?: Property): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  const currentUrl = window.location.href;
  
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(currentUrl);
      return true;
    }
  } catch {
    // Fallback for older browsers or iframe restrictions
  }

  try {
    const textArea = document.createElement('textarea');
    textArea.value = currentUrl;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
}

/**
 * Universal Share function for property details:
 * Uses Web Share API if supported by the browser,
 * otherwise falls back to copying link and generating a WhatsApp message.
 */
export async function sharePropertyListing(
  property: Property
): Promise<{ method: 'webshare' | 'whatsapp' | 'clipboard'; copied: boolean; cancelled?: boolean }> {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = `${property.title} - NO BROKER (0% Brokerage)`;
  const shareText = `Check out this verified property on NO BROKER: ${property.title} in ${property.location}, ${property.city} for ${property.priceFormatted} (0% Brokerage).`;

  // 1. Check if Web Share API is available (primarily mobile devices)
  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: currentUrl
      });
      return { method: 'webshare', copied: false };
    } catch (err: any) {
      // If user cancelled/closed native share sheet
      if (err && (err.name === 'AbortError' || err.message?.includes('cancelled'))) {
        return { method: 'webshare', copied: false, cancelled: true };
      }
      // If native share failed for any other reason, continue to fallback
    }
  }

  // 2. Direct Clipboard Copy fallback for non-supported browsers / desktop
  const copied = await copyListingLinkToClipboard(property);

  return { method: 'clipboard', copied };
}
