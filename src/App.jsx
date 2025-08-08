import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const carouselItems = [
  {
    id: 1,
    title: 'Jogging Track',
    description:
      'A scenic route for daily jogs, evening walks, and weekend runs where staying fit feels like an escape into nature.',
    image: '/images/jogging_track.png',
    backgroundImage: '/images/1_in.png',
    caption: 'Jogging Track',
    backgroundColor: '#f5bfaf',
  },
  {
    id: 2,
    title: 'Exclusive Gym',
    description:
      'A welcoming, well-stocked gym with great equipment and scenic views ,making it easy to stay fit and feel good every time you step inside.',
    image: '/images/GYM.png',
     backgroundImage: '/images/1_in.png',
    caption: 'Exclusive Gym',
    backgroundColor: '#9c4d2f',
  },
  {
    id: 3,
    title: 'Infinity Pool',
    description:
      'An inviting infinity pool that feels like it touches the sky , great for a cool swim with lovely views all around.',
    image: '/images/Infinity_pool.png',
     backgroundImage: '/images/1_in.png',
    caption: 'Infinity Pool',
    backgroundColor: '#b47993',
  },
  {
    id: 4,
    title: 'Meditation Centre',
    description:
      'A serene haven to find calm and reconnect with yourself where stunning views and mindful moments renew your body, mind and soul.',
    image: '/images/Meditation_center.png',
     backgroundImage: '/images/1_in.png',
    caption: 'Meditation Centre',
    backgroundColor: '#7eb63d',
  },
]

const communityCornersItems = [
  {
    id: 1,
    title: 'Rooftop Lounge',
    description:
      'Stargaze, mingle, and soak in skyline views—your open-air living room above the city.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rooftop_lounge-kPed5WwxlyJerdgYFfhPaAVS6QTtKZ.jpeg',
    caption: 'Rooftop Lounge',
    backgroundColor: '#0f172a',
  },
  {
    id: 2,
    title: 'Barbecue Pavilion',
    description:
      'Fire up the grill and gather with neighbors—food, laughter, and long tables built for togetherness.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Barbeque_area.jpg-tQtitR81nkCDt9IhinjiJGe9SLDvoM.jpeg',
    caption: 'Barbecue Pavilion',
    backgroundColor: '#7c2d12',
  },
  {
    id: 3,
    title: 'Sky Garden Walk',
    description:
      'Elevated green pathways and glowing landmarks—unwind on a magical evening stroll.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Marina_bay_garden-mkdSFwOqvl3jLGrNM6Q5jtOAiSJmXi.png',
    caption: 'Sky Garden Walk',
    backgroundColor: '#3b0764',
  },
  {
    id: 4,
    title: 'Kids’ Play Zone',
    description:
      'Colorful, safe, and engaging—where imaginations run free and new friendships begin.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kids_play_area.jpg-ST1PzrfKWXTMxDsijuigRzlvDRI2t3.jpeg',
    caption: "Kids' Play Zone",
    backgroundColor: '#166534',
  },
]

function App() {
  const [active, setActive] = useState(1)
  const [direction, setDirection] = useState('next') // 'next' | 'prev'
  const carouselRef = useRef(null)
  const autoPlayRef = useRef(null)
  const countItem = carouselItems.length

  const { other_1, other_2 } = useMemo(() => {
    let o1, o2
    if (direction === 'next') {
      o1 = active - 1 < 0 ? countItem - 1 : active - 1
      o2 = active + 1 >= countItem ? 0 : active + 1
    } else {
      o1 = active + 1 >= countItem ? 0 : active + 1
      o2 = o1 + 1 >= countItem ? 0 : o1 + 1
    }
    return { other_1: o1, other_2: o2 }
  }, [active, direction, countItem])

  const handleNext = () => {
    setDirection('next')
    setActive((prev) => (prev + 1 >= countItem ? 0 : prev + 1))
  }

  const handlePrev = () => {
    setDirection('prev')
    setActive((prev) => (prev - 1 < 0 ? countItem - 1 : prev - 1))
  }

  const resetAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    autoPlayRef.current = setInterval(() => {
      handleNext()
    }, 5000)
  }

  useEffect(() => {
    resetAutoPlay()
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [active])

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.className = `carousel ${direction}`
    }
  }, [direction])

  const getItemClass = (index) => {
    if (index === active) return 'item active'
    if (index === other_1) return 'item other_1'
    if (index === other_2) return 'item other_2'
    return 'item'
  }

  return (
    <>
      <header>
       
        <div className="header-center">
            
          <h1 className="title">AMENITIES</h1>
          <h2 className="subtitle">Wellness & Recreation</h2>
        </div>
        <div></div>
      </header>

      <main>
        <section
          ref={carouselRef}
          className="carousel next"
          aria-label="Amenities carousel"
        >
          <div className="list">
            {carouselItems.map((item, index) => (
            <article key={item.id} className={getItemClass(index)}>
  <div 
    className="main-content"
    style={{ 
      backgroundImage: `url(${item.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
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
            <button id="prev" onClick={handlePrev} aria-label="Previous">
              {'<'}
            </button>
            <button id="next" onClick={handleNext} aria-label="Next">
              {'>'}
            </button>
          </div>
        </section>


          <section
          ref={carouselRef}
          className="carousel next"
          aria-label="Amenities carousel"
        >
          <div className="list">
            {communityCornersItems.map((item, index) => (
              <article key={item.id} className={getItemClass(index)}>
                <div
                  className="main-content"
                  style={{ backgroundColor: item.backgroundColor }}
                >
                  <div className="content">
                    <h2>{item.title}</h2>
                    <p className="description">{item.description}</p>
                  </div>
                </div>

                <figure
                  className="image"
                //   style={{ backgroundColor: item.backgroundColor }}
                >
                  <img src={item.image || '/placeholder.svg'} alt={item.caption} />
                  <figcaption>{item.caption}</figcaption>
                </figure>
                
              </article>
            ))}

            
          </div>

          <div className="arrows">
            <button id="prev" onClick={handlePrev} aria-label="Previous">
              {'<'}
            </button>
            <button id="next" onClick={handleNext} aria-label="Next">
              {'>'}
            </button>
          </div>
        </section>
      </main>
    </>
  )
}

export default App