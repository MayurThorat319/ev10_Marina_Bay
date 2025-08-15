import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import type { FloorPlan } from './floor-plan/floor_plan'
import FloorPlanCarousel from './floor-plan/floor_plan'
import Page from './App/property_pricing'
import BuildingProgress from './components/building-progress/building-progress'
// import BuildingProgress from './buildings/building-progress'

type Direction = 'next' | 'prev'

function useCarousel(count: number, autoPlayMs = 5000) {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState<Direction>('next')
  const timerRef = useRef<number | null>(null)

  const { other_1, other_2 } = useMemo(() => {
    let o1: number, o2: number
    if (direction === 'next') {
      o1 = active - 1 < 0 ? count - 1 : active - 1
      o2 = active + 1 >= count ? 0 : active + 1
    } else {
      o1 = active + 1 >= count ? 0 : active + 1
      o2 = o1 + 1 >= count ? 0 : o1 + 1
    }
    return { other_1: o1, other_2: o2 }
  }, [active, direction, count])

  const next = () => {
    setDirection('next')
    setActive((prev) => (prev + 1) % count)
  }

  const prev = () => {
    setDirection('prev')
    setActive((prev) => (prev - 1 + count) % count)
  }

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = window.setInterval(() => {
      next()
    }, autoPlayMs)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [active, autoPlayMs])

  return { active, other_1, other_2, direction, next, prev }
}


const carouselItems = [
  {
    id: 1,
    title: 'Jogging Track',
    description:
      'TAKE A WALK, GO FOR A JOG, OR ENJOY A QUIET RUN ALONG THE JOGGING TRACK. IT’S A GREAT WAY TO MOVE YOUR BODY WHILE SOAKING IN THE VIEWS. FITNESS FEELS EASY WHEN IT LOOKS THIS GOOD.',
    image: '/images/jogging_track.png',
    backgroundImage: '/background_images/blur_jogging_track.png',
    caption: 'Jogging Track',
    backgroundColor: '#f5bfaf',
  },
  {
    id: 2,
    title: 'Exclusive Gym',
    description:
      'STEP INTO OUR WELCOMING, WELL-EQUIPPED GYM WHERE EVERY CORNER IS DESIGNED TO INSPIRE YOUR FITNESS JOURNEY. LATEST MACHINES AND STUNNING SCENIC VIEWS, WORKING OUT BECOMES A REFRESHING EXPERIENCE THAT LIFTS BOTH BODY AND SPIRIT.',
    image: '/images/GYM.png',
    backgroundImage: '/background_images/blur_gym.png',
    caption: 'Exclusive Gym',
    backgroundColor: '#9c4d2f',
  },
  {
    id: 3,
    title: 'Infinity Pool',
    description:
      'THE INFINITY POOL OFFERS A SERENE ESCAPE WHERE THE WATER APPEARS TO MERGE WITH THE SKY. ENJOY A COOL, REFRESHING SWIM SURROUNDED BY BREATHTAKING VIEWS. IT’S THE PERFECT PLACE TO RELAX, RECHARGE, AND TAKE IN THE BEAUTY AROUND YOU.',
    image: '/images/Infinity_pool.png',
    backgroundImage: '/background_images/blur_infinity_pool.png',
    caption: 'Infinity Pool',
    backgroundColor: '#b47993',
  },
  {
    id: 4,
    title: 'Meditation Centre',
    description:
      'A SERENE SANCTUARY TO HELP YOU RECONNECT WITH YOUR INNER SELF AND FIND PEACE AMID LIFE’S HUSTLE. NESTLED IN A TRANQUIL SETTING WITH STUNNING VIEWS, OUR CENTER OFFERS A PERFECT BLEND OF MINDFULNESS, SPIRITUALITY, AND RELAXATION TO REFRESH YOUR MIND, BODY, AND SOUL.',
    image: '/images/Meditation_center.png',
    backgroundImage: '/background_images/blur_meditation_center.png',
    caption: 'Meditation Centre',
    backgroundColor: '#7eb63d',
  },
]

