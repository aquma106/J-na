import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FinalSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [lightFlicker, setLightFlicker] = useState(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 50%',
        onEnter: () => setIsVisible(true),
      });
    }, sectionRef);

    // Light flickering effect
    const flickerInterval = setInterval(() => {
      setLightFlicker(0.85 + Math.random() * 0.15);
    }, 100);

    return () => {
      ctx.revert();
      clearInterval(flickerInterval);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen py-24 relative gradient-section-1 overflow-hidden flex items-center justify-center"
    >
      {/* Studio Setup Background */}
      <div className="absolute inset-0">
        {/* Table */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-secondary/50 to-transparent" />
        
        {/* Side Lights */}
        <div 
          className="absolute left-10 top-1/4 w-4 h-32 rounded-full bg-accent/30 blur-md"
          style={{ opacity: lightFlicker * 0.5 }}
        />
        <div 
          className="absolute right-10 top-1/4 w-4 h-32 rounded-full bg-accent/30 blur-md"
          style={{ opacity: (1.15 - lightFlicker) * 0.5 }}
        />

        {/* Top Lights */}
        <div 
          className="absolute top-20 left-1/4 w-20 h-3 rounded-full bg-studio-light/20 blur-sm"
          style={{ opacity: lightFlicker }}
        />
        <div 
          className="absolute top-20 right-1/4 w-20 h-3 rounded-full bg-studio-light/20 blur-sm"
          style={{ opacity: 1.15 - lightFlicker }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Welcome Sign */}
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 
            className="text-5xl md:text-7xl lg:text-8xl font-bold welcome-sign text-foreground"
            style={{ opacity: lightFlicker }}
          >
            WELCOME
          </h2>
          
          <div className="mt-8 flex justify-center">
            <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-foreground/50 to-transparent" />
          </div>

          <p className="mt-8 text-xl text-foreground/80">
            Thank you for visiting my portfolio
          </p>
        </div>

        {/* Mini Equipment Icons */}
        <div 
          className={`mt-16 flex justify-center gap-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Camera */}
          <div className="w-16 h-12 rounded-lg bg-secondary/50 relative">
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-6 h-4 rounded bg-muted" />
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary/30 border border-primary/20" />
          </div>

          {/* Laptop */}
          <div className="w-20 h-14 relative">
            <div className="absolute bottom-0 w-full h-8 rounded bg-secondary/50" />
            <div className="absolute top-0 w-full h-10 rounded-t bg-muted/50 origin-bottom" style={{ transform: 'rotateX(-10deg)' }} />
          </div>

          {/* Light */}
          <div className="w-8 h-16 relative">
            <div className="w-full h-full rounded-t-full bg-secondary/50" />
            <div 
              className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-8 rounded-full bg-accent/20"
              style={{ filter: `blur(4px)`, opacity: lightFlicker }}
            />
          </div>
        </div>

        {/* Footer */}
        <div 
          className={`mt-24 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-sm text-foreground/80 mb-4">
            Designed & Built with 💙
          </p>
          <p className="text-xs text-foreground/60">
            © 2024 Portfolio. All rights reserved.
          </p>
        </div>
      </div>

      {/* Ambient Glows */}
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-accent/10 blur-3xl animate-glow-pulse" />
    </section>
  );
};

export default FinalSection;
