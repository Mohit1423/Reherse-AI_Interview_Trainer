import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ViewAnalysis from './ViewAnalysis';
import { useNavigate } from 'react-router';

function ViewInterview() {
  const user = useSelector((state) => state.user.user);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const handleBack = () => setSelectedInterview(null);
  const navigate = useNavigate();
  const getThumbnailFromVideo = (videoUrl) => {
     if (!videoUrl) return "";
     const randomSecond = Math.floor(Math.random() * 35) + 1;
    return videoUrl.replace("/upload/", `/upload/so_${randomSecond}/`).replace(/\.\w+$/, ".jpg");
};
    const formatTimeAgo = (dateString) => {
        
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return `just now`;

        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays === 1) return `yesterday`;
        return `${diffInDays} days ago`;
    }


  

  return (
    <main className="pt-24 overflow-hidden px-6 pb-12 max-w-7xl mx-auto">
    
      { user.interviews.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-300 mb-6 text-md">
            You haven't created any interviews yet. <span onClick={() =>{navigate('/user/Interview')}} className='text-[#00e676] cursor-pointer'>Let's get started!</span>
          </p>
        </div>        
      )       
            :
        
        !selectedInterview ? (
        <section>
          <div className="grid  overflow-y-auto max-h-[80vh]   y-scroll-hidden  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {user.interviews.map((interview, index) => (
              <div
                key={index}
                className="card bg-base-200 shadow-xl cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setSelectedInterview(interview)}
              >
                <figure>
                  <img src={getThumbnailFromVideo(interview.cloudinary_url)} alt="Interview" className="w-full h-48 object-cover" />
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-success">{interview.role}</h3>
                  <p className="text-accent">{interview.skill}</p>
                  <p className="text-accent">{formatTimeAgo(interview.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section>
          <div className='h-[80vh] y-scroll-hidden overflow-y-scroll px-6'>
            <div className=" items-center mb-8">
                <button className='btn w-30 btn-success' onClick={handleBack}>Back</button>
                <h2 className="text-3xl text-center font-bold text-success">Interview Details</h2>
            </div>

            <div className="w-full mb-8">
                <video preload="auto" controls className="w-full h-[70vh] aspect-video object-contain rounded-box shadow-lg">
                <source src={selectedInterview.cloudinary_url} type="video/mp4" />
                Your browser does not support the video tag.
                </video>
            </div>
                <ViewAnalysis analysis={selectedInterview} />
          </div>

       
        </section>
      )}
    </main>
  );
}

export default ViewInterview;