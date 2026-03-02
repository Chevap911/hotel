// Room data for Villa Antonio - maps to images and content
export interface Room {
    id: string;
    slug: string;
    roomKey: string; // Translation key segment, e.g. "doubleRoom"
    maxOccupancy: number;
    sizeSqm: number;
    amenities: string[];
    images: string[];
    beds: string;
}

export const rooms: Room[] = [
    {
        id: "double-room",
        slug: "double-room",
        roomKey: "doubleRoom",
        maxOccupancy: 2,
        sizeSqm: 25,
        amenities: ["seaview", "ac", "balcony", "tv", "wifi", "bathroom", "minibar"],
        images: [
            "/images/362423122.jpg",
            "/images/362423130.jpg",
            "/images/362423132.jpg",
            "/images/362423136.jpg",
        ],
        beds: "1 double",
    },
    {
        id: "triple-room",
        slug: "triple-room",
        roomKey: "tripleRoom",
        maxOccupancy: 3,
        sizeSqm: 30,
        amenities: ["poolview", "ac", "balcony", "tv", "wifi", "bathroom"],
        images: [
            "/images/362423142.jpg",
            "/images/362423150.jpg",
            "/images/362423359.jpg",
            "/images/362423394.jpg",
        ],
        beds: "1 double + 1 single",
    },
    {
        id: "suite",
        slug: "suite",
        roomKey: "suite",
        maxOccupancy: 4,
        sizeSqm: 50,
        amenities: ["gardenview", "ac", "balcony", "tv", "wifi", "bathroom", "livingroom"],
        images: [
            "/images/707152431.jpg",
            "/images/707152470.jpg",
            "/images/707152477.jpg",
            "/images/707152479.jpg",
        ],
        beds: "1 double + 1 single + 1 sofa bed",
    },
    {
        id: "two-bedroom-suite",
        slug: "two-bedroom-suite",
        roomKey: "twoBedroomSuite",
        maxOccupancy: 5,
        sizeSqm: 50,
        amenities: ["gardenview", "ac", "balcony", "tv", "wifi", "bathroom", "livingroom", "kitchen"],
        images: [
            "/images/707152492.jpg",
            "/images/707152512.jpg",
            "/images/707152523.jpg",
            "/images/707152640.jpg",
        ],
        beds: "1 double + 1 single + 1 sofa bed",
    },
    {
        id: "royal-suite-sea-view",
        slug: "royal-suite-sea-view",
        roomKey: "royalSuite",
        maxOccupancy: 5,
        sizeSqm: 50,
        amenities: ["seaview", "ac", "balcony", "tv", "wifi", "bathroom", "livingroom", "kitchen", "premium"],
        images: [
            "/images/707155875.jpg",
            "/images/707155880.jpg",
            "/images/707156609.jpg",
            "/images/707156610.jpg",
        ],
        beds: "1 double + 1 single + 1 sofa bed",
    },
    {
        id: "economy-double",
        slug: "economy-double",
        roomKey: "economyDouble",
        maxOccupancy: 2,
        sizeSqm: 20,
        amenities: ["mountainview", "ac", "tv", "wifi", "bathroom"],
        images: [
            "/images/707157505.jpg",
            "/images/707157507.jpg",
            "/images/707157509.jpg",
            "/images/707157510.jpg",
        ],
        beds: "1 double",
    },
];

export const amenityIcons: Record<string, string> = {
    seaview: "🌊",
    poolview: "🏊",
    gardenview: "🌿",
    mountainview: "⛰️",
    ac: "❄️",
    balcony: "🏞️",
    tv: "📺",
    wifi: "📶",
    bathroom: "🚿",
    minibar: "🍷",
    livingroom: "🛋️",
    kitchen: "🍳",
    premium: "⭐",
};
