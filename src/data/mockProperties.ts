import heroVilla from '../assets/images/hero_villa_twilight_1790309610252.jpg';
import propertyBandra from '../assets/images/property_penthouse_bandra_1790309622284.jpg';
import interiorLiving from '../assets/images/property_interior_living_1790309634351.jpg';
import seaviewPool from '../assets/images/property_seaview_pool_1790309647925.jpg';
import { Property } from '../types';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'NB-PLH-942',
    title: 'The Verdant Biophilic Penthouse',
    hindiTitle: 'पेंटहाउस - पाली हिल, बांद्रा वेस्ट',
    purpose: 'rent',
    propertyType: 'penthouse',
    price: 285000,
    priceFormatted: '₹2,85,000 / month',
    deposit: '2 Months (₹5,70,000)',
    brokerageSaved: '₹5,70,000 (Saved)',
    location: 'Pali Hill Crest, Upper Bandra West, Mumbai',
    city: 'Mumbai',
    subLocality: 'Bandra West',
    bhk: '4 BHK Sky Villa',
    carpetArea: '3,450 sq.ft',
    bathrooms: 4,
    parking: '2 Covered EV Slots',
    floor: '18th Floor (Full Sea View)',
    status: 'Immediate Move-in',
    furnishing: 'Fully Furnished',
    facing: 'West (Arabian Sea Sunsets)',
    images: [
      propertyBandra,
      interiorLiving,
      seaviewPool,
      heroVilla
    ],
    owner: {
      name: 'Dr. Arvind Mehta',
      phone: '+91 98200 48291',
      verifiedTitle: true,
      directOwner: true,
      responseTime: '~15 mins',
      rating: 4.95,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    amenities: [
      'Private Lap Pool',
      '24/7 Concierge Security',
      'Dedicated 22kW EV Charger',
      'Private Biometric Elevator Core',
      '100% DG Power Backup',
      'Clubhouse & Hydro Spa',
      'Pet Friendly Grooming Lawn',
      'Schüco Soundproof Double Glazing'
    ],
    specifications: {
      ageOfProperty: '2 Years (Mint Condition)',
      tenantPreference: 'Families & Corporate Expats (Open)',
      balconies: '3 Wrap-Around Sky Decks',
      ceilingHeight: '13.5 ft Clear Volume',
      maintenanceIncluded: true,
      curatorNote: 'Crowning the 18th level of Pali Hill’s most coveted biophilic vertical community, this custom sky residence blends rigorous architectural discipline with organic tranquility. Designed around an acoustic sanctuary philosophy with German Schüco multi-glazed facades.'
    },
    coordinates: {
      lat: 19.0626,
      lng: 72.8258
    },
    distanceFromUser: '1.2 KM away',
    featured: true
  },
  {
    id: 'NB-WRL-928',
    title: 'The Azure Residences',
    hindiTitle: 'लक्ज़री 3 व 4 बीएचके - वर्ली सी फेस',
    purpose: 'buy',
    propertyType: 'flat',
    price: 48500000,
    priceFormatted: '₹4.85 Cr',
    pricePerSqFt: '₹17,017 / sq.ft',
    deposit: 'Direct Registration Ready',
    brokerageSaved: 'Save ₹9.7 Lakh Brokerage',
    location: 'Worli Sea Face, South Mumbai',
    city: 'Mumbai',
    subLocality: 'Worli',
    bhk: '3 & 4 BHK',
    carpetArea: '2,850 sq.ft',
    bathrooms: 4,
    parking: '3 Stilt Covered Bays',
    floor: '24th Floor (Unobstructed Oceanfront)',
    status: 'Ready to Move',
    furnishing: 'Bespoke Bare',
    facing: 'West (Sea Facing)',
    images: [
      heroVilla,
      interiorLiving,
      propertyBandra,
      seaviewPool
    ],
    owner: {
      name: 'Mrs. Rashmi Vora',
      phone: '+91 98192 11048',
      verifiedTitle: true,
      directOwner: true,
      responseTime: '~30 mins',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    },
    amenities: [
      'Uninterrupted Arabian Sea View',
      'Private Sky Terrace',
      '2+ Reserved Covered Parking',
      'Olympic Lap Pool & Wellness Gym',
      'Concierge & 3-Tier Security',
      'Automated Lutron Lighting'
    ],
    specifications: {
      ageOfProperty: 'New Construction (OC Received)',
      tenantPreference: 'High Net-worth Direct Buyers',
      balconies: '2 Expansive Ocean Sundecks',
      ceilingHeight: '12 ft Floor-to-Ceiling Glass',
      maintenanceIncluded: true,
      curatorNote: 'Infinity reflection pool, uninterrupted sunset views over the Arabian Sea, private elevator foyer, and bespoke automated Lutron illumination.'
    },
    coordinates: {
      lat: 19.0178,
      lng: 72.8155
    },
    distanceFromUser: '3.8 KM away',
    featured: true
  },
  {
    id: 'NB-PLH-711',
    title: 'Verdant Heights',
    hindiTitle: '2 व 3 बीएचके मॉडर्न अपार्टमेंट - पाली हिल',
    purpose: 'buy',
    propertyType: 'flat',
    price: 32000000,
    priceFormatted: '₹3.20 Cr',
    pricePerSqFt: '₹16,494 / sq.ft',
    brokerageSaved: 'Save ₹6.4 Lakh Brokerage',
    location: 'Pali Hill, Bandra West, Mumbai',
    city: 'Mumbai',
    subLocality: 'Bandra West',
    bhk: '2 & 3 BHK',
    carpetArea: '1,940 sq.ft',
    bathrooms: 3,
    parking: '2 Covered Slots',
    floor: '11th Floor',
    status: 'Immediate',
    furnishing: 'Semi-Furnished',
    facing: 'North-West',
    images: [
      propertyBandra,
      interiorLiving,
      heroVilla
    ],
    owner: {
      name: 'Mr. K. Singhania',
      phone: '+91 98205 77312',
      verifiedTitle: true,
      directOwner: true,
      responseTime: '~5 mins',
      rating: 5.0,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    amenities: [
      'Landscaped Garden Walkway',
      'High Speed Mitsubishi Elevators',
      'Gym & Yoga Studio',
      'Solar Power for Common Areas',
      'Intercom & Video Door Phone'
    ],
    specifications: {
      ageOfProperty: '3 Years',
      tenantPreference: 'Direct Families & Doctors',
      balconies: '2 Balconies with Greenery',
      ceilingHeight: '11 ft',
      maintenanceIncluded: true,
      curatorNote: 'Architect-designed biophilic residence with wrap-around cantilevered private gardens, open double-height reception, and bespoke Italian marble finishes.'
    },
    coordinates: {
      lat: 19.0601,
      lng: 72.829
    },
    distanceFromUser: '1.4 KM away',
    featured: true
  },
  {
    id: 'NB-JHU-542',
    title: 'Solitaire Crest Penthouse',
    hindiTitle: '4 बीएचके स्काई विला - जुहू तारा रोड',
    purpose: 'buy',
    propertyType: 'penthouse',
    price: 65000000,
    priceFormatted: '₹6.50 Cr',
    pricePerSqFt: '₹18,055 / sq.ft',
    brokerageSaved: 'Save ₹13.0 Lakh Brokerage',
    location: 'Juhu Tara Road, Mumbai',
    city: 'Mumbai',
    subLocality: 'Juhu',
    bhk: '4 BHK Sky Villa',
    carpetArea: '3,600 sq.ft',
    bathrooms: 5,
    parking: '3 Covered Spaces',
    floor: 'Top Floor Duplex',
    status: 'Ready to Move',
    furnishing: 'Fully Furnished',
    facing: 'Direct Arabian Sea',
    images: [
      seaviewPool,
      heroVilla,
      interiorLiving,
      propertyBandra
    ],
    owner: {
      name: 'Vikramaditya Roy',
      phone: '+91 98330 99420',
      verifiedTitle: true,
      directOwner: true,
      responseTime: '~10 mins',
      rating: 4.98
    },
    amenities: [
      'Private Rooftop Infinity Plunge Pool',
      'Barbecue Deck & Gazebo',
      'Italian Statuario Marble Flooring',
      'Smart Home Automation System',
      'Staff Quarters with Attached Bath'
    ],
    specifications: {
      ageOfProperty: 'Brand New',
      tenantPreference: 'Direct Buyers Only (No Brokers)',
      balconies: 'Massive 800 sq.ft Sky Terrace',
      ceilingHeight: '14 ft',
      maintenanceIncluded: true,
      curatorNote: 'Panoramic direct sea frontage with 270-degree views of Juhu beach and the glittering city skyline. Direct title verification completed.'
    },
    coordinates: {
      lat: 19.0988,
      lng: 72.8265
    },
    distanceFromUser: '4.5 KM away',
    featured: true
  },
  {
    id: 'NB-CTR-810',
    title: 'The Coastal Horizon Villa Residence',
    hindiTitle: '4.5 बीएचके प्राइवेट विला - कार्टर रोड',
    purpose: 'rent',
    propertyType: 'house',
    price: 375000,
    priceFormatted: '₹3,75,000 / month',
    deposit: '3 Months (₹11,25,000)',
    brokerageSaved: 'Save ₹7.5 Lakh Brokerage',
    location: 'Carter Road Seaside Strip, Bandra West, Mumbai',
    city: 'Mumbai',
    subLocality: 'Bandra West',
    bhk: '4.5 BHK Villa',
    carpetArea: '5,400 sq.ft',
    bathrooms: 5,
    parking: '3 Private Stalls',
    floor: 'G+2 Standalone Villa',
    status: 'Within 15 Days Move-in',
    furnishing: 'Fully Furnished',
    facing: 'West (Oceanfront)',
    images: [
      heroVilla,
      seaviewPool,
      interiorLiving
    ],
    owner: {
      name: 'Mrs. Sunita Singhania',
      phone: '+91 98211 55601',
      verifiedTitle: true,
      directOwner: true,
      responseTime: '~20 mins',
      rating: 4.88
    },
    amenities: [
      '20-meter Heated Infinity Lap Pool',
      'Private Landscaped Lawn & Courtyard',
      'Wine Cellar & Chef Kitchen',
      'Solar Rooftop Grid',
      'Full Biometric Security'
    ],
    specifications: {
      ageOfProperty: '4 Years',
      tenantPreference: 'Corporate Lease Preferred',
      balconies: 'Cantilevered Sunset Terrace',
      ceilingHeight: '13 ft',
      maintenanceIncluded: true,
      curatorNote: 'Private 20-meter heated infinity lap pool, cantilevered sunset terrace facing the Arabian Sea, integrated smart automation, and independent quarters for estate staff.'
    },
    coordinates: {
      lat: 19.0682,
      lng: 72.8214
    },
    distanceFromUser: '2.1 KM away',
    featured: true
  },
  {
    id: 'NB-PRY-305',
    title: 'The Atrium House on Perry Cross',
    hindiTitle: '3 बीएचके मॉडर्न जापानी-स्कैंडी लॉफ्ट - पेरी क्रॉस रोड',
    purpose: 'rent',
    propertyType: 'flat',
    price: 195000,
    priceFormatted: '₹1,95,000 / month',
    deposit: '2 Months (₹3,90,000)',
    brokerageSaved: 'Save ₹3.9 Lakh Brokerage',
    location: 'Perry Cross Road, Bandra West, Mumbai',
    city: 'Mumbai',
    subLocality: 'Bandra West',
    bhk: '3 BHK',
    carpetArea: '1,980 sq.ft',
    bathrooms: 3,
    parking: '2 Stilt Covered',
    floor: '6th Floor',
    status: 'Immediate Move-in',
    furnishing: 'Semi-Furnished',
    facing: 'East-West Cross Ventilation',
    images: [
      interiorLiving,
      propertyBandra,
      heroVilla
    ],
    owner: {
      name: 'Rajesh & Malini Sharma',
      phone: '+91 98700 81234',
      verifiedTitle: true,
      directOwner: true,
      responseTime: '~10 mins',
      rating: 4.92
    },
    amenities: [
      'Double-Height Living Ceiling',
      'EV Fast Charger Point',
      'Italian Modulnova Kitchen',
      'Wooden Sunken Bathtub in Master Suite',
      'High Speed Fiber Internet Ready'
    ],
    specifications: {
      ageOfProperty: '1 Year',
      tenantPreference: 'Couples / Families / Founders',
      balconies: 'Extended Garden Balcony',
      ceilingHeight: '13.5 ft Living Room',
      maintenanceIncluded: true,
      curatorNote: 'Curated architectural volume with warm wooden accents, double height living area and quiet residential pocket in Bandra West.'
    },
    coordinates: {
      lat: 19.0575,
      lng: 72.8272
    },
    distanceFromUser: '1.6 KM away',
    featured: false
  },
  {
    id: 'NB-BKC-601',
    title: 'Grade-A Commercial Boutique Headquarters',
    hindiTitle: 'कमर्शियल ऑफिस स्पेस - बीकेसी जी-ब्लॉक',
    purpose: 'commercial',
    propertyType: 'office',
    price: 420000,
    priceFormatted: '₹4,20,000 / month',
    deposit: '6 Months Interest-Free Deposit',
    brokerageSaved: 'Save ₹8.4 Lakh Brokerage',
    location: 'G-Block, Bandra Kurla Complex (BKC), Mumbai',
    city: 'Mumbai',
    subLocality: 'BKC',
    bhk: 'Office Suite (36 Workstations)',
    carpetArea: '3,200 sq.ft',
    bathrooms: 4,
    parking: '4 Basement Reserved Stalls',
    floor: '9th Floor (Corner Suite)',
    status: 'Ready to Move',
    furnishing: 'Fully Furnished',
    facing: 'North-East',
    images: [
      interiorLiving,
      propertyBandra
    ],
    owner: {
      name: 'Aditya Birla Realty Trust (Direct Landlord)',
      phone: '+91 99300 23456',
      verifiedTitle: true,
      directOwner: true,
      responseTime: '~15 mins',
      rating: 4.96
    },
    amenities: [
      'LEED Platinum Certified Building',
      'Executive Boardroom with 85-inch VC Screen',
      'Acoustic Phone Booths',
      'Centralised Air Handling & HEPA Filtration',
      '24/7 Security Access Card Turnstiles'
    ],
    specifications: {
      ageOfProperty: '2 Years',
      tenantPreference: 'Tech MNCs, Hedge Funds, Law Firms',
      balconies: 'Central Breakout Sky Terrace',
      ceilingHeight: '11.5 ft',
      maintenanceIncluded: false,
      curatorNote: 'Prime BKC business district address directly opposite US Consulate. Plug-and-play setup for high velocity teams without broker commission.'
    },
    coordinates: {
      lat: 19.066,
      lng: 72.868
    },
    distanceFromUser: '5.2 KM away',
    featured: true
  },
  {
    id: 'NB-BLR-102',
    title: 'Indiranagar Architectural Garden Villa',
    hindiTitle: 'लक्ज़री 4 बीएचके गार्डन विला - इंदिरानगर बैंगलोर',
    purpose: 'rent',
    propertyType: 'house',
    price: 185000,
    priceFormatted: '₹1,85,000 / month',
    deposit: '3 Months (₹5,55,000)',
    brokerageSaved: 'Save ₹3.7 Lakh Brokerage',
    location: 'Defence Colony, Indiranagar, Bengaluru',
    city: 'Bangalore',
    subLocality: 'Indiranagar',
    bhk: '4 BHK Independent Villa',
    carpetArea: '3,800 sq.ft',
    bathrooms: 4,
    parking: '2 Covered Car Parks',
    floor: 'G+1 Standalone',
    status: 'Immediate Move-in',
    furnishing: 'Fully Furnished',
    facing: 'East Facing Vastu Compliant',
    images: [
      heroVilla,
      interiorLiving,
      seaviewPool
    ],
    owner: {
      name: 'Ananya Swaminathan',
      phone: '+91 97400 12890',
      verifiedTitle: true,
      directOwner: true,
      responseTime: '~8 mins',
      rating: 4.94
    },
    amenities: [
      'Private Courtyard with 50-year-old Mango Tree',
      'Rainwater Harvesting & Solar Water Heaters',
      'Teak Wood Finishes & Skylights',
      'Quiet Tree-Lined Residential Avenue',
      'Walk to 100ft Road Cafes'
    ],
    specifications: {
      ageOfProperty: '5 Years Renovated',
      tenantPreference: 'Tech Executives & Families',
      balconies: 'Garden Facing Verandah',
      ceilingHeight: '12 ft',
      maintenanceIncluded: true,
      curatorNote: 'Serene oasis in Bangalore’s premier neighbourhood. Completely direct listing from owner who lives abroad and seeks mindful tenants.'
    },
    coordinates: {
      lat: 12.9784,
      lng: 77.6408
    },
    distanceFromUser: 'Bengaluru Metro Center',
    featured: false
  },
  {
    id: 'NB-KRM-441',
    title: 'The Courtyard Studio & Co-Living Sanctuary',
    hindiTitle: 'प्राइवेट पीजी व स्टूडियो - कोरमंगला 4th ब्लॉक',
    purpose: 'rent',
    propertyType: 'pg',
    price: 28000,
    priceFormatted: '₹28,000 / month',
    deposit: '1 Month Deposit Only',
    brokerageSaved: 'Save ₹28,000 Brokerage',
    location: '4th Block, Koramangala, Bengaluru',
    city: 'Bangalore',
    subLocality: 'Koramangala',
    bhk: 'Private 1 RK Studio',
    carpetArea: '480 sq.ft',
    bathrooms: 1,
    parking: 'Dedicated 2-Wheeler / 1 Car Stalls',
    floor: '2nd Floor with Elevator',
    status: 'Immediate Move-in',
    furnishing: 'Fully Furnished',
    facing: 'North',
    images: [
      interiorLiving,
      propertyBandra
    ],
    owner: {
      name: 'Karthik Ramanathan',
      phone: '+91 99800 66321',
      verifiedTitle: true,
      directOwner: true,
      responseTime: '~10 mins',
      rating: 4.9
    },
    amenities: [
      'Ultra-fast 300 Mbps Dedicated WiFi',
      'Housekeeping 3x Weekly Included',
      'Work Desk & Ergonomic Herman Miller Chair',
      'Kitchenette with Microwave & Induction',
      'Laundromat on Rooftop Terrace'
    ],
    specifications: {
      ageOfProperty: '1 Year',
      tenantPreference: 'Founders, Product Designers & Engineers',
      balconies: 'Private Juliet Balcony',
      ceilingHeight: '10 ft',
      maintenanceIncluded: true,
      curatorNote: 'Zero hassle, zero brokerage coliving suite designed for Bangalore professionals wanting calm work-from-home sanctuary.'
    },
    coordinates: {
      lat: 12.9345,
      lng: 77.6256
    },
    distanceFromUser: 'Koramangala Hub',
    featured: false
  }
];

export const CITIES = [
  'Mumbai',
  'Delhi NCR',
  'Bangalore',
  'Pune',
  'Hyderabad',
  'Chennai',
  'Kolkata'
];

export const LOCALITIES_BY_CITY: Record<string, string[]> = {
  Mumbai: ['Bandra West', 'Worli Sea Face', 'Pali Hill', 'Juhu', 'BKC', 'Andheri West', 'Powai', 'Lower Parel', 'Marine Drive'],
  'Delhi NCR': ['Golf Course Road (Gurgaon)', 'Cyber City', 'Greater Kailash', 'Vasant Vihar', 'Defence Colony', 'Noida Sector 62'],
  Bangalore: ['Indiranagar', 'Koramangala', 'HSR Layout', 'Whitefield', 'Lavelle Road', 'Sadashivanagar'],
  Pune: ['Koregaon Park', 'Kalyani Nagar', 'Baner', 'Viman Nagar', 'Aundh'],
  Hyderabad: ['Jubilee Hills', 'Banjara Hills', 'HITEC City', 'Gachibowli', 'Madhapur']
};
