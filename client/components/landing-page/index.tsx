import React from 'react'
import { Hero } from './Hero';
import { HeroVideo } from './HeroVideo';

const LandingPage = () => {
  return (
    <div>
        <Hero/>
        <div className="py-8 rounded-2xl">
          <HeroVideo />
        </div>
    </div>
  )
}

export default LandingPage;
