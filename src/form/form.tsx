"use client"
import { useState, useEffect } from "react"
import type React from "react"
import { X } from "lucide-react"
import "./form.css"

interface FormProps {
  isOpen: boolean
  onClose: () => void
  propertyTitle?: string
  propertyPrice?: String
}
type FormData = {
  name?: string;
  email?: string;
  phone?: string;

}
type FromErrors = Partial<Record<keyof FormData, string>>

export default function FormModal({
  isOpen,
  onClose,
  propertyTitle,
  propertyPrice,
}: FormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    query: "",
  })

  const [errors, setErrors] = useState<FromErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }))

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  };

  const validateForm = () => {

    const newError: FromErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!formData.name.trim()) {
      newError.name = 'Name is required';
    }
    if (!formData.email) {
      newError.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newError.email = "Please enter a valid email"
    }
    if (!formData.phone) {
      newError.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newError.phone = '*Please enter a valid phone number (10-15 digits)';
    }
    setErrors(newError);
    return Object.keys(newError).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const submissionData = {
        ...formData,
        title: propertyTitle ?? "",
        price: propertyPrice ?? "",
      }
      console.log("Form submitted:", submissionData)
       await fetch("https://script.google.com/macros/s/AKfycbxaZkbEN1J3igE8yE-3IFE7nhUCf31cVzujRVcjVfja8YAyhZbQeRXfUpovxCEC_JX4_g/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });
    
       alert('Form submitted successfully!')
       setFormData({name: "", email: "", phone: "", query: "" })
        onClose()
      }

  catch (err) {
      console.error("Form submission error:", err)
      alert('Failed to send form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }


  }



  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      // ❌ remove this line
      // document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

useEffect(() => {
  if (!isOpen) {
    setFormData({ name: "", email: "", phone: "", query: "" }) // ✅ reset when modal closes
    setErrors({})
  }
}, [isOpen])


  if (!isOpen) return null

  return (
    <div className="layout-modal-overlay" onClick={onClose}>
      <div className="layout-modal-background">
        <img src="" alt="Building background" className="layout-modal-bg-image" />
      </div>


      <div className="layout-modal-content" onClick={(e) => e.stopPropagation()}>

        <div className="hidden">
          {propertyTitle && (
            <h2>{propertyTitle}</h2>
          )}

          {propertyPrice && (
            <p >{propertyPrice}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="layout-modal-form">
          <div className="layout-modal-field">
            <div className="layout-modal-header">
              <h2>Your New Address Awaits !</h2>
              <button className="layout-modal-close" onClick={onClose} aria-label="Close modal">
                <X size={16} color="white" />
              </button>

            </div>
            <input
              type="text"
              name="name"
              placeholder="NAME"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            {errors.name && <p className="error">{errors.name}</p>}
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
            {errors.email && <p className="error">{errors.email}</p>}
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
            {errors.phone && <p className="error">{errors.phone}</p>}
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="layout-modal-submit layout-modal-submit-small">
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
}
