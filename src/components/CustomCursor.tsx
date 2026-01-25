import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .clickable')) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => setIsHovering(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleHoverStart);
    document.addEventListener('mouseout', handleHoverEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleHoverStart);
      document.removeEventListener('mouseout', handleHoverEnd);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main Cursor */}
      <div
        className="custom-cursor hidden md:block"
        style={{
          transform: `translate(${position.x - 6}px, ${position.y - 6}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div
          className={`w-3 h-3 rounded-full bg-foreground transition-all duration-200 ${
            isClicking ? 'scale-75' : isHovering ? 'scale-150' : 'scale-100'
          }`}
        />
      </div>

      {/* Cursor Trail */}
      <div
        className="custom-cursor hidden md:block"
        style={{
          transform: `translate(${position.x - 20}px, ${position.y - 20}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <div
          className={`w-10 h-10 rounded-full border border-foreground/30 transition-all duration-300 ${
            isHovering ? 'scale-150 border-primary/50' : 'scale-100'
          }`}
        />
      </div>

      {/* Hide default cursor */}
      <style>{`
        @media (min-width: 768px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
