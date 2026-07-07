export type Machine = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  currency: string;
  condition: "New" | "Used" | "Refurbished";
  location: string;
  year: number;
  image: string;
  seller: string;
  sellerVerified: boolean;
  featured?: boolean;
  auction?: boolean;
  verified?: boolean;
  description: string;
  specs: Record<string, string>;
};

const IMG = (seed: string) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=1200&q=70`;

const IMAGES = [
  "1565043666747-69f6646db940",
  "1581091870622-1e7e79d5f8a5",
  "1518709268805-4e9042af9f23",
  "1504328345606-18bbc8c9d7d1",
  "1553413077-190dd305871c",
  "1587293852726-70cdb56c2866",
  "1581092160607-ee22621dd758",
  "1565043534407-2df53c5c31d8",
  "1581092335878-2d9ff86ca2bf",
  "1581092160562-40aa08e78837",
  "1581092918484-8313a2f56b21",
  "1581093458791-9d09c31fa2f0",
];

export const categories = [
  { slug: "cnc", name: "CNC Machines", icon: "Cpu", count: 342 },
  { slug: "lathe", name: "Lathe Machines", icon: "Cog", count: 218 },
  { slug: "milling", name: "Milling", icon: "Hammer", count: 187 },
  { slug: "press", name: "Press & Forming", icon: "Layers", count: 156 },
  { slug: "welding", name: "Welding", icon: "Zap", count: 143 },
  { slug: "packaging", name: "Packaging", icon: "Package", count: 98 },
  { slug: "textile", name: "Textile", icon: "Shirt", count: 210 },
  { slug: "printing", name: "Printing", icon: "Printer", count: 76 },
  { slug: "food", name: "Food Processing", icon: "Utensils", count: 132 },
  { slug: "plastic", name: "Plastic & Rubber", icon: "Boxes", count: 88 },
  { slug: "generator", name: "Generators", icon: "BatteryCharging", count: 65 },
  { slug: "construction", name: "Construction", icon: "HardHat", count: 174 },
];

const brands = ["Mazak", "Haas", "DMG Mori", "Trumpf", "Fanuc", "Amada", "Bosch", "Siemens"];
const locations = ["Dhaka", "Chattogram", "Khulna", "Rajshahi", "Sylhet", "Gazipur", "Narayanganj"];
const sellers = [
  "Prime Industrial Ltd",
  "BD Machine House",
  "Delta Engineering",
  "Zenith Tools",
  "Meghna Machinery",
  "Padma Industrial",
];

function make(i: number): Machine {
  const cat = categories[i % categories.length];
  const cond = (["New", "Used", "Refurbished"] as const)[i % 3];
  return {
    id: `m-${1000 + i}`,
    name: `${brands[i % brands.length]} ${cat.name.split(" ")[0]} ${["Pro", "X", "Ultra", "Elite", "Max"][i % 5]} ${2018 + (i % 7)}`,
    brand: brands[i % brands.length],
    category: cat.slug,
    price: 15000 + ((i * 3571) % 480000),
    currency: "USD",
    condition: cond,
    location: locations[i % locations.length],
    year: 2018 + (i % 7),
    image: IMG(IMAGES[i % IMAGES.length]),
    seller: sellers[i % sellers.length],
    sellerVerified: i % 3 !== 0,
    featured: i % 4 === 0,
    auction: i % 5 === 0,
    verified: i % 2 === 0,
    description:
      "Heavy-duty industrial machine engineered for continuous production runs. Precision components, low downtime, and full service history. Ready for immediate inspection and shipping.",
    specs: {
      Power: `${5 + (i % 40)} kW`,
      Weight: `${800 + (i % 20) * 120} kg`,
      Dimensions: `${1200 + (i % 5) * 100} x ${900 + (i % 4) * 80} x ${1800} mm`,
      Voltage: "380V / 3 Phase",
      Warranty: cond === "New" ? "2 years" : "6 months",
      Origin: ["Japan", "Germany", "USA", "China", "Italy"][i % 5],
    },
  };
}

export const machines: Machine[] = Array.from({ length: 48 }, (_, i) => make(i));

export const featuredMachines = machines.filter((m) => m.featured).slice(0, 8);
export const auctionMachines = machines.filter((m) => m.auction).slice(0, 8);
export const verifiedMachines = machines.filter((m) => m.verified).slice(0, 8);

export const featuredSellers = sellers.map((name, i) => ({
  id: `s-${i}`,
  name,
  location: locations[i % locations.length],
  rating: 4.4 + ((i * 13) % 6) / 10,
  products: 20 + i * 7,
  verified: true,
  logo: IMG(IMAGES[(i + 3) % IMAGES.length]),
}));

export const testimonials = [
  {
    name: "Rakib Ahmed",
    role: "Plant Manager, Textile Co.",
    quote:
      "EmachineBD saved us months of sourcing. We closed on a Mazak lathe in 8 days with full inspection support.",
  },
  {
    name: "Nusrat Jahan",
    role: "Procurement Head",
    quote:
      "The auction platform is the most transparent I've used in the industry. Real bids, real winners, real machines.",
  },
  {
    name: "Imran Chowdhury",
    role: "Founder, BD Machine House",
    quote:
      "As a seller we tripled qualified inquiries in one quarter. The verified-buyer flow is a game changer.",
  },
];

export const faqs = [
  {
    q: "How does the verification process work?",
    a: "Every listing over $10k is physically inspected by our engineers. Verified badges are only issued after a signed 32-point inspection report.",
  },
  {
    q: "Can I bid on multiple auctions?",
    a: "Yes. Verified buyers can hold up to 5 concurrent active bids. Deposits are refunded automatically for lost auctions.",
  },
  {
    q: "Do you handle shipping and logistics?",
    a: "We partner with freight networks across South and Southeast Asia. Get a bonded shipping quote from any product page.",
  },
  {
    q: "What are the seller fees?",
    a: "Listings are free. We charge a 4% success fee on completed sales and 2% on auction wins. No monthly subscription.",
  },
];

export const stats = [
  { label: "Verified Machines", value: "12,400+" },
  { label: "Active Sellers", value: "2,800" },
  { label: "Countries Served", value: "34" },
  { label: "Auctions Won", value: "$142M" },
];

export const notifications = [
  { id: 1, title: "Your bid on Mazak QT-350 was accepted", time: "2m ago", unread: true },
  { id: 2, title: "New inquiry from Delta Engineering", time: "1h ago", unread: true },
  { id: 3, title: "Order #ORD-2841 has shipped", time: "3h ago", unread: false },
  { id: 4, title: "Verification approved for Trumpf press", time: "Yesterday", unread: false },
];

export const salesData = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
  revenue: 40000 + Math.round(Math.sin(i / 2) * 25000 + i * 4200),
  orders: 20 + i * 3 + (i % 3) * 5,
  auctions: 5 + (i % 5) + Math.floor(i / 2),
}));

export const categoryData = categories.slice(0, 6).map((c) => ({
  name: c.name.split(" ")[0],
  value: c.count,
}));

export const recentOrders = Array.from({ length: 8 }, (_, i) => ({
  id: `ORD-${2800 + i}`,
  buyer: ["Rakib A.", "Nusrat J.", "Imran C.", "Sadia K.", "Tanvir H."][i % 5],
  machine: machines[i].name,
  amount: machines[i].price,
  status: (["Paid", "Processing", "Shipped", "Delivered", "Pending"] as const)[i % 5],
  date: `2026-0${1 + (i % 7)}-1${i % 9}`,
}));

export const auctionRows = auctionMachines.map((m, i) => ({
  id: m.id,
  machine: m.name,
  currentBid: m.price + i * 1200,
  highestBidder: ["Buyer_A12", "Buyer_D77", "Buyer_K02", "Buyer_M55"][i % 4],
  remaining: `${1 + (i % 5)}d ${(i * 3) % 24}h ${(i * 7) % 60}m`,
  status: (["Live", "Live", "Upcoming", "Ended"] as const)[i % 4],
}));

export const inquiryRows = machines.slice(0, 10).map((m, i) => ({
  id: `INQ-${900 + i}`,
  buyer: ["Rakib A.", "Nusrat J.", "Imran C.", "Sadia K."][i % 4],
  machine: m.name,
  category: m.category,
  responses: (i * 3) % 7,
  status: (["Open", "Quoted", "Closed"] as const)[i % 3],
}));

export const users = Array.from({ length: 12 }, (_, i) => ({
  id: `U-${100 + i}`,
  name: ["Rakib Ahmed", "Nusrat Jahan", "Imran Chowdhury", "Sadia Karim", "Tanvir Hasan"][i % 5] +
    ` ${i}`,
  email: `user${i}@emachinebd.com`,
  role: (["Buyer", "Seller", "Admin"] as const)[i % 3],
  status: (["Active", "Suspended", "Pending"] as const)[i % 3],
  joined: `2025-${String(1 + (i % 12)).padStart(2, "0")}-1${i % 9}`,
}));
