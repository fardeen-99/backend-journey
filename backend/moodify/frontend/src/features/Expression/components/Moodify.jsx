import React, { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

const Moodify = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [mood, setMood] = useState("Detecting...");
  const [faceLandmarker, setFaceLandmarker] = useState(null);

  // Initialize mediapipe
  useEffect(() => {
    const createLandmarker = async () => {
      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
      );

      const landmarker = await FaceLandmarker.createFromOptions(
        filesetResolver,
        {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
          },
          outputFaceBlendshapes: true,
          runningMode: "VIDEO",
          numFaces: 1,
        }
      );

      setFaceLandmarker(landmarker);
    };

    createLandmarker();
  }, []);

  // Start webcam
  useEffect(() => {
    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      videoRef.current.srcObject = stream;
      videoRef.current.play();
    };

    startCamera();
  }, []);

  // Mood logic
  const detectMood = (blendshapes) => {
    let smile = 0;
    let surprise = 0;
    let frown = 0;

    blendshapes.categories.forEach((shape) => {
      if (shape.categoryName === "mouthSmileLeft" || shape.categoryName === "mouthSmileRight") {
        smile += shape.score;
      }

      if (shape.categoryName === "jawOpen") {
        surprise += shape.score;
      }

      if (shape.categoryName === "browDownLeft" || shape.categoryName === "browDownRight") {
        frown += shape.score;
      }
    });
   

    if (smile > 0.7) return "😊 Happy";
    if (surprise > 0.6) return "😲 Surprise";
    if (frown > 0.4) return "😔 Sad";

    return "😐 Neutral";
  };

  // Detection loop
    const detect = async () => {
      if (!videoRef.current) return;

      const results = faceLandmarker.detectForVideo(
        videoRef.current,
        performance.now()
      );

      if (results.faceBlendshapes.length > 0) {
        const moodDetected = detectMood(results.faceBlendshapes[0]);
        setMood(moodDetected);
      }

    };
    // useEffect(()=>{

    //     console.log(mood)
    // },[mood])

//   useEffect(() => {
//     if (!faceLandmarker) return;
//     detect();
//   }, [faceLandmarker]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Moodify AI</h1>

      <video
        ref={videoRef}
        width="400"
        height="300"    
        style={{ borderRadius: "10px" }}
      />

      <canvas
        ref={canvasRef}
        width="400"
        height="300"
        style={{ position: "absolute", left: 0 }}
      />

      <h2>Your Mood: {mood}</h2>
      <button
      onClick={()=>detect()}
      >detect</button>
    </div>
  );
};

export default Moodify;