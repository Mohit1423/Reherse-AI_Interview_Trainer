import React from "react";
import { Link } from "react-router";

function Navbar({scrollToSection, FAQRef, FeaturesRef, TestimonialRef}) {
  return (
    <div className="navbar bg-base-100 shadow-sm top-0 backdrop-blur-md z-50 sticky">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li onClick={()=>{
              scrollToSection(FeaturesRef);
            }}>
              <a>Features</a>
            </li>
            <li onClick={()=>{
              scrollToSection(TestimonialRef);
            }}>
              <a>Testimonials</a>
            </li>
            <li onClick={()=>{
              scrollToSection(FAQRef);
            }}>
              <a>FAQ</a>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          Reherse
        </Link>
      </div>
      <div className="navbar-center  hidden lg:flex">
        <ul className="menu  menu-horizontal px-1">
         <li onClick={()=>{
              scrollToSection(FeaturesRef);
            }}>
              <a>Features</a>
            </li>
            <li onClick={()=>{
              scrollToSection(TestimonialRef);
            }}>
              <a>Testimonials</a>
            </li>
            <li onClick={()=>{
              scrollToSection(FAQRef);
            }}>
              <a>FAQ</a>
            </li>
        </ul>
      </div>
      <div className="navbar-end">
      <div className="flex gap-4 justify-center">
        <Link to='/login' className="btn btn-ghost">Login</Link>
        <Link to='/SignUp' className="btn btn-primary">Sign Up</Link>
      </div>
      </div>
    </div>
  );
}

export default Navbar;
