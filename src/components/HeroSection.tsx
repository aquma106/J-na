import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      });

      gsap.from('.hero-subtitle', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.4,
      });

      gsap.from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.6,
      });

      gsap.from('.scroll-indicator', {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex flex-col items-center justify-center relative gradient-section-1 overflow-hidden"
    >
      {/* Studio Background Elements */}
      <div className="absolute inset-0 studio-light" />
      
      {/* Ambient Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-gentle ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Soft Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-light hero-text mb-6 tracking-tight text-foreground">
          Creative Developer
        </h1>
        <p className="hero-subtitle text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">
          Crafting digital experiences through code, design, and storytelling. 
          Where technology meets creativity.
        </p>
        <div className="hero-cta flex items-center justify-center gap-4">
          <button 
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 rounded-full bg-background/20 border border-foreground/30 text-foreground hover:bg-background/30 hover:border-foreground/50 transition-all duration-300 clickable backdrop-blur-sm"
          >
            Explore My Work
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-foreground/70 tracking-widest uppercase">Scroll</span>
        <ChevronDown size={20} className="text-foreground/70 animate-bounce" />
      </div>

      {/* Studio Table Hint */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/50 to-transparent" />
    </section>
  );
};

export default HeroSection;
