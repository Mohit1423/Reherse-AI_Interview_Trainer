import React, { use, useEffect, useRef, useState } from "react";
import CameraToggle from "./CameraToggle"; 
import MicToggle from "./MicToggle";
import Questions from "./Questions";
import Information_Page from "./Information_Page";
import { useNavigate } from "react-router";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";
export default function Interview({questions,setQuestions}) {
  const screenRef = useRef();      // 🔴 Used for screen recording
  const videoRef = useRef(null);       // 🔵 User's webcam feed
  const CameraRef = useRef(null);
  const MicrophoneRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [CameraDisable,setCameraDisable] = useState(false)
  const [MicrophoneDisable,setMicrophoneDisable] = useState(false)
  const [showInformation, setShowInformation] = useState(true);
  const micTrackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [micStartTime, setMicStartTime] = useState(null);
  const [interviewStartTime, setInterviewStartTime] = useState(null);
  const questionsRef = useRef(questions);

  //Camera Analysis 
  const attentionFrames = useRef(0);
  const totalFrames = useRef(0);
  const distractionStart = useRef(null);
  const distractionDurations = useRef([]);
  const cameraInstance = useRef(null);


  const navigate = useNavigate();
  //Camera Disabling
    useEffect(() => {
        CameraRef.current.click();
        setCameraDisable(true);
        setMicrophoneDisable(true);
        
    },[]);
    //Updating the questions ref
    useEffect(() => {
        questionsRef.current = questions;
    },[questions]);



  //Microphone OFF + Disabling  //Automatically called when mic is closed by user in this Component Only
    const DisableMicrophone = () => {
        console.log("disable");
        micTrackRef.current.enabled = false;
        const stop = Date.now() - interviewStartTime;
        //Setting the Questions with the timestamps
        setQuestions((prev) => {
      
          const newarr = prev.map((q, i) =>   i == currentIndex ? { ...q, micStartTime, micStopTime: stop } : q)
          // console.log(newarr);
          return newarr;
        }
        );
        //Going to next question
        if (currentIndex + 1 < questions.length) {
          setCurrentIndex(currentIndex + 1);
        } else {
          handleStopRecording();
        }
        setTimeout(() => {setMicrophoneDisable(true)}, 200);
      }

  //Microphone ON //Automatically called when mic is openend by user in this Component Only
      const MicrophoneOpen = () => {
        
         micTrackRef.current.enabled = true;
         const start = Date.now() - interviewStartTime;
         setMicStartTime(start);
      }

    //Microphone Enabling  //Need to call to Enable Mic
      const EnableMicrophone = ()=>{
          console.log("enable")
          setMicrophoneDisable(false);
      }
      
      //Code to run on starting the Interview
  const onStart = async ()=>{
    
  try {
    //Get screen stream
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: "screen" },
      audio: true, // system audio (AI speech)
    });
    //Get Mic Stream
    const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const micTrack = micStream.getAudioTracks()[0];
    //Merge the mic and audio into one Audio Stream by creating two sources
    const audioContext = new AudioContext();
    const systemSource = audioContext.createMediaStreamSource(screenStream);
    const micSource    = audioContext.createMediaStreamSource(micStream);
    const mixedDestination = audioContext.createMediaStreamDestination();
    systemSource.connect(mixedDestination);
    micSource.connect(mixedDestination);
    //Create a combined stream
    const combinedStream = new MediaStream(screenStream.getVideoTracks());
    mixedDestination.stream.getAudioTracks().forEach(track => combinedStream.addTrack(track));
    //Used to enable and disable the MicRecording
    micTrackRef.current = micTrack;
    micTrack.enabled = false;

    


    //Recording part stored in chunks
    const recorder = new MediaRecorder(combinedStream);
    const chunks = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);

    recorder.onstop = async () => {
      //Upload to Cloudinary
      console.log("onStop");
      const blob = new Blob(chunks, { type: 'video/webm' });
      const file = new File([blob], "interview_recording.webm", { type: "video/webm" });

   
      
      const latestQuestions = questionsRef.current;

      // Stop all media tracks in the combined stream
      combinedStream.getTracks().forEach(track => track.stop());

      // stop original mic and screen streams if needed
      micStream.getTracks().forEach(track => track.stop());
      screenStream.getTracks().forEach(track => track.stop());

      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.srcObject = null; 
      // Detach stream from the video element
      }

      // Close the audio context to free up resources
      audioContext.close();


      //Compiling Camera Analysis:
      if (cameraInstance.current) {
        cameraInstance.current.stop();
      }

      if (distractionStart.current) {
        distractionDurations.current.push((performance.now() - distractionStart.current) / 1000);
        distractionStart.current = null;
      }

      const attentionPercent = ((attentionFrames.current / totalFrames.current) * 100).toFixed(2);
      const totalDistraction = distractionDurations.current.reduce((sum, d) => sum + d, 0).toFixed(2);

      const cameraAnalysis = {
        attentionPercent: Number(attentionPercent),
        totalDistraction: Number(totalDistraction),
        totalFrames: totalFrames.current,
      };
      

      navigate('/user/Interview/loading', {
        state: {
          file,
          questions: latestQuestions,
          cameraAnalysis,
        },
      });
      
      
     
    };
    //Start Recording
    recorder.start();
    //Noting time 
    setInterviewStartTime(Date.now());

    console.log("🔴 Recording started");

    // Save ref for later stop
    mediaRecorderRef.current = recorder;
    //Removing the information page
    setShowInformation(false);

    //Doing the Camera Analysis
    const faceMesh = new FaceMesh({
  locateFile: (file) => {
    return `/mediapipe/face_mesh/${file}`;
  },
});
    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    const isFacingCamera = (landmarks) => {
      const leftEye = landmarks[33];
      const rightEye = landmarks[263];
      const nose = landmarks[1];
      const eyeDeltaX = Math.abs(rightEye.x - leftEye.x);
      const noseCenter = (leftEye.x + rightEye.x) / 2;
      const noseOffset = Math.abs(nose.x - noseCenter);
      const horizontalAligned = noseOffset < eyeDeltaX * 0.1;
      return horizontalAligned;
    };
     
    faceMesh.onResults((results) => {
      totalFrames.current++;
      const face = results.multiFaceLandmarks?.[0];

      if (!face) {
        if (!distractionStart.current) {
          // console.log("No face detected ");
          distractionStart.current = performance.now();
        }
        
        return;
      }

      if (isFacingCamera(face)) {
        // console.log("Face is facing the camera");
        attentionFrames.current++;
        if (distractionStart.current) {
          const duration = (performance.now() - distractionStart.current) / 1000;
          distractionDurations.current.push(duration);
          distractionStart.current = null;
        }
      } else {
        // console.log("Face is not facing the camera");
        if (!distractionStart.current) {
          distractionStart.current = performance.now();
        }
      }
    }
  
  );
    cameraInstance.current = new Camera(videoRef.current, {
      onFrame: async () => {
        await faceMesh.send({ image: videoRef.current });
      },
      width: 640,
      height: 480,
    });
    cameraInstance.current.start();

  } catch (err) {
    console.error("Recording failed:", err);
    alert("Please allow screen and mic access.");
  }

  }

  const handleStopRecording = () => {
  if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
    mediaRecorderRef.current.stop(); // this will trigger onstop
    console.log("⏹️ Recording stopped");
  }
};

  

  return (
    <div className="p-6 bg-base-200 flex-1">
      <div ref={screenRef} className="flex h-full items-center  flex-col lg:flex-row gap-6">
        {/* Left: Camera Feed */}
        <div className="w-full flex flex-col px-6 items-center lg:w-1/2 bg-base-100 p-4  rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Camera Feed</h2>
          <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover transform scale-x-[-1]"
            />
          </div>
          <div className="mt-6 flex gap-4">
            <CameraToggle
              CameraRef={CameraRef}
              disabled_prop={CameraDisable}
              videoRef={videoRef}
            />
            <div>
              <MicToggle
                DisableMicrophone={DisableMicrophone}
                MicrophoneOpen={MicrophoneOpen}
                MicrophoneRef={MicrophoneRef}
                disabled_prop={MicrophoneDisable}
                videoRef={videoRef}
                micTrackRef={micTrackRef}
              />
            </div>
          </div>
        </div>

        {/* Right: Interview Questions */}
        <div className="w-full lg:w-1/2 bg-base-100 p-4 rounded-xl shadow-md">
          {showInformation ? (
            <Information_Page onStart={onStart} />
          ) : (
            <Questions question={questions[currentIndex] } onTTSFinish={EnableMicrophone} />
          )}
        </div>
      </div>
    </div>
  );
}
