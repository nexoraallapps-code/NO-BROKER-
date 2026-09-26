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
