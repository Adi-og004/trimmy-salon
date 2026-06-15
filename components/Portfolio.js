"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
  {
    title: "Modern Textured Crop",
    category: "Men's Cut",
    gradient: "from-[#1a1a2e] via-[#16213e] to-[#0f3460]",
  },
  {
    title: "Rose Gold Balayage",
    category: "Women's Color",
    gradient: "from-[#2d1b2e] via-[#4a1942] to-[#6b2d5b]",
  },
  {
    title: "Classic Beard Sculpt",
    category: "Men's Grooming",
    gradient: "from-[#1a2a1a] via-[#2d4a2d] to-[#1a3a1a]",
  },
  {
    title: "Bridal Elegance",
    category: "Bridal Styling",
    gradient: "from-[#2e1a1a] via-[#4a2929] to-[#6b3d3d]",
  },
  {
    title: "Platinum Highlights",
    category: "Women's Color",
    gradient: "from-[#1a1a2e] via-[#2e2e4a] to-[#3d3d6b]",
  },
  {
    title: "Fade & Design",
    category: "Men's Cut",
    gradient: "from-[#2e2a1a] via-[#4a3f29] to-[#6b5a3d]",
  },
];

export default function Portfolio() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
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

      // Cards parallax reveal
      const cards = gridRef.current?.querySelectorAll(".portfolio-item");
      if (cards) {
        cards.forEach((card, i) => {
          gsap.from(card, {
            y: 80,
            opacity: 0,
            scale: 0.92,
            duration: 0.8,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
            Our Work
          </span>
          <h2 className="section-title mt-4 mb-4">
            Premium <span className="text-crimson italic">Lookbook</span>
          </h2>
          <p className="section-subtitle mx-auto">
            A curated gallery of transformations crafted by our master stylists.
            Every look tells a story of precision and artistry.
          </p>
        </div>

        {/* Desktop Grid */}
        <div
          ref={gridRef}
          className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {portfolioItems.map((item, i) => (
            <div
              key={i}
              className={`portfolio-item relative rounded-2xl overflow-hidden group cursor-pointer ${
                i === 0 || i === 3 ? "md:row-span-2 min-h-[400px]" : "min-h-[250px]"
              }`}
            >
              {/* Gradient placeholder background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-700 group-hover:scale-110`}
              />
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `radial-gradient(circle at 30% 50%, rgba(255,255,255,0.08) 0%, transparent 50%),
                                  radial-gradient(circle at 70% 80%, rgba(197,168,128,0.1) 0%, transparent 40%)`
              }} />
              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 12s1.5-2 4-2 4 2 4 2-1.5 2-4 2-4-2-4-2z"/>
                </svg>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-xs uppercase tracking-[0.2em] text-gold mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {item.category}
                </span>
                <h3
                  className="text-lg font-semibold text-white"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe */}
        <div className="md:hidden swipe-container">
          {portfolioItems.map((item, i) => (
            <div
              key={i}
              className="portfolio-item relative w-72 h-80 rounded-2xl overflow-hidden flex-shrink-0"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
              />
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `radial-gradient(circle at 30% 50%, rgba(255,255,255,0.08) 0%, transparent 50%)`
              }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                <span className="text-xs uppercase tracking-[0.2em] text-gold mb-2 block">
                  {item.category}
                </span>
                <h3
                  className="text-lg font-semibold text-white"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
