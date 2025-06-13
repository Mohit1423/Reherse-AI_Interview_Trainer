import { useState } from "react";
import { Button } from "./components/ui/button";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main_Interview from "./components/Main_Interview";
import Home from "./components/Home";  
import Navbar from "./components/shared/Navbar";
import Loading_Analysis from "./components/Loading_Analysis";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { Toaster } from 'react-hot-toast';

function App() {

    const router = createBrowserRouter([
          {
            path: "/",
            element: <Home />
          },
          {
            path: "/user/Interview",
            element: <Main_Interview/>
          },
          {
            path: "/user/Interview/loading",
            element: <Loading_Analysis/>
          },
          {
            path: "/SignUp",
            element: <SignUp/>
          },{
            path: "/login",
            element: <Login/>
          },{
            path:"/user",
            element: <Dashboard/>
          }

    ])


      return (
        
          <div className="flex flex-col h-screen">
            <Toaster position="bottom-right" reverseOrder={false} toastOptions={{
            duration: 4000,
            style: {
              background: '#2e4632', // deep forest green
              color: '#e8f5e9',       // light earthy text
              fontWeight: 'bold',
              padding: '12px 16px',
              borderRadius: '12px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            },
            success: {
              iconTheme: {
                primary: '#81c784',  // soft green
                secondary: '#1b5e20',
              },
              style: {
                border: '1px solid #4caf50',
              }
            },
            error: {
              iconTheme: {
                primary: '#ef5350', // earthy red
                secondary: '#fff',
              },
              style: {
                background: '#422727', // forest red
                color: '#fff0f0',
                border: '1px solid #ef5350',
              },
            },
          }} />
            <RouterProvider router={router} />
          </div>
        
      );
}

export default App;
