"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

import BuildingProgress from "./components/building-progress/building-progress";
import PropertyPricing from "./App/property_pricing";
import OtherProjects from "./components/other-projects/other-projects";
import Hero from "./sections/Hero";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import MarinaNavbar from "./components/NavBar/NavBar";

gsap.registerPlugin(ScrollTrigger);

// CSS for all the animations
const scrollAnimationCSS = `
  /* Fade in from bottom */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Slide in from left */
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  /* Slide in from right */
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  /* Scale up */
  @keyframes scaleUp {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  /* Flip animation */
  @keyframes flipIn {
    from {
      opacity: 0;
      transform: perspective(1000px) rotateX(90deg);
    }
    to {
      opacity: 1;
      transform: perspective(1000px) rotateX(0);
    }
  }
  
  /* Bounce in */
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  /* Rotate in */
  @keyframes rotateIn {
    from {
      opacity: 0;
      transform: rotate(-180deg) scale(0.1);
    }
    to {
      opacity: 1;
      transform: rotate(0) scale(1);
    }
  }
  
  /* Special clip-path animation */
  @keyframes specialReveal {
    from {
      opacity: 0;
      clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    }
    to {
      opacity: 1;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
  }
  
  /* Animation classes */
  .animate-fade-up {
    animation: fadeInUp linear;
    animation-timeline: view();
    animation-range: entry 0% cover 40%;
  }
  
  .animate-slide-left {
    animation: slideInLeft linear;
    animation-timeline: view();
    animation-range: entry 0% cover 40%;
  }
  
  .animate-slide-right {
    animation: slideInRight linear;
    animation-timeline: view();
    animation-range: entry 0% cover 40%;
  }
  
  .animate-scale {
    animation: scaleUp linear;
    animation-timeline: view();
    animation-range: entry 0% cover 40%;
  }
  
  .animate-flip {
    animation: flipIn linear;
    animation-timeline: view();
    animation-range: entry 0% cover 40%;
  }
  
  .animate-bounce {
    animation: bounceIn linear;
    animation-timeline: view();
    animation-range: entry 0% cover 40%;
  }
  
  .animate-rotate {
    animation: rotateIn linear;
    animation-timeline: view();
    animation-range: entry 0% cover 40%;
  }
  
  .animate-special {
    animation: specialReveal linear;
    animation-timeline: view();
    animation-range: entry 0% cover 40%;
  }
`;

type Direction = "next" | "prev";

function useCarousel(count: number, autoPlayMs = 5000) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<Direction>("next");
  const timerRef = useRef<number | null>(null);

  const { other_1, other_2 } = useMemo(() => {
    let o1: number, o2: number;
    if (direction === "next") {
      o1 = active - 1 < 0 ? count - 1 : active - 1;
      o2 = active + 1 >= count ? 0 : active + 1;
    } else {
      o1 = active + 1 >= count ? 0 : active + 1;
      o2 = o1 + 1 >= count ? 0 : o1 + 1;
    }
    return { other_1: o1, other_2: o2 };
  }, [active, direction, count]);

  const next = () => {
    setDirection("next");
    setActive((prev) => (prev + 1) % count);
  };

  const prev = () => {
    setDirection("prev");
    setActive((prev) => (prev - 1 + count) % count);
  };

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      next();
    }, autoPlayMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [active, autoPlayMs]);

  return { active, other_1, other_2, direction, next, prev };
}

