"use client"
import '../floor-plan/floor_plan.css'
import type { FloorPlan } from "../floor-plan/floor_plan"
import FloorPlanCarousel from "../floor-plan/floor_plan"

const plans: FloorPlan[] = [
  {
    id: 1,
    title: "Luxury 2BHK + Deck",
    // caption: "For those who believe a home should feel as expansive as their dreams.",
    image: "/images/floor_plan.png",
    features: [
      "Expensive Balcony",
      "Spacious Living & Dining",
      "King-Sized Bedrooms",
      "Generous Kitchen Space",
    ],
    price: "$2.35*Cr",
    stats: { beds: 2, baths: 1, area: 940 },
  },
  {
    id: 2,
    title: "Luxury 2BHK + Deck",
    // caption: "More room to grow, gather, and get inspired.",
    image: "/images/floor_plan_2.png",
    features: [
      "Higher Floor Advantage",
      "Expensive Living & Dining",
      "Large Bedrooms",
      "Generous Kitchen Space",
    ],
    price: "$2.7*Cr",
    stats: { beds: 2, baths: 2, area: 1180, unit: "sq ft" },
  },
  {
    id: 3,
    title: "Flexi 3BHK + Deck",
    // caption: "Open vistas and timeless finishes for elevated living.",
    image: "/images/floor_plan_3.png",
    features: [
      "Large Balcony with City & Sea Views",
      "Spacious Kitchen & Storage",
      "Expensive Living & Dining",
      "Exclusive Puja Room",
      "Ensuite Bathrooms",
    ],
    price: "$2.95*Cr",
    stats: { beds: 3, baths: 3, area: 1260, unit: "sq ft" },
  },
  {
    id: 4,
    title: "Flexi 3BHK + Deck",
    // caption: "Expansive horizons, crafted for connoisseurs.",
    image: "/images/floor_plan_4.png",
    features: [
      "Premium Higher Floor Advantage",
      "Expensive Kitchen with Ample Storage",
      "Elegant Ensuite Bathrooms",
      "Oversized Balcony",
      "Breathtaking Cityscape Views",
    ],
    price: "$3.35*Cr",
    stats: { beds: 3, baths: 3, area: 1850, unit: "sq ft" },
  },
  {
    id: 5,
    title: "Sea-Facing Lux 3BHK + Deck",
    // caption: "A calming connection to nature at your doorstep.",
    image: "/images/floor_plan_5.png",
    features: [
      "Dual Ventilation",
      "Open-Plan Living & Dining",
      "Large Sun Deck",
      "Breathtaking City & Sea Views",   
    ],
    price: "$3.75*Cr",
    stats: { beds: 3, baths: 3, area: 990, unit: "sq ft" },
  },
  {
    id: 6,
    title: "Sea-Facing Lux 3BHK + Deck",
    // caption: "Corner serenity with extra light and privacy.",
    image: "/images/floor_plan_6.png",
    features: [
      "Prime Higher Floor Advantage",
      "Exclusive Pooja Room",
      "Spacious Dining Area",
      "Expensive Sun Deck",
      "Breathtaking City & Sea Views",
    ],
    price: "$4.45*Cr",
    stats: { beds: 3, baths: 3, area: 1215, unit: "sq ft" },
  },
  {
    id: 7,
    title: "Sea-Facing Ultra Lux 3BHK + Deck",
    // caption: "A statement in scale, sophistication and skyline.",
    image: "/images/floor_plan.png",
    features: [
      "Ultra Luxury 3 BHK",
      "Exclusive Pooja Room",
      "Spacious Dining Area",
      "Expensive Living Room",
      "Large Sun Deck with Stunning Cityscape Views",
    ],
    price: "$5.35*Cr",
    stats: { beds: 3, baths: 4, area: 3100, unit: "sq ft" },
  },
]

export default function Page() {
  return (
    <main style={{ padding: "24px" }}>
      <FloorPlanCarousel items={plans} initialIndex={0} autoPlayMs={null} />
    </main>
  )
}
