'use client';

import { useState, useEffect, useRef } from 'react';
import Snowfall from 'react-snowfall';
import { Music, VolumeX, Snowflake } from 'lucide-react';

export default function ChristmasSpirit() {
  const [isActive, setIsActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // --- 1. LOGIQUE DE DATE ---
    const date = new Date();
    const month = date.getMonth(); // 11 = Décembre
    const day = date.getDate();

    // S'active du 1er Décembre au 31 Décembre
    // (Tu peux changer les chiffres pour tester)
    if (month === 11 && day >= 1 && day <= 31) {
      setIsActive(true);
    }
    
    // POUR TESTER AUJOURD'HUI (Enlève cette ligne après le test !)
    // setIsActive(true); 

  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden font-sans">
      
      {/* 1. LA NEIGE (Ne bloque pas les clics) */}
      <Snowfall 
        snowflakeCount={100} 
        style={{ position: 'fixed', width: '100vw', height: '100vh' }} 
      />

      {/* 2. DÉCORATION (Boules en haut à gauche) */}
      <div className="absolute top-0 left-4 md:left-10 flex gap-4 animate-bounce-slow">
        <div className="flex flex-col items-center">
           <div className="w-0.5 h-16 bg-slate-300"></div>
           <div className="w-12 h-12 bg-red-500 rounded-full shadow-lg flex items-center justify-center border-4 border-white">
             <Snowflake className="text-white w-6 h-6 animate-spin-slow" />
           </div>
        </div>
        <div className="flex flex-col items-center mt-8">
           <div className="w-0.5 h-12 bg-slate-300"></div>
           <div className="w-10 h-10 bg-green-500 rounded-full shadow-lg flex items-center justify-center border-4 border-white">
             <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
           </div>
        </div>
      </div>

      {/* 3. LECTEUR MUSIQUE (En bas à gauche, discret) */}
      {/* pointer-events-auto est important pour pouvoir cliquer dessus */}
      <div className="fixed bottom-4 left-4 pointer-events-auto">
        <button
          onClick={toggleMusic}
          className="flex items-center gap-2 bg-white/90 backdrop-blur dark:bg-slate-900/90 p-3 rounded-full shadow-xl border-2 border-red-100 dark:border-red-900 hover:scale-105 transition-transform group"
        >
          <div className={`p-2 rounded-full ${isPlaying ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
            {isPlaying ? <Music className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
          </div>
          <span className={`text-xs font-bold pr-2 ${isPlaying ? 'text-red-600' : 'text-slate-500'}`}>
            {isPlaying ? 'Ambiance Noël' : 'Activer Musique'}
          </span>
        </button>

        {/* L'élément audio caché (Met ton fichier MP3 dans le dossier public) */}
        <audio ref={audioRef} loop src="/noel.mp3" />
      </div>

    </div>
  );
}