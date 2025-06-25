

import HeroDesign from '../components/HeroDesign';
import AboutMe from '../components/AbouteMe';
import WhatIDo from '../components/WhatIDo';
import IntroToWork from '../components/IntroToWork';
import Posters from '../components/Posters';
import Logo from '../components/Logo';
import PosterAbout from "../components/PosterAbout";
import Illustration from '../components/Illustration';
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';
import Mid from '../components/Mid';

export default function Home() {
  return (
    <div >
      <HeroDesign />
      <AboutMe/>
      <WhatIDo/>
      <IntroToWork/>
      <Posters/>
      <PosterAbout/>
      <Logo/>
      <Illustration/>
      <Carousel/>
      <Mid/>
      <Footer/>
     
    </div>
  );
}
