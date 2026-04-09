"use client"

import { useState } from "react"
import { AlertCircle, Check } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    location: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }
    const phoneRegex = /^[0-9+\s-]{7,15}$/
    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required"
    } else if (!phoneRegex.test(formData.contact)) {
      newErrors.contact = "Invalid contact number"
    }
    if (!formData.location.trim()) newErrors.location = "Location is required"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitted(true)
      setFormData({ name: "", contact: "", email: "", location: "" })
    }
  }

  return (
    <section className="relative w-full py-24 md:py-32 flex items-center justify-center overflow-hidden font-figtree">
      {/* Background with parallax-like 'fixed' attachment */}
      <div
        className="absolute inset-0 z-0 bg-[url('/contact_hero_bg.png')] bg-cover bg-center bg-no-repeat bg-fixed transform scale-105"
      >
        <div className="absolute inset-0 bg-[#020617]/40 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
      </div>

      {/* Container */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 flex flex-col md:flex-row items-center md:items-end justify-between min-h-[500px]">
        
        {/* Form or Success Message container */}
        <div className="w-full max-w-[550px] mb-12 md:mb-0 relative">
          {isSubmitted ? (
            <div className="w-full bg-white/10 backdrop-blur-xl px-10 py-16 rounded-[2.5rem] border border-white/20 shadow-2xl flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center border border-blue-500/30">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <Check className="text-white w-6 h-6" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">Message Sent!</h2>
                <p className="text-white/60 text-sm">Thank you for reaching out. We'll get back to you soon.</p>
              </div>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-blue-400 font-bold hover:text-blue-300 transition-colors uppercase tracking-widest text-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <div className="w-full bg-white/10 backdrop-blur-xl px-8 py-10 sm:px-12 sm:py-14 rounded-[2.5rem] border border-white/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] space-y-8 overflow-hidden relative group">
              <div className="space-y-6 relative z-10 transition-all">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[14px] font-medium text-white ml-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-5 py-4 rounded-lg bg-white/[0.03] border ${errors.name ? 'border-red-500/50' : 'border-white/10'} focus:border-blue-500/40 focus:bg-white/[0.05] outline-none transition-all text-white font-normal`}
                    />
                    {errors.name && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[14px] font-medium text-white ml-1">Contact Number</label>
                    <input
                      type="text"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className={`w-full px-5 py-4 rounded-lg bg-white/[0.03] border ${errors.contact ? 'border-red-500/50' : 'border-white/10'} focus:border-blue-500/40 focus:bg-white/[0.05] outline-none transition-all text-white font-normal`}
                    />
                    {errors.contact && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.contact}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[14px] font-medium text-white ml-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-5 py-4 rounded-lg bg-white/[0.03] border ${errors.email ? 'border-red-500/50' : 'border-white/10'} focus:border-blue-500/40 focus:bg-white/[0.05] outline-none transition-all text-white font-normal`}
                    />
                    {errors.email && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[14px] font-medium text-white ml-1">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className={`w-full px-5 py-4 rounded-lg bg-white/[0.03] border ${errors.location ? 'border-red-500/50' : 'border-white/10'} focus:border-blue-500/40 focus:bg-white/[0.05] outline-none transition-all text-white font-normal`}
                    />
                    {errors.location && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.location}</p>}
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-2 text-center relative z-10">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-5 rounded-xl font-bold text-base transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-blue-500/30"
                >
                  Submit Now
                </button>
                <p className="text-[13px] font-normal text-white opacity-60 leading-relaxed font-figtree">
                  From zero to job-ready. Apply in 60 seconds.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right side Text */}
        <div className="w-full md:w-auto flex flex-col items-end justify-end pb-4 sm:pb-8 md:pb-12 text-right">
          <div className="flex items-center gap-3 md:gap-4 drop-shadow-2xl">
            {/* Text */}
            <h2 className="text-[16px] sm:text-[22px] md:text-[30px] font-bold text-white tracking-tight uppercase leading-none text-right">
              #LEARN FOR YOUR FUTURE.
            </h2>
          </div>
        </div>

      </div>
    </section>
  )
}
