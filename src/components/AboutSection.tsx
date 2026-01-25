import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profilePhoto from '@/assets/profile-photo.jpeg';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * 20; // -10 to 10 degrees
    const tiltY = (x - 0.5) * -20; // -10 to 10 degrees
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on profile photo
      gsap.to('.about-image-inner', {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.from('.about-image', {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from('.about-text', {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="min-h-screen py-24 relative gradient-section-2"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 studio-light opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="about-content grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo Side */}
          <div className="about-image relative overflow-hidden" style={{ perspective: '1000px' }}>
            <div 
              ref={imageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="about-image-inner relative aspect-[4/5] rounded-2xl overflow-hidden glow-soft group cursor-pointer transition-transform duration-200 ease-out"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <img 
                src={profilePhoto} 
                alt="Profile photo" 
                className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105 scale-110"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
              
              {/* Decorative Frame */}
              <div className="absolute inset-0 border border-foreground/20 rounded-2xl" />
            </div>
            <div className="absolute -inset-3 border border-foreground/10 rounded-3xl" />

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-xl bg-background/20 backdrop-blur-sm border border-foreground/30 flex items-center justify-center animate-float-gentle">
              <span className="text-2xl">🎨</span>
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl bg-background/20 backdrop-blur-sm border border-foreground/30 flex items-center justify-center animate-float-gentle" style={{ animationDelay: '1s' }}>
              <span className="text-xl">💻</span>
            </div>
          </div>

          {/* Bio Side */}
          <div className="about-text space-y-6">
            <div>
              <span className="text-sm text-foreground/90 tracking-widest uppercase font-medium">About Me</span>
              <h2 className="text-4xl md:text-5xl font-light hero-text mt-2 mb-6 text-foreground">
                Hello, I'm a CSE Student
              </h2>
            </div>

            <p className="text-lg text-foreground/90 leading-relaxed">
              I'm a Computer Science Engineering student with a genuine passion for creating 
              things that live on the internet. My journey started with curiosity about how 
              websites work, and it evolved into a love for building them.
            </p>

            <p className="text-foreground/80 leading-relaxed">
              When I'm not coding, you'll find me editing videos, experimenting with photo 
              manipulation, or trying out new recipes in the kitchen. I believe creativity 
              isn't limited to one medium—it flows through everything we do.
            </p>

            <p className="text-foreground/80 leading-relaxed">
              I enjoy solving problems and finding simple solutions to complex challenges. 
              Whether it's debugging code at 2 AM or figuring out the perfect color palette, 
              I'm always up for the challenge.
            </p>

            <div className="pt-4 flex flex-wrap gap-3">
              {['Frontend Dev', 'Video Editing', 'Photo Editing', 'Problem Solving'].map((tag) => (
                <span 
                  key={tag}
                  className="px-4 py-2 rounded-full text-sm bg-background/20 border border-foreground/30 text-foreground backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
