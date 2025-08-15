"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { X } from "lucide-react"

interface LayoutModalProps {
  isOpen: boolean
  onClose: () => void
  propertyTitle?: string
}

export default function LayoutModal({ isOpen, onClose, propertyTitle }: LayoutModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    query: "",
  })

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Add your form submission logic here
    onClose()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (!isOpen) return null

  return (
    <div className="layout-modal-overlay" onClick={onClose}>
      <div className="layout-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="layout-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>

        <div className="layout-modal-header">
          <h2>Your New Address Awaits !</h2>
        </div>

        <form onSubmit={handleSubmit} className="layout-modal-form">
          <div className="layout-modal-field">
            <input
              type="text"
              name="name"
              placeholder="NAME"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="layout-modal-field">
            <input
              type="email"
              name="email"
              placeholder="E-MAIL"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="layout-modal-field">
            <input
              type="tel"
              name="phone"
              placeholder="PHONE NO."
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="layout-modal-field">
            <textarea
              name="query"
              placeholder="YOUR QUERY"
              value={formData.query}
              onChange={handleInputChange}
              rows={4}
            />
          </div>

          <button type="submit" className="layout-modal-submit">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  )
}
