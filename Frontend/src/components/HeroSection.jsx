import React from 'react';
import { Link } from 'react-router';

const HeroSection = () => {
  return (
  <div
  className="hero min-h-screen"
  style={{
    backgroundImage:
      "url(https://img.freepik.com/premium-photo/cybernetic-forest-technology-with-nature-forest-trees-digital-neon-landscape-glowing-tree-trunks-sparkling-canopies-interwoven-circuits-data-streams-futuristic-organic-life-cyber_923559-2011.jpg)",
  }}
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Ace Your Interview with AI-Powered Prep</h1>
      <p className="mb-5">
        Transform your interview skills with our innovative AI-driven platform. Get personalized questions, real-time feedback, and the confidence you need to succeed.
      </p>
      <Link to="/SignUp">
       <button className="btn btn-primary px-8">Get Started</button>
      </Link>
       <button className="btn btn-outline px-8">Learn More</button>
    </div>
  </div>
</div>
  );
};

export default HeroSection;