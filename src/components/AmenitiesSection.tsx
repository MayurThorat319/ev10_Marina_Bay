

interface carouselItemstype {
    id: number;
    title: string;
    description: string;
    image: string;
    backgroundImage: string;
    caption: string;
    backgroundColor: string;
}

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


const AmenitiesSection = ({amenities,carouselItems}:{amenities:any, carouselItems: carouselItemstype[]}) => {
  return (
     <section
                className={`carousel ${amenities.direction} animate-slide-right`}
                aria-label="Amenities carousel"
              >
                <h1 className="main-title2">AMENITIES</h1>


                <div className="list">
                  {carouselItems!.map((item, index) => (
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

                <h1 className="main-subtitle">WELLNESS & RECREATION</h1>

              </section>
  )
}

export default AmenitiesSection