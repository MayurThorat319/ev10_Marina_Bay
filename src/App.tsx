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
      'A scenic route for daily jogs, evening walks, and weekend runs where staying fit feels like an escape into nature.',
    image: '/images/jogging_track.png',
    backgroundImage: '/background_images/blur_jogging_track.png',
    caption: 'Jogging Track',
    backgroundColor: '#f5bfaf',
  },
  {
    id: 2,
    title: 'Exclusive Gym',
    description:
      'A welcoming, well-stocked gym with great equipment and scenic views ,making it easy to stay fit and feel good every time you step inside.',
    image: '/images/GYM.png',
    backgroundImage: '/background_images/blur_gym.png',
    caption: 'Exclusive Gym',
    backgroundColor: '#9c4d2f',
  },
  {
    id: 3,
    title: 'Infinity Pool',
    description:
      'An inviting infinity pool that feels like it touches the sky , great for a cool swim with lovely views all around.',
    image: '/images/Infinity_pool.png',
    backgroundImage: '/background_images/blur_infinity_pool.png',
    caption: 'Infinity Pool',
    backgroundColor: '#b47993',
  },
  {
    id: 4,
    title: 'Meditation Centre',
    description:
      'A serene haven to find calm and reconnect with yourself where stunning views and mindful moments renew your body, mind and soul.',
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
      "Whether It's A Sunset Cocktail, A Romantic Dinner, Or A Vibrant Celebration, Our Rooftop Party Lounge With Stunning Sea Views Promises A Magical Experience like No Other, Where Every Moment Becomes A Cherished Memory.",
    image: '/images/rooftop_lounge.png',
    backgroundImage: '/background_images/blur_rooftop_lounge.png',
    caption: 'Rooftop Lounge',
    backgroundColor: '#0f172a',
  },
  {
    id: 2,
    title: 'Barbeque Zone',
    description:
      'Gather, grill, and enjoy! Our Barbeque Zone is perfect for family and friends to savor tasty grilled meals and create lasting memories. With great grilling stations and a cozy vibe, let’s fire up the flavors for every gathering!',
    image: '/images/Barbeque_zone.png',
    backgroundImage: '/background_images/blur_barbeque_zone.png',
    caption: 'Barbeque Zone',
    backgroundColor: '#7c2d12',
  },
  {
    id: 3,
    title: 'Marina Bay Garden',
    description:
      'Discover tranquility in our lush garden, a vibrant oasis of colorful flowers, towering trees, and beautifully landscaped paths.',
    image: '/images/Marina_bay_garden.png',
    backgroundImage: '/background_images/blur_marina_bay_garden.png',
    caption: 'Marina Bay Garden',
    backgroundColor: '#3b0764',
  },
  {
    id: 4,
    title: 'Kids Play Area',
    description:
      'A vibrant space designed to inspire joy and creativity for kids of all ages. Our play area blends fun, safety, and imagination, creating a haven for exploration and learning.',
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
