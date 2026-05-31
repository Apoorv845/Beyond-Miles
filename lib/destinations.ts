export interface Destination {
  id: string;
  title: string;
  region: string;
  coordinates: [number, number]; // [latitude, longitude]
  landscape: string;
  description: string;
}

export const premiumDestinations: Destination[] = [
  {
    id: "1",
    title: "Aman-i-Khas",
    region: "Ranthambore, Rajasthan",
    coordinates: [26.0173, 76.5026],
    landscape: "Wildlife & Desert",
    description: "A wilderness camp of grand proportions, offering luxury tents near the tiger reserve."
  },
  {
    id: "2",
    title: "The Oberoi Udaivilas",
    region: "Udaipur, Rajasthan",
    coordinates: [24.5765, 73.6732],
    landscape: "Lakes & Palaces",
    description: "A spectacular palace resort spread over 50 acres on the banks of Lake Pichola."
  },
  {
    id: "3",
    title: "Ananda in the Himalayas",
    region: "Rishikesh, Uttarakhand",
    coordinates: [30.1472, 78.3308],
    landscape: "Mountains & Wellness",
    description: "A luxury spa resort located in the Himalayan foothills, surrounding a Maharaja’s palace."
  },
  {
    id: "4",
    title: "Evolve Back Kabini",
    region: "Coorg/Kabini, Karnataka",
    coordinates: [11.9213, 76.2735],
    landscape: "Forest & Rivers",
    description: "A sweeping, high-end wildlife resort inspired by tribal architecture on the edge of the river."
  }
];
