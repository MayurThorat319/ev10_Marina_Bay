import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

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
      'A SERENE SANCTUARY TO HELP YOU RECONNECT WITH YOUR INNER SELF AND FIND PEACE AMID LIFE’S HUSTLE. NESTLED IN A TRANQUIL SETTING WITH STUNNING VIEWS, OUR CENTER OFFERS A PERFECT BLEND OF MINDFULNESS, SPIRITUALITY, AND RELAXATION TO REFRESH YOUR MIND, BODY, AND SOUL',
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
      <div className="header-center">
        <h1 className="page-title">AMENITIES</h1>
        <h2 className="page-subtitle">Wellness & Recreation</h2>
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
        <div className="header-center" style={{ marginTop: '2rem', marginBottom: '3rem' }}>
          <h1 className="page-title">COMMUNITY CORNERS</h1>
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
      </main>
    </>
  )
}
