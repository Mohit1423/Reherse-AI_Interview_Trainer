import React from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import toast from 'react-hot-toast';
const SignUp = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const response  = await axios.post("http://localhost:4000/api/v1/user/SignUp",data);
        
        toast.success(response.data.message);
        navigate('/login');
        }catch(error){
            

            toast.error(error.response.data.message);

        }

        
        
    };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-base-100 rounded-3xl shadow-2xl p-10">
        <h2 className="text-4xl font-bold text-center text-[#1FB854] mb-6">Sign Up</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="label">
              <span className="label-text p-2 text-base-content">Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="John Doe"
              className="input input-primary w-full"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text p-2 text-base-content">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="email@example.com"
              className="input input-primary w-full"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text p-2 text-base-content">Password</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="********"
              className="input input-primary w-full"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full mt-2">
            Create Account
          </button>
        </form>

        {/* Already have an account */}
        <p className="text-sm text-center mt-5 text-base-content/70">
          Already have an account?{" "}
          <Link to="/login" className="link text-[#1FB854] font-medium">Log in</Link>
        </p>

        {/* Divider */}
        <div className="divider my-6">OR</div>

        {/* Google Sign In */}
        <button
          className="btn btn-outline btn-accent w-full flex items-center justify-center"
          onClick={() => {
            // Add your Google OAuth function here
            console.log("Google OAuth Triggered");
          }}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
