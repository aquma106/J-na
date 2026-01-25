import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Video, Camera, ChefHat, Palette, Terminal, X, Sparkles, Heart, Grid3X3, GalleryHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
gsap.registerPlugin(ScrollTrigger);
interface Skill {
  name: string;
  icon: React.ReactNode;
  description: string;
  details: string[];
}
const skills: Skill[] = [{
  name: 'Frontend Developer',
  icon: <Code className="w-6 h-6" />,
  description: 'Building responsive, beautiful web interfaces',
  details: ['HTML/CSS/JavaScript', 'React & TypeScript', 'Tailwind CSS', 'Responsive Design']
}, {
  name: 'Video Editor',
  icon: <Video className="w-6 h-6" />,
  description: 'Crafting compelling visual stories',
  details: ['Adobe Premiere Pro', 'DaVinci Resolve', 'Motion Graphics', 'Color Grading']
}, {
  name: 'Photo Editor',
  icon: <Camera className="w-6 h-6" />,
  description: 'Transforming images with precision',
  details: ['Adobe Photoshop', 'Lightroom', 'Photo Manipulation', 'Retouching']
}, {
  name: 'Programming',
  icon: <Terminal className="w-6 h-6" />,
  description: 'Writing clean, efficient code',
  details: ['Python', 'JavaScript', 'Data Structures', 'Algorithms']
}, {
  name: 'UI/UX Design',
  icon: <Palette className="w-6 h-6" />,
  description: 'Creating intuitive user experiences',
  details: ['Figma', 'User Research', 'Wireframing', 'Prototyping']
}, {
  name: 'Cooking',
  icon: <ChefHat className="w-6 h-6" />,
  description: 'Experimenting with flavors',
  details: ['Indian Cuisine', 'Baking', 'Food Presentation', 'Recipe Development']
}];
interface SkillCardProps {
  skill: Skill;
  onClick: () => void;
  index: number;
}
const SkillCard = ({
  skill,
  onClick,
  index
}: SkillCardProps) => <button onClick={onClick} style={{
  transitionDelay: `${index * 40}ms`
}} className="skill-card-item clickable group relative overflow-hidden p-3 md:p-5 border-2 border-primary/40 hover:border-primary transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/40 bg-card w-full text-left rounded-lg font-mono">
    <div className="mb-1.5 text-primary group-hover:text-primary/80 group-hover:scale-110 transition-all duration-300">
      {skill.icon}
    </div>
    <h3 className="text-xs md:text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
      {skill.name}
    </h3>
    <p className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-tight">
      {skill.description}
    </p>
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
  </button>;
