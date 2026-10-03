/* ==========================================================================
   ROAMLY — DEMO DATA
   In a real product this would come from an API. Image URLs point to
   Unsplash Source so the project renders real photography with zero
   binary assets to manage.
   ========================================================================== */

const DESTINATIONS = [
  {
    id: "paris",
    name: "Paris",
    country: "France",
    region: "Europe",
    heroImage: "assets/images/destinations/paris.jpg",
    thumb: "assets/images/destinations/paris.jpg",
    places: 32,
    avgPrice: 145,
    bestTime: "April – June, September – October",
    description:
      "Paris pairs grand boulevards and riverside light with quiet cobbled corners — a city built for slow mornings and long dinners.",
    attractions: [
      "Eiffel Tower",
      "Louvre Museum",
      "Notre-Dame",
      "Montmartre",
      "Champs-Élysées",
    ],
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East",
    thumb: "assets/images/destinations/dubai.jpg",
    heroImage: "assets/images/destinations/dubai.jpg",
    places: 24,
    avgPrice: 210,
    bestTime: "November – March",
    description:
      "Dubai stacks record-breaking towers against open desert — a city that treats ambition as a design brief.",
    attractions: [
      "Burj Khalifa",
      "Palm Jumeirah",
      "Dubai Mall",
      "Desert Safari",
      "Marina Walk",
    ],
  },
  {
    id: "london",
    name: "London",
    country: "United Kingdom",
    region: "Europe",
    thumb: "assets/images/destinations/london.jpg",
    heroImage: "assets/images/destinations/london.jpg",
    places: 41,
    avgPrice: 165,
    bestTime: "May – September",
    description:
      "London layers a thousand years of history under grey skies and red buses, rewarding anyone willing to walk.",
    attractions: [
      "Big Ben",
      "Tower Bridge",
      "British Museum",
      "Hyde Park",
      "Camden Market",
    ],
  },
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    region: "Europe",
    thumb: "assets/images/destinations/rome.jpg",
    heroImage: "assets/images/destinations/rome.jpg",
    places: 28,
    avgPrice: 130,
    bestTime: "April – May, September – October",
    description:
      "Rome is a living museum — ruins share a block with espresso bars, and every alley leads somewhere ancient.",
    attractions: [
      "Colosseum",
      "Trevi Fountain",
      "Vatican City",
      "Roman Forum",
      "Pantheon",
    ],
  },
  {
    id: "cairo",
    name: "Cairo",
    country: "Egypt",
    region: "Africa",
    thumb: "assets/images/destinations/cairo.jpg",
    heroImage: "assets/images/destinations/cairo.jpg",
    places: 19,
    avgPrice: 90,
    bestTime: "October – April",
    description:
      "Cairo sits beside four-thousand-year-old monuments as ordinary traffic hums past — history at street level.",
    attractions: [
      "Pyramids of Giza",
      "Egyptian Museum",
      "Khan el-Khalili",
      "Nile Cruise",
      "Citadel of Saladin",
    ],
  },
  {
    id: "istanbul",
    name: "Istanbul",
    country: "Turkey",
    region: "Middle East",
    thumb: "assets/images/destinations/istanbul.jpg",
    heroImage: "assets/images/destinations/istanbul.jpg",
    places: 26,
    avgPrice: 105,
    bestTime: "March – May, September – November",
    description:
      "Istanbul sits across two continents, its skyline of minarets and ferries stitched together by the Bosphorus.",
    attractions: [
      "Hagia Sophia",
      "Blue Mosque",
      "Grand Bazaar",
      "Bosphorus Cruise",
      "Topkapi Palace",
    ],
  },
];

