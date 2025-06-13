import React from "react";

const companies = [
  {
    name: "LinkedIn",
    svgUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
  },
  {
    name: "Indeed",
    svgUrl: "https://cdn.brandfetch.io/indeed.com/fallback/lettermark/theme/dark/h/256/w/256/icon?c=1bfwsmEH20zzEfSNTed",
  },
  {
    name: "Webflow",
    svgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRXSeMCA5Ovb9_X7EOTo8SznI1rMfr9j6NjA&s",
  },
  {
    name: "Relevel",
    svgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIHPQSEJf2n_92s6AsjhS_x4H2nqHvbUV5UA&s", 
  },
  {
    name: "Unstop",
    svgUrl: "https://play-lh.googleusercontent.com/Sn4FCvXPL21HgxKO_-Oj0_ldYA8YH2muN6enGKpBylzvYpCa_cZTqbU6VEXYRtFGwg", 
  },
];

export default function TrustedCompanies() {
  return (
    <section className="py-12">
      <div className="text-center mb-10">
        <div className="badge  text-indigo-600 font-semibold px-6 py-3 mb-3 text-2xl">
          Trusted by top companies for interview success
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 max-w-5xl mx-auto">
        {companies.map((company, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center space-y-2"
          >
            <img
              src={company.svgUrl}
              alt={`${company.name} logo`}
              className="w-16 h-16 object-contain"
            />
            <span className="text-lg font-semibold text-g">
              {company.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
