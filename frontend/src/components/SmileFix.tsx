'use client';
import { useEffect } from 'react';

export default function SmileFix() {
  useEffect(() => {
    /* Logique Mobile Smile PC */
    const handleScroll = () => {
      const nav = document.querySelector('header') || document.querySelector('nav');
      if (nav && window.scrollY > 50) nav.classList.add('nav-hidden');
      else if (nav) nav.classList.remove('nav-hidden');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return null;
}