const communityCornersItems = [
  {
    id: 1,
    title: 'Rooftop Lounge',
    description:
      "WHETHER IT’S A SUNSET COCKTAIL, A ROMANTIC DINNER, OR A LIVELY CELEBRATION, OUR ROOFTOP PARTY LOUNGE WITH STUNNING SEA VIEWS OFFERS A MAGICAL EXPERIENCE. EVERY MOMENT HERE BECOMES A CHERISHED MEMORY AGAINST THE BACKDROP OF BREATHTAKING SCENERY. JOIN US AND MAKE YOUR SPECIAL OCCASIONS TRULY UNFORGETTABLE.",
    image: '/images/rooftop_lounge.png',
    backgroundImage: '/background_images/blur_rooftop_lounge.png',
    caption: 'Rooftop Lounge',
    backgroundColor: '#0f172a',
  },
  {
    id: 2,
    title: 'Barbeque Zone',
    description:
      'FIRE UP THE GRILL AND BRING EVERYONE TOGETHER IN OUR LIVELY BARBECUE ZONE. IT’S THE IDEAL PLACE TO ENJOY GREAT FOOD, GOOD COMPANY, AND PLENTY OF SMILES. MAKE EVERY MEAL A CELEBRATION AND EVERY MOMENT A MEMORY.',
    image: '/images/Barbeque_zone.png',
    backgroundImage: '/background_images/blur_barbeque_zone.png',
    caption: 'Barbeque Zone',
    backgroundColor: '#7c2d12',
  },
  {
    id: 3,
    title: 'Marina Bay Garden',
    description:
      'STEP INTO A VIBRANT GARDEN BURSTING WITH COLORFUL BLOOMS, TREES, AND SECRET PATHS WAITING TO BE DISCOVERED. EACH CORNER OFFERS A NEW CHANCE TO PAUSE, BREATHE, AND LET NATURE’S BEAUTY WASH OVER YOU. IT’S YOUR EVERYDAY ESCAPE TO PEACE.',
    image: '/images/Marina_bay_garden.png',
    backgroundImage: '/background_images/blur_marina_bay_garden.png',
    caption: 'Marina Bay Garden',
    backgroundColor: '#3b0764',
  },
  {
    id: 4,
    title: 'Kids Play Area',
    description:
      'A VIBRANT AND EXCITING SPACE BUILT TO SPARK JOY, CREATIVITY, AND ADVENTURE FOR CHILDREN OF ALL AGES. OUR PLAY AREA IS CAREFULLY DESIGNED WITH FUN, SAFETY, AND IMAGINATION IN MIND. IT’S A WELCOMING PLACE WHERE KIDS CAN EXPLORE, LEARN, AND GROW.',
    image: '/images/Kids_play_area.png',
    backgroundImage: '/background_images/blur_kids_play_area.png',
    caption: 'Kids Play Area',
    backgroundColor: '#166534',
  },
]

function getItemClass(index: number, active: number, other_1: number, other_2: number) {
  if (index === active) return 'item active'
  if (index === other_1) return 'item other_1'
  if (index === other_2) return 'item other_2'
  return 'item'
}


