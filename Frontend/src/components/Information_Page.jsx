import React from "react";

export default function Information_Page({ onStart }) {
  return (
    <div className="bg-gradient-to-br  text-white  px-4 flex items-center justify-center">
      <div className="backdrop-blur-md bg-white/10 border border-green-500 rounded-2xl shadow-2xl max-w-3xl w-full p-8">
        <h2 className="text-3xl font-bold text-[#A3E635] mb-6 flex items-center gap-2">
          🎙️ Interview Instructions
        </h2>

        <ul className="list-disc list-inside space-y-4 text-white/90 text-base leading-relaxed">
          <li>
            🔁 <span className="font-semibold text-red-300">Do not reload</span> the page during the interview.
          </li>
          <li>
            ❓ You’ll face <span className="text-lime-300 font-semibold">6 questions</span>, from intro to wrap-up.
          </li>
          <li>
            📷 Your <span className="text-emerald-300 font-semibold">camera stays on</span> for attention tracking.
          </li>
          <li>
            🤖 Mic <span className="text-cyan-300 font-semibold">turns off</span> during AI questions.
          </li>
          <li>
            🎤 <span className="text-green-300 font-semibold">Mic turns back on</span> once the AI finishes speaking.
          </li>
          <li>
            ✅ Indicate you're done by <span className="text-yellow-300 font-semibold">turning off your mic</span>.
          </li>
          <li>
            🎥 You'll be asked to <span className="text-orange-300 font-semibold">share your entire screen with audio</span> — allow both.
          </li>
        </ul>

        <div className="mt-8 text-center">
          <p className="text-sm text-[#A3E635] italic">
            Nature rewards the patient. Stay calm and focused. 🍃
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onStart}
            className="btn bg-[#A3E635] hover:bg-[#84cc16] text-black font-semibold text-lg px-6"
          >
            🌿 Start Interview
          </button>
        </div>
      </div>
    </div>
  );
}
