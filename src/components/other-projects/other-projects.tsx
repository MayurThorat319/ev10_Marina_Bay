import type React from "react"
import "./other-projects.css"

const OtherProjects: React.FC = () => {
  return (
    <div className="property-showcase-section">
      <div className="header-center">
        <h1 className="main-title">DISCOVER EVEN MORE EXCLUSIVE PROPERTIES</h1>
      </div>

      <div className="property-grid">
        {/* Property 1 - With overlay */}
        <div className="property-item property-large">
          <img src="/images/mb_bg.jpeg" alt="Luxury Apartments" className="property-image" />
          {/* <div className="property-overlay">
            <div className="property-count">28+</div>
            <div className="property-label">Properties</div>
            <div className="property-description">
              Explore our wide variety of properties to find your dream home today
            </div>
          </div> */}
        </div>

        {/* Property 2 - Ocean view */}
        <div className="property-item property-wide">
          <img src="/images/ev9square.jpg" alt="Ocean View Property" className="property-image" />
        </div>

        {/* Property 3 - High rise building */}
        <div className="property-item property-medium">
          <img src="/images/ev23malibu.jpg" alt="High Rise Building" className="property-image" />
            <div className="property-overlay">
            <div className="property-description">
              Explore our wide variety of properties to find your dream home today
            </div>
            </div>
        </div>

        {/* Property 4 - Modern apartments */}
        <div className="property-item property-tall">
          <img src="/images/evheartcity.png" alt="Modern Apartments" className="property-image" />
             <div className="property-overlay">
            <div className="property-count">28+</div>
            <div className="property-label">Properties</div>
            </div>
        </div>

        {/* Property 5 - Luxury tower */}
        <div className="property-item property-small">
          <img src="/images/v10-himbhindu.jpeg" alt="Luxury Tower" className="property-image" />
        </div>
      </div>
    </div>
  )
}

export default OtherProjects
