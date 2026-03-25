export interface User {
  id: string;
  email: string;
  name: string;
  role: 'guest' | 'host' | 'admin';
  avatar?: string;
  bio?: string;
  phone?: string;
  verified?: boolean;
}

export interface Listing {
  id: string;
  hostId: string;
  title: string;
  description: string;
  image: string;
  images: string[];
  location: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities: string[];
  rating: number;
  reviews: number;
  availability: string[];
  type: 'apartment' | 'house' | 'room' | 'villa';
  rules?: string[];
  hostGuide?: string;
  cancellationPolicy?: string;
}

export interface Booking {
  id: string;
  listingId: string;
  hostId: string;
  guestId: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  guests: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  listingId: string;
  guestId: string;
  guestName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Mock Users
export const MOCK_USERS: User[] = [
  {
    id: 'user-guest-1',
    email: 'guest@example.com',
    name: 'Alice Johnson',
    role: 'guest',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    bio: 'Travel enthusiast and adventure seeker',
    phone: '+1 234 567 8900',
    verified: true,
  },
  {
    id: 'user-host-1',
    email: 'host@example.com',
    name: 'Bob Smith',
    role: 'host',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    bio: 'Passionate about hospitality',
    phone: '+1 234 567 8901',
    verified: true,
  },
  {
    id: 'user-admin-1',
    email: 'admin@example.com',
    name: 'Charlie Davis',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    bio: 'Platform administrator',
    phone: '+1 234 567 8902',
    verified: true,
  },
];

// Mock Listings
export const MOCK_LISTINGS: Listing[] = [
  {
    id: 'listing-1',
    hostId: 'user-host-1',
    title: 'Cozy Modern Apartment in Downtown',
    description: 'Beautiful 2-bedroom apartment with stunning city views, modern amenities, and perfect location for exploring the city.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
    ],
    location: '123 Main Street',
    city: 'San Francisco',
    country: 'USA',
    lat: 37.7749,
    lng: -122.4194,
    pricePerNight: 150,
    maxGuests: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 1.5,
    amenities: ['WiFi', 'Kitchen', 'Workspace', 'Heating'], rating: 4.85, reviews: 15, availability: [], type: 'apartment',
    rules: ['No smoking', 'No pets', 'Quiet hours 10PM-8AM', 'No parties'],
    hostGuide: 'Check-in is via the lockbox. The code is 1234. Please leave the keys in the box when you check out.',
    cancellationPolicy: 'Moderate'
  },
  {
    id: 'listing-2', hostId: 'user-host-1',
    title: 'Modern Loft in Downtown',
    description: 'High ceilings, industrial vibes, and walking distance to everything.',
    image: 'https://images.unsplash.com/photo-1536376074432-8bad41d5079a?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1536376074432-8bad41d5079a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1560448204-61dc36dc98ce?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop'
    ],
    location: '200 Main St', city: 'Los Angeles', country: 'USA',
    lat: 34.052, lng: -118.243, pricePerNight: 200, maxGuests: 4, bedrooms: 1, beds: 2, bathrooms: 1,
    amenities: ['WiFi', 'Kitchen', 'Self check-in', 'Gym'], rating: 4.92, reviews: 24, availability: [], type: 'apartment',
    rules: ['No parties', 'Respect the neighbors', 'Trash out on Thursdays'],
    hostGuide: 'Use the smart lock on the front door. I will send you the PIN 24h before arrival.',
    cancellationPolicy: 'Strict'
  },
  {
    id: 'listing-3', hostId: 'user-host-1',
    title: 'Cozy Cottage by the lake',
    description: 'A peaceful retreat with stunning views and private dock access.',
    image: 'https://images.unsplash.com/photo-1449156003053-c3042046bcb5?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1449156003053-c3042046bcb5?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&h=400&fit=crop'
    ],
    location: '123 Lake Rd', city: 'Lake Tahoe', country: 'USA',
    lat: 39.096, lng: -120.033, pricePerNight: 250, maxGuests: 6, bedrooms: 3, beds: 4, bathrooms: 2,
    amenities: ['WiFi', 'Fireplace', 'BBQ Grill', 'Lake Access'], rating: 4.78, reviews: 42, availability: [], type: 'house',
    rules: ['No smoking inside', 'Quiet after 11PM', 'Clean the BBQ after use', 'Pets welcome'],
    hostGuide: 'The cabin is at the end of the dirt road. Watch for deer!',
    cancellationPolicy: 'Flexible'
  },
  // --- ADDITIONAL APARTMENTS ---
  {
    id: 'listing-4', hostId: 'user-host-1',
    title: 'Skyline Penthouse with Private Deck',
    description: 'Breathtaking 360-degree city views from the highest point in downtown.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop'
    ],
    location: '500 Market St', city: 'San Francisco', country: 'USA',
    lat: 37.789, lng: -122.399, pricePerNight: 450, maxGuests: 6, bedrooms: 3, beds: 4, bathrooms: 2.5,
    amenities: ['WiFi', 'Kitchen', 'Elevator', 'Gym', 'Parking'], rating: 4.95, reviews: 12, availability: [], type: 'apartment'
  },
  {
    id: 'listing-5', hostId: 'user-host-1',
    title: 'Industrial Loft in Arts District',
    description: 'Soaring ceilings, exposed brick, and local art in a vibrant neighborhood.',
    image: 'https://images.unsplash.com/photo-1536376074432-8bad41d5079a?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1536376074432-8bad41d5079a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1560448204-61dc36dc98ce?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop'
    ],
    location: '720 Traction Ave', city: 'Los Angeles', country: 'USA',
    lat: 34.045, lng: -118.235, pricePerNight: 180, maxGuests: 3, bedrooms: 1, beds: 2, bathrooms: 1,
    amenities: ['WiFi', 'Kitchen', 'Air Conditioning', 'Pets Allowed'], rating: 4.82, reviews: 29, availability: [], type: 'apartment'
  },
  {
    id: 'listing-6', hostId: 'user-host-1',
    title: 'Sunny Garden Apartment in Chelsea',
    description: 'A peaceful oasis with a private backyard in the heart of Manhattan.',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop'
    ],
    location: '150 W 22nd St', city: 'New York', country: 'USA',
    lat: 40.743, lng: -73.998, pricePerNight: 280, maxGuests: 4, bedrooms: 2, beds: 2, bathrooms: 1,
    amenities: ['WiFi', 'Kitchen', 'Backyard', 'Washer'], rating: 4.75, reviews: 56, availability: [], type: 'apartment'
  },
  {
    id: 'listing-7', hostId: 'user-host-1',
    title: 'Minimalist Tokyo Studio',
    description: 'Clean, efficient design in Shinjuku, steps from the station.',
    image: 'https://images.unsplash.com/photo-1522444195799-478538b28823?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1522444195799-478538b28823?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop'
    ],
    location: 'Shinjuku-ku', city: 'Tokyo', country: 'Japan',
    lat: 35.693, lng: 139.703, pricePerNight: 120, maxGuests: 2, bedrooms: 0, beds: 1, bathrooms: 1,
    amenities: ['WiFi', 'Air Conditioning', 'Elevator'], rating: 4.90, reviews: 104, availability: [], type: 'apartment',
    rules: ['Remove shoes inside', 'No loud music', 'Limit water usage'],
    hostGuide: 'Please use the intercom to call 402 for access.',
    cancellationPolicy: 'Strict'
  },
  {
    id: 'listing-8', hostId: 'user-host-1',
    title: 'Canal-side Flat in Amsterdam',
    description: 'Classic Dutch architecture with modern interiors overlooking Keizersgracht.',
    image: 'https://images.unsplash.com/photo-1449156003053-c3042046bcb5?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1449156003053-c3042046bcb5?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1560448204-61dc36dc98ce?w=600&h=400&fit=crop'
    ],
    location: 'Keizersgracht', city: 'Amsterdam', country: 'Netherlands',
    lat: 52.373, lng: 4.886, pricePerNight: 210, maxGuests: 4, bedrooms: 2, beds: 3, bathrooms: 1,
    amenities: ['WiFi', 'Kitchen', 'Bicycles', 'Heating'], rating: 4.88, reviews: 88, availability: [], type: 'apartment',
    rules: ['Watch your step on steep stairs', 'No smoking', 'Cycles provided'],
    hostGuide: 'Keys are in the mailbox with number 12B.',
    cancellationPolicy: 'Moderate'
  },
  // --- ADDITIONAL VILLAS ---
  {
    id: 'listing-9', hostId: 'user-host-1',
    title: 'Cliffside Estate in Oia',
    description: 'Iconic whitewashed villa with a private infinity pool and Aegean Sea views.',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1620332372374-f108c53d2e03?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=400&fit=crop'
    ],
    location: 'Oia Cliffs', city: 'Santorini', country: 'Greece',
    lat: 36.461, lng: 25.375, pricePerNight: 850, maxGuests: 10, bedrooms: 5, beds: 7, bathrooms: 4,
    amenities: ['Private Pool', 'WiFi', 'Chef Service', 'Gym'], rating: 4.98, reviews: 42, availability: [], type: 'villa',
    rules: ['No diving', 'Please shower before pool', 'Respect the peaceful environment'],
    hostGuide: 'Welcome! The villa manager will meet you at the Oia square.',
    cancellationPolicy: 'Super Strict'
  },
  {
    id: 'listing-10', hostId: 'user-host-1',
    title: 'Bamboo Sanctuary in Ubud',
    description: 'Eco-friendly masterpiece nestled in the lush Balinese jungle.',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop'
    ],
    location: 'Ubud Highlands', city: 'Bali', country: 'Indonesia',
    lat: -8.506, lng: 115.262, pricePerNight: 320, maxGuests: 4, bedrooms: 2, beds: 2, bathrooms: 2,
    amenities: ['Pool', 'WiFi', 'Breakfast Included', 'Daily Cleaning'], rating: 4.94, reviews: 156, availability: [], type: 'villa',
    rules: ['Respect nature', 'No plastic bottles if possible', 'Quiet jungle vibes'],
    hostGuide: 'Our driver will pick you up from DPS airport.',
    cancellationPolicy: 'Moderate'
  },
  {
    id: 'listing-11', hostId: 'user-host-1',
    title: 'Tuscan Farmhouse Estate',
    description: 'Extensive grounds, olive groves, and a restored 16th-century manor.',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?w=600&h=400&fit=crop'
    ],
    location: 'Val d\'Orcia', city: 'Siena', country: 'Italy',
    lat: 43.056, lng: 11.605, pricePerNight: 600, maxGuests: 12, bedrooms: 6, beds: 10, bathrooms: 5,
    amenities: ['Pool', 'Wine Cellar', 'Fireplace', 'Kitchen'], rating: 4.91, reviews: 31, availability: [], type: 'villa'
  },
  {
    id: 'listing-12', hostId: 'user-host-1',
    title: 'Modern Beachfront in Malibu',
    description: 'Glass walls and direct sand access in this architectural jewel.',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1480074568708-e7...f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop'
    ],
    location: 'Malibu Rd', city: 'Malibu', country: 'USA',
    lat: 34.025, lng: -118.776, pricePerNight: 1200, maxGuests: 8, bedrooms: 4, beds: 4, bathrooms: 4.5,
    amenities: ['Beach Access', 'Hot Tub', 'Sound System', 'Parking'], rating: 4.99, reviews: 19, availability: [], type: 'villa'
  },
  {
    id: 'listing-13', hostId: 'user-host-1',
    title: 'Safari Lodge Villa in Mara',
    description: 'Luxury tented villa with private game drives and sunrise views.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop'
    ],
    location: 'Masai Mara Nature Reserve', city: 'Narok', country: 'Kenya',
    lat: -1.5, lng: 35.1, pricePerNight: 550, maxGuests: 4, bedrooms: 2, beds: 2, bathrooms: 2,
    amenities: ['WiFi', 'Pool', 'Safari Tours', 'All Meals'], rating: 4.97, reviews: 84, availability: [], type: 'villa'
  },
  // --- ADDITIONAL HOUSES ---
  {
    id: 'listing-14', hostId: 'user-host-1',
    title: 'Victorian Painted Lady',
    description: 'Historic charm with modern luxury in a world-famous row house.',
    image: 'https://images.unsplash.com/photo-1448630360428-6e...a?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1448630360428-6e...a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop'
    ],
    location: 'Alamo Square', city: 'San Francisco', country: 'USA',
    lat: 37.776, lng: -122.433, pricePerNight: 300, maxGuests: 6, bedrooms: 3, beds: 4, bathrooms: 2,
    amenities: ['WiFi', 'Kitchen', 'Fireplace', 'Garden'], rating: 4.85, reviews: 14, availability: [], type: 'house'
  },
  {
    id: 'listing-15', hostId: 'user-host-1',
    title: 'Mid-Century Modern Cabin',
    description: 'Secluded A-frame retreat in the redwood forests of Northern California.',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?w=600&h=400&fit=crop'
    ],
    location: 'Russian River', city: 'Guerneville', country: 'USA',
    lat: 38.522, lng: -123.003, pricePerNight: 240, maxGuests: 4, bedrooms: 2, beds: 2, bathrooms: 1,
    amenities: ['Hot Tub', 'WiFi', 'BBQ Grill', 'Wood Stove'], rating: 4.93, reviews: 212, availability: [], type: 'house'
  },
  {
    id: 'listing-16', hostId: 'user-host-1',
    title: 'Trullo Sovrano Experience',
    description: 'Stay in a traditional Apulian dry stone hut with a conical roof.',
    image: 'https://images.unsplash.com/photo-1542662565-7e4b66bae529?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542662565-7e4b66bae529?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop'
    ],
    location: 'Alberobello', city: 'Puglia', country: 'Italy',
    lat: 40.783, lng: 17.237, pricePerNight: 160, maxGuests: 3, bedrooms: 1, beds: 2, bathrooms: 1,
    amenities: ['WiFi', 'Kitchen', 'Patio', 'History'], rating: 4.89, reviews: 45, availability: [], type: 'house'
  },
  {
    id: 'listing-17', hostId: 'user-host-1',
    title: 'Swedish Lake House',
    description: 'Glass-walled cottage on the edge of Lake Vättern. Pure serenity.',
    image: 'https://images.unsplash.com/photo-1505910147557-ca5e7fa82361?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505910147557-ca5e7fa82361?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1536376074432-8bad41d5079a?w=600&h=400&fit=crop'
    ],
    location: 'Jonkoping', city: 'Lake Vattern', country: 'Sweden',
    lat: 57.782, lng: 14.161, pricePerNight: 195, maxGuests: 5, bedrooms: 2, beds: 3, bathrooms: 1.5,
    amenities: ['Sauna', 'WiFi', 'Boat Access', 'Kitchen'], rating: 4.96, reviews: 38, availability: [], type: 'house'
  },
  {
    id: 'listing-18', hostId: 'user-host-1',
    title: 'Traditional Minka in Kyoto',
    description: 'Restored merchant house with tatami mats and a zen garden.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1522444195799-478538b28823?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop'
    ],
    location: 'Gion District', city: 'Kyoto', country: 'Japan',
    lat: 35.003, lng: 135.778, pricePerNight: 220, maxGuests: 4, bedrooms: 2, beds: 4, bathrooms: 1,
    amenities: ['Tea Room', 'WiFi', 'Garden View', 'Yukata Provided'], rating: 4.92, reviews: 67, availability: [], type: 'house'
  },
  {
    id: 'listing-19', hostId: 'user-host-1',
    title: 'Beach House in Byron Bay',
    description: 'Relaxed coastal living with surfboards and sunset views.',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1480074568708-e7...f?w=600&h=400&fit=crop'
    ],
    location: 'Main Beach', city: 'Byron Bay', country: 'Australia',
    lat: -28.643, lng: 153.612, pricePerNight: 350, maxGuests: 6, bedrooms: 3, beds: 4, bathrooms: 2,
    amenities: ['WiFi', 'BBQ', 'Outdoor Shower', 'Parking'], rating: 4.86, reviews: 52, availability: [], type: 'house'
  },
  // --- ADDITIONAL ROOMS ---
  {
    id: 'listing-20', hostId: 'user-host-1',
    title: 'Artist\'s Studio in Montmartre',
    description: 'Charming attic room with an easel and city views.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1554995207-c18c20360a59?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=400&fit=crop'
    ],
    location: 'Montmartre', city: 'Paris', country: 'France',
    lat: 48.886, lng: 2.343, pricePerNight: 95, maxGuests: 1, bedrooms: 1, beds: 1, bathrooms: 1,
    amenities: ['WiFi', 'Art Supplies', 'Morning Coffee'], rating: 4.78, reviews: 92, availability: [], type: 'room'
  },
  {
    id: 'listing-21', hostId: 'user-host-1',
    title: 'Boutique Room in Soho Loft',
    description: 'High ceilings and luxury linens in the heart of London.',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop'
    ],
    location: 'Soho', city: 'London', country: 'UK',
    lat: 51.513, lng: -0.133, pricePerNight: 130, maxGuests: 2, bedrooms: 1, beds: 1, bathrooms: 1,
    amenities: ['WiFi', 'Desk', 'Kitchen Access'], rating: 4.83, reviews: 41, availability: [], type: 'room'
  },
  {
    id: 'listing-22', hostId: 'user-host-1',
    title: 'Nomad Haven in Marrakesh',
    description: 'Traditional Riadh room with hand-woven rugs and mint tea.',
    image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop'
    ],
    location: 'Medina', city: 'Marrakesh', country: 'Morocco',
    lat: 31.629, lng: -7.981, pricePerNight: 65, maxGuests: 2, bedrooms: 1, beds: 1, bathrooms: 1,
    amenities: ['Breakfast', 'Roof Terrace', 'WiFi'], rating: 4.92, reviews: 110, availability: [], type: 'room'
  },
  {
    id: 'listing-23', hostId: 'user-host-1',
    title: 'Sustainable Stay in Portland',
    description: 'Eco-conscious room in a shared wooden home with a vertical garden.',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1536376074432-8bad41d5079a?w=600&h=400&fit=crop'
    ],
    location: 'SE Portland', city: 'Portland', country: 'USA',
    lat: 45.512, lng: -122.676, pricePerNight: 75, maxGuests: 2, bedrooms: 1, beds: 1, bathrooms: 1,
    amenities: ['WiFi', 'Bicycles', 'Kitchen Access'], rating: 4.87, reviews: 26, availability: [], type: 'room'
  },
  {
    id: 'listing-24', hostId: 'user-host-1',
    title: 'Capetown Seaview Room',
    description: 'Bright guest room in a modern house overlooking Table Mountain.',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop'
    ],
    location: 'Camps Bay', city: 'Cape Town', country: 'South Africa',
    lat: -33.951, lng: 18.377, pricePerNight: 110, maxGuests: 2, bedrooms: 1, beds: 1, bathrooms: 1,
    amenities: ['WiFi', 'Pool Access', 'Morning Coffee'], rating: 4.95, reviews: 63, availability: [], type: 'room'
  },
  {
    id: 'listing-25', hostId: 'user-host-1',
    title: 'Vibrant Studio Room in Berlin',
    description: 'Creative space in Kreuzberg with high ceilings and street art views.',
    image: 'https://images.unsplash.com/photo-1554995207-c18c20360a59?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1554995207-c18c20360a59?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=400&fit=crop'
    ],
    location: 'Kreuzberg', city: 'Berlin', country: 'Germany',
    lat: 52.498, lng: 13.406, pricePerNight: 85, maxGuests: 2, bedrooms: 1, beds: 1, bathrooms: 1,
    amenities: ['WiFi', 'Record Player', 'Shared Kitchen'], rating: 4.81, reviews: 78, availability: [], type: 'room'
  },
];

