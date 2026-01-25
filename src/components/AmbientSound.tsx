import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AmbientSound = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Show the button after a short delay for a nice entrance
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const startSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/pirates_guitar.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
    audioRef.current.play();
    setIsPlaying(true);
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopSound();
    } else {
      startSound();
    }
  };

  return (
    <button
      onClick={toggleSound}
      className={`fixed bottom-6 right-6 z-40 p-3 rounded-full glass hover:bg-muted/50 transition-all duration-300 clickable group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      aria-label={isPlaying ? 'Mute ambient sound' : 'Play ambient sound'}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
      ) : (
        <VolumeX className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:scale-110 transition-all" />
      )}
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-card text-sm text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {isPlaying ? 'Mute' : 'Play Music'}
      </span>
    </button>
  );
};

export default AmbientSound;