const carouselItems = [
  {
    id: 1,
    title: "Jogging Track",
    description:
      "Take a walk, go for a jog, or enjoy a quiet run along the jogging track. It’s a great way to move your body while soaking in the views. Fitness feels easy when it looks this good.",
    image: "/images/jogging_track.png",
    backgroundImage: "/background_images/blur_jogging_track.png",
    caption: "Jogging Track",
    backgroundColor: "#f5bfaf",
  },
  {
    id: 2,
    title: "Exclusive Gym",
    description:
      "Step into our welcoming, well-equipped gym where every corner is designed to inspire your fitness journey. Latest machines and stunning scenic views, working out becomes a refreshing experience that lifts both body and spirit.",
    image: "/images/GYM.png",
    backgroundImage: "/background_images/blur_gym.png",
    caption: "Exclusive Gym",
    backgroundColor: "#9c4d2f",
  },
  {
    id: 3,
    title: "Infinity Pool",
    description:
      "The infinity pool offers a serene escape where the water appears to merge with the sky. Enjoy a cool, refreshing swim surrounded by breathtaking views. It’s the perfect place to relax, recharge, and take in the beauty around you.",
    image: "/images/Infinity_pool.png",
    backgroundImage: "/background_images/blur_infinity_pool.png",
    caption: "Infinity Pool",
    backgroundColor: "#b47993",
  },
  {
    id: 4,
    title: "Meditate Centre",
    description:
      "A serene sanctuary to help you reconnect with your inner self and find peace amid life’s hustle. Nestled in a tranquil setting with stunning views, our center offers a perfect blend of mindfulness, spirituality, and relaxation to refresh your mind, body, and soul.",
    image: "/images/Meditation_center.png",
    backgroundImage: "/background_images/blur_meditation_center.png",
    caption: "Meditation Centre",
    backgroundColor: "#7eb63d",
  },
];

const communityCornersItems = [
  {
    id: 1,
    title: "Rooftop Lounge",
    description:
      "Whether it’s a sunset cocktail, a romantic dinner, or a lively celebration, our rooftop party lounge with stunning sea views offers a magical experience. Every moment here becomes a cherished memory against the backdrop of breathtaking scenery. Join us and make your special occasions truly unforgettable.",
    image: "/images/rooftop_lounge.png",
    backgroundImage: "/background_images/blur_rooftop_lounge.png",
    caption: "Rooftop Lounge",
    backgroundColor: "#0f172a",
  },
  {
    id: 2,
    title: "Barbeque Zone",
    description:
      "Fire up the grill and bring everyone together in our lively Barbecue Zone. It’s the ideal place to enjoy great food, good company, and plenty of smiles. Make every meal a celebration and every moment a memory.",
    image: "/images/Barbeque_zone.png",
    backgroundImage: "/background_images/blur_barbeque_zone.png",
    caption: "Barbeque Zone",
    backgroundColor: "#7c2d12",
  },
  {
    id: 3,
    title: "Marina Bay Garden",
    description:
      "Step into a vibrant garden bursting with colorful blooms, trees, and secret paths waiting to be discovered. Each corner offers a new chance to pause, breathe, and let nature’s beauty wash over you.  It’s your everyday escape to peace.",
    image: "/images/Marina_bay_garden.png",
    backgroundImage: "/background_images/blur_marina_bay_garden.png",
    caption: "Marina Bay Garden",
    backgroundColor: "#3b0764",
  },
  {
    id: 4,
    title: "Kids Play Area",
    description:
      "A vibrant and exciting space built to spark joy, creativity, and adventure for children of all ages. Our play area is carefully designed with fun, safety, and imagination in mind. It’s a welcoming place where kids can explore, learn, and grow.",
    image: "/images/Kids_play_area.png",
    backgroundImage: "/background_images/blur_kids_play_area.png",
    caption: "Kids Play Area",
    backgroundColor: "#166534",
  },
];

const videoTestimonials = [
  {
    id: 1,
    title: "Mr./Mrs. Margret Kingsley",
    thumbnail: "/images/Testimonial-1.jpeg",
    youtubeUrl: "https://www.youtube.com/watch?v=nOLkacqbZU4",
  },
  {
    id: 2,
    title: "Mr./Mrs. Kacholia's",
    thumbnail: "/images/Testimonial-2.jpeg",
    youtubeUrl: "https://www.youtube.com/watch?v=9mS37VEgWHU",
  },
  {
    id: 3,
    title: "Mr./Mrs. Anurag Tripathi",
    thumbnail: "/images/Testimonial-3.jpeg",
    youtubeUrl: "https://www.youtube.com/watch?v=O-h8oQ4e2Nw",
  },
  {
    id: 4,
    title: "Mr./Mrs. Uday K Kalgutkar",
    thumbnail: "/images/Testimonial-4.jpeg",
    youtubeUrl: "https://www.youtube.com/watch?v=NzOE1F1lqsw",
  },
];