export default function App() {
  // Independent carousel states
  const amenities = useCarousel(carouselItems.length, 5000)
  const corners = useCarousel(communityCornersItems.length, 5000)

  return (
    <>
     <div className="header-center" >
          <h1 className="main-title">STAY UPDATED ON YOUR BUILDING PROGRESS</h1>        
        </div>
           <BuildingProgress />
      <div className="header-center" style={{ marginTop: '2rem', marginBottom: '1rem' }}>
        <h1 className="main-title2">AMENITIES</h1>
        <h2 className="main-subtitle">WELLNESS & RECREATION</h2>
      </div>

      <main>
        {/* Amenities Carousel */}
        <section className={`carousel ${amenities.direction}`} aria-label="Amenities carousel">
          <div className="list">
            {carouselItems.map((item, index) => (
              <article
                key={item.id}
                className={getItemClass(index, amenities.active, amenities.other_1, amenities.other_2)}
              >
                <div
                  className="main-content"
                  style={{
                    backgroundImage: `url(${item.backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="content">
                    <h2>{item.title}</h2>
                    <p className="description">{item.description}</p>
                  </div>
                </div>

                <figure className="image">
                
                  <img src={item.image || '/placeholder.svg'} alt={item.caption} />
                  <figcaption>{item.caption}</figcaption>
                </figure>
              </article>
            ))}
          </div>

          <div className="arrows">
            <button onClick={amenities.prev} aria-label="Previous">
              {'<'}
            </button>
            <button onClick={amenities.next} aria-label="Next">
              {'>'}
            </button>
          </div>
        </section>

        {/* Community Corners */}
         <div className="header-center">

        <h2 className="main-subtitle">COMMUNITY CORNERS</h2>
      </div>


        <section className={`carousel ${corners.direction}`} aria-label="Community corners carousel">
          <div className="list">
            {communityCornersItems.map((item, index) => (
              <article
                key={item.id}
                className={getItemClass(index, corners.active, corners.other_1, corners.other_2)}
              >
                <div
                  className="main-content"
                  style={{
                    backgroundImage: `url(${item.backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="content">
                    <h2>{item.title}</h2>
                    <p className="description">{item.description}</p>
                  </div>
                </div>

                <figure className="image">
                  <img src={item.image || '/placeholder.svg'} alt={item.caption} />
                  <figcaption>{item.caption}</figcaption>
                </figure>
              </article>
            ))}
          </div>

          <div className="arrows">
            <button onClick={corners.prev} aria-label="Previous">
              {'<'}
            </button>
            <button onClick={corners.next} aria-label="Next">
              {'>'}
            </button>
          </div>
        </section>

         <div className="header-center" style={{ marginTop: '2rem', marginBottom: '1rem' }}>
          <h1 className="main-title">PROPERTY PRICING</h1>
        </div>
        <Page />

        <div
        id="about"
          className="about-section" // Added class name for responsive styles
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
          <div
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
                fontSize: "1.8rem",
                fontWeight: 600,
                color: "#003261",
                marginBottom: "20px",
                fontFamily: "serif",
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
              }}
            >
              <p>
                EV Group is one of India's Leading and Fast Growing Engineering and Real Estate Company. To a Team of
                Entrepreneurs, focused on Quality and an excellent Return on Investment. The Group has established
                itself as a market leader in quality and executing projects with realistic timelines. The Group has a
                diverse portfolio of Engineering and Real Estate assets under its management. The portfolio is also
                geographically diversified with a Pan India presence in Tier II & Tier III cities of Bangalore, Cochin &
                N.Mumbai and globally focused on the Middle East market.
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
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 4px rgba(0,50,97,0.2)",
                }}
                onClick={() => window.open("https://evgroup.in/profile.html", "_blank")}

                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#002147"
                  e.currentTarget.style.transform = "translateY(-1px)"
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,50,97,0.3)"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#003261"
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,50,97,0.2)"
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
            padding: "40px 20px",
            gap: "40px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
             boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          {/* Left side - QR Code */}
          <div
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
                fontFamily: "serif",
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
                According to the RERA Act 2018 of the Government of India, all projects of the EV Homes Constructions
                Pvt Ltd including 10 Marina Bay, are listed on the Maharashtra Government's RERA website under
                registered projects.
              </p>
              <p style={{ marginBottom: "15px" }}>
                The 10 Marina Bay project is developed and marketed in accordance with the Real Estate (Regulation and
                Development) Act, 2018 (RERA).
              </p>
                 <p style={{ marginBottom: "15px" }}>
                Buyers are encouraged to visit the official MAHARERA website for complete project details, approvals and registration status.
              </p>
              <p>
                EV Homes Constructions Pvt Ltd has received full rights to Market/Advertise/Sell the apartments in 10
                Marina Bay Vide MAHARERA Registration Number PST700028722. EV Homes Constructions Pvt Ltd hereby ensures
                that the fact stated herein are true and complete to the best of our knowledge and belief and nothing
                has been concealed or suppressed. EV Homes Constructions Pvt Ltd does not take any responsibility for
                the completeness or correctness of such information. Buyers are encouraged to verify all project-related
                details from the official MAHARERA website.
              </p>
            </div>

          
          </div>
        </div>


        
         <footer
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
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "40px",
                paddingBottom: "20px",
                borderBottom: "1px solid #333",
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
                <span style={{ marginRight: "10px", fontSize: "0.9rem" }}>Follow Us</span>
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
      window.open("https://www.facebook.com/evgindia?rdid=T5Y9xWn898Hd6XmZ&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19nwaBWiBf%2F#", "_blank")
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
      window.open("https://www.instagram.com/evhomesofficial/?igsh=MTRuZnA1MDd3Ymw0Mg%3D%3D#", "_blank")
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
      window.open("https://www.linkedin.com/company/ev-homes", "_blank")
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
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    marginBottom: "20px",
                    color: "#ffffff",
                  }}
                >
                  Subscribe
                </h3>
          <div
  style={{
    display: "flex",
    marginBottom: "10px",
  }}
