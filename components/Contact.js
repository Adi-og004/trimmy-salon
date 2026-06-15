"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const serviceOptions = [
  "Precision Beard Sculpting",
  "Premium Hair Coloring",
  "Signature Haircut",
  "Scalp Revive Treatment",
  "Balayage & Highlights",
  "Bridal Luxury Package",
  "Manicure & Pedicure",
  "Luxury Hair Spa",
  "Other",
];

export default function Contact() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const mapRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(formRef.current, {
        x: -60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(mapRef.current, {
        x: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mapRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setToast({ type: "success", message: "Enquiry sent successfully! We'll get back to you soon." });
        setFormData({ name: "", phone: "", email: "", service: "" });
      } else {
        setToast({ type: "error", message: data.error || "Something went wrong. Please try again." });
      }
    } catch {
      setToast({ type: "error", message: "Network error. Please check your connection." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-crimson/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
            Get In Touch
          </span>
          <h2 className="section-title mt-4 mb-4">
            Book Your <span className="text-crimson italic">Experience</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Ready for a transformation? Send us your enquiry and our team will
            reach out to schedule your appointment.
          </p>
        </div>

        {/* 50/50 Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Form */}
          <div ref={formRef} className="glass-card p-8 md:p-10">
            <h3
              className="text-xl font-semibold mb-6 text-white"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Enquiry Form
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="text-xs uppercase tracking-widest text-muted mb-2 block">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="text-xs uppercase tracking-widest text-muted mb-2 block">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="text-xs uppercase tracking-widest text-muted mb-2 block">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label htmlFor="service" className="text-xs uppercase tracking-widest text-muted mb-2 block">
                  Requested Service
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="form-input appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#161616]">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                id="submit-enquiry"
                disabled={loading}
                className="btn-primary w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="spinner" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Enquiry
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Map */}
          <div ref={mapRef} className="flex flex-col gap-6">
            <div className="glass-card overflow-hidden rounded-2xl flex-1 min-h-[350px] lg:min-h-0">
              <iframe
                title="Trimmy's Salon Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3527.5!2d76.8088943!3d28.2074065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d492faf153813%3A0xa98ac96e75795fa7!2sTrimmy&#39;s%20-%20Best%20Luxury%20Unisex%20Salon%20in%20Bhiwadi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "350px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-crimson/15 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9A2A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wide">Location</p>
                  <p className="text-sm text-white font-medium">Bhiwadi, Rajasthan</p>
                </div>
              </div>
              <div className="glass-card p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-gold/15 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C5A880" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wide">Hours</p>
                  <p className="text-sm text-white font-medium">10 AM – 9 PM Daily</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`toast ${toast.type === "success" ? "toast-success" : "toast-error"}`}>
          {toast.message}
        </div>
      )}
    </section>
  );
}
