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
  },
  {
    id: 'NB-DEL-801',
    title: 'The Camellias Grand Sky Suite',
    hindiTitle: 'लक्ज़री 4 बीएचके स्काई सुइट - गोल्फ कोर्स रोड, गुड़गांव',
    purpose: 'rent',
    propertyType: 'penthouse',
    price: 350000,
    priceFormatted: '₹3,50,000 / month',
    deposit: '2 Months (₹7,00,000)',
    brokerageSaved: 'Save ₹7.0 Lakh Brokerage',
    location: 'Golf Course Road, DLF Phase 5, Gurgaon',
    city: 'Delhi NCR',
    subLocality: 'Golf Course Road (Gurgaon)',
    bhk: '4 BHK Sky Suite',
    carpetArea: '4,200 sq.ft',
    bathrooms: 5,
    parking: '3 Reserved Covered Slots',
    floor: '22nd Floor (Golf Course View)',
    status: 'Immediate Move-in',
    furnishing: 'Fully Furnished',
    facing: 'North-East (Panoramic Golf Greens)',
    images: [
      heroVilla,
      interiorLiving,
      propertyBandra,
      seaviewPool
    ],
    owner: {
      name: 'Col. Vikramaditya Rathore',
      phone: '+91 98110 44210',
      verifiedTitle: true,
      directOwner: true,
      responseTime: '~10 mins',
      rating: 4.96,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    amenities: [
      'Championship Golf Course Facing',
      'Private Temperature Controlled Plunge Pool',
      'Concierge Desk & 5-Tier Biometric Security',
      'Helipad Access & Electric Vehicle Superchargers',
      'Clubhouse with Michelin-Starred Dining Pavilion'
    ],
    specifications: {
      ageOfProperty: '1 Year (Mint Condition)',
      tenantPreference: 'Corporate Executives & Diplomatic Corps',
      balconies: 'Double-Height Golf Deck',
      ceilingHeight: '13 ft Clear Height',
      maintenanceIncluded: true,
      curatorNote: 'Direct owner architectural residence overlooking the signature Arnold Palmer golf greens. Custom Italian marble and acoustic triple-glazed windows.'
    },
    coordinates: {
      lat: 28.4595,
      lng: 77.0945
    },
    distanceFromUser: 'Golf Course Corridor',
    featured: true
  },
  {
    id: 'NB-DEL-802',
    title: 'Heritage Courtyard Bungalow',
    hindiTitle: '4 बीएचके हेरिटेज विला - वसंत विहार, नई दिल्ली',
    purpose: 'buy',
    propertyType: 'house',
    price: 125000000,
    priceFormatted: '₹12.50 Cr',
    pricePerSqFt: '₹22,727 / sq.ft',
    deposit: 'Direct Title Deed Authentication Ready',
    brokerageSaved: 'Save ₹25.0 Lakh Brokerage',
    location: 'Block C, Vasant Vihar, New Delhi',
    city: 'Delhi NCR',
    subLocality: 'Vasant Vihar',
    bhk: '4 BHK Luxury Villa',
    carpetArea: '5,500 sq.ft',
    bathrooms: 5,
    parking: '4 Stilt Bays',
    floor: 'G+2 Standalone',
    status: 'Ready to Move',
    furnishing: 'Bespoke Bare',
    facing: 'North Facing Vastu Compliant',
    images: [
      propertyBandra,
      heroVilla,
      interiorLiving
    ],
    owner: {
      name: 'Justice H. N. Khanna (Retd.)',
      phone: '+91 98101 22987',
      verifiedTitle: true,
      directOwner: true,
      responseTime: '~15 mins',
      rating: 5.0
    },
    amenities: [
      'Private Landscaped Teak Courtyard',
      'Solar Rooftop Grid & 100% Power Generator',
      'Staff Quarters with Separate Foyer',
      'Gated Diplomatic Enclave Security'
    ],
    specifications: {
      ageOfProperty: '3 Years (Newly Reconstructed)',
      tenantPreference: 'Direct Families & High Net Worth Individuals',
      balconies: 'Wrap-Around Terrace',
      ceilingHeight: '12 ft',
      maintenanceIncluded: true,
      curatorNote: 'Premier South Delhi residential enclave. Freehold registered title deed with zero broker fee.'
    },
    coordinates: {
      lat: 28.5583,
      lng: 77.1637
    },
    distanceFromUser: 'Vasant Vihar Embassy Arc',
    featured: true
  },
  {
    id: 'NB-PUN-701',
    title: 'The Forest View Manor',
    hindiTitle: '3.5 बीएचके मॉडर्न अपार्टमेंट - कोरेगांव पार्क, पुणे',
    purpose: 'rent',
    propertyType: 'flat',
    price: 95000,
    priceFormatted: '₹95,000 / month',
    deposit: '2 Months (₹1,90,000)',
    brokerageSaved: 'Save ₹1.9 Lakh Brokerage',
    location: 'Lane 7, Koregaon Park, Pune',
    city: 'Pune',
    subLocality: 'Koregaon Park',
    bhk: '3.5 BHK',
    carpetArea: '2,200 sq.ft',
    bathrooms: 3,
    parking: '2 Covered Slots',
    floor: '8th Floor',
    status: 'Immediate Move-in',
    furnishing: 'Fully Furnished',
    facing: 'North-East (Green Canopy)',
    images: [
      interiorLiving,
      heroVilla,
      seaviewPool
    ],
    owner: {
      name: 'Suhasini Kulkarni',
      phone: '+91 98220 89412',
      verifiedTitle: true,
      directOwner: true,
      responseTime: '~5 mins',
      rating: 4.95
    },
    amenities: [
      'Tree-Top Canopy View Balcony',
      'German Modular Kitchen with Dishwasher',
      'Clubhouse & Rooftop Swimming Pool',
      'Piped Natural Gas (MNGL) Connected'
    ],
    specifications: {
      ageOfProperty: '2 Years',
      tenantPreference: 'Families & Working Professionals',
      balconies: '2 Spacious Balconies',
      ceilingHeight: '11 ft',
      maintenanceIncluded: true,
      curatorNote: 'Quiet sanctuary in prime Koregaon Park. Walking distance to boutique cafes, organic bakeries, and yoga ashrams.'
    },
    coordinates: {
      lat: 18.5362,
      lng: 73.894
    },
    distanceFromUser: 'KP North Main Road',
    featured: true
  },
  {
    id: 'NB-HYD-901',
    title: 'The Jubilee Panorama Sky Mansion',
    hindiTitle: '4 बीएचके स्काई मेंशन - जुबली हिल्स, हैदराबाद',
    purpose: 'buy',
    propertyType: 'penthouse',
    price: 78000000,
    priceFormatted: '₹7.80 Cr',
    pricePerSqFt: '₹16,250 / sq.ft',
    deposit: 'Direct Registration Ready',
    brokerageSaved: 'Save ₹15.6 Lakh Brokerage',
    location: 'Road No. 36, Jubilee Hills, Hyderabad',
    city: 'Hyderabad',
    subLocality: 'Jubilee Hills',
    bhk: '4 BHK Sky Mansion',
    carpetArea: '4,800 sq.ft',
    bathrooms: 5,
    parking: '3 Basement Bays',
    floor: '16th Floor (Durgam Cheruvu Lake View)',
    status: 'Ready to Move',
    furnishing: 'Semi-Furnished',
    facing: 'East Facing Vastu',
    images: [
      seaviewPool,
      propertyBandra,
      interiorLiving
    ],
    owner: {
      name: 'V. Chandrashekar Rao',
      phone: '+91 98490 33811',
      verifiedTitle: true,
      directOwner: true,
      responseTime: '~10 mins',
      rating: 4.98
    },
    amenities: [
      'Unobstructed Durgam Cheruvu Lake Vistas',
      'Private Heated Infinity Pool on Terrace',
      'Biometric Keyless Entry System',
      '100% Power Backup & Water Softener Plant'
    ],
    specifications: {
      ageOfProperty: 'Brand New (OC Granted)',
      tenantPreference: 'Direct Buyers Only',
      balconies: 'Panoramic Lake Deck',
      ceilingHeight: '13 ft',
      maintenanceIncluded: true,
      curatorNote: 'Elite Jubilee Hills residential tower. Direct transaction with property owner with zero brokerage fee.'
    },
    coordinates: {
      lat: 17.4319,
      lng: 78.4073
    },
    distanceFromUser: 'Jubilee Hills Checkpost',
    featured: true
  },
  {
    id: 'NB-JPR-701',
    title: 'The Royal Rajputana Heritage Villa',
    hindiTitle: 'राजपूताना हेरिटेज विला - वैशाली नगर, जयपुर',
    purpose: 'buy',
    propertyType: 'house',
    price: 34500000,
    priceFormatted: '₹3.45 Cr',
    pricePerSqFt: '₹7,666 / sq.ft',
    deposit: 'Direct Registration Ready',
    brokerageSaved: 'Save ₹6.9 Lakh Brokerage',
    location: 'Amrapali Marg, Vaishali Nagar, Jaipur',
    city: 'Jaipur',
    subLocality: 'Vaishali Nagar',
    bhk: '4 BHK Luxury Independent Villa',
    carpetArea: '4,500 sq.ft',
    bathrooms: 5,
    parking: '3 Covered Car Bays',
    floor: 'G + 2 Independent Bungalow',
    status: 'Ready to Move',
    furnishing: 'Fully Furnished',
    facing: 'North-East (Vastu Compliant)',
    images: [
      heroVilla,
      interiorLiving,
      propertyBandra,
      seaviewPool
    ],
    owner: {
      name: 'Thakur Mahendra Singh Rathore',
      phone: '+91 94140 82914',
      verifiedTitle: true,
      directOwner: true,
      responseTime: '~10 mins',
      rating: 4.97,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    amenities: [
      'Private Landscaped Lawn & Courtyard',
      'Solar Rooftop Power System',
      'Vastu Compliant Architecture',
      'Italian Marble & Teak Wood Finish',
      '24x7 Security & CCTV Surveillance',
      'Covered Parking for 3 Sedans/SUVs'
    ],
    specifications: {
      ageOfProperty: '1 Year (Mint Condition)',
      tenantPreference: 'Direct Families & HNIs Only',
      balconies: '3 Heritage Jharokha Balconies',
      ceilingHeight: '12.5 ft High Ceiling',
      maintenanceIncluded: true,
      curatorNote: 'Authentic regal Rajasthani palatial styling blended with ultra-modern smart home amenities in prime Vaishali Nagar. Direct deal with owner, zero brokerage.'
    },
    coordinates: {
      lat: 26.9065,
      lng: 75.7428
    },
    distanceFromUser: 'Amrapali Circle (0.5 km)',
    featured: true
  },
  {
    id: 'NB-JPR-702',
    title: 'The C-Scheme Imperial Sky Residence',
    hindiTitle: 'लक्ज़री 3 बीएचके स्काई पेंटहाउस - सी-स्कीम, जयपुर',
    purpose: 'rent',
    propertyType: 'penthouse',
    price: 68000,
    priceFormatted: '₹68,000 / month',
    deposit: '2 Months (₹1,36,000)',
    brokerageSaved: '₹1,36,000 (Saved)',
    location: 'Subhash Marg, C-Scheme, Central Jaipur',
    city: 'Jaipur',
    subLocality: 'C-Scheme',
    bhk: '3 BHK Sky Penthouse',
    carpetArea: '2,900 sq.ft',
    bathrooms: 3,
    parking: '2 Reserved Basement Slots',
    floor: '11th Floor (Central Park View)',
    status: 'Immediate Move-in',
    furnishing: 'Fully Furnished',
    facing: 'East (Sunrise & Central Park)',
    images: [
      propertyBandra,
      interiorLiving,
      seaviewPool,
      heroVilla
    ],
    owner: {
      name: 'Dr. Alok Khandelwal',
      phone: '+91 98290 41120',
      verifiedTitle: true,
      directOwner: true,
      responseTime: '~15 mins',
      rating: 4.94,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    },
    amenities: [
      'Private Terrace Garden with Jacuzzi',
      'Panoramic Central Park Greenery Views',
      'Keyless Biometric Entry',
      'Modular German Kitchen with Chimney',
      '100% Automatic Generator Power Backup'
    ],
    specifications: {
      ageOfProperty: '2 Years Old',
      tenantPreference: 'Doctors, Senior Executives, Diplomatic Expats',
      balconies: 'Panoramic Wrap-Around Terrace',
      ceilingHeight: '11 ft Clear Ceiling',
      maintenanceIncluded: true,
      curatorNote: 'Elite address in C-Scheme next to Central Park and Statute Circle. High acoustic isolation, luxury furniture, and round-the-clock security.'
    },
    coordinates: {
      lat: 26.9124,
      lng: 75.8032
    },
    distanceFromUser: 'Statue Circle / Central Park (0.3 km)',
    featured: true
  },
  {
    id: 'NB-JPR-703',
    title: 'WTP Boulevard Emerald Flat',
    hindiTitle: 'प्रीमियम 3 बीएचके फ्लैट - मालवीय नगर (WTP के पास)',
    purpose: 'rent',
    propertyType: 'flat',
    price: 36000,
    priceFormatted: '₹36,000 / month',
    deposit: '2 Months (₹72,000)',
    brokerageSaved: '₹72,000 (Saved)',
    location: 'Near World Trade Park, Calgiri Marg, Malviya Nagar, Jaipur',
    city: 'Jaipur',
    subLocality: 'Malviya Nagar',
    bhk: '3 BHK Modern Apartment',
    carpetArea: '1,950 sq.ft',
    bathrooms: 3,
    parking: '1 Covered Stilt + 1 Open',
    floor: '6th Floor of 12',
    status: 'Ready to Move',
    furnishing: 'Semi-Furnished',
    facing: 'North Facing',
    images: [
      interiorLiving,
      heroVilla,
      propertyBandra,
      seaviewPool
    ],
    owner: {
      name: 'Mrs. Sunita Sharma',
      phone: '+91 97840 55182',
      verifiedTitle: true,
      directOwner: true,
      responseTime: '~20 mins',
      rating: 4.88,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
    },
    amenities: [
      'Walking Distance to World Trade Park (WTP) & Gaurav Tower',
      'Clubhouse with Swimming Pool & Gym',
      'Gated Community with Intercom',
      'Piped Gas Connection (IGL/GAIL)',
      'Kids Play Area & Senior Citizen Sitting Pocket'
    ],
    specifications: {
      ageOfProperty: '3 Years Old',
      tenantPreference: 'Families & Working IT Professionals',
      balconies: '2 Extended Balconies',
      ceilingHeight: '10.5 ft',
      maintenanceIncluded: true,
      curatorNote: 'Prime Malviya Nagar location near top schools, hospitals (Fortis & Apex), and retail centers. Clean title, direct deal.'
    },
    coordinates: {
      lat: 26.8532,
      lng: 75.8052
    },
    distanceFromUser: 'World Trade Park (WTP) (400m)',
    featured: false
  },
  {
    id: 'NB-JPR-704',
    title: 'Mahalaxmi Gated Kothi',
    hindiTitle: 'स्वतंत्र 4 बीएचके कोठी - जगतपुरा, जयपुर',
    purpose: 'buy',
    propertyType: 'house',
    price: 17500000,
    priceFormatted: '₹1.75 Cr',
    pricePerSqFt: '₹5,468 / sq.ft',
    deposit: 'Direct Sale / JDA Approved',
    brokerageSaved: 'Save ₹3.5 Lakh Brokerage',
    location: 'Near Bombay Hospital, Jagatpura, Jaipur',
    city: 'Jaipur',
    subLocality: 'Jagatpura',
    bhk: '4 BHK Independent Duplex Kothi',
    carpetArea: '3,200 sq.ft',
    bathrooms: 4,
    parking: '2 Car Covered Porch',
    floor: 'Ground + 1 Floor',
    status: 'Ready to Move',
    furnishing: 'Semi-Furnished',
    facing: 'East Facing Vastu',
    images: [
      heroVilla,
      propertyBandra,
      interiorLiving,
      seaviewPool
    ],
    owner: {
      name: 'Er. Rajesh Choudhary',
      phone: '+91 96020 77341',
      verifiedTitle: true,
      directOwner: true,
      responseTime: '~8 mins',
      rating: 4.96,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80'
    },
    amenities: [
      '100% JDA Approved & Loan Ready',
      'Wide 40 Feet Road Frontage',
      'Dual Modular Kitchens (Ground + 1st Floor)',
      'Submersible Deep Borewell + Municipal Water',
      'Private Terrace with Sit-out Gazebo'
    ],
    specifications: {
      ageOfProperty: 'Brand New (Never Occupied)',
      tenantPreference: 'Direct Buyers Only',
      balconies: 'Front Sun Deck & Back Utility',
      ceilingHeight: '11.5 ft',
      maintenanceIncluded: true,
      curatorNote: 'High construction quality using Grade-A steel and ultra-tech cement. Located in peaceful Jagatpura close to Airport and Mahal Road.'
    },
    coordinates: {
      lat: 26.8245,
      lng: 75.8361
    },
    distanceFromUser: 'Bombay Hospital Jagatpura (0.8 km)',
    featured: true
  },
  {
    id: 'NB-JPR-705',
    title: 'Jaipur Silicon Tech Tower Office',
    hindiTitle: 'फुल्ली फर्निश्ड आईटी व कॉर्पोरेट ऑफिस - टोंक रोड, जयपुर',
    purpose: 'commercial',
    propertyType: 'office',
    price: 115000,
    priceFormatted: '₹1,15,000 / month',
    deposit: '3 Months (₹3,45,000)',
    brokerageSaved: '₹2,30,000 (Saved)',
    location: 'Near Tonk Phatak & Gopalpura, Tonk Road, Jaipur',
    city: 'Jaipur',
    subLocality: 'Tonk Road',
    bhk: 'Commercial Corporate Floor (38 Workstations + 2 Cabins)',
    carpetArea: '3,400 sq.ft',
    bathrooms: 3,
    parking: '4 Reserved Stilt Spaces',
    floor: '4th Floor (Glass Façade)',
    status: 'Immediate Move-in',
    furnishing: 'Fully Furnished',
    facing: 'Main Road Frontage',
    images: [
      interiorLiving,
      propertyBandra,
      heroVilla
    ],
    owner: {
      name: 'Gaurav Agarwal (Proprietor)',
      phone: '+91 98280 19283',
      verifiedTitle: true,
      directOwner: true,
      responseTime: '~12 mins',
      rating: 4.92,
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80'
    },
    amenities: [
      '38 Ergonomic Workstations + 2 Executive Cabins',
      '12-Seater Boardroom with Video Conferencing TV',
      'Server Room with Dedicated Fiber Redundancy',
      'Cafeteria & Pantry Area',
      'High Speed Twin Elevators'
    ],
    specifications: {
      ageOfProperty: '1.5 Years Old',
      tenantPreference: 'Tech Startups, Financial Consulting, EdTech',
      balconies: 'Side Utility / Smoking Zone',
      ceilingHeight: '11 ft Acoustic Grid',
      maintenanceIncluded: true,
      curatorNote: 'Plug & Play corporate setup on prime arterial Tonk Road. Unmatched transit connectivity for tech and consulting operations.'
    },
    coordinates: {
      lat: 26.8782,
      lng: 75.7954
    },
    distanceFromUser: 'Tonk Phatak Flyover (0.2 km)',
    featured: false
  },
  {
    id: 'NB-JPR-706',
    title: 'Mansarovar Metro Green View Flat',
    hindiTitle: '2 बीएचके रेडी फ्लैट - मेट्रो स्टेशन के पास, मानसरोवर, जयपुर',
    purpose: 'rent',
    propertyType: 'flat',
    price: 22000,
    priceFormatted: '₹22,000 / month',
    deposit: '2 Months (₹44,000)',
    brokerageSaved: '₹44,000 (Saved)',
    location: 'Near Mansarovar Metro Station, Bhrigu Path, Mansarovar, Jaipur',
    city: 'Jaipur',
    subLocality: 'Mansarovar',
    bhk: '2 BHK Airy Residence',
    carpetArea: '1,280 sq.ft',
    bathrooms: 2,
    parking: '1 Covered Dedicated Slot',
    floor: '3rd Floor of 7',
    status: 'Immediate Move-in',
    furnishing: 'Fully Furnished',
    facing: 'North Facing',
    images: [
      interiorLiving,
      heroVilla,
      propertyBandra
    ],
    owner: {
      name: 'Vikram Joshi',
      phone: '+91 94142 66091',
      verifiedTitle: true,
      directOwner: true,
      responseTime: '~18 mins',
      rating: 4.85,
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80'
    },
    amenities: [
      '500 Meters from Mansarovar Metro Station',
      'Furnished with Beds, Sofa, Fridge, RO Water & Geysers',
      'Round the clock Security Guard & Lift',
      'Low Society Maintenance'
    ],
    specifications: {
      ageOfProperty: '4 Years Old',
      tenantPreference: 'Families or Working Professionals',
      balconies: '2 Road-Facing Balconies',
      ceilingHeight: '10 ft',
      maintenanceIncluded: true,
      curatorNote: 'Spacious and well-ventilated apartment in Asia’s largest residential sector. Quick direct handover by landlord.'
    },
    coordinates: {
      lat: 26.8619,
      lng: 75.7612
    },
    distanceFromUser: 'Mansarovar Metro Station (500m)',
    featured: false
  },
  {
    id: 'NB-JPR-707',
    title: 'Bani Park Heritage Boutique Residency',
    hindiTitle: 'आधुनिक 3 बीएचके फ्लैट - बनी पार्क, जयपुर',
    purpose: 'buy',
    propertyType: 'flat',
    price: 12500000,
    priceFormatted: '₹1.25 Cr',
    pricePerSqFt: '₹6,097 / sq.ft',
    deposit: 'Freehold Title Verified',
    brokerageSaved: 'Save ₹2.5 Lakh Brokerage',
    location: 'D-Block, Madho Singh Road, Bani Park, Jaipur',
    city: 'Jaipur',
    subLocality: 'Bani Park',
    bhk: '3 BHK Boutique Apartment',
    carpetArea: '2,050 sq.ft',
    bathrooms: 3,
    parking: '2 Covered Car Spaces',
    floor: '2nd Floor of 5',
    status: 'Ready to Move',
    furnishing: 'Semi-Furnished',
    facing: 'East (Park Facing)',
    images: [
      seaviewPool,
      interiorLiving,
      propertyBandra,
      heroVilla
    ],
    owner: {
      name: 'Pradeep Mathur',
      phone: '+91 98291 50024',
      verifiedTitle: true,
      directOwner: true,
      responseTime: '~14 mins',
      rating: 4.93,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
    },
    amenities: [
      'Overlooking Lush Green Municipal Colony Park',
      'Exclusive 1 Flat Per Floor Boutique Building',
      'Automated Stilt Parking Gates',
      'Proximity to Jaipur Junction Railway Station & MI Road'
    ],
    specifications: {
      ageOfProperty: 'Under 2 Years Old',
      tenantPreference: 'Direct Buyers Only',
      balconies: '2 Park-Facing Balconies',
      ceilingHeight: '11 ft',
      maintenanceIncluded: true,
      curatorNote: 'Quiet tree-lined residential enclave of Old Bani Park. Prestigious neighborhood with direct access to collectorate and MI Road.'
    },
    coordinates: {
      lat: 26.9298,
      lng: 75.7925
    },
    distanceFromUser: 'Collectorate Circle (0.6 km)',
    featured: true
  },
  {
    id: 'NB-JPR-708',
    title: 'Raja Park High-Street Retail Floor',
    hindiTitle: 'कमर्शियल रिटेल / क्लिनिक स्पेस - राजा पार्क, जयपुर',
    purpose: 'commercial',
    propertyType: 'office',
    price: 75000,
    priceFormatted: '₹75,000 / month',
    deposit: '3 Months (₹2,25,000)',
    brokerageSaved: '₹1,50,000 (Saved)',
    location: 'Lane No. 1, Main Market, Raja Park, Jaipur',
    city: 'Jaipur',
    subLocality: 'Raja Park',
    bhk: 'Retail Showroom / Studio Clinic',
    carpetArea: '1,800 sq.ft',
    bathrooms: 2,
    parking: 'Front Customer Parking',
    floor: 'Ground Floor Direct Access',
    status: 'Immediate Move-in',
    furnishing: 'Fully Furnished',
    facing: 'Main Market Road',
    images: [
      interiorLiving,
      heroVilla,
      propertyBandra
    ],
    owner: {
      name: 'Sanjay Soni',
      phone: '+91 93140 18872',
      verifiedTitle: true,
      directOwner: true,
      responseTime: '~10 mins',
      rating: 4.90,
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80'
    },
    amenities: [
      'Massive Footfall High-Street Location in Raja Park',
      'Toughened Full-Height Glass Display Frontage',
      'Pre-installed Inverter & 3 Phase Commercial Meter',
      'Dedicated Washroom & Stock Storage Room'
    ],
    specifications: {
      ageOfProperty: 'Freshly Renovated',
      tenantPreference: 'Jewelry Brands, Medical Clinics, Cafes, Boutiques',
      balconies: 'N/A Ground Floor',
      ceilingHeight: '12 ft',
      maintenanceIncluded: true,
      curatorNote: 'Prime ground floor retail asset in the bustling heart of Raja Park market. Direct owner lease with straightforward paperwork.'
    },
    coordinates: {
      lat: 26.8972,
      lng: 75.8284
    },
    distanceFromUser: 'Raja Park Main Market (50m)',
    featured: false
  }
];

export const CITIES = [
  'Mumbai',
  'Delhi NCR',
  'Bangalore',
  'Pune',
  'Hyderabad',
  'Jaipur',
  'Chennai',
  'Kolkata'
];

export const LOCALITIES_BY_CITY: Record<string, string[]> = {
  Mumbai: ['Bandra West', 'Worli Sea Face', 'Pali Hill', 'Juhu', 'BKC', 'Andheri West', 'Powai', 'Lower Parel', 'Marine Drive'],
  'Delhi NCR': ['Golf Course Road (Gurgaon)', 'Cyber City', 'Greater Kailash', 'Vasant Vihar', 'Defence Colony', 'Noida Sector 62'],
  Bangalore: ['Indiranagar', 'Koramangala', 'HSR Layout', 'Whitefield', 'Lavelle Road', 'Sadashivanagar'],
  Pune: ['Koregaon Park', 'Kalyani Nagar', 'Baner', 'Viman Nagar', 'Aundh'],
  Hyderabad: ['Jubilee Hills', 'Banjara Hills', 'HITEC City', 'Gachibowli', 'Madhapur'],
  Jaipur: [
    'Vaishali Nagar',
    'Malviya Nagar',
    'C-Scheme (Civil Lines)',
    'Jagatpura',
    'Mansarovar',
    'Raja Park',
    'Bani Park',
    'Tonk Road',
    'Durgapura',
    'Bapu Nagar',
    'Ajmer Road / SEZ',
    'Vidhyadhar Nagar',
    'Gopalpura Bypass'
  ],
  Chennai: ['Boat Club Road', 'Poes Garden', 'Adyar', 'Besant Nagar', 'ECR (East Coast Road)', 'Anna Nagar'],
  Kolkata: ['Ballygunge', 'Alipore', 'Salt Lake Sector V', 'New Town', 'Park Street', 'Southern Avenue']
};
