import React from "react";

const FAQSection = ({FAQRef}) => {
  return (
    <section ref={FAQRef} className="w-full px-6 py-12 bg-base-100 text-base-content">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Column */}
        <div className="col-span-1">
          <h2 className="text-4xl font-bold text-[#1FB854]">FAQs</h2>
          <p className="mt-4 text-base">
            Find answers to common questions about our interview preparation services and how they work.
          </p>
          <button className="btn btn-outline btn-primary btn-[#1FB854] mt-6">Contact</button>
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-[#1EB88E]">How does it work?</h3>
            <p className="mt-1">
              Our service utilizes AI to generate interview questions tailored to your field. You respond to these questions, and our system analyzes your answers. Based on this analysis, we provide personalized feedback to help you improve.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#1EB88E]">Is it really effective?</h3>
            <p className="mt-1">
              Yes! Many users have reported significant improvements in their interview performance. Our AI-driven feedback is designed to pinpoint areas for growth, ensuring you are well-prepared.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#1EB88E]">What types of questions?</h3>
            <p className="mt-1">
              We cover a wide range of questions, including behavioral, technical, and situational queries. This variety helps you prepare for different interview scenarios. You can also request specific topics to focus on.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#1EB88E]">How do I sign up?</h3>
            <p className="mt-1">
              Signing up is simple! Just click the 'Sign Up' button on our homepage. Follow the prompts to create your account and start preparing for your interviews.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#1EB88E]">Is there a free trial?</h3>
            <p className="mt-1">
              Yes, we offer a free trial for new users. This allows you to experience our service without any commitment. Explore our features and see how we can help you succeed in your interviews.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
