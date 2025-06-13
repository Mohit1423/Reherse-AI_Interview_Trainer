import React from 'react'
import {
  Menu,
  X,
  Briefcase,
  LineChart,
  Settings,
  LogOut,
  UserCircle,
  View,
} from "lucide-react";
import { Link } from 'react-router';
function Dashboard_Content({name}) {
  return (
    
      <main className="pt-24 px-6 pb-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Welcome Card */}
          <div className="bg-gradient-to-br from-[#00c853] to-[#00e5ff] rounded-3xl p-8 shadow-xl h-[320px] flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">Welcome Back!</h2>
              <p className="text-white/90 text-lg">
                Let’s get you ready for your next opportunity.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <UserCircle size={40} className="text-white" />
              <span className="text-white font-semibold text-lg">{name}</span>
            </div>
          </div>

          {/* Create Interview */}
          <div className="bg-[#1f1f1f] rounded-3xl p-8 shadow-lg h-[320px] flex flex-col justify-between border border-[#00e676]/20">
            <div>
              <h2 className="text-3xl font-bold text-[#00e676] mb-4">Create Interview</h2>
              <p className="text-gray-300 mb-6 text-md">
                Select a role & skillset to instantly begin an AI-powered mock interview session.
              </p>
            </div>

            <Link  to = "/user/Interview">
            <button className="btn w-full bg-[#00e676] text-black font-bold text-lg hover:scale-105 transition-transform">Start Interview</button>
            </Link>
          </div>
        </div>

        
      </main>
  )
}

export default Dashboard_Content