function getItemClass(
  index: number,
  active: number,
  other_1: number,
  other_2: number
) {
  if (index === active) return "item active";
  if (index === other_1) return "item other_1";
  if (index === other_2) return "item other_2";
  return "item";
}

export default function App() {
  // Add CSS to document head
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = scrollAnimationCSS;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Independent carousel states

  const amenities = useCarousel(carouselItems.length, 5000);
  const corners = useCarousel(communityCornersItems.length, 5000);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoCarouselItems, setVideoCarouselItems] = useState([
    ...videoTestimonials,
    ...videoTestimonials,
  ]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [showOther, setShowOther] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showPricing, setShowPricing] = useState(false);
  const PricingnRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const rect = entry.boundingClientRect;
          const viewportHeight = window.innerHeight;
          const isBottom40Visible = rect.bottom <= viewportHeight * 0.6;
          if (isBottom40Visible) {
            setShowPricing(true);
          } else {
            setShowPricing(false);
          }
        });
      },
      {
        root: null,
        threshold: Array.from({ length: 11 }, (_, i) => i / 10),
      }
    );

    if (PricingnRef.current) {
      observer.observe(PricingnRef.current);
    }

    return () => {
      if (PricingnRef.current) {
        observer.unobserve(PricingnRef.current);
      }
    };
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const rect = entry.boundingClientRect;
          const viewportHeight = window.innerHeight;
          const isBottom40Visible = rect.bottom <= viewportHeight * 0.6;
          if (isBottom40Visible) {
            setShowOther(true);
          } else {
            setShowOther(false);
          }
        });
      },
      {
        root: null,
        threshold: Array.from({ length: 11 }, (_, i) => i / 10),
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex >= videoTestimonials.length) {
          // Reset the carousel items to start fresh loop
          setTimeout(() => {
            setVideoCarouselItems([...videoTestimonials, ...videoTestimonials]);
            setCurrentVideoIndex(0);
          }, 500); // Wait for transition to complete
          return 0;
        }
        return nextIndex;
      });
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleVideoClick = (youtubeUrl: string) => {
    window.open(youtubeUrl, "_blank");
  };

  return (
    <>
      {/* <section
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          minHeight: "500px",
          maxHeight: "800px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "url(/images/starter.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "brightness(0.7)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            color: "white",
            padding: "0 20px",
            maxWidth: "800px",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: "bold",
              marginBottom: "1rem",
              textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
              letterSpacing: "2px",
            }}
          >
            10 MARINA BAY
          </h1>
         
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            
          </div>
        </div>
      </section> */}
      <MarinaNavbar />

      <Hero />

      <main>
        {/* Amenities Carousel */}
        <div className="header-center animate-fade-up">
          <h1 className="main-title">STAY UPDATED ON YOUR BUILDING PROGRESS</h1>
        </div>

        <div className="animate-scale">
          <BuildingProgress />
        </div>
        <div className="section-container">
          <div className="wrapper" id="amenities">
            <div className="section-wrapper Amenities-wrapper" >
              <section
                className={`carousel ${amenities.direction} animate-slide-right`}
                aria-label="Amenities carousel"
              >
                <h1 className="main-title2">AMENITIES</h1>
                <h1 className="main-subtitle">WELLNESS & RECREATION</h1>

                <div className="list">
                  {carouselItems.map((item, index) => (
                    <article
                      key={item.id}
                      className={getItemClass(
                        index,
                        amenities.active,
                        amenities.other_1,
                        amenities.other_2
                      )}
                    >
                      <div
                        className="main-content"
                        style={{
                          backgroundImage: `url(${item.backgroundImage})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <div className="content">
                          <h2>{item.title}</h2>
                          <p className="description">{item.description}</p>
                        </div>
                      </div>

                      <figure className="image">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.caption}
                        />
                        <figcaption>{item.caption}</figcaption>
                      </figure>
                    </article>
                  ))}
                </div>

                <div className="arrows">
                  <button onClick={amenities.prev} aria-label="Previous">
                    {"<"}
                  </button>
                  <button onClick={amenities.next} aria-label="Next">
                    {">"}
                  </button>
                </div>
              </section>
            </div>
            <div
              ref={PricingnRef}
              className={`section-wrapper Amenities-wrapper property-section ${
                showPricing ? "shift-up" : ""
              }`}
            >
              {" "}
              <section
                className={`carousel ${corners.direction}  `}
                aria-label="Community corners carousel"
              >
                <div className="header-center animate-flip">
                  <h2 className="main-subtitle padding">COMMUNITY CORNERS</h2>
                </div>
                <div className="list">
                  {communityCornersItems.map((item, index) => (
                    <article
                      key={item.id}
                      className={getItemClass(
                        index,
                        corners.active,
                        corners.other_1,
                        corners.other_2
                      )}
                    >
                      <div
                        className="main-content"
                        style={{
                          backgroundImage: `url(${item.backgroundImage})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <div className="content">
                          <h2>{item.title}</h2>
                          <p className="description">{item.description}</p>
                        </div>
                      </div>

                      <figure className="image">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.caption}
                        />
                        <figcaption>{item.caption}</figcaption>
                      </figure>
                    </article>
                  ))}
                </div>

                <div className="arrows">
                  <button onClick={corners.prev} aria-label="Previous">
                    {"<"}
                  </button>
                  <button onClick={corners.next} aria-label="Next">
                    {">"}
                  </button>
                </div>
              </section>
            </div>
          </div>

          {/* Community Corners */}

          <div
            ref={sectionRef}
            id="property-section"
            className={`pricing-section ${
              showOther ? "shift-up" : ""
            } pricing-section ${showPricing ? "active" : ""}`}
          >
            <div
              className="header-center"
              style={{ marginTop: "0.2rem", marginBottom: "0.2rem" }}
            >
              <h1 className="main-title">PROPERTY PRICING</h1>
            </div>
            <PropertyPricing />
          </div>

          <div className={`other-section ${showOther ? "active" : ""}`} id="projects">
            <OtherProjects />
          </div>
        </div>
        {/* Video Testimonials Section */}
        <div className="video-testimonials-header animate-scale">
          <h1 className="main-title" id="feedback">FEEDBACK THAT FUELS US</h1>
          <div className="video-testimonials-stats">
            <div className="video-testimonials-stat">
              <div className="video-testimonials-stat-value">10m+</div>
              <div className="video-testimonials-stat-label">Happy People</div>
            </div>
            <div className="video-testimonials-stat">
              <div className="video-testimonials-stat-value">4.7</div>
              <div className="video-testimonials-stat-label">
                Overall rating
              </div>
              {/* <div className="video-testimonials-rating">★★★★★</div> */}
            </div>
          </div>
        </div>

        <div className="video-testimonials-section animate-slide-left">
          <div className="video-carousel-container">
            <div
              className="video-carousel-track"
              style={{
                transform: `translateX(-${currentVideoIndex * 320}px)`,
                transition: "transform 0.5s ease-in-out",
              }}
            >
              {videoCarouselItems.map((video, index) => (
                <div
                  key={`${video.id}-${index}`}
                  className="video-testimonial-card"
                  onClick={() => handleVideoClick(video.youtubeUrl)}
                >
                  <div className="video-thumbnail-container">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="video-thumbnail"
                    />
                    <div className="play-button-overlay">
                      <div className="play-button">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="white"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="video-title">{video.title}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginTop: "20px",
            }}
          >
            {videoTestimonials.map((_, index) => (
              <div
                key={index}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor:
                    currentVideoIndex === index ? "#003261" : "#ccc",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onClick={() => setCurrentVideoIndex(index)}
              />
            ))}
          </div>
        </div>

        <div
          id="about"
          className="about-section animate-slide-right"
          style={{
            display: "flex",
            alignItems: "flex-start",
            maxWidth: "1200px",
            margin: "40px auto",
            padding: "40px 20px",
            gap: "40px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          {/* Left side - Image */}
          <div className="building-wrapper"
            style={{
              flex: "0 0 300px",
              minHeight: "250px",
            }}
          >
            <img
              src="/images/mb_ind_1.jpg"
              alt="EV Group Building"
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            />
          </div>

          {/* Right side - Content */}
          <div
            style={{
              flex: "1",
              paddingLeft: "20px",
            }}
          >
            <h2
              style={{
                fontSize: "2.4rem",
                fontWeight: 800,
                color: "#003261",
                marginBottom: "20px",
                fontFamily: "'Amaranth', sans-serif",
              }}
            >
              About EV Group
            </h2>

            <div
              style={{
                fontSize: "0.95rem",
                lineHeight: "1.6",
                color: "#003261",
                textAlign: "justify",
                marginBottom: "25px",
                // fontFamily: "'Amaranth', sans-serif",
              }}
            >
              <p>
                EV Group is one of India's Leading and Fast Growing Engineering
                and Real Estate Company. To a Team of Entrepreneurs, focused on
                Quality and an excellent Return on Investment. The Group has
                established itself as a market leader in quality and executing
                projects with realistic timelines. The Group has a diverse
                portfolio of Engineering and Real Estate assets under its
                management. The portfolio is also geographically diversified
                with a Pan India presence in Tier II & Tier III cities of
                Bangalore, Cochin & N.Mumbai and globally focused on the Middle
                East market.
              </p>
            </div>

            {/* Buttons matching the original style */}
            <div
              style={{
                display: "flex",
                gap: "15px",
                flexWrap: "wrap",
              }}
            >
              <button
                style={{
                  backgroundColor: "#003261",
                  color: "white",
                  padding: "12px 24px",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  fontFamily: "'Amaranth', sans-serif",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 4px rgba(0,50,97,0.2)",
                }}
                onClick={() =>
                  window.open("https://evgroup.in/profile.html", "_blank")
                }
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#002147";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(0,50,97,0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#003261";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 4px rgba(0,50,97,0.2)";
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        <div
          className="maharera-section"
          style={{
            display: "flex",
            alignItems: "flex-start",
            maxWidth: "1200px",
            margin: "40px auto",
            padding: "40px 40px 40px 20px", // top right bottom left
            gap: "40px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          {/* Left side - QR Code */}
          <div className="qr-wrapper"
            style={{
              flex: "0 0 200px",
              minHeight: "200px",
            }}
          >
            <img
              src="/images/maha_rera_qr.jpeg"
              alt="MAHARERA QR Code"
              style={{
                width: "100%",
                height: "200px",
                objectFit: "contain",
                borderRadius: "8px",
                backgroundColor: "white",
                padding: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            />
          </div>

          {/* Right side - MAHARERA Content */}
          <div
            style={{
              flex: "1",
              paddingLeft: "20px",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#003261",
                marginBottom: "15px",
                fontFamily: "'Amaranth', sans-serif",
              }}
            >
              MAHARERA Registration Number: PST700028722
            </h2>

            <div
              style={{
                fontSize: "0.8rem",
                lineHeight: "1.6",
                color: "#000000",
                textAlign: "justify",
                marginBottom: "20px",
                fontWeight: 500,
              }}
            >
              <p style={{ marginBottom: "15px" }}>
                According to the RERA Act 2018 of the Government of India, all
                projects of the EV Homes Constructions Pvt Ltd including 10
                Marina Bay, are listed on the Maharashtra Government's RERA
                website under registered projects.
              </p>
              <p style={{ marginBottom: "15px" }}>
                The 10 Marina Bay project is developed and marketed in
                accordance with the Real Estate (Regulation and Development)
                Act, 2018 (RERA).
              </p>
              <p style={{ marginBottom: "15px" }}>
                Buyers are encouraged to visit the official MAHARERA website for
                complete project details, approvals and registration status.
              </p>
              <p>
                EV Homes Constructions Pvt Ltd has received full rights to
                Market/Advertise/Sell the apartments in 10 Marina Bay Vide
                MAHARERA Registration Number PST700028722. EV Homes
                Constructions Pvt Ltd hereby ensures that the fact stated herein
                are true and complete to the best of our knowledge and belief
                and nothing has been concealed or suppressed. EV Homes
                Constructions Pvt Ltd does not take any responsibility for the
                completeness or correctness of such information. Buyers are
                encouraged to verify all project-related details from the
                official MAHARERA website.
              </p>
            </div>
          </div>
        </div>

        <footer
          className="animate-fade-up" id="contact"
          style={{
            backgroundColor: "#1a1a1a",
            color: "#ffffff",
            padding: "60px 20px 40px",
            marginTop: "60px",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {/* Header with logo and social icons */}
            <div
              className="footer-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "40px",
                marginBottom: "40px",
              }}
            >
              <div
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                  color: "#ffffff",
                }}
              >
                EV HOMES
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  alignItems: "center",
                }}
              >
                <span style={{ marginRight: "10px", fontSize: "0.9rem" }}>
                  Follow Us
                </span>
                <div style={{ display: "flex", gap: "10px" }}>
                  {/* Facebook */}
                  <div
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      window.open(
                        "https://www.facebook.com/evgindia?rdid=T5Y9xWn898Hd6XmZ&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19nwaBWiBf%2F#",
                        "_blank"
                      )
                    }
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                      alt="Facebook"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </div>

                  {/* Instagram */}
                  <div
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      window.open(
                        "https://www.instagram.com/evhomesofficial/?igsh=MTRuZnA1MDd3Ymw0Mg%3D%3D#",
                        "_blank"
                      )
                    }
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                      alt="Instagram"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </div>

                  {/* LinkedIn */}
                  <div
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      window.open(
                        "https://www.linkedin.com/company/ev-homes",
                        "_blank"
                      )
                    }
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                      alt="LinkedIn"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Main footer content */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                gap: "40px",
                marginBottom: "40px",
              }}
            >
              {/* Subscribe Section */}

              <div>
                <h3 className="subscribe-title">Subscribe</h3>

                <div className="subscribe-form">
                  <input
                    type="email"
                    placeholder="Your e-mail"
                    className="subscribe-input"
                  />
                  <button className="subscribe-button">Send →</button>
                </div>

                <p className="subscribe-text">
                  Subscribe our newsletter to receive our weekly feed.
                </p>
              </div>

              {/* Discover Section */}
              <div
                style={{
                  paddingLeft: "20px", // small left padding
                }}
              >
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    marginBottom: "20px",
                    color: "#ffffff",
                  }}
                >
                  Discover
                </h3>
                <ul
                  style={{
                    listStyle: "none",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  {[
                    "Gwalior",
                    "Aroji",
                    "Koparkhaane",
                    "Sarooda",
                    "Nerul",
                    "Seawoods",
                    "Ulwe",
                    "Kharghar",
                  ].map((item) => (
                    <li
                      key={item}
                      style={{
                        marginBottom: "8px",
                      }}
                    >
                      <a
                        href="#"
                        style={{
                          color: "#ccc",
                          textDecoration: "none",
                          fontSize: "0.9rem",
                          transition: "color 0.3s ease",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.color = "#003261")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.color = "#ccc")
                        }
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links Section */}
              <div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    marginBottom: "20px",
                    color: "#ffffff",
                  }}
                >
                  Quick Links
                </h3>
                <ul
                  style={{
                    listStyle: "none",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  <li
                    key="About"
                    style={{
                      marginBottom: "8px",
                    }}
                  >
                    <a
                      href="#about"
                      style={{
                        color: "#ccc",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        transition: "color 0.3s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.color = "#003261")
                      }
                      onMouseOut={(e) => (e.currentTarget.style.color = "#ccc")}
                    >
                      About
                    </a>
                  </li>
                  <li
                    key="Contact"
                    style={{
                      marginBottom: "8px",
                    }}
                  >
                    <a
                      href="#contact"
                      style={{
                        color: "#ccc",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        transition: "color 0.3s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.color = "#003261")
                      }
                      onMouseOut={(e) => (e.currentTarget.style.color = "#ccc")}
                    >
                      Contact
                    </a>
                  </li>
                  {["FAQ's", "Privacy Policy", "Terms & Conditions"].map(
                    (item) => (
                      <li
                        key={item}
                        style={{
                          marginBottom: "8px",
                        }}
                      >
                        <a
                          href="#"
                          style={{
                            color: "#ccc",
                            textDecoration: "none",
                            fontSize: "0.9rem",
                            transition: "color 0.3s ease",
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.color = "#003261")
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.color = "#ccc")
                          }
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Contact Us Section */}
              <div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    marginBottom: "20px",
                    color: "#ffffff",
                  }}
                >
                  Contact Us
                </h3>
           <div
  style={{
    fontSize: "0.9rem",
    color: "#ccc",
    lineHeight: "1.6",
  }}
>
  <a
    href="https://evgroup.in/profile.html"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: "#ccc",
      textDecoration: "none",
      fontSize: "0.9rem",
      display: "block",
      marginBottom: "8px",
      transition: "color 0.3s ease",
    }}
    onMouseOver={(e) => (e.currentTarget.style.color = "#003261")}
    onMouseOut={(e) => (e.currentTarget.style.color = "#ccc")}
  >
    www.evgroup.in
  </a>

  <a
    href="https://wa.me/919867456777"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: "#ccc",
      textDecoration: "none",
      fontSize: "0.9rem",
      display: "block",
      marginBottom: "8px",
      transition: "color 0.3s ease",
    }}
    onMouseOver={(e) => (e.currentTarget.style.color = "#003261")}
    onMouseOut={(e) => (e.currentTarget.style.color = "#ccc")}
  >
    +91 98674 56777
  </a>
