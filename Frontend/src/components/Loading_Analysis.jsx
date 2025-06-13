import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { setUser } from '../redux/user.slice.js';

export default function Loading_Analysis() {
  const location = useLocation();
  const { file, questions,cameraAnalysis } = location.state || {};
  const [progress, setProgress] = useState(0);
  const [Text,setText] = useState("Loading");
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(!user){
      navigate('/login');
    }
   
    async function uploadAndAnalyze() {
      try{
      setProgress(10);
      const formData = new FormData();
      formData.append("file", file);
      const {skill,role} = questions[0];
      
      // 1) Upload file to cloudinary (10% → 33%);
      setText("Uploading Interview Recording");
      const response  = await axios.post("http://localhost:4000/api/v1/interview/saveinterview",formData)
      const cloudinary_url = response.data.data;
      setProgress(33);
      // 2) Send questions timestamps + file URL for assembly/analysis (33% → 66%);
      setText("Generating Transcript");
      const AudioAnalysis = await axios.post("http://localhost:4000/api/v1/interview/generatetranscript", { cloudinary_url, questions });
      setProgress(66);
      // 3) Finalize / load Analysis page (66% → 80%);
      setText("Analyzing Transcript");
      const enrichedAnalysis = await axios.post("http://localhost:4000/api/v1/interview/analyzeTranscript", AudioAnalysis.data.data);
      
      setProgress(80);
      // 4)Add Camera Analysis of the interview
      setText("Adding Camera Analysis");
      // 5) Create Final Interview Object
      const interview = {
        role:role,
        skill:skill,
        cloudinary_url:cloudinary_url,
        cameraAnalysis:cameraAnalysis,
        transcriptAnalysis:enrichedAnalysis.data.data
      }
      console.log(interview);
      setProgress(95);
      setText("Uploading to Database");
      // 6) Upload to Database

      const send_data = {
        userId:user._id,
        interview
      }
      const updateUser = await axios.post("http://localhost:4000/api/v1/user/addInterview",send_data);
      console.log(updateUser.data.user);
      dispatch(setUser(updateUser.data.user));
      toast.success("Interview uploaded successfully");
      setProgress(100);
      // 7) Navigate to Analysis page
      navigate('/user');
    }catch(error){
      console.log(error);
    }
    }

    if (file && questions) {
      uploadAndAnalyze();
    } else {
    console.log("NO file and questions found")
    }
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-6"></div>
        <span className="loading loading-spinner loading-xl mb-4"></span>
        <div className="w-64">
          <progress
            className="progress w-full"
            value={progress}
            max="100"
          ></progress>
        </div>
        <p className="mt-4 text-lg">{Text}... {progress}%</p>
      </div>
    </div>
  );
}