// Mock Bookings
export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'booking-1',
    listingId: 'listing-1',
    hostId: 'user-host-1',
    guestId: 'user-guest-1',
    checkIn: '2024-04-15',
    checkOut: '2024-04-20',
    totalPrice: 750,
    guests: 2,
    status: 'confirmed',
    createdAt: '2024-03-20T10:00:00Z',
  },
  {
    id: 'booking-2',
    listingId: 'listing-2',
    hostId: 'user-host-1',
    guestId: 'user-guest-1',
    checkIn: '2024-05-01',
    checkOut: '2024-05-07',
    totalPrice: 2100,
    guests: 4,
    status: 'pending',
    createdAt: '2024-03-22T14:30:00Z',
  },
];

// Mock Reviews
export const MOCK_REVIEWS: Review[] = [
  {
    id: 'review-1',
    listingId: 'listing-1',
    guestId: 'user-guest-1',
    guestName: 'Alice Johnson',
    rating: 5,
    comment: 'Amazing apartment! Clean, modern, and perfectly located. Highly recommend!',
    createdAt: '2024-03-25T12:00:00Z',
  },
  {
    id: 'review-2',
    listingId: 'listing-1',
    guestId: 'user-guest-1',
    guestName: 'David Brown',
    rating: 4.5,
    comment: 'Great place to stay. The host was very responsive.',
    createdAt: '2024-03-20T09:30:00Z',
  },
];

// Mock Host Analytics
export const MOCK_HOST_ANALYTICS = {
  monthlyEarnings: [
    { month: 'Oct', earnings: 4500 },
    { month: 'Nov', earnings: 5200 },
    { month: 'Dec', earnings: 6800 },
    { month: 'Jan', earnings: 5900 },
    { month: 'Feb', earnings: 7100 },
    { month: 'Mar', earnings: 8400 },
  ],
  stats: {
    activeListings: { value: 18, trend: 12 },
    totalBookings: { value: 124, trend: 8 },
    totalEarnings: { value: 37900, trend: 15 },
    avgRating: { value: 4.9, trend: 2 },
  }
};
