"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const menServices = [
  {
    name: "Precision Beard Sculpting",
    description: "Expert beard shaping with hot towel treatment and premium balm finish.",
    price: "Starting ₹499",
    icon: "✂️",
  },
  {
    name: "Premium Hair Coloring",
    description: "Professional-grade color with ammonia-free formulas for a natural, vibrant look.",
    price: "Starting ₹999",
    icon: "🎨",
  },
  {
    name: "Signature Haircut",
    description: "Tailored cuts with consultation, scalp massage, and styling — a complete grooming ritual.",
    price: "Starting ₹399",
    icon: "💈",
  },
  {
    name: "Scalp Revive Treatment",
    description: "Deep cleansing and nourishment therapy to rejuvenate your scalp and strengthen hair.",
    price: "Starting ₹799",
    icon: "🧴",
  },
];

const womenServices = [
  {
    name: "Balayage & Highlights",
    description: "Hand-painted, sun-kissed color transitions for effortlessly glamorous hair.",
    price: "Starting ₹2,499",
    icon: "✨",
  },
  {
    name: "Bridal Luxury Package",
    description: "Complete bridal glam — HD makeup, styling, draping assistance & pre-wedding facials.",
    price: "Starting ₹14,999",
    icon: "👰",
  },
  {
    name: "Manicure & Pedicure",
    description: "Spa-grade nail care with exfoliation, hydration massage, and premium polish.",
    price: "Starting ₹699",
    icon: "💅",
  },
  {
    name: "Luxury Hair Spa",
    description: "Deep conditioning with keratin-infused serums, steam therapy, and head massage.",
    price: "Starting ₹1,299",
    icon: "💆",
  },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState("her");
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);

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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll(".service-card");
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      }
    );
  }, [activeTab]);

  const services = activeTab === "him" ? menServices : womenServices;

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-padding bg-bg-secondary relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-crimson/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
            Our Services
          </span>
          <h2 className="section-title mt-4 mb-4">
            Tailored For <span className="text-crimson italic">You</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Discover our curated collection of premium grooming and beauty
            treatments, designed exclusively for every style.
          </p>
        </div>

        {/* Gender Toggle */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex rounded-full p-1.5 bg-card border border-border-subtle">
            <button
              id="tab-for-her"
              onClick={() => setActiveTab("her")}
              className={`relative px-8 sm:px-12 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-400 ${
                activeTab === "her"
                  ? "bg-crimson text-white shadow-[0_4px_20px_rgba(154,42,42,0.4)]"
                  : "text-muted hover:text-foreground"
              }`}
            >
              For Her
            </button>
            <button
              id="tab-for-him"
              onClick={() => setActiveTab("him")}
              className={`relative px-8 sm:px-12 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-400 ${
                activeTab === "him"
                  ? "bg-crimson text-white shadow-[0_4px_20px_rgba(154,42,42,0.4)]"
                  : "text-muted hover:text-foreground"
              }`}
            >
              For Him
            </button>
          </div>
        </div>

        {/* Service Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, i) => (
            <div
              key={`${activeTab}-${i}`}
              className="service-card glass-card p-7 flex flex-col items-center text-center gap-4 group hover:border-crimson/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(154,42,42,0.15)]"
            >
              <div className="text-3xl mb-1">{service.icon}</div>
              <h3
                className="text-lg font-semibold text-foreground group-hover:text-gold transition-colors duration-300"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {service.name}
              </h3>
              <p className="text-sm text-muted leading-relaxed flex-1">
                {service.description}
              </p>
              <div className="flex flex-col items-center mt-2 pt-4 border-t border-border-subtle w-full">
                <span className="text-crimson font-semibold text-sm">
                  {service.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