</div>

              </div>

              {/* Our Address Section */}
              <div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    marginBottom: "20px",
                    color: "#ffffff",
                  }}
                >
                  Our Address
                </h3>
                <div
                  style={{
                    fontSize: "0.9rem",
                    color: "#ccc",
                    lineHeight: "1.6",
                  }}
                >
                  <p>
                    212 A wing Vrindavan,
                    <br />
                    Chambers Above Axis Bank,
                    <br />
                    sector-17, Vashi Navi
                    <br />
                    Mumbai
                  </p>
                </div>
              </div>

              {/* Get the app Section */}
              <div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    marginBottom: "20px",
                    color: "white",
                  }}
                >
                  Get the app
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#333",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                    }}
                    onClick={() => {
                      window.open(
                        "https://play.google.com/store/apps/details?id=com.evhomes.ev_homes&hl=en",
                        "_blank"
                      );
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#444")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#333")
                    }
                  >
                    <span style={{ marginRight: "8px", fontSize: "1.2rem" }}>
                      ▶️
                    </span>
                    <div>
                      <div style={{ fontSize: "0.7rem", color: "#aaa" }}>
                        Get it on
                      </div>
                      <div
                        style={{
                          fontSize: "0.9rem",
                          fontWeight: "600",
                          color: "white",
                        }}
                      >
                        Google Play
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
