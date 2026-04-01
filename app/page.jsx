'use client';

import { useEffect } from 'react';
import Loader     from '@/components/Loader';
import DotNav     from '@/components/DotNav';
import Hero       from '@/components/Hero';
import About      from '@/components/About';
import Reviews    from '@/components/Reviews';
import FreeTrial  from '@/components/FreeTrial';
import TikTokFeed from '@/components/TikTokFeed';
import Footer     from '@/components/Footer';
import WaCloud    from '@/components/WaCloud';

export default function Home() {
  useEffect(() => {
    let stopAnimations;
    import('@/lib/animations').then(({ initAnimations }) => {
      initAnimations().then((fn) => {
        stopAnimations = fn;
      });
    });
    return () => stopAnimations?.();
  }, []);

  return (
    <>
      {/* Grain */}
      <div className="grain" aria-hidden="true" />

      {/* Custom cursor (desktop only) */}
      <div className="cursor" aria-hidden="true" />
      <div className="cursor-follower" aria-hidden="true" />

      {/* Loader */}
      <Loader />

      {/* Dot navigation */}
      <DotNav />

      {/* Sections */}
      <main>
        <Hero />
        <About />
        <Reviews />
        <FreeTrial />
        <TikTokFeed />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp bubble */}
      <WaCloud />
    </>
  );
}
