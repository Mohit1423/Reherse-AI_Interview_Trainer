import { useState } from "react";
import { Mic, MicOff } from "lucide-react";

export default function MicToggle({MicrophoneRef, videoRef,disabled_prop,MicrophoneOpen,DisableMicrophone }) {
  const [isOn, setIsOn] = useState(false);

  const toggleMic = async () => {
    if (!isOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        const audioTrack = stream.getAudioTracks()[0];

        if (videoRef.current) {
          let currentStream = videoRef.current.srcObject;

          if (currentStream) {
            currentStream.addTrack(audioTrack);
          } else {
            videoRef.current.srcObject = new MediaStream([audioTrack]);
          }
        }

        setIsOn(true);
      } catch (err) {
        console.error("Microphone error:", err);
        alert("Please allow microphone access.");
      }
    } else {
      // Turn off
      const currentStream = videoRef.current?.srcObject;
      if (currentStream) {
        currentStream.getAudioTracks().forEach((track) => {
          track.stop();
          currentStream.removeTrack(track);
        });
      }
      setIsOn(false);
    }
  };

  return (
    <button ref={MicrophoneRef}
      disabled={disabled_prop}
      className={`btn w-15 h-15 ${disabled_prop ? "btn-disabled" : isOn ? "bg-neutral text-white" : "bg-[#EA4335] text-white"} rounded-full`}
      onClick={(e)=>{
        toggleMic();
        //Flag for camera toggling 
        if(isOn){
          if(DisableMicrophone){
            DisableMicrophone()
          }
        }else{
          if(MicrophoneOpen){
            MicrophoneOpen()
          }
        }

        }
        
        
      }
      
    >
      {isOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
    </button>
  );
}
