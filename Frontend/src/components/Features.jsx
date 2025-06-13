import React from 'react';
import { HelpCircle, Target, MessageSquare, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

export default function Features({FeaturesRef}) {
  return (
    <div ref={FeaturesRef}  className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="text-center pt-16 pb-8">
        <h1 className="text-4xl text-base-content md:text-5xl font-bold mb-6 max-w-4xl mx-auto px-4 hover:text-[#1FB854] transition-colors duration-300">
          Unlock Your Interview Potential with AI
        </h1>
        <p className="text-lg text-base-content/80 max-w-2xl mx-auto px-4 leading-relaxed">
            Practice with AI-generated interview questions and get personalized feedback to improve your answers.
        </p>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border-2 border-base-content/20 rounded-lg group-hover:border-[#1EB88E] group-hover:bg-[#1EB88E]/10 group-hover:shadow-lg transition-all duration-300">
              <HelpCircle className="w-8 h-8 text-base-content group-hover:text-[#1EB88E] transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold text-base-content mb-4 group-hover:text-[#1EB88E] transition-colors duration-300">
              AI-Generated Questions for Realistic Practice
            </h3>
            <p className="text-base-content/70 leading-relaxed group-hover:text-base-content/90 transition-colors duration-300">
              Experience interview preparation like never before.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border-2 border-base-content/20 rounded-lg group-hover:border-[#1EB88E] group-hover:bg-[#1EB88E]/10 group-hover:shadow-lg transition-all duration-300">
              <Target className="w-8 h-8 text-base-content group-hover:text-[#1EB88E] transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold text-base-content mb-4 group-hover:text-[#1EB88E] transition-colors duration-300">
              In-Depth Response Analysis for Improvement
            </h3>
            <p className="text-base-content/70 leading-relaxed group-hover:text-base-content/90 transition-colors duration-300">
              Receive insightful analysis to refine your answers.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border-2 border-base-content/20 rounded-lg group-hover:border-[#1EB88E] group-hover:bg-[#1EB88E]/10 group-hover:shadow-lg transition-all duration-300">
              <MessageSquare className="w-8 h-8 text-base-content group-hover:text-[#1EB88E] transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold text-base-content mb-4 group-hover:text-[#1EB88E] transition-colors duration-300">
              Constructive Feedback to Boost Your Confidence
            </h3>
            <p className="text-base-content/70 leading-relaxed group-hover:text-base-content/90 transition-colors duration-300">
              Gain confidence with actionable feedback on performance.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center pb-16">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="btn btn-outline hover:scale-105 transition-transform duration-300">
            Learn More
          </button>
          <Link to ="/SignUp">
          <button className="btn btn-primary flex items-center gap-2 hover:scale-105 hover:shadow-lg transition-all duration-300">
            Sign Up
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}