const HOTELS = [
  {
    id: "h1",
    destinationId: "dubai",
    name: "Ocean View Resort",
    location: "Dubai, UAE",
    price: 250,
    rating: 4.8,
    thumb: "assets/images/hotels/ocean-view-1.jpg",
    gallery: [
      "assets/images/hotels/ocean-view-1.jpg",
      "assets/images/hotels/ocean-view-2.jpg",
      "assets/images/hotels/ocean-view-3.jpg",
    ],
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Breakfast Included",
      "Free Parking",
      "Gym",
    ],
    description:
      "A beachfront resort with panoramic Gulf views, spacious suites and a spa built around slow mornings.",
    rooms: [
      { name: "Standard Room", price: 250, capacity: 2 },
      { name: "Deluxe Room", price: 320, capacity: 3 },
      { name: "Suite", price: 480, capacity: 4 },
    ],
  },
  {
    id: "h2",
    destinationId: "paris",
    name: "Le Marais Boutique",
    location: "Paris, France",
    price: 180,
    rating: 4.6,
    thumb: "assets/images/hotels/le-marais-1.jpg",
    gallery: [
      "assets/images/hotels/le-marais-1.jpg",
      "assets/images/hotels/le-marais-2.jpg",
      "assets/images/hotels/le-marais-3.jpg",
    ],
    amenities: [
      "Free WiFi",
      "Breakfast Included",
      "Concierge",
      "Bar",
      "Pet Friendly",
    ],
    description:
      "A converted 19th-century townhouse steps from the Seine, with wrought-iron balconies and herringbone floors.",
    rooms: [
      { name: "Classic Room", price: 180, capacity: 2 },
      { name: "Junior Suite", price: 240, capacity: 2 },
      { name: "Terrace Suite", price: 340, capacity: 3 },
    ],
  },
  {
    id: "h3",
    destinationId: "rome",
    name: "Piazza Navona Hotel",
    location: "Rome, Italy",
    price: 165,
    rating: 4.5,
    thumb: "assets/images/hotels/piazza-navona-1.jpg",
    gallery: [
      "assets/images/hotels/piazza-navona-1.jpg",
      "assets/images/hotels/piazza-navona-2.jpg",
      "assets/images/hotels/piazza-navona-3.jpg",
    ],
    amenities: [
      "Free WiFi",
      "Rooftop Terrace",
      "Breakfast Included",
      "Airport Shuttle",
    ],
    description:
      "Marble stairwells and frescoed ceilings, two minutes' walk from the fountain that gives the hotel its name.",
    rooms: [
      { name: "Standard Room", price: 165, capacity: 2 },
      { name: "Deluxe Room", price: 210, capacity: 2 },
      { name: "Family Suite", price: 290, capacity: 4 },
    ],
  },
  {
    id: "h4",
    destinationId: "istanbul",
    name: "Bosphorus Palace",
    location: "Istanbul, Turkey",
    price: 140,
    rating: 4.7,
    thumb: "assets/images/hotels/bosphorus-palace-1.jpg",
    gallery: [
      "assets/images/hotels/bosphorus-palace-1.jpg",
      "assets/images/hotels/bosphorus-palace-2.jpg",
      "assets/images/hotels/bosphorus-palace-3.jpg",
    ],
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Spa",
      "Breakfast Included",
      "Bar",
    ],
    description:
      "Ottoman-era architecture on the water's edge, with a rooftop hammam looking out over passing ferries.",
    rooms: [
      { name: "Standard Room", price: 140, capacity: 2 },
      { name: "Bosphorus View Room", price: 195, capacity: 2 },
      { name: "Sultan Suite", price: 310, capacity: 4 },
    ],
  },
  {
    id: "h5",
    destinationId: "london",
    name: "Camden Row Hotel",
    location: "London, UK",
    price: 195,
    rating: 4.4,
    thumb: "assets/images/hotels/camden-row-1.jpg",
    gallery: [
      "assets/images/hotels/camden-row-1.jpg",
      "assets/images/hotels/camden-row-2.jpg",
      "assets/images/hotels/camden-row-3.jpg",
    ],
    amenities: ["Free WiFi", "Gym", "Bar", "Pet Friendly"],
    description:
      "A red-brick townhouse hotel in Camden, five minutes from the market stalls and canal boats.",
    rooms: [
      { name: "Standard Room", price: 195, capacity: 2 },
      { name: "Deluxe Room", price: 250, capacity: 3 },
    ],
  },
  {
    id: "h6",
    destinationId: "cairo",
    name: "Nile Corniche Hotel",
    location: "Cairo, Egypt",
    price: 95,
    rating: 4.3,
    thumb: "assets/images/hotels/nile-corniche-1.jpg",
    gallery: [
      "assets/images/hotels/nile-corniche-1.jpg",
      "assets/images/hotels/nile-corniche-2.jpg",
      "assets/images/hotels/nile-corniche-3.jpg",
    ],
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Breakfast Included",
      "Free Parking",
    ],
    description:
      "River-view rooms along the Nile Corniche, with felucca sails drifting past the breakfast terrace.",
    rooms: [
      { name: "Standard Room", price: 95, capacity: 2 },
      { name: "Nile View Room", price: 130, capacity: 2 },
      { name: "Family Suite", price: 190, capacity: 4 },
    ],
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Ahmed",
    trip: "Booked Dubai, June 2026",
    quote:
      "Every step from search to confirmation was clear — I knew exactly what I was paying for.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    name: "Karim Nasser",
    trip: "Booked Rome, April 2026",
    quote:
      "Found a boutique hotel two streets from the Pantheon that I'd never have found on my own.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
  },
  {
    name: "Laila Hossam",
    trip: "Booked Istanbul, March 2026",
    quote:
      "The price breakdown before booking meant zero surprises when I checked in.",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&q=80",
  },
];

const AMENITY_ICONS = {
  "Free WiFi": "📶",
  "Swimming Pool": "🏊",
  "Breakfast Included": "🍳",
  "Free Parking": "🚗",
  Gym: "🏋️",
  Spa: "💆",
  Bar: "🍸",
  Concierge: "🛎️",
  "Pet Friendly": "🐾",
  "Rooftop Terrace": "🌇",
  "Airport Shuttle": "🚐",
};

function getDestinationById(id) {
  return DESTINATIONS.find((d) => d.id === id);
}

function getHotelById(id) {
  return HOTELS.find((h) => h.id === id);
}

function getHotelsByDestination(destinationId) {
  return HOTELS.filter((h) => h.destinationId === destinationId);
}
