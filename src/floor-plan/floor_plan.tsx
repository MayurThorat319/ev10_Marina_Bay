"use client"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, BedDouble, ShowerHead } from 'lucide-react'

export type FloorPlan = {
  id: string | number
  title: string
  // caption: string
  image: string
  features: string[]
  price: string
  stats: { beds: number; baths: number; area: number; unit?: string }
}

type Props = {
  items: FloorPlan[]
  initialIndex?: number
  autoPlayMs?: number | null
  onSiteVisit?: (item: FloorPlan) => void
  onViewLayout?: (item: FloorPlan) => void
  className?: string
  enableScrolling?: boolean
}

export default function FloorPlanCarousel({
  items,
  initialIndex = 0,
  autoPlayMs = null,
  onSiteVisit,
  onViewLayout,
  className,
  enableScrolling = true,
}: Props) {
  const count = items.length
  const [active, setActive] = useState(() => (count ? ((initialIndex % count) + count) % count : 0))
  const [isTransitioning, setIsTransitioning] = useState(false)

  const leftIndex = useMemo(() => (active - 1 + count) % count, [active, count])
  const rightIndex = useMemo(() => (active + 1) % count, [active, count])

  const prev = useCallback(() => {
    if (isTransitioning || !enableScrolling) return
    setIsTransitioning(true)
    setActive((i) => (i - 1 + count) % count)
    setTimeout(() => setIsTransitioning(false), 420)
  }, [count, isTransitioning, enableScrolling])

  const next = useCallback(() => {
    if (isTransitioning || !enableScrolling) return
    setIsTransitioning(true)
    setActive((i) => (i + 1) % count)
    setTimeout(() => setIsTransitioning(false), 420)
  }, [count, isTransitioning, enableScrolling])

  useEffect(() => {
    if (!autoPlayMs || !enableScrolling) return
    const t = setInterval(next, autoPlayMs)
    return () => clearInterval(t)
  }, [next, autoPlayMs, enableScrolling])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!enableScrolling) return
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [prev, next, enableScrolling])

  useEffect(() => {
    if (!enableScrolling) {
      setActive(0)
    }
  }, [items, enableScrolling])

  if (count === 0) return null

  const left = items[leftIndex]
  const center = items[active]
  const right = items[rightIndex]

  // <CHANGE> Show multiple items side by side when scrolling is disabled and there are 2 items
  if (!enableScrolling && count === 2) {
    return (
      <section className={`fp3-carousel ${className ?? ""}`.trim()}>
        <div className="fp3-bg" style={{ backgroundImage: `url(/images/sample-living-room.png)` }} aria-hidden="true" />
        <div className="fp3-overlay" aria-hidden="true" />

        <div className="fp3-viewport">
          <div className="fp3-row fp3-side-by-side">
            <Card plan={items[0]} position="center" onSiteVisit={onSiteVisit} onViewLayout={onViewLayout} />
            <Card plan={items[1]} position="center" onSiteVisit={onSiteVisit} onViewLayout={onViewLayout} />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`fp3-carousel ${className ?? ""}`.trim()}>
      <div className="fp3-bg" style={{ backgroundImage: `url(/images/sample-living-room.png)` }} aria-hidden="true" />
      <div className="fp3-overlay" aria-hidden="true" />

      <div className="fp3-viewport">
        <div className={`fp3-row ${isTransitioning ? "fp3-transitioning" : ""}`}>
          {enableScrolling && count > 1 && (
            <Card plan={left} position="left" onSiteVisit={onSiteVisit} onViewLayout={onViewLayout} />
          )}
          <Card plan={center} position="center" onSiteVisit={onSiteVisit} onViewLayout={onViewLayout} />
          {enableScrolling && count > 1 && (
            <Card plan={right} position="right" onSiteVisit={onSiteVisit} onViewLayout={onViewLayout} />
          )}
        </div>
      </div>

      {enableScrolling && count > 1 && (
        <div className="fp3-arrows">
          <button className="fp3-arrow" aria-label="Previous" onClick={prev} disabled={isTransitioning}>
            <ChevronLeft />
          </button>
          <button className="fp3-arrow" aria-label="Next" onClick={next} disabled={isTransitioning}>
            <ChevronRight />
          </button>
        </div>
      )}
    </section>
  )
}

function Card({
  plan,
  position,
  onSiteVisit,
  onViewLayout,
}: {
  plan: FloorPlan
  position: "left" | "center" | "right"
  onSiteVisit?: (p: FloorPlan) => void
  onViewLayout?: (p: FloorPlan) => void
}) {
  return (
    <article className={`fp3-card fp3-card-${position}`}>
      <div className="fp3-card-inner">
        <div className="fp3-image-container">
          <img src={plan.image || "/placeholder.svg"} alt={`${plan.title} interior`} loading="lazy" />
        </div>

        <div className="fp3-body">
          <div className="fp3-content-container">
            <header className="fp3-header">
              <h3 className="fp3-title">{plan.title}</h3>
            </header>

            <ul className="fp3-features">
              {plan.features.slice(0, 6).map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="fp3-meta-container">
            <span className="fp3-price">{plan.price}</span>
            <div className="fp3-stats">
              <span className="fp3-stat">
                <BedDouble className="fp3-ic" />
                <span>{plan.stats.beds}</span>
              </span>
              <span className="fp3-dot"></span>
              <span className="fp3-stat">
                <ShowerHead className="fp3-ic" />
                <span>{plan.stats.baths}</span>
              </span>
            </div>
          </div>

          <div className="fp3-actions">
            <button className="fp3-btn" onClick={() => onSiteVisit?.(plan)}>
              SITE VISIT
            </button>
            <button className="fp3-btn" onClick={() => onViewLayout?.(plan)}>
              VIEW LAYOUT
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
