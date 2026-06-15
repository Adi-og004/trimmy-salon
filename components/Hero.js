"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const overlayRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure elements are visible before animating
      gsap.set([headingRef.current, subRef.current, ctaRef.current], {
        opacity: 0,
        y: 50,
      });

      // Initial entrance animation
      const tl = gsap.timeline({ delay: 0.4 });
      tl.to(headingRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      })
        .to(
          subRef.current,
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.7"
        )
        .to(
          ctaRef.current,
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        );

      // Scroll-out animation
      gsap.to([headingRef.current, subRef.current, ctaRef.current], {
        y: -100,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Parallax overlay darken on scroll
      gsap.to(overlayRef.current, {
        opacity: 0.9,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleExplore = (e) => {
    e.preventDefault();
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Video background with fallback */}
        <video
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        >
          <source
            src="https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4"
            type="video/mp4"
          />
        </video>

        {/* CSS Gradient Fallback — always visible, covered by video when loaded */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            videoLoaded ? "opacity-0" : "opacity-100"
          }`}
          style={{
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(154, 42, 42, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 20%, rgba(197, 168, 128, 0.08) 0%, transparent 40%),
              radial-gradient(ellipse at 50% 80%, rgba(20, 20, 40, 0.5) 0%, transparent 60%),
              linear-gradient(180deg, #0A0A0A 0%, #111118 30%, #0d0d14 70%, #0A0A0A 100%)
            `,
          }}
        />

        {/* Subtle animated particles effect via CSS */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20% 30%, rgba(197,168,128,0.4), transparent),
            radial-gradient(1px 1px at 40% 70%, rgba(255,255,255,0.2), transparent),
            radial-gradient(1px 1px at 60% 40%, rgba(197,168,128,0.3), transparent),
            radial-gradient(1px 1px at 80% 60%, rgba(255,255,255,0.15), transparent),
            radial-gradient(1.5px 1.5px at 10% 80%, rgba(154,42,42,0.3), transparent),
            radial-gradient(1px 1px at 90% 20%, rgba(197,168,128,0.25), transparent)
          `,
          backgroundSize: '200% 200%',
          animation: 'shimmerBg 15s ease-in-out infinite alternate',
        }} />
      </div>

      {/* Dark Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-[#0A0A0A]/95"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full border border-border-light bg-white/5 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
            Premium Luxury Salon
          </span>
        </div>

        <h1
          ref={headingRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          <span className="block text-white">Trimmy&apos;s</span>
          <span className="block text-gold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 font-normal italic">
            Luxurious Salon
          </span>
        </h1>

        <p
          ref={subRef}
          className="text-secondary text-base sm:text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed font-light"
        >
          Where artistry meets elegance. Experience the finest grooming &amp;
          styling in Bhiwadi — crafted exclusively for him and her.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleExplore}
            className="btn-primary text-base px-10 py-4"
          >
            Explore Our Services
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17l9.2-9.2M17 17V7H7"/>
            </svg>
          </button>
          <a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-outline text-base px-10 py-4"
          >
            View Our Work
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs uppercase tracking-[0.15em] text-muted">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-gold to-transparent" />
      </div>

      {/* Shimmer animation keyframes */}
      <style jsx>{`
        @keyframes shimmerBg {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
      `}</style>
    </section>
  );
}