const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const thankYouRef = useRef<HTMLDivElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center'
  });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrentSlide(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'top 20%',
        onEnter: () => setIsZoomedIn(true),
        onLeaveBack: () => setIsZoomedIn(false)
      });
      // Set initial state for skill cards
      gsap.set('.skill-card-item', { opacity: 1, y: 0 });
      
      gsap.from('.skill-card-item', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 85%'
        }
      });
      ScrollTrigger.create({
        trigger: thankYouRef.current,
        start: 'top 70%',
        onEnter: () => setShowThankYou(true),
        onLeaveBack: () => setShowThankYou(false)
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return <section id="skills" ref={sectionRef} className="py-20 relative gradient-section-3 overflow-hidden">
      <div className="absolute inset-0 studio-light opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with Toggle */}
        <div className="text-center mb-8">
          <span className="text-sm text-foreground/90 tracking-widest uppercase font-medium">My Expertise</span>
          <h2 className="text-3xl md:text-4xl font-light text-foreground mt-2">Skills & Tools</h2>
          
          {/* View Toggle */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg border transition-all duration-300 ${viewMode === 'grid' ? 'bg-primary/30 border-primary text-primary' : 'border-border text-muted-foreground hover:border-primary hover:text-foreground'}`} aria-label="Grid view">
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button onClick={() => setViewMode('carousel')} className={`p-2 rounded-lg border transition-all duration-300 ${viewMode === 'carousel' ? 'bg-primary/30 border-primary text-primary' : 'border-border text-muted-foreground hover:border-primary hover:text-foreground'}`} aria-label="Carousel view">
              <GalleryHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Laptop Frame */}
        <div ref={laptopRef} className={`w-full max-w-[98vw] xl:max-w-[1600px] mx-auto transition-all duration-700 ${isZoomedIn ? 'scale-100' : 'scale-95 opacity-80'}`}>
          <div className="rounded-t-3xl p-6 md:p-10 relative overflow-hidden bg-card border-2 border-primary/50 shadow-[0_0_60px_hsl(var(--primary)/0.3)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-primary/15" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
            
            {/* Grid View */}
            {viewMode === 'grid' && <div className="skills-grid grid grid-cols-3 gap-3 md:gap-6 relative z-10">
                {skills.map((skill, index) => <SkillCard key={skill.name} skill={skill} onClick={() => setSelectedSkill(skill)} index={index} />)}
              </div>}

            {/* Carousel View */}
            {viewMode === 'carousel' && <div className="relative z-10">
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex">
                    {skills.map((skill, index) => <div key={skill.name} className="flex-[0_0_80%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 px-2">
                        <SkillCard skill={skill} onClick={() => setSelectedSkill(skill)} index={index} />
                      </div>)}
                  </div>
                </div>
                
                {/* Carousel Controls */}
                <div className="flex items-center justify-center gap-4 mt-6">
                  <button onClick={scrollPrev} className="p-2 rounded-full border border-primary/50 text-muted-foreground hover:bg-primary/20 hover:border-primary hover:text-primary transition-all" aria-label="Previous skill">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  {/* Dots */}
                  <div className="flex gap-2">
                    {skills.map((_, index) => <button key={index} onClick={() => emblaApi?.scrollTo(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-primary w-6' : 'bg-muted-foreground/40 hover:bg-primary/60'}`} aria-label={`Go to slide ${index + 1}`} />)}
                  </div>
                  
                  <button onClick={scrollNext} className="p-2 rounded-full border border-primary/50 text-muted-foreground hover:bg-primary/20 hover:border-primary hover:text-primary transition-all" aria-label="Next skill">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>}
            
            {/* Screen Bottom Glow */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
          </div>

          {/* Laptop Base */}
          <div className="h-5 bg-gradient-to-b from-secondary to-muted rounded-b-2xl relative border-t-2 border-primary/40">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-20 h-1.5 rounded-full bg-muted-foreground/30" />
          </div>
          <div className="w-40 h-3 mx-auto bg-gradient-to-b from-secondary to-muted rounded-b-xl" />
        </div>

        {/* Thank You Animation Section */}
        <div ref={thankYouRef} className="mt-16 text-center">
          <div className={`transition-all duration-1000 ${showThankYou ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Sparkle Effects */}
            <div className="relative inline-block">
              {/* Floating Particles */}
              {showThankYou && <>
                  <Sparkles className="absolute -top-8 -left-8 w-6 h-6 text-primary animate-pulse" style={{
                animationDelay: '0s'
              }} />
                  <Sparkles className="absolute -top-4 -right-10 w-5 h-5 text-primary/80 animate-pulse" style={{
                animationDelay: '0.3s'
              }} />
                  <Sparkles className="absolute -bottom-6 -left-6 w-4 h-4 text-accent animate-pulse" style={{
                animationDelay: '0.6s'
              }} />
                  <Sparkles className="absolute -bottom-4 -right-8 w-5 h-5 text-accent/80 animate-pulse" style={{
                animationDelay: '0.9s'
              }} />
                </>}
              
              {/* Thank You Text with Gradient */}
              <h3 className={`text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary/70 to-accent bg-clip-text text-transparent transition-all duration-700 ${showThankYou ? 'scale-100' : 'scale-90'}`} style={{
              textShadow: showThankYou ? '0 0 40px hsl(var(--primary) / 0.5)' : 'none'
            }}>
                Thank You!
              </h3>
            </div>
            
            {/* Subtitle with Heart */}
            <p className={`mt-4 text-lg text-muted-foreground flex items-center justify-center gap-2 transition-all duration-700 delay-300 ${showThankYou ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              For exploring my skills 
              <Heart className={`w-5 h-5 text-accent ${showThankYou ? 'animate-pulse' : ''}`} fill="currentColor" />
            </p>

            {/* Animated Underline */}
            <div className={`mt-6 mx-auto h-1 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-1000 delay-500 ${showThankYou ? 'w-48 opacity-100' : 'w-0 opacity-0'}`} />

            {/* Floating Orbs */}
            {showThankYou && <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-pulse" />
                <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-accent/10 blur-3xl animate-pulse" style={{
              animationDelay: '0.5s'
            }} />
              </div>}
          </div>
        </div>
      </div>

      {/* Skill Detail Modal */}
      {selectedSkill && <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedSkill(null)}>
          <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />
          <div className="relative rounded-2xl p-8 max-w-md w-full animate-scale-in bg-gradient-to-br from-card to-background border border-primary/30 shadow-2xl shadow-primary/10" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedSkill(null)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-primary/20 transition-colors clickable text-muted-foreground hover:text-foreground">
              <X size={20} />
            </button>

            <div className="text-primary mb-4">{selectedSkill.icon}</div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">{selectedSkill.name}</h3>
            <p className="text-muted-foreground mb-6">{selectedSkill.description}</p>

            <div className="space-y-3">
              {selectedSkill.details.map((detail, index) => <div key={detail} className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20 animate-fade-in" style={{
            animationDelay: `${index * 100}ms`
          }}>
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-foreground">{detail}</span>
                </div>)}
            </div>
            
            {/* Modal Glow */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/20 to-transparent opacity-50 pointer-events-none" />
          </div>
        </div>}
    </section>;
};
export default SkillsSection;