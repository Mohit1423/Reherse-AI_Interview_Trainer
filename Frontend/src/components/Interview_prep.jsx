import React, { useEffect, useRef, useState } from "react";
import CameraToggle from "./CameraToggle";
import MicToggle from "./MicToggle";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Interview_prep({setQuestions}) {
     const navigate = useNavigate();
     const [skill, setSkill] = useState("Pick a Skill");
     const [role, setRole] = useState("Pick a Role");
     const [loading, setLoading] = useState(false);
     const videoRef = useRef(null);
     const CameraRef = useRef(null);
     const MicrophoneRef = useRef(null);
     const [permissions, setPermissions] = useState({
        camera: false,
        microphone: false,
     })
     
     

     useEffect(() => {
        let cameraStatus = false;
        let micStatus = false;
        function updatePermissions() {
          setPermissions({
            camera: cameraStatus ? cameraStatus.state : null,
            microphone: micStatus ? micStatus.state : null,
          });
        }

        async function checkPermissions() {
          try {
            if (navigator.permissions) {
              cameraStatus = await navigator.permissions.query({
                name: "camera",
              });
              micStatus = await navigator.permissions.query({
                name: "microphone",
              });

              updatePermissions();

              cameraStatus.onchange = () => {
                setPermissions((prev) => ({
                  ...prev,
                  camera: cameraStatus.state,
                }));
              };

              micStatus.onchange = () => {
                setPermissions((prev) => ({
                  ...prev,
                  microphone: micStatus.state,
                }));
              };
            } else {
              setPermissions({ camera: null, microphone: null });
            }
          } catch (err) {
            console.error("Permission API error:", err);
            setPermissions({ camera: null, microphone: null });
          }
        }

        checkPermissions();

        const getUSerMedia = async ()=>{
          try{
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                 video: true,
                 audio: true,
             });
          }
          catch(error){
            alert("Please allow camera and microphone access");
  
          }
        }
        getUSerMedia();

     },[]);       

    async function handleSubmit(e){
      
        e.preventDefault();
       
        if(skill == "Pick a Skill" ){
            alert("Please select a skill");
        }
        else if( role == "Pick a Role"){
            alert("Please select a role");
        }
        else if(permissions.camera == 'denied'){
          alert("Please allow camera access");
        }
        else if(permissions.microphone == 'denied'){
          alert("Please allow microphone access");
        }else{
          const data = {skill:skill,role:role};

          setLoading(true);
          //Get Interview Questions
          const response = await axios.post("http://localhost:4000/api/v1/interview/getquestions",data);
          
          const cleanGeminiResponse = (text) => {
              return text
                .replace(/```json\s*/i, '')   // remove starting ```json
                .replace(/```$/, '')          // remove ending ```
                .trim();                      // remove extra spaces/newlines
            };
          let questions = JSON.parse(cleanGeminiResponse(response?.data?.data));
          questions[0].skill = skill;
          questions[0].role = role;
          console.log(questions);
          setLoading(false);
          setQuestions(questions);

          
        }
    
        
    };

    




  return (
    <div class="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0  justify-evenly flex-1 bg-base-200 p-6 ">
      {/* <!-- 🎥 Camera Preview --> */}
      <div class="w-full lg:w-1/2 bg-base-100 rounded-xl shadow-md p-4">
        <div class="aspect-video bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            id="videoPreview"
            autoPlay
            muted
            playsinline
            className="w-full h-full object-cover transform scale-x-[-1]"
          ></video>
        </div>
        <div className="flex justify-center space-x-4 mt-6">
        <CameraToggle CameraRef={CameraRef} disabled_prop={false} videoRef={videoRef} />
        <MicToggle MicrophoneRef={MicrophoneRef} disabled_prop={false}  videoRef={videoRef} />

        </div>
      </div>
      {/* <!-- ⚙️ Interview Setup Form --> */}

      <div className="flex flex-col    items-center ">
        <h1 class="text-3xl mb-4  font-bold">Interview Setup</h1>
        <form onSubmit={handleSubmit}>
        <div class="card w-full max-w-md bg-base-100 shadow-xl p-6 space-y-4">
          <div>
            <label class="label ml-2 mb-2">Select Your Skill</label>
            <select  value={skill} onChange={(e) => setSkill(e.target.value)} class="select select-bordered w-full">
              <option disabled selected hidden>
                Pick a Skill
              </option>
              <option>React</option>
              <option>Java</option>
              <option>Python</option>
              <option>DevOps</option>
            </select>
          </div>

          <div>
            <label class="label ml-2 mb-2">Select Job Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} name="role" class="select select-bordered w-full">
              <option disabled selected hidden>
                Pick a Role
              </option>
              <option  >Frontend Developer</option>
              <option>Backend Developer</option>
              <option>ML Engineer</option>
            </select>
          </div>

          <div class="flex justify-between items-center mt-4">
            <div>
              <p class="font-semibold">Camera</p>
              <span className={`badge ${permissions.camera == "granted" ? "badge-success" : "badge-error"} `}>{permissions.camera == "granted" ? "On" : "Off"}</span>
            </div>
            <div>
              <p class="font-semibold">Microphone</p>
              <span className={`badge ${permissions.microphone == "granted" ? "badge-success" : "badge-error"}`}>{permissions.microphone == "granted" ? "On" : "Off"}</span>
            </div>
          </div>
          {
            loading ?
            <button class="btn btn-success w-full">
              <span class="loading loading-spinner"></span>
                Loading
            </button>
                   :
            <button type="submit" class="btn btn-success w-full">Start Interview</button>

          }
          
        </div>
        </form>
      </div>
    </div>
  );
}

export default Interview_prep;
