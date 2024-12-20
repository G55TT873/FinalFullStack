'use client'
import { useEffect } from 'react';
import ParallaxSection from './ParallaxSection';
import Divide from '../Components/Divide';

export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const parallax = document.getElementById('parallax-bg');
      if (parallax) {
        // Adjust the speed factor by modifying the multiplier (e.g., 0.5)
        parallax.style.transform = `translateY(${window.scrollY * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <ParallaxSection />
      <div className="h-screen bg-gray-200">
        <Divide/>
      </div>
    </div>
  );
}
