"use client"

import type React from "react"
import { useMemo, useState } from "react"

type FiveTabsSectionProps = {
  tabs?: string[]
  colors?: string[]
  width?: number | string // e.g. "90%" or 640
  initialIndex?: number
  onChange?: (index: number) => void
  title?: string
}

function hexToRgba(hex: string, alpha = 1) {
  let h = hex.replace("#", "")
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("")
  }
  const num = Number.parseInt(h, 16)
  const r = (num >> 16) & 255
  const g = (num >> 8) & 255
  const b = num & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * A self-contained 5-tabs section for the web (React DOM).
 * - No external packages required.
 * - Mirrors your RN example: pill background + sliding color indicator.
 * - Drop this component into your App.tsx and render <FiveTabsSection /> where you want it.
 */
export default function FiveTabsSection({
  tabs = ["ALL", "2BHK", "3BHK", "LUX", "Ultra LUX"],
  colors = ["#003261", "#003261", "#003261", "#003261", "#003261"],
  width = "90%",
  initialIndex = 0,
  onChange,
  title = "Five Tabs",
}: FiveTabsSectionProps) {
  const [active, setActive] = useState(initialIndex)

  const tabCount = tabs.length
  const clampedActive = Math.min(Math.max(active, 0), tabCount - 1)

  const activeColor = colors[clampedActive] ?? "#1E90FF"
  const activeBorderColor = hexToRgba(activeColor, 0.35)

  const indicatorLeftPct = useMemo(() => (100 / tabCount) * clampedActive, [tabCount, clampedActive])
  const indicatorWidthPct = useMemo(() => 100 / tabCount, [tabCount])

  function createRipple(e: React.MouseEvent<HTMLButtonElement>, idx: number) {
    const target = e.currentTarget
    const rect = target.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    const ripple = document.createElement("span")
    ripple.setAttribute("aria-hidden", "true")
    ripple.style.position = "absolute"
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    ripple.style.width = `${size}px`
    ripple.style.height = `${size}px`
    ripple.style.borderRadius = "50%"
    ripple.style.pointerEvents = "none"
    ripple.style.background = hexToRgba(colors[idx] ?? activeColor, 0.25)
    ripple.style.transform = "scale(0)"
    ripple.style.opacity = "0.7"
    ripple.style.transition = "transform 500ms ease, opacity 650ms ease"

    target.appendChild(ripple)
    // force reflow to apply transition
    void ripple.getBoundingClientRect()
    ripple.style.transform = "scale(1)"
    ripple.style.opacity = "0"

    // clean up after animation
    const remove = () => ripple.remove()
    ripple.addEventListener("transitionend", remove, { once: true })
    setTimeout(remove, 700)
  }

  const handleClick = (idx: number) => {
    setActive(idx)
    onChange?.(idx)
  }

  const containerStyle: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    maxWidth: "100%",
    marginInline: "auto",
  }

  const tabBarStyle: React.CSSProperties = {
    position: "relative",
    background: "#f9fafb", // slightly lighter so border shows subtly
    borderRadius: 20,
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: `repeat(${tabCount}, 1fr)`,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    border: `1px solid ${activeBorderColor}`,
  }

  const indicatorStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: `${indicatorLeftPct}%`,
    width: `${indicatorWidthPct}%`,
    background: activeColor,
    borderRadius: 20,
    transition: "left 300ms ease, background-color 300ms ease",
    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15)",
  }

  const buttonBase: React.CSSProperties = {
    appearance: "none",
    WebkitAppearance: "none",
    background: "transparent",
    border: "none",
    padding: "12px 8px",
    fontSize: 14,
    fontWeight: 800,
    color: "#374151",
    cursor: "pointer",
    position: "relative", // needed for ripple positioning
    zIndex: 1,
    textAlign: "center",
    overflow: "hidden", // clip ripple to button
    borderRadius: 20, // match container rounding
    outlineOffset: 2,
  }

  const activeText: React.CSSProperties = {
    color: "#fff",
    fontWeight: 800,
  }

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  }

  const sectionWrapperStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  }

  const contentBoxStyle: React.CSSProperties = {
    width: "100%",
    background: "#fff",
    border: `1px solid ${activeBorderColor}`,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  }

  return (
    <section style={containerStyle} aria-label="Five tabs section">
      <div style={sectionWrapperStyle}>
        {/* <h2 style={sectionTitleStyle}>{title}</h2> */}

        <div role="tablist" aria-label="Five tabs" style={tabBarStyle}>
          <div style={indicatorStyle} aria-hidden="true" />
          {tabs.map((label, idx) => (
            <button
              key={label}
              role="tab"
              aria-selected={clampedActive === idx}
              aria-controls={`tab-panel-${idx}`}
              id={`tab-${idx}`}
              onClick={(e) => {
                createRipple(e, idx)
                handleClick(idx)
              }}
              style={{ ...buttonBase, ...(clampedActive === idx ? activeText : null) }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}

          <div style={{ marginTop: 8, color: "#6b7280", fontSize: 14 }}>
            {/* Active color: {colors[clampedActive] ?? "default"} */}
          </div>
      
      </div>
    </section>
  )
}
