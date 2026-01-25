import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const QuoteSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.quote-text', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const quote = "Whenever a problem exists, a solution also exists — it only needs to be discovered.";

  return (
    <section 
      id="quote"
      ref={sectionRef}
      className="py-32 relative gradient-section-2 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 studio-light opacity-20" />
      
      {/* Decorative Lines */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Quote Container */}
        <div className="quote-text max-w-4xl mx-auto text-center">
          <div className="inline-block mb-8">
            <span className="text-6xl md:text-8xl text-foreground/40">"</span>
          </div>
          
          {/* Main Quote */}
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-light hero-text leading-relaxed mb-8 text-foreground">
            {quote}
          </h2>

          <div className="inline-block">
            <span className="text-6xl md:text-8xl text-foreground/40">"</span>
          </div>
        </div>

        {/* Infinite Scroll Text */}
        <div className="mt-20 overflow-hidden">
          <div className="relative">
            <div className="scroll-text flex whitespace-nowrap">
              {[...Array(4)].map((_, i) => (
                <span 
                  key={i}
                  className="inline-block px-8 text-xl md:text-2xl text-foreground/30 font-light tracking-wider"
                >
                  {quote} •
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Soft Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
    </section>
  );
};

export default QuoteSection;
