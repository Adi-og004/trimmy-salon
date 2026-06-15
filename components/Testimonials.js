"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Priya Sharma",
    rating: 5,
    review:
      "Absolutely the best salon experience in Bhiwadi! The balayage they did on my hair was flawless. The staff is incredibly professional and the ambiance feels truly luxurious.",
    service: "Balayage & Highlights",
    initials: "PS",
  },
  {
    name: "Rahul Verma",
    rating: 5,
    review:
      "I've been coming to Trimmy's for 6 months now. The beard sculpting is an art form here — precision, hot towel, the whole experience. Can't recommend enough.",
    service: "Beard Sculpting",
    initials: "RV",
  },
  {
    name: "Ananya Gupta",
    rating: 5,
    review:
      "My bridal package was nothing short of magical. Every detail was taken care of — from hair to makeup to nails. I felt like a queen on my special day.",
    service: "Bridal Package",
    initials: "AG",
  },
  {
    name: "Vikram Singh",
    rating: 4,
    review:
      "Clean, premium, and the hair color they suggested suited me perfectly. The stylist really listens to what you want. Great value for the quality you get.",
    service: "Hair Coloring",
    initials: "VS",
  },
  {
    name: "Meera Joshi",
    rating: 5,
    review:
      "The luxury hair spa treatment was so relaxing. My hair has never felt this soft and healthy. The entire team is warm, welcoming, and extremely skilled.",
    service: "Luxury Hair Spa",
    initials: "MJ",
  },
  {
    name: "Arjun Kapoor",
    rating: 5,
    review:
      "Top-tier grooming salon. The ambiance, the attention to detail, and the final result — everything is a class apart. This is the gold standard in Bhiwadi.",
    service: "Signature Haircut",
    initials: "AK",
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={star <= rating ? "var(--accent-gold)" : "var(--border-light)"}
          className="transition-colors duration-300"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title
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

      // Staggered card entrance
      const cards = cardsRef.current?.querySelectorAll(".testimonial-card");
      if (cards) {
        gsap.from(cards, {
          y: 60,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="section-padding bg-bg-secondary relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-crimson/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
            Testimonials
          </span>
          <h2 className="section-title mt-4 mb-4">
            What Our <span className="text-crimson italic">Clients</span> Say
          </h2>
          <p className="section-subtitle mx-auto">
            Real stories from real people who trust Trimmy&apos;s for their grooming
            and beauty needs.
          </p>
        </div>

        {/* Desktop Grid */}
        <div
          ref={cardsRef}
          className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card glass-card p-7 flex flex-col gap-4 hover:border-gold/20 transition-all duration-500 group"
            >
              {/* Quote icon */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                className="text-crimson/40 group-hover:text-crimson/70 transition-colors duration-500"
              >
                <path
                  d="M3 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
                  fill="currentColor"
                />
                <path
                  d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
                  fill="currentColor"
                />
              </svg>

              <p className="text-secondary text-sm leading-relaxed flex-1">
                &ldquo;{t.review}&rdquo;
              </p>

              <div className="mt-2">
                <StarRating rating={t.rating} />
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-border-subtle">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-crimson/20 flex items-center justify-center text-crimson text-sm font-bold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted">{t.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe */}
        <div className="md:hidden swipe-container">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card glass-card p-6 flex flex-col gap-4 w-80 flex-shrink-0"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                className="text-crimson/50"
              >
                <path
                  d="M3 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
                  fill="currentColor"
                />
                <path
                  d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
                  fill="currentColor"
                />
              </svg>
              <p className="text-secondary text-sm leading-relaxed flex-1">
                &ldquo;{t.review}&rdquo;
              </p>
              <StarRating rating={t.rating} />
              <div className="flex items-center gap-3 pt-4 border-t border-border-subtle">
                <div className="w-10 h-10 rounded-full bg-crimson/20 flex items-center justify-center text-crimson text-sm font-bold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted">{t.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
