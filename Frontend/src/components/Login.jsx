import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/user.slice.js';
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const HandleSubmit = async (e) => {
        e.preventDefault();
        
        try{
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const response = await axios.post("http://localhost:4000/api/v1/user/Login",data);
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);
        navigate('/user');
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message);
        }
    
        // navigate('/user');
      };





  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 px-4 py-8">
      <div className="w-full max-w-md bg-base-100 rounded-3xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] p-10">
        <h2 className="text-4xl font-extrabold text-center text-[#1FB854] mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-base-content/70 mb-8">
          Login to your account to continue
        </p>

        <form  className="space-y-5" onSubmit={HandleSubmit}>
          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text p-2 text-base-content">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="input input-bordered input-success w-full"
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
              placeholder="••••••••"
              className="input input-bordered input-success w-full"
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a className="text-sm link link-hover text-accent">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-full text-base font-semibold">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="divider my-8 text-base-content/60">OR</div>

        {/* Google OAuth */}
        <button
          className="btn btn-outline btn-accent w-full flex items-center justify-center text-base"
          onClick={() => {
            // Handle Google Auth
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

        {/* Sign up redirect */}
        <p className="text-sm text-center mt-6 text-base-content/70">
          Don’t have an account?{" "}
          <a href="/signup" className="text-[#1FB854] font-medium link link-hover">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
