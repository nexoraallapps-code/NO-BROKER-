export type PropertyPurpose = 'rent' | 'buy' | 'commercial';
export type PropertyType = 'flat' | 'house' | 'pg' | 'office' | 'penthouse';
export type FurnishingState = 'Fully Furnished' | 'Semi-Furnished' | 'Unfurnished' | 'Bespoke Bare';

export interface Property {
  id: string;
  title: string;
  hindiTitle?: string;
  purpose: PropertyPurpose;
  propertyType: PropertyType;
  price: number; // monthly rent or total purchase price
  priceFormatted: string;
  pricePerSqFt?: string;
  deposit?: string;
  brokerageSaved: string;
  location: string;
  city: string;
  subLocality: string;
  bhk: string; // e.g. "3 BHK", "4 BHK Sky Villa"
  carpetArea: string; // e.g. "3,450 sq.ft"
  bathrooms: number;
  parking: string;
  floor: string;
  status: string; // "Immediate Move-in", "Ready to Move", "Within 15 Days"
  furnishing: FurnishingState;
  facing: string;
  images: string[];
  photos?: string[];
  description?: string;
  owner: {
    name: string;
    phone: string;
    verifiedTitle: boolean;
    directOwner: boolean;
    responseTime: string;
    rating?: number;
    avatar?: string;
  };
  amenities: string[];
  specifications?: {
    ageOfProperty?: string;
    tenantPreference?: string;
    balconies?: string;
    ceilingHeight?: string;
    maintenanceIncluded?: boolean;
    curatorNote?: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  distanceFromUser?: string;
  featured?: boolean;
}

export interface FilterState {
  purpose: PropertyPurpose;
  city: string;
  searchQuery: string;
  propertyTypes: PropertyType[];
  bhkList: string[];
  minPrice: number;
  maxPrice: number;
  furnishing: string[];
  possession: string;
  searchRadius: number; // in km
}

export interface UserProfile {
  isAuthenticated: boolean;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'buyer' | 'tenant' | 'owner';
  savedPropertyIds: string[];
  contactsRemaining: number;
  postedPropertyIds: string[];
}

export interface MovingQuote {
  fromCity: string;
  toCity: string;
  moveDate: string;
  homeSize: string;
  estimatedPrice: number;
}
