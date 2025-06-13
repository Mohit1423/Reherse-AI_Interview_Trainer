import { useState } from "react";
import { Camera, CameraOff } from "lucide-react";

export default function CameraToggle({ CameraRef,videoRef,disabled_prop }) {
  const [isOn, setIsOn] = useState(false);

  const toggleCamera = async () => {

    if (!isOn) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              video: true,
            });
            const videoTrack = stream.getVideoTracks()[0];

            if (videoRef.current) {
              let currentStream = videoRef.current.srcObject;

              if (currentStream) {
                // Stop & remove old video tracks
                currentStream.getVideoTracks().forEach((track) => {
                  track.stop();
                  currentStream.removeTrack(track);
                });

                currentStream.addTrack(videoTrack);
              } else {
                // No stream yet — create one
                const newStream = new MediaStream([videoTrack]);
                videoRef.current.srcObject = newStream;
              }
            }

            setIsOn(true);
          } catch (err) {
            console.error("Camera error:", err);
            alert("Please allow camera access.");
          }
    } else {
      // Turn off
      const currentStream = videoRef.current?.srcObject;
      if (currentStream) {
        currentStream.getVideoTracks().forEach((track) => {
          track.stop();
          currentStream.removeTrack(track);
        });
      }
      setIsOn(false);
    }
  };

  return (
    <button ref={CameraRef}
      disabled={disabled_prop}
      className={`btn w-15 h-15  ${disabled_prop ? "btn-disabled" : isOn ? "bg-neutral text-white" : "bg-[#EA4335] text-white"} rounded-full`}
      onClick={toggleCamera}
    >
      {isOn ? <Camera className="w- h-6" /> : <CameraOff className="w-6 h-6" />}
    </button>
  );
}
