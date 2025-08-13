
import React, { useRef, useEffect } from 'react';

const BackgroundMusic = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    const handlePlay = () => {
      if (audio) {
        audio.volume = 1;
        audio.muted = true;
        audio.play().catch((error) => {
          console.error('Error playing audio:', error);
        });
      }
    };

 
    const unmuteAudio = () => {
      if (audio) {
        audio.muted = false;
        audio.play().catch((error) => {
          console.error('Error unmuting audio:', error);
        });
      }
    };


    handlePlay();

   
    window.addEventListener('click', unmuteAudio);
    window.addEventListener('touchstart', unmuteAudio); 

    return () => {
     
      window.removeEventListener('click', unmuteAudio);
      window.removeEventListener('touchstart', unmuteAudio);

      if (audio) {
        audio.pause();
        audio.currentTime = 0; 
      }
    };
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src="/howl.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default BackgroundMusic;