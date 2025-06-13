import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import HeroSection from './HeroSection'
import Features from './Features'
import Testimonial from './Testimonials'
import FAQSection from './FAQ'
import TrustedCompanies from './TrustedCompanies'
import Footer from './Footer'
import Navbar from './shared/Navbar'
function Home() {
  const FeaturesRef = useRef(null);
  const TestimonialRef = useRef(null);
  const FAQRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
    <Navbar scrollToSection={scrollToSection} FAQRef={FAQRef} FeaturesRef={FeaturesRef} TestimonialRef={TestimonialRef}/>  
    <HeroSection />
    <Features FeaturesRef={FeaturesRef}/>
    <Testimonial TestimonialRef={TestimonialRef}  />
    <FAQSection FAQRef={FAQRef}/>
    <TrustedCompanies />
    <Footer />
    <Link to="/user/Interview">Home</Link>
    </>
  )
}

export default Home