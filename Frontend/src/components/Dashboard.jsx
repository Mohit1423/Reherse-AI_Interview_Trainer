import React, { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import View_interview from "./View_interview";
import Dashboard_Content from "./Dashboard_Content";
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/user.slice.js';
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [showInterview, setShowInterview] = useState(false);
  useEffect(() => {
      if(!user){
        navigate('/login');
      }    
  },[]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white relative">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full bg-[#1a1a1a] transition-all duration-300 ${
          sidebarOpen ? "w-64 p-4" : "w-0 p-0"
        }`}
      >
        <div className={`${sidebarOpen ? "opacity-100" : "opacity-0"} transition-opacity`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#00e676]">Reherse</h2>
            <button className="hover:cursor-pointer" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <ul className="space-y-4 text-gray-300">
            <li onClick = {() => {setShowInterview(false);setSidebarOpen(false);}} className="flex items-center gap-3 hover:text-[#00e676] cursor-pointer">
              <Briefcase size={20} />
              Home
            </li>
            <li onClick = {() => {setShowInterview(true);setSidebarOpen(false);}} className="flex items-center gap-3 hover:text-[#00e676] cursor-pointer">
              <LineChart size={20} />
              Reports
            </li>
            <li className="flex items-center gap-3 hover:text-[#00e676] cursor-pointer">
              <Settings size={20} />
              Settings
            </li>
          </ul>

          <div className="border-t border-gray-700 mt-8 pt-4">
            <button onClick={() =>{dispatch(setUser(null));navigate("/")} } className="flex hover:cursor-pointer items-center gap-2 text-red-400 hover:text-red-500">
              <LogOut   size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Top Navbar */}
      <div className="navbar bg-[#1a1a1a] shadow-md fixed w-full top-0 z-30 px-4">
        <div className="flex-none">
          <button onClick={() => setSidebarOpen(true)} className="btn btn-ghost btn-circle">
            <Menu size={20} />
          </button>
        </div>
        <div className="flex-1 text-center">
          <h1 className="text-3xl font-bold text-[#00e676]">Reherse</h1>
        </div>
      </div>

      {/* Main Content */}
        {
            showInterview ? <View_interview setShowInterview={setShowInterview} /> : <Dashboard_Content name={user?.name} />
        }
    </div>
  );
};

export default Dashboard;