>
  <input
    type="email"
    placeholder="Your e-mail"
    style={{
      flex: "1",
      padding: "6px 8px", // smaller height
      backgroundColor: "#333",
      border: "1px solid #555",
      borderRadius: "3px 0 0 3px",
      color: "#ffffff",
      fontSize: "0.75rem", // smaller text
    }}
  />
  <button
    style={{
      padding: "6px 12px", // smaller height
      backgroundColor: "#003261",
      color: "#ffffff",
      border: "none",
      borderRadius: "0 3px 3px 0",
      cursor: "pointer",
      fontSize: "0.75rem", // smaller text
      transition: "background-color 0.3s ease",
    }}
    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#002147")}
    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#003261")}
  >
    Send →
  </button>
</div>

                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#aaa",
                    lineHeight: "1.4",
                  }}
                >
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
          onMouseOver={(e) => (e.currentTarget.style.color = "#003261")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#ccc")}
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
                  <p
  className="cursor-pointer hover:underline"
  onClick={() => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  }}
   onMouseOver={(e) => (e.currentTarget.style.color = "#003261")}
                        onMouseOut={(e) => (e.currentTarget.style.color = "#ccc")}
>
  About
</p>

  <p
  className="cursor-pointer hover:underline"
  onClick={() => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  }}
  style={{
                          color: "#ccc",
                          textDecoration: "none",
                          fontSize: "0.9rem",
                          transition: "color 0.3s ease",
                        }}
   onMouseOver={(e) => (e.currentTarget.style.color = "#003261")}
                        onMouseOut={(e) => (e.currentTarget.style.color = "#ccc")}
>
  Contact
</p>
                  {[ "FAQ's", "Privacy Policy", "Terms & Conditions"].map((item) => (
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
                        onMouseOver={(e) => (e.currentTarget.style.color = "#003261")}
                        onMouseOut={(e) => (e.currentTarget.style.color = "#ccc")}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
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
                  <p style={{ marginBottom: "8px" }}>www.evgroup.in</p>
                  <p style={{ marginBottom: "8px" }}>+91 98674 56777</p>
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
                    color: "#ffffff",
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
                      window.open("https://play.google.com/store/apps/details?id=com.evhomes.ev_homes&hl=en","_blank")
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#444")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#333")}
                  >
                    <span style={{ marginRight: "8px", fontSize: "1.2rem" }}>▶️</span>
                    <div>
                      <div style={{ fontSize: "0.7rem", color: "#aaa" }}>Get it on</div>
                      <div style={{ fontSize: "0.9rem", fontWeight: "600" }}>Google Play</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
  
      </main>
    </>
  )
}
