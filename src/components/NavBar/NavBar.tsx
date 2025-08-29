"use client"

import { useState } from "react"
import styles from "./NavBar.module.css"
import { Home, Users, DollarSign, FolderOpen, MessageSquare, Info, Phone, Menu, X } from "lucide-react"

function MarinaNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <div className={styles.NavMain}>
        <div className={styles.NavContainer}>
          <div className={styles.leftSide}>
            <img src="/images1/10m_logo.png" alt="10 Marina Bay Vashi Logo" className={styles.Logo} />
          </div>

          <button className={styles.mobileMenuToggle} onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
            {isMobileMenuOpen ? <X className={styles.menuIcon} /> : <Menu className={styles.menuIcon} />}
          </button>

          <div className={`${styles.centerSide} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}>
            <ul className={styles.NavLinks}>
              <li>
                <a href="#" className={styles.navLink} onClick={closeMobileMenu}>
                  <Home className={styles.navIcon} />
                  <span className={styles.navText}>Home</span>
                </a>
              </li>
              <li>
                <a href="#amenities" className={styles.navLink} onClick={closeMobileMenu}>
                  <Users className={styles.navIcon} />
                  <span className={styles.navText}>Amenities</span>
                </a>
              </li>
              <li>
                <a href="#property-section" className={styles.navLink} onClick={closeMobileMenu}>
                  <DollarSign className={styles.navIcon} />
                  <span className={styles.navText}>Property Pricing</span>
                </a>
              </li>
              <li>
                <a href="#projects" className={styles.navLink} onClick={closeMobileMenu}>
                  <FolderOpen className={styles.navIcon} />
                  <span className={styles.navText}>Projects</span>
                </a>
              </li>
              <li>
                <a href="#feedback" className={styles.navLink} onClick={closeMobileMenu}>
                  <MessageSquare className={styles.navIcon} />
                  <span className={styles.navText}>Feedback</span>
                </a>
              </li>
              <li>
                <a href="#about" className={styles.navLink} onClick={closeMobileMenu}>
                  <Info className={styles.navIcon} />
                  <span className={styles.navText}>About Us</span>
                </a>
              </li>
              <li>
                <a href="#contact" className={styles.navLink} onClick={closeMobileMenu}>
                  <Phone className={styles.navIcon} />
                  <span className={styles.navText}>Contact Us</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default MarinaNavbar
