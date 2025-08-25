"use client"
import '../floor-plan/floor_plan.css'
import type { FloorPlan } from "../floor-plan/floor_plan"
import FloorPlanCarousel from "../floor-plan/floor_plan"
import FiveTabsSection from '../filter'
import { useEffect, useMemo, useRef, useState } from 'react'
import FormModal from '../form/form'

const plans: FloorPlan[] = [
  {
    id: 1,
    title: "Luxury 2BHK + Deck",
    // caption: "For those who believe a home should feel as expansive as their dreams.",
    image: "/images/floor_plan.png",
    features: [
      "Expensive Balcony",
      "Stunning Cityscape Views",
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
      "Stunning Cityscape Views",
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
      "Expensive Kitchen & Ample Storage",
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
      "Expensive Living & Dining",
      "Large Sun Deck",
      "Expensive Kitchen & Storage", 
      "Elegant Ensuite Bathrooms", 
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
      "Spacious Kitchen Storage",
      "Expensive Living & Dining",
      "Large Sun Deck with Stunning Cityscape Views",
    ],
    price: "$5.35*Cr",
    stats: { beds: 3, baths: 4, area: 3100, unit: "sq ft" },
  },
]

export default function PropertyPricing() {
 const [activeFilter, setActiveFilter] = useState(0) // 0 = All, 1 = 2BHK, 2 = 3BHK, 3 = LUX, 4 = Ultra LUX
const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<FloorPlan | null>(null)
const [isShrink, setIsShrink] = useState(false)
const sectionRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const rect = entry.boundingClientRect;
        const viewportHeight = window.innerHeight;

        // bottom 40% condition
        const isBottom40Visible = rect.bottom <= viewportHeight * 0.6; 

        if (isBottom40Visible) {
          setIsShrink(true);
        } else {
          setIsShrink(false);
        }
      });
    },
    {
      root: null,
      threshold: [0, 0.4, 1],
    }
  );

  if (sectionRef.current) {
    observer.observe(sectionRef.current);
  }

  return () => {
    if (sectionRef.current) {
      observer.unobserve(sectionRef.current);
    }
  };
}, []);
  // Filter properties based on selected tab
  const filteredProperties = useMemo(() => {
    switch (activeFilter) {
      case 0: // All
        return plans
      case 1: // 2BHK
        return plans.filter((property) => [1, 2].includes(Number(property.id)))
      case 2: // 3BHK
        return plans.filter((property) => [3, 4].includes(Number(property.id)))
      case 3: // LUX
        return plans.filter((property) => [5, 6].includes(Number(property.id)))
      case 4: // Ultra LUX
        return plans.filter((property) => [7].includes(Number(property.id)))
      default:
        return plans
    }
  }, [activeFilter])

  const shouldEnableScrolling = activeFilter === 0

  const handleSiteVisit = (property: FloorPlan) => {
    console.log("Site visit requested for:", property.title)
    // Add your site visit logic here
  }

  const handleViewLayout = (property: FloorPlan) => {
    console.log("View layout requested for:", property.title)
    // Add your view layout logic here setSelectedProperty(property)
    setIsModalOpen(true)
  }

   const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProperty(null)
  }
  return (
    <>
     <section  ref={sectionRef}
className={`property-pricing-section relative min-h-screen py-16 ${isShrink ? "shrink" : ""}`}      style={{
        backgroundImage: "url(/images/bg_pricing.jpg)",
        //  backgroundColor: "white",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Filter Tabs */}
    <div style={{ marginBottom: "2rem", paddingTop: "2rem" }}>
  <FiveTabsSection
    tabs={["All", "2BHK", "3BHK", "LUX", "Ultra LUX"]}
    colors={["#003261", "#003261", "#003261", "#003261", "#003261"]}
    width="90%"
    initialIndex={0}
    onChange={setActiveFilter}
  />
</div>


      {/* Property Carousel */}
      <FloorPlanCarousel
        items={filteredProperties}
        initialIndex={0}
        autoPlayMs={null} // Disable autoplay when filtering
        onSiteVisit={handleSiteVisit}
        onViewLayout={handleViewLayout}
        className="property-carousel"
        enableScrolling={shouldEnableScrolling}
      />
    </section>
    
      <FormModal isOpen={isModalOpen} onClose={handleCloseModal} propertyTitle={selectedProperty?.title} />

    </>
  )